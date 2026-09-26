/**
 * Generate available dates for booking starting from today
 * @param days - Number of days to generate (default: 30)
 * @returns Array of date strings in YYYY-MM-DD format
 */
export function generateAvailableDates(days: number = 30): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
}

/**
 * Parse a YYYY-MM-DD calendar date as local midnight (avoids UTC off-by-one).
 */
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format date string to readable format
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "Jan 16, 2026")
 */
export function formatDateForDisplay(dateString: string): string {
  return parseLocalDate(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Long header format for Browse Boats (e.g., "Monday, January 16, 2026")
 */
export function formatDateLongForDisplay(dateString: string): string {
  return parseLocalDate(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Today's date as local YYYY-MM-DD (not UTC via toISOString).
 */
export function getTodayLocalDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
