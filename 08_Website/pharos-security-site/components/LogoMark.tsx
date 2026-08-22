type LogoMarkProps = {
  className?: string;
  variant?: "white" | "navy";
};

export default function LogoMark({
  className = "h-9 w-auto",
  variant = "white",
}: LogoMarkProps) {
  // Tiny decorative icon, deliberately bypassing next/image: its optimizer
  // hangs indefinitely encoding this asset to AVIF, so it never renders.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/pharos-mark-${variant}.png`}
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}
