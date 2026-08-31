import type { Effort, Finding } from "./types";

/**
 * Executive summary model: the plain-English overview, and a "top actions"
 * selection that favours meaningful risk reduction at low effort first —
 * per risk-and-priority-methodology.md's "strongest recommendations"
 * principle — rather than simply sorting by severity. See
 * docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md.
 */

export interface ExecutiveSummary {
  domain: string;
  overallPicture: string;
  protectionsInPlaceCount: number;
  thingsToReviewCount: number;
  priorityActionCount: number;
  topActions: Finding[];
  strengths: Finding[];
}

const EFFORT_WEIGHT: Record<Effort, number> = {
  "very-low": 0,
  low: 1,
  moderate: 2,
  significant: 3,
};

const STATUS_WEIGHT: Record<Finding["status"], number> = {
  "high-priority": 3,
  attention: 2,
  informational: 1,
  good: 0,
  "not-checked": 0,
};

/**
 * Higher score = surface first. Rewards addressable findings (higher
 * status weight) but penalises effort, so a cheap, moderate finding can
 * reasonably outrank an expensive, severe one — matching the brief's own
 * "high risk reduction + low cost + low effort" example.
 */
function actionScore(finding: Finding): number {
  return STATUS_WEIGHT[finding.status] * 2 - EFFORT_WEIGHT[finding.effort];
}

const MAX_TOP_ACTIONS = 5;

export function buildExecutiveSummary(domain: string, findings: Finding[]): ExecutiveSummary {
  const strengths = findings.filter((f) => f.status === "good");
  const actionable = findings.filter((f) => f.status === "attention" || f.status === "high-priority");
  const priorityCount = findings.filter((f) => f.status === "high-priority").length;

  const topActions = [...actionable]
    .sort((a, b) => actionScore(b) - actionScore(a))
    .slice(0, MAX_TOP_ACTIONS);

  const overallPicture = buildOverallPictureText(strengths.length, actionable.length, priorityCount);

  return {
    domain,
    overallPicture,
    protectionsInPlaceCount: strengths.length,
    thingsToReviewCount: actionable.length,
    priorityActionCount: priorityCount,
    topActions,
    strengths,
  };
}

function buildOverallPictureText(strengthCount: number, reviewCount: number, priorityCount: number): string {
  const strengthPart =
    strengthCount > 0
      ? `${strengthCount} sensible protection${strengthCount === 1 ? "" : "s"} already in place`
      : "no protections confirmed in place yet";

  if (reviewCount === 0) {
    return `We found ${strengthPart}, and nothing that needs attention from this scan. That's a solid external picture, though this scan only covers what's publicly observable — it isn't a guarantee against every risk.`;
  }

  const reviewPart = `${reviewCount} thing${reviewCount === 1 ? "" : "s"} worth reviewing`;
  const priorityPart =
    priorityCount > 0
      ? `, including ${priorityCount} we'd treat as a priority`
      : ", none of which are urgent";

  return `We found ${strengthPart}, along with ${reviewPart}${priorityPart}. Most of what's flagged below can be addressed without significant cost or disruption.`;
}
