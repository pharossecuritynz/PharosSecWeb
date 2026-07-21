type BeaconMarkProps = {
  className?: string;
};

export default function BeaconMark({ className = "h-9 w-9" }: BeaconMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 3 L36 44 L24 38 L12 44 Z"
        fill="currentColor"
        className="text-teal"
        opacity="0.16"
      />
      <path
        d="M24 3 L30.5 40 L24 36.5 L17.5 40 Z"
        fill="currentColor"
        className="text-teal"
        opacity="0.4"
      />
      <circle cx="24" cy="14" r="5.5" fill="currentColor" className="text-cyan" />
      <circle cx="24" cy="14" r="9.5" stroke="currentColor" strokeWidth="1" className="text-cyan" opacity="0.5" />
    </svg>
  );
}
