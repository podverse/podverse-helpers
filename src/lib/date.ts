import { format, Locale } from "date-fns";

export const formatDateAbbrev = (
  date: Date | number | string,
  locale?: Locale
): string => {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return format(d, "MMM d yyyy", { locale });
};

export const convertSecondsToDaysText = (seconds: string) => {
  const totalDays = Math.round(parseInt(seconds, 10) / 86400);
  return `${totalDays > 1 ? `${totalDays} days` : '24 hours'}`;
};
