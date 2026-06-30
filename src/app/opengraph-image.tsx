import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} - AI Film Studio`;

// Read brand assets from disk at build time (Node runtime, not edge).
const root = process.cwd();
const futura = readFileSync(
  join(root, "src/app/fonts/FuturaLT-ExtraBold.ttf"),
);
const logo = readFileSync(
  join(root, "public/logos/vizden-logo-white.png"),
).toString("base64");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(120% 120% at 80% 15%, #1c1722 0%, #0a0a0c 60%)",
          padding: "80px",
          fontFamily: "Futura",
          color: "#fafafa",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo}`}
          alt=""
          width={150}
          height={106}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 110, lineHeight: 1, letterSpacing: "-2px" }}>
            {SITE.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              letterSpacing: "6px",
              color: "#d4d4d8",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            {SITE.tagline}
            <span style={{ color: "#0168dd" }}>/</span> AI FILM STUDIO
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Futura", data: futura, weight: 800, style: "normal" }],
    },
  );
}
