import { request } from '../_request';
import { reqAccountGetManyPublic } from './account/account';
import { reqAuthCheckSession, reqAuthLogin, reqAuthLogout, reqAuthMe } from './auth/auth';
import { reqCategoryGetAll } from './category/category';
import { reqChannelGetByIdOrIdText, reqChannelGetMany } from './channel/channel';
import { reqItemGetByIdOrIdText, reqItemGetMany } from './item/item';
import { QueryParamsChannels } from './queryParams';

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

  async apiRequest<T>({ path, method = 'GET', data, config = {}, abort, userAgent }: ApiRequestParams): Promise<T> {
    try {
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

      const response = await request<T>(
        `${this.apiBase}${path}`,
        options,
        abort
      );
      return response.data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
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

  reqAuthCheckSession() {
    return reqAuthCheckSession(this);
  }

  /* CATEGORY */
  
  reqCategoryGetAll() {
    return reqCategoryGetAll(this);
  }

  /* CHANNEL */

  reqChannelGetByIdOrIdText(idOrIdText: string) {
    return reqChannelGetByIdOrIdText(this, idOrIdText);
  }

  reqChannelGetMany(params: QueryParamsChannels = {}) {
    return reqChannelGetMany(this, params);
  }

  /* ITEM */

  reqItemGetByIdOrIdText(idOrIdText: string) {
    return reqItemGetByIdOrIdText(this, idOrIdText);
  }

  reqItemGetMany(params: QueryParamsChannels = {}) {
    return reqItemGetMany(this, params);
  }
}

export type ApiRequestServiceMethod = {
  [K in keyof ApiRequestService]: ApiRequestService[K] extends (...args: unknown[]) => unknown ? ApiRequestService[K] : never;
}[keyof ApiRequestService];
