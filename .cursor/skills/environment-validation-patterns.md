# Environment Variable Validation Patterns

## Overview

The `podverse-helpers` package provides comprehensive utilities for validating environment variables at application startup. These utilities are used across all Podverse applications to ensure proper configuration before the application starts.

All validation functions are located in `src/lib/validation/startupValidation.ts`.

## Types

### ValidationResult

```typescript
export type ValidationResult = {
  name: string;           // Environment variable name
  isSet: boolean;         // Whether the variable is set (not undefined/null/empty)
  isValid: boolean;       // Whether the variable is valid
  isRequired: boolean;    // Whether the variable is required
  message: string;        // Human-readable validation message
  category: string;       // Category/group for display purposes
};
```

### ValidationSummary

```typescript
export type ValidationSummary = {
  total: number;              // Total number of variables validated
  passed: number;             // Number of variables that passed validation
  failed: number;             // Number of variables that failed validation
  requiredMissing: number;    // Number of required variables that are missing/invalid
  skipped: number;           // Number of optional variables that were skipped
  defaultsUsed: number;       // Number of variables using default values
  results: ValidationResult[]; // Array of all validation results
};
```

## Core Validation Functions

### validateRequired

Validates a required environment variable.

```typescript
validateRequired(varName: string, category: string): ValidationResult
```

**Features:**
- Checks if variable is set (not undefined, null, or empty string)
- Automatically validates numeric values for variables containing `PORT`, `EXPIRATION`, or `CACHE_TTL`
- Special validation for `API_ALLOWED_CORS_ORIGINS` (must contain at least one origin)
- Returns `isValid: false` if variable is missing or invalid

**Example:**
```typescript
results.push(validateRequired('DB_HOST', 'Database'));
results.push(validateRequired('API_PORT', 'API')); // Automatically validates as number
```

### validateOptional

Validates an optional environment variable.

```typescript
validateOptional(varName: string, category: string, defaultMessage?: string): ValidationResult
```

**Features:**
- Always returns `isValid: true` (optional vars are valid even if not set)
- Validates numeric values if the variable is set and contains `PORT`, `EXPIRATION`, or `CACHE_TTL`
- Can specify a custom default message (defaults to "Skipped")

**Example:**
```typescript
results.push(validateOptional('LOG_LEVEL', 'General'));
results.push(validateOptional('DB_SSL_CONNECTION', 'Database', 'Use Default (false)'));
```

### validateConditionalOptional

Validates a conditionally optional environment variable (only logs if set but not needed).

```typescript
validateConditionalOptional(varName: string, category: string): ValidationResult | null
```

