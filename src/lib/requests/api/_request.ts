import { request } from '../_request';
import { config } from '../../../config';

function getApiBase(): string {
  const { protocol, host, port, prefix, version } = config.api;
  const portPart = port ? `:${port}` : '';
  return `${protocol}://${host}${portPart}${prefix.replace(/\/$/, '')}${version}`;
}

const API_BASE = getApiBase();

export type AbortOpts = { controller: AbortController; timeoutMs: number };

export interface ApiRequestParams {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: unknown;
  config?: Record<string, unknown>;
  abort?: AbortOpts;
}

export function apiRequest<T>({ path, method = 'GET', data, config = {}, abort }: ApiRequestParams): Promise<T> {
  console.log(`API Request: ${method} ${API_BASE}${path}`, { data, config, abort });
  const options =
    method === 'GET' || method === 'DELETE'
      ? { method, ...config }
      : { method, data, ...config };

  return request<T>(
    `${API_BASE}${path}`,
    options,
    abort
  );
}