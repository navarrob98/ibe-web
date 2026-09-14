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
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0a1730",
          backgroundImage:
            "linear-gradient(135deg, #0a1730 0%, #0f2d4a 60%, #022754 100%)",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Motivo geométrico derivado de la X */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: -170,
            right: -170,
            width: 460,
            height: 460,
            border: "3px solid rgba(79,183,182,0.35)",
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            display: "flex",
            bottom: -240,
            right: 120,
            width: 420,
            height: 420,
            border: "2px solid rgba(79,183,182,0.16)",
            transform: "rotate(45deg)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 4,
              background: "#4fb7b6",
              display: "flex",
              transform: "skewX(-24deg)",
            }}
          />
          <div
            style={{
              display: "flex",
              color: "#4fb7b6",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Tijuana · Baja California
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            IBEX
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              color: "rgba(255,255,255,0.72)",
              fontSize: 30,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            Biomedical Solutions
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 600,
              maxWidth: 860,
            }}
          >
            Gestión biomédica documentada para Tijuana y Baja California
          </div>
          <div style={{ display: "flex", color: "#4fb7b6", fontSize: 24, fontWeight: 500 }}>
            Próximo inicio de operaciones
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