**Features:**
- Returns `null` if variable is not set (won't appear in results)
- Only validates if the variable is set
- Useful for variables that are only needed in certain configurations
- Validates numeric values if set and contains `PORT`, `EXPIRATION`, or `CACHE_TTL`

**Example:**
```typescript
// Only validate if set (e.g., when signup mode is disabled but variable is still set)
const mailerHost = validateConditionalOptional('MAILER_HOST', 'Mailer');
if (mailerHost) results.push(mailerHost);
```

## Specialized Validation Functions

### validateLocale

Validates a single locale value against supported locales.

```typescript
validateLocale(varName: string, category: string, isRequired?: boolean): ValidationResult
```

**Features:**
- Validates against `SUPPORTED_LOCALES` constant
- Can be required or optional
- Returns clear error message with list of valid locales

**Example:**
```typescript
results.push(validateLocale('NEXT_PUBLIC_FEATURES_DEFAULT_LOCALE', 'Brand & Features', true));
```

### validateSupportedLocalesList

Validates a comma-delimited list of locales or "all-available".

```typescript
validateSupportedLocalesList(varName?: string, category: string): ValidationResult
```

**Features:**
- Accepts `"all-available"` as a special value
- Validates comma-delimited list of locales
- Checks that all locales in the list are valid
- Returns detailed error messages for invalid locales

**Example:**
```typescript
results.push(validateSupportedLocalesList('NEXT_PUBLIC_FEATURES_SUPPORTED_LOCALES', 'Brand & Features'));
```

### validateBoolean

Validates a boolean environment variable.

```typescript
validateBoolean(varName: string, category: string, isRequired?: boolean, defaultValue?: string): ValidationResult
```

**Features:**
- Validates that value is "true" or "false" (case-insensitive)
- Can be required or optional
- Can specify a default value message

**Example:**
```typescript
results.push(validateBoolean('DB_SSL_CONNECTION', 'Database', false, 'Use Default (false)'));
```

### validateWebProtocol

Validates a web protocol (http or https).

```typescript
validateWebProtocol(varName?: string, category: string, isRequired?: boolean): ValidationResult
```

**Features:**
- Validates that value is "http" or "https" (case-insensitive)
- Defaults to validating `WEB_PROTOCOL`
- Can be required or optional

**Example:**
```typescript
results.push(validateWebProtocol('WEB_PROTOCOL', 'Web', true));
```

### validateLogLevel

Validates a log level against valid winston log levels.

```typescript
validateLogLevel(varName?: string, category: string, isRequired?: boolean, validLevels?: string[]): ValidationResult
```

**Features:**
- Validates against winston log levels by default: `['error', 'warn', 'info', 'debug', 'verbose', 'silly', 'silent']`
- Can specify custom valid levels
- Defaults to validating `LOG_LEVEL`
- Can be required or optional

**Example:**
```typescript
results.push(validateLogLevel('LOG_LEVEL', 'General', false));
```

### validatePositiveNumber

Validates a positive number with optional min/max constraints.

```typescript
validatePositiveNumber(varName: string, category: string, isRequired?: boolean, min?: number, max?: number): ValidationResult
```

**Features:**
- Validates that value is a positive number
- Can specify minimum value (default: 1)
- Can specify maximum value (optional)
- Can be required or optional

**Example:**
```typescript
results.push(validatePositiveNumber('POLLING_INTERVAL_MS', 'Features', false, 100, 10000));
```

### validateOptionalNonEmpty

Validates an optional variable that, if set, must not be empty.

```typescript
validateOptionalNonEmpty(varName: string, category: string): ValidationResult
```

**Features:**
- Variable is optional (valid if not set)
- If set, must not be empty or whitespace-only
- Useful for optional variables that need a value when provided

**Example:**
```typescript
results.push(validateOptionalNonEmpty('OPTIONAL_API_KEY', 'API'));
```

## Helper Functions

### getAllAvailableOrListMessage

Generates a validation error message for variables that accept "all-available" or comma-delimited list.

```typescript
getAllAvailableOrListMessage(validValues: string[]): string
```

**Example:**
```typescript
const message = getAllAvailableOrListMessage(['dark', 'light', 'dracula']);
// Returns: 'must be "all-available" or comma-delimited list (valid values: dark, light, dracula)'
```

### displayValidationResultsSilent

Displays validation results silently - only logs failures.

```typescript
displayValidationResultsSilent(summary: ValidationSummary): void
```

**Features:**
- Only logs if there are failures
- Intended for modules (not apps) that should not show validation output unless there are errors
- Groups failures by category
- Displays summary of failures

## Automatic Validations

### Numeric Validation

Variables containing `PORT`, `EXPIRATION`, or `CACHE_TTL` are automatically validated as positive numbers by:
- `validateRequired()`
- `validateOptional()`
- `validateConditionalOptional()`

**Examples:**
- `DB_PORT` - Automatically validated as number
- `VERIFY_EMAIL_TOKEN_EXPIRATION` - Automatically validated as number
- `KEYVALDB_CACHE_TTL_SECONDS` - Automatically validated as number

### Special Validations

- **`API_ALLOWED_CORS_ORIGINS`**: Validated by `validateRequired()` to ensure it contains at least one origin (comma-separated)

## Usage Pattern

The typical pattern for validating environment variables:

```typescript
import { ValidationResult, ValidationSummary, validateRequired, validateOptional } from 'podverse-helpers';

const validateAllEnvironmentVariables = (): ValidationSummary => {
  const results: ValidationResult[] = [];
  
  // Required variables
  results.push(validateRequired('DB_HOST', 'Database'));
  results.push(validateRequired('API_PORT', 'API'));
  
  // Optional variables
  results.push(validateOptional('LOG_LEVEL', 'General'));
  results.push(validateOptional('DB_SSL_CONNECTION', 'Database', 'Use Default (false)'));
  
  // Specialized validations
  results.push(validateLocale('DEFAULT_LOCALE', 'General', true));
  results.push(validateBoolean('FEATURE_ENABLED', 'Features', false));
  
  // Calculate summary
  const total = results.length;
  const passed = results.filter(r => r.isValid && r.isSet).length;
  const failed = results.filter(r => !r.isValid).length;
  const requiredMissing = results.filter(r => r.isRequired && !r.isValid).length;
  const skipped = results.filter(r => !r.isRequired && !r.isSet && r.message === 'Skipped').length;
  const defaultsUsed = results.filter(r => r.isValid && r.isSet && (r.message.includes('Use Default') || r.message === 'Blank')).length;

  return {
    total,
    passed,
    failed,
    requiredMissing,
    skipped,
    defaultsUsed,
    results
  };
};
```

## Best Practices

1. **Use categories**: Group related variables with the same category for better display
2. **Provide default messages**: Use descriptive default messages for optional variables (e.g., "Use Default (false)")
3. **Validate early**: Run validation at application startup before initializing services
4. **Handle failures**: Abort startup if `requiredMissing > 0`
5. **Display results**: Show validation results to help developers identify configuration issues
6. **Use specialized functions**: Use `validateLocale`, `validateBoolean`, etc. for type-specific validation
7. **Leverage automatic validation**: Variables with `PORT`, `EXPIRATION`, or `CACHE_TTL` are automatically validated as numbers

## Related Files

- **Validation implementation**: `src/lib/validation/startupValidation.ts`
- **Supported locales**: `src/lib/constants/locales.ts`
