import { ApiRequestService } from '../_request';
import { ApiListResponse } from '../_response';
import { DTOChannel } from 'src/dtos';
import { QueryParamChannels } from '../queryParams';

export async function reqChannelGetMany(
  api: ApiRequestService,
  params: QueryParamChannels = {}
) {
  return api.apiRequest<ApiListResponse<DTOChannel>>({
    path: '/channel',
    method: 'GET',
    config: {
      params: {
        ...(params.page ? { page: params.page } : {}),
        ...(params.sort ? { sort: params.sort } : {}),
        ...(params.type ? { type: params.type } : {}),
        ...(params.range ? { range: params.range } : {}),
        ...(params.category ? { category: params.category } : {})
      },
      withCredentials: true
    }
  });
}