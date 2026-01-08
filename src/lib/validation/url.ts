export function isValidHttpUrl(url?: string | null): true | null {
  if (!url) {
    return null;
  }
  const pattern = /^(http|https):\/\//;
  return pattern.test(url) ? true : null;
}

/**
 * Validates that a string is a valid HTTPS URL.
 * Returns an object with isValid boolean and optional error message.
 */
export function validateHttpsUrl(url?: string | null): { isValid: boolean; error?: string } {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL is required' };
  }

  const trimmedUrl = url.trim();

  // Check for valid URL format
  try {
    const parsed = new URL(trimmedUrl);
    
    // Must be HTTPS
    if (parsed.protocol !== 'https:') {
      return { isValid: false, error: 'URL must use HTTPS' };
    }

    // Must have a valid hostname
    if (!parsed.hostname || parsed.hostname.length === 0) {
      return { isValid: false, error: 'URL must have a valid hostname' };
    }

    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validates a URL allowing both HTTP and HTTPS.
 * Useful for development environments where HTTP might be needed.
 */
export function validateHttpOrHttpsUrl(url?: string | null): { isValid: boolean; error?: string } {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL is required' };
  }

  const trimmedUrl = url.trim();

  try {
    const parsed = new URL(trimmedUrl);
    
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return { isValid: false, error: 'URL must use HTTP or HTTPS' };
    }

    if (!parsed.hostname || parsed.hostname.length === 0) {
      return { isValid: false, error: 'URL must have a valid hostname' };
    }

    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
}
