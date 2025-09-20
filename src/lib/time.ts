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
