export const PAGINATION = {
  MAX_COUNT: 1000,
  DEFAULT_LIMIT: 24
};

export function getTotalPages(count: number | null, limit: number): number {
  const totalCount = count === null ? PAGINATION.MAX_COUNT : count;
  if (!limit || limit <= 0) return 1;
  return Math.ceil(totalCount / limit);
}

export function getUndeterminedTotalPages() {
  return 1000;
}
