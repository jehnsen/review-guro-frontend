/**
 * Timezone Utilities
 *
 * All date calculations for user-facing features (streaks, daily limits, etc.)
 * should use Philippine Time (PHT / GMT+8) to ensure consistent behavior
 * for Filipino users regardless of server timezone.
 *
 * Example: A user practicing at 11 PM PHT should have that count towards
 * their current day, not the next day (which it would be in UTC).
 */

// Philippine timezone offset: GMT+8 (480 minutes ahead of UTC)
const PH_TIMEZONE_OFFSET_MINUTES = 480;

/**
 * Convert a UTC date to Philippine Time (GMT+8)
 *
 * @param utcDate - Date in UTC
 * @returns Date adjusted to PHT
 */
export function convertToPHT(utcDate: Date): Date {
  const phtDate = new Date(utcDate);
  phtDate.setMinutes(phtDate.getMinutes() + PH_TIMEZONE_OFFSET_MINUTES);
  return phtDate;
}

/**
 * Get today's date in Philippine Time (date only, no time)
 * Used for daily limit tracking, streak calculation, etc.
 *
 * @returns Date representing today in PHT at midnight
 */
export function getTodayDatePHT(): Date {
  const now = new Date();
  return getDateOnlyPHT(now);
}

/**
 * Extract date only from a timestamp, in Philippine Time
 *
 * @param date - Date to extract from
 * @returns Date at midnight PHT (stored as UTC equivalent)
 */
export function getDateOnlyPHT(date: Date): Date {
  const phtDate = convertToPHT(date);

  // Extract date components in PHT
  const year = phtDate.getFullYear();
  const month = phtDate.getMonth();
  const day = phtDate.getDate();

  // Create new date at midnight (stored as UTC for DB consistency)
  const dateOnly = new Date(Date.UTC(year, month, day));
  dateOnly.setUTCHours(0, 0, 0, 0);

  return dateOnly;
}

/**
 * Calculate the number of days between two dates using PHT
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of days between dates (positive if date2 > date1)
 */
export function daysBetweenPHT(date1: Date, date2: Date): number {
  const d1 = getDateOnlyPHT(date1);
  const d2 = getDateOnlyPHT(date2);

  const diffTime = d2.getTime() - d1.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if two dates are the same day in Philippine Time
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns true if same day in PHT
 */
export function isSameDayPHT(date1: Date, date2: Date): boolean {
  return daysBetweenPHT(date1, date2) === 0;
}

/**
 * Get yesterday's date in Philippine Time
 *
 * @returns Date representing yesterday in PHT at midnight
 */
export function getYesterdayDatePHT(): Date {
  const today = getTodayDatePHT();
  today.setDate(today.getDate() - 1);
  return today;
}

/**
 * Get a date N days ago in Philippine Time
 *
 * @param days - Number of days to go back
 * @returns Date N days ago in PHT at midnight
 */
export function getDaysAgoPHT(days: number): Date {
  const today = getTodayDatePHT();
  today.setDate(today.getDate() - days);
  return today;
}

/**
 * Format a date as YYYY-MM-DD string in Philippine Time
 *
 * @param date - Date to format
 * @returns Date string in YYYY-MM-DD format
 */
export function formatDatePHT(date: Date): string {
  const phtDate = convertToPHT(date);
  const year = phtDate.getFullYear();
  const month = String(phtDate.getMonth() + 1).padStart(2, '0');
  const day = String(phtDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get the current time in Philippine Time as a human-readable string
 * Useful for debugging and logging
 *
 * @returns Current PHT time as ISO string
 */
export function getCurrentTimePHT(): string {
  return convertToPHT(new Date()).toISOString();
}
