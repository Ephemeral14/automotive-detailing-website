import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — the NOIR monogram in champagne on black. */
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
          background: "#090909",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64">
          <rect x="6.5" y="6.5" width="51" height="51" fill="none" stroke="#C6A76B" strokeWidth="2" />
          <path d="M21 45V19l22 26V19" fill="none" stroke="#C6A76B" strokeWidth="3" strokeLinecap="square" />
        </svg>
      </div>
    ),
    size,
  );
}
