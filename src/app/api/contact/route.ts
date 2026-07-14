import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Recepción del formulario de contacto.
 *
 * Valida en el servidor y envía el mensaje por correo usando SMTP
 * (pensado para una cuenta de correo de cPanel). Configura las variables
 * de entorno en el archivo `.env` (ver `.env.example`).
 *
 * Si no hay SMTP configurado, registra la solicitud en consola y responde OK
 * (útil en desarrollo local).
 */

export const runtime = "nodejs"; // nodemailer requiere Node, no Edge.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  organization?: string;
  phone?: string;
  service?: string;
  consent?: string;
  company_website?: string; // honeypot
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, message: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: si está lleno, es un bot. Respondemos OK sin procesar.
  if (data.company_website && data.company_website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();

  const errors: string[] = [];
  if (name.length < 2) errors.push("nombre");
  if (!EMAIL_RE.test(email)) errors.push("correo");
  if (message.length < 10) errors.push("mensaje");
  if (data.consent !== "yes") errors.push("consentimiento");

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, message: `Revisa los campos: ${errors.join(", ")}.` },
      { status: 422 }
    );
  }

  const submission = {
    name,
    email,
    organization: (data.organization ?? "").trim() || "—",
    phone: (data.phone ?? "").trim() || "—",
    service: (data.service ?? "").trim() || "—",
    message,
    receivedAt: new Date().toLocaleString("es-MX", { timeZone: "America/Tijuana" }),
  };

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  const inbox = process.env.CONTACT_INBOX || SMTP_USER;
  const from = process.env.CONTACT_FROM || SMTP_USER;

  // Sin SMTP configurado: registrar y responder OK (desarrollo).
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.info("[contacto] SMTP no configurado. Solicitud recibida:", submission);
    return NextResponse.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 465),
      secure: (SMTP_SECURE ?? "true") === "true", // 465 = SSL; 587 = false (STARTTLS)
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const lines = [
      `Nombre:        ${submission.name}`,
      `Correo:        ${submission.email}`,
      `Organización:  ${submission.organization}`,
      `Teléfono:      ${submission.phone}`,
      `Servicio:      ${submission.service}`,
      `Recibido:      ${submission.receivedAt}`,
      ``,
      `Mensaje:`,
      submission.message,
    ];

    await transporter.sendMail({
      from: `IBE Biomedical Solutions <${from}>`,
      to: inbox,
      replyTo: `${submission.name} <${submission.email}>`,
      subject: `Nueva solicitud de contacto — ${submission.name}`,
      text: lines.join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#0c1626;max-width:560px">
          <h2 style="color:#002460;margin:0 0 16px">Nueva solicitud de contacto</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px">
            ${[
              ["Nombre", submission.name],
              ["Correo", submission.email],
              ["Organización", submission.organization],
              ["Teléfono", submission.phone],
              ["Servicio", submission.service],
              ["Recibido", submission.receivedAt],
            ]
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:6px 12px 6px 0;color:#56616f">${k}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(
                    String(v)
                  )}</td></tr>`
              )
              .join("")}
          </table>
          <p style="margin:18px 0 6px;color:#56616f;font-size:14px">Mensaje:</p>
          <p style="white-space:pre-wrap;border-left:3px solid #0098a8;padding-left:12px;margin:0;font-size:15px">${escapeHtml(
            submission.message
          )}</p>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contacto] Error al enviar el correo:", error);
    return NextResponse.json(
      { ok: false, message: "No pudimos enviar tu mensaje en este momento. Intenta más tarde." },
      { status: 502 }
    );
  }
}
