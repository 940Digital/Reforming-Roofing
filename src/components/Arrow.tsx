/** Solid triangle pointer used in place of the arrow glyph on buttons and links. Sized in em so it follows the text. */
export function Arrow({ dir = "right", className = "" }: { dir?: "left" | "right"; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 10 12" className={`tri ${dir === "left" ? "tri-left" : ""} ${className}`}>
      <path d="M0 0 10 6 0 12Z" />
    </svg>
  );
}
