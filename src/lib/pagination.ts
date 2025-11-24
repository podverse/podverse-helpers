export const PAGINATION = {
  MAX_COUNT: 1000,
  DEFAULT_LIMIT: 60
};

export function getTotalPages(count: number | null, limit: number): number {
  const totalCount = count === null ? PAGINATION.MAX_COUNT : count;
  if (!limit || limit <= 0) return 1;
  return Math.max(1, Math.ceil(totalCount / limit)); // ensure at least 1
}

export function getUndeterminedTotalPages() {
  return 1000;
}
