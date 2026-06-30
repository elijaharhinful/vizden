import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const logo = readFileSync(
  join(process.cwd(), "public/logos/vizden-logo-white.png"),
).toString("base64");

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0c",
          padding: "22px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo}`}
          alt=""
          width={136}
          height={96}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    size,
  );
}
