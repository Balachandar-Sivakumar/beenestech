import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "BeeNest — Custom Software Development & MVP Engineering Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/beenest-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 72px",
          background: "radial-gradient(circle at 25% 40%, #1c1c1c 0%, #0a0a0a 70%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={520} height={332} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.1 }}>Custom Software &amp; MVP Engineering</div>
          <div style={{ fontSize: 26, color: "#d4d4d4", lineHeight: 1.4 }}>
            We build &amp; support SaaS, mobile, AI and business software.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#f5b921" }}>{site.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
