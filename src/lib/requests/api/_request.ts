import { request } from '../_request';
import { reqAccountGetManyPublic } from './account/account';
import { reqAuthLogin, reqAuthLogout, reqAuthMe } from './auth/auth';

export type AbortOpts = { controller: AbortController; timeoutMs: number };

export interface ApiRequestParams {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: unknown;
  config?: Record<string, unknown>;
  abort?: AbortOpts;
  userAgent?: string;
  jwt?: string;
}

export class ApiRequestService {
  private apiBase: string;
  private jwt?: string;

  constructor(params: {
    protocol: string;
    host: string;
    port?: string | number;
    prefix: string;
    version: string;
    jwt?: string;
  }) {
    const { protocol, host, port, prefix, version, jwt } = params;
    const portPart = port ? `:${port}` : '';
    this.apiBase = `${protocol}://${host}${portPart}${prefix.replace(/\/$/, '')}${version}`;
    this.jwt = jwt;
  }

  apiRequest<T>({ path, method = 'GET', data, config = {}, abort, userAgent }: ApiRequestParams): Promise<T> {
    const mergedConfig = {
      ...config,
      ...(userAgent ? { userAgent } : {}),
      ...(this.jwt ?
        {
          headers: {
            ...(config.headers || {}),
            Cookie: `jwt=${this.jwt}`,
          },
        }
        : {}),
    };
    
    const options =
      method === 'GET' || method === 'DELETE'
        ? { method, ...mergedConfig }
        : { method, data, ...mergedConfig };
    
    return request<T>(
      `${this.apiBase}${path}`,
      options,
      abort
    );
  }

  /* ACCOUNT */

  reqAccountGetManyPublic() {
    return reqAccountGetManyPublic(this);
  }
  
  /* AUTH */

  reqAuthLogin(params: {
    email: string;
    password: string;
    includeTokenInResponseBody?: boolean;
  }) {
    return reqAuthLogin(this, params);
  }

  reqAuthLogout() {
    return reqAuthLogout(this);
  }

  reqAuthMe() {
    return reqAuthMe(this);
  }
}
