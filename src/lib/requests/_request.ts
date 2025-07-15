import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const request = async <T>(
  url: string,
  requestConfig?: AxiosRequestConfig,
  abort?: {
    controller: AbortController
    timeoutMs: number
  }
): Promise<T> => {
  // eslint-disable-next-line no-undef
  let timeoutId: NodeJS.Timeout | undefined;
  if (abort) {
    timeoutId = setTimeout(() => {
      abort.controller.abort();
    }, abort.timeoutMs);
  }
  
  try {
    const isJSONRequest =
      requestConfig?.method?.toUpperCase() === 'POST'
      || requestConfig?.method?.toUpperCase() === 'PUT';

    const response: AxiosResponse<T> = await axios.request<T>({
      url,
      method: 'GET',
      ...requestConfig,
      headers: {
        ...(isJSONRequest ? { 'Content-Type': 'application/json' } : {}),
        ...requestConfig?.headers
      },
      signal: abort?.controller?.signal,
    });
    return response.data;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

export const throwRequestError = (error: unknown): never => {
  if (error instanceof Error) {
    const errorWithStatusCode = error as ErrorWithStatusCode;
    if (errorWithStatusCode.statusCode) {
      throw new Error(`HTTP Error: ${errorWithStatusCode.statusCode} - ${error.message}`);
    } else {
      throw new Error(`Unknown Error: ${error.message}`);
    }
  } else {
    throw new Error('An unexpected error occurred');
  }
};
