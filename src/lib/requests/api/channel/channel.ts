import { ApiRequestService } from '../_request';
import { ApiListResponse } from '../_response';
import { DTOChannel } from 'src/dtos';
import { QueryParamsChannels } from '../queryParams';

export async function reqChannelGetMany(
  api: ApiRequestService,
  params: QueryParamsChannels = {}
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

export async function reqChannelGetByIdOrIdText(
  api: ApiRequestService,
  idOrIdText: number | string
) {
  return api.apiRequest<DTOChannel>({
    path: `/channel/${idOrIdText}`,
    method: 'GET'
  });
}

export async function reqChannelGetByPodcastIndexId(
  api: ApiRequestService,
  podcastIndexId: number | string
) {
  return api.apiRequest<DTOChannel>({
    path: `/channel/podcast-index/${podcastIndexId}`,
    method: 'GET'
  });
}
