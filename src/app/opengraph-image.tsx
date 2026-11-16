import { ImageResponse } from "next/og";

export const alt = "Noir Auto Studio — Perfection in every detail. Premium automotive detailing.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-share card for every page. */
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
          padding: "72px 84px",
          background: "radial-gradient(ellipse at 80% 20%, #1f1a12 0%, #0d0d0d 45%, #090909 100%)",
          color: "#F5F5F5",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect x="6.5" y="6.5" width="51" height="51" fill="none" stroke="#C6A76B" strokeWidth="2" />
            <path d="M21 45V19l22 26V19" fill="none" stroke="#C6A76B" strokeWidth="3" strokeLinecap="square" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
            <span style={{ fontSize: 30, letterSpacing: 14, fontWeight: 700 }}>NOIR</span>
            <span style={{ fontSize: 15, letterSpacing: 8, color: "#A0A0A0", marginTop: 6 }}>AUTO STUDIO</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 2, background: "#C6A76B", marginBottom: 34 }} />
          <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>Perfection in</div>
          <div style={{ fontSize: 92, lineHeight: 1.05, letterSpacing: -2, color: "#C6A76B", fontStyle: "italic" }}>
            every detail.
          </div>
          <div style={{ marginTop: 30, fontSize: 26, color: "#A0A0A0", fontFamily: "sans-serif" }}>
            Premium automotive detailing · Paint correction · Ceramic coating · PPF
          </div>
        </div>
      </div>
    ),
    size,
  );
}
