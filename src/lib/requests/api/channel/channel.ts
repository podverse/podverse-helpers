import { ApiRequestService } from '../_request';
import { ApiListResponse } from '../_response';
import { DTOChannel } from 'src/dtos';

export async function reqChannelGetMany(
  api: ApiRequestService,
  params: { page?: number, sort?: "recent" | "oldest" } = {}
) {
  return api.apiRequest<ApiListResponse<DTOChannel>>({
    path: '/channel',
    method: 'GET',
    config: {
      params: {
        ...(params.page ? { page: params.page } : {}),
        ...(params.sort ? { sort: params.sort } : {})
      }
    }
  });
}