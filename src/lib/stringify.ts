export function stringifyData(data?: Record<string, any>): Record<string, string> {
  if (!data) return {};
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, typeof v === "string" ? v : JSON.stringify(v)])
  );
}
