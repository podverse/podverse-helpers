
import { request } from '../../request';

const API_BASE = '/api/v1/account';

export type AbortOpts = { controller: AbortController; timeoutMs: number };

export interface ApiRequestParams {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: unknown;
  config?: Record<string, unknown>;
  abort?: AbortOpts;
}

export function apiRequest({ path, method = 'GET', data, config = {}, abort }: ApiRequestParams) {
  return request(
    `${API_BASE}${path}`,
    method === 'GET' || method === 'DELETE'
      ? { method, ...config, ...(data ? { data } : {}) }
      : { method, data, ...config },
    abort
  );
}