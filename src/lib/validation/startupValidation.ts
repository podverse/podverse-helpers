/**
 * Types and functions for validating environment variables at application startup.
 * These utilities can be used across different projects to validate required and optional environment variables.
 */

export type ValidationResult = {
  name: string;
  isSet: boolean;
  isValid: boolean;
  isRequired: boolean;
  message: string;
  category: string;
};

export type ValidationSummary = {
  total: number;
  passed: number;
  failed: number;
  requiredMissing: number;
  skipped: number;
  results: ValidationResult[];
};

/**
 * Validates a required environment variable
 * @param varName - The name of the environment variable to validate
 * @param category - The category/group this variable belongs to (for display purposes)
 * @returns ValidationResult indicating whether the variable is set and valid
 */
export function validateRequired(varName: string, category: string): ValidationResult {
  const value = process.env[varName] || '';
  const isSet = value !== '';
  
  // Additional validation for numeric values
  if (isSet && (varName.includes('PORT') || varName.includes('EXPIRATION') || varName.includes('CACHE_TTL'))) {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue <= 0) {
      return {
        name: varName,
        isSet: true,
        isValid: false,
        isRequired: true,
        message: `Invalid number: "${value}"`,
        category
      };
    }
  }

  // Additional validation for API_ALLOWED_CORS_ORIGINS (should not be empty)
  if (varName === 'API_ALLOWED_CORS_ORIGINS' && isSet) {
    const origins = value.split(',').map(origin => origin.trim()).filter(origin => origin !== '');
    if (origins.length === 0) {
      return {
        name: varName,
        isSet: true,
        isValid: false,
        isRequired: true,
        message: 'Empty - must contain at least one origin',
        category
      };
    }
  }

  return {
    name: varName,
    isSet,
    isValid: isSet,
    isRequired: true,
    message: isSet ? 'Set' : 'Missing',
    category
  };
}

/**
 * Validates an optional environment variable
 * @param varName - The name of the environment variable to validate
 * @param category - The category/group this variable belongs to (for display purposes)
 * @returns ValidationResult indicating whether the variable is set and valid (optional vars are always valid even if not set)
 */
export function validateOptional(varName: string, category: string): ValidationResult {
  const value = process.env[varName] || '';
  const isSet = value !== '';

  // Additional validation for numeric values if set
  if (isSet && (varName.includes('PORT') || varName.includes('EXPIRATION') || varName.includes('CACHE_TTL'))) {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue <= 0) {
      return {
        name: varName,
        isSet: true,
        isValid: false,
        isRequired: false,
        message: `Invalid number: "${value}"`,
        category
      };
    }
  }

  return {
    name: varName,
    isSet,
    isValid: true, // Optional vars are always valid (even if not set)
    isRequired: false,
    message: isSet ? 'Set' : 'Skipped',
    category
  };
}

/**
 * Validates a conditionally optional environment variable (only logs if set but not needed)
 * Returns null if variable is not set (so it won't be included in results)
 * @param varName - The name of the environment variable to validate
 * @param category - The category/group this variable belongs to (for display purposes)
 * @returns ValidationResult if variable is set, null otherwise
 */
export function validateConditionalOptional(varName: string, category: string): ValidationResult | null {
  const value = process.env[varName] || '';
  const isSet = value !== '';

  // Only validate if the variable is set (if not set, don't include in results)
  if (!isSet) {
    return null;
  }

  // Additional validation for numeric values if set
  if (varName.includes('PORT') || varName.includes('EXPIRATION') || varName.includes('CACHE_TTL')) {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue <= 0) {
      return {
        name: varName,
        isSet: true,
        isValid: false,
        isRequired: false,
        message: `Invalid number: "${value}"`,
        category
      };
    }
  }

  return {
    name: varName,
    isSet: true,
    isValid: true,
    isRequired: false,
    message: 'Set (not needed when signup mode is disabled)',
    category
  };
}
