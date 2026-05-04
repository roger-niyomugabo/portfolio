import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.title}`;
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
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b1020 0%, #1e1b4b 60%, #312e81 100%)",
          color: "white",
          fontFamily: "system-ui"
        }}
      >
        <div
          style={{
            fontSize: 24,
            opacity: 0.7,
            letterSpacing: 4,
            textTransform: "uppercase"
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 24,
            backgroundImage:
              "linear-gradient(135deg, #818cf8 0%, #f472b6 100%)",
            backgroundClip: "text",
            color: "transparent"
          }}
        >
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 16 }}>
          {profile.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            opacity: 0.7,
            marginTop: 24,
            maxWidth: 900
          }}
        >
          React · TypeScript · Node.js · NestJS · Django · PostgreSQL
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto"
          }}
        >
          <div style={{ display: "flex", fontSize: 22, opacity: 0.6 }}>
            roger-niyomugabo.dev
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.6 }}>
            {profile.location}
          </div>
        </div>
      </div>
    ),
    size
  );
}
