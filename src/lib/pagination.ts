export function getTotalPages(count: number | null, limit: number): number {
  const totalCount = count === null ? 1000 : count;
  if (!limit || limit <= 0) return 1;
  return Math.ceil(totalCount / limit);
}
