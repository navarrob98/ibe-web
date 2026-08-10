import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0a1730",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,36,96,0.35), rgba(10,23,48,1)), " +
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 6, background: "#0098a8", display: "flex" }} />
          <div
            style={{
              display: "flex",
              color: "#6cd8d8",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Tijuana · Baja California
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 108, fontWeight: 800, lineHeight: 1 }}>
            IBEX
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              color: "#ffffff",
              opacity: 0.7,
              fontSize: 30,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Biomedical Solutions
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 34, fontWeight: 600, maxWidth: 900 }}>
            Gestión biomédica documentada para Tijuana y Baja California
          </div>
          <div style={{ display: "flex", color: "#00b3c6", fontSize: 24, fontWeight: 500 }}>
            Próximo inicio de operaciones
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
