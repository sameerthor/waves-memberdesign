/**
 * Format a membership type slug for display.
 * e.g. "bronze" -> "Bronze", "gold-plus" -> "Gold Plus"
 */
export function formatMembershipType(type?: string | null): string {
  if (!type?.trim()) {
    return "";
  }

  return type
    .trim()
    .replace(/-/g, " ")
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
