import { formatDuration, intervalToDuration } from "date-fns";
import { enUS, es, el } from "date-fns/locale";

export function formatSecondsToReadableDuration(
  input: string,
  lang: string = "en"
): string {
  const seconds = Math.floor(parseFloat(input));
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  let locale;
  switch (lang) {
  case "es":
    locale = es;
    break;
  case "el":
  case "el-GR":
    locale = el;
    break;
  case "en":
  default:
    locale = enUS;
    break;
  }

  return formatDuration(duration, {
    format: ["hours", "minutes"],
    locale,
    zero: false,
  });
}
