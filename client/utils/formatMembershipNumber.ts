/**
 * Format a membership number for display (matches admin Member::displayMembershipNumber).
 * e.g. "412B" -> "#412B", fallback to padded system id "#00042".
 */
export function formatMembershipNumber(
  membershipNumber?: string | null,
  systemId?: number | null,
): string {
  const raw = membershipNumber?.trim() ?? "";

  if (raw && !raw.includes("#d")) {
    return raw.startsWith("#") ? raw : `#${raw}`;
  }

  if (systemId != null && Number.isFinite(systemId)) {
    return `#${String(systemId).padStart(5, "0")}`;
  }

  return "—";
}
