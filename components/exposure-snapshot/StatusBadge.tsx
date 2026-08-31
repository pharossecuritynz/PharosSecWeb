import { AlertCircleIcon, CheckCircleIcon } from "@/components/icons";

export type BadgeStatus = "good" | "attention" | "high-priority" | "informational" | "not-checked";

const LABELS: Record<BadgeStatus, string> = {
  good: "Good",
  attention: "Needs attention",
  "high-priority": "High priority",
  informational: "Informational",
  "not-checked": "Not checked",
};

const STYLES: Record<BadgeStatus, string> = {
  good: "border-teal/30 bg-teal/10 text-charcoal",
  attention: "border-charcoal/15 bg-mist text-charcoal",
  "high-priority": "border-amber/35 bg-amber/10 text-charcoal",
  informational: "border-charcoal/10 bg-white text-charcoal/70",
  "not-checked": "border-charcoal/10 bg-white text-charcoal/50",
};

const ICON_COLOR: Record<BadgeStatus, string> = {
  good: "text-teal",
  attention: "text-charcoal/50",
  "high-priority": "text-amber",
  informational: "text-charcoal/40",
  "not-checked": "text-charcoal/30",
};

interface StatusBadgeProps {
  status: BadgeStatus;
  /** Override the generic status label with a category-specific one (e.g. "Elevated", "Broad") while keeping the status's colour/icon. */
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const Icon = status === "good" ? CheckCircleIcon : AlertCircleIcon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${STYLES[status]}`}
    >
      <Icon className={`h-3.5 w-3.5 flex-none ${ICON_COLOR[status]}`} />
      {label ?? LABELS[status]}
    </span>
  );
}
