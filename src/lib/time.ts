export const TIME_CONSTANTS = {
  ONE_DAY_IN_MINUTES: 1440,
  ONE_WEEK_IN_MINUTES: 10080,
  ONE_MONTH_IN_MINUTES: 43200
};

export function formatHHMMSS(sec: number) {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatInputToHHMMSS(input: string): string {
  let sanitized = input.replace(/[^0-9:]/g, '');
  let digits = sanitized.replace(/:/g, '');

  if (digits.length === 0) return '';

  if (digits.length <= 2) return digits;

  if (digits.length <= 4) {
    const minutes = digits.slice(0, digits.length - 2);
    const seconds = digits.slice(-2);
    return `${minutes}:${seconds}`;
  }

  const hours = digits.slice(0, digits.length - 4);
  const minutes = digits.slice(-4, -2);
  const seconds = digits.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

export function hhmmssToNumericSeconds(time: string): string {
  if (!time) return "0.00";
  const parts = time.split(':').map(Number).reverse();
  let seconds = 0;
  if (parts.length > 0) seconds += parts[0];
  if (parts.length > 1) seconds += parts[1] * 60;
  if (parts.length > 2) seconds += parts[2] * 3600;
  return `${seconds.toFixed(2)}`;
}
