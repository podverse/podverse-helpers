
import { ApiRequestService } from '../_request';
import { ApiListResponse } from '../_response';
import { DTOChannel } from 'src/dtos';

export interface ReqChannelGetManyParams {
  page?: number;
  sort?: "recent" | "oldest" | "alphabetical" | "top";
  type?: string;
  range?: string;
}

export async function reqChannelGetMany(
  api: ApiRequestService,
  params: ReqChannelGetManyParams = {}
) {
  return api.apiRequest<ApiListResponse<DTOChannel>>({
    path: '/channel',
    method: 'GET',
    config: {
      params: {
        ...(params.page ? { page: params.page } : {}),
        ...(params.sort ? { sort: params.sort } : {}),
        ...(params.type ? { type: params.type } : {}),
        ...(params.range ? { range: params.range } : {})
      }
    }
  });
}