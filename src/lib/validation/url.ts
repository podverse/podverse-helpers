export function isValidHttpUrl(url?: string | null): true | null {
  if (!url) {
    return null;
  }
  const pattern = /^(http|https):\/\//;
  return pattern.test(url) ? true : null;
}
