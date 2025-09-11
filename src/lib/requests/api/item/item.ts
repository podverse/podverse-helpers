import { ApiRequestService } from '../_request';
import { ApiListResponse } from '../_response';
import { DTOChannel, DTOItem } from 'src/dtos';
import { QueryParamsChannels } from '../queryParams';

export async function reqItemGetMany(
  api: ApiRequestService,
  params: QueryParamsChannels = {}
) {
  return api.apiRequest<ApiListResponse<DTOChannel>>({
    path: '/item',
    method: 'GET',
    config: {
      params: {
        ...(params.page ? { page: params.page } : {}),
        ...(params.sort ? { sort: params.sort } : {}),
        ...(params.type ? { type: params.type } : {}),
        ...(params.range ? { range: params.range } : {}),
        ...(params.category ? { category: params.category } : {}),
        // ...(params.medium ? { medium: params.medium } : {})
      },
      withCredentials: true
    }
  });
}

export async function reqItemGetByIdOrIdText(
  api: ApiRequestService,
  idOrIdText: string
) {
  return api.apiRequest<DTOItem>({
    path: `/item/${idOrIdText}`,
    method: 'GET'
  });
}

export async function reqItemGetManyWithoutLiveItemByChannel(api: ApiRequestService, channel_id: string) {
  return api.apiRequest<ApiListResponse<DTOItem>>({
    path: `/item/channel/${channel_id}`,
    method: 'GET'
  });
}
