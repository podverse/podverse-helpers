import { ApiRequestService } from '../_request';
import { ApiListResponse } from '../_response';
import { DTOChannel, DTOItem, DTOItemChapter, DTOItemQueueItem } from 'src/dtos';
import { QueryParamsChannel, QueryParamsChannels } from '../queryParams';

export async function reqItemGetMany(
  api: ApiRequestService,
  params: QueryParamsChannels
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
        medium: params.medium
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

export async function reqItemGetManyWithoutLiveItemByChannel(
  api: ApiRequestService,
  channelIdOrIdText: string,
  params: QueryParamsChannel = {}
) {
  return api.apiRequest<ApiListResponse<DTOItem>>({
    path: `/item/channel/${channelIdOrIdText}`,
    method: 'GET',
    config: {
      params: {
        ...(params.page ? { page: params.page } : {}),
        ...(params.sort ? { sort: params.sort } : {}),
        ...(params.range ? { range: params.range } : {})
      },
      withCredentials: true
    }
  });
}

export async function reqItemGetManyForQueueByPubDate(
  api: ApiRequestService,
  idText: string,
  direction: 'forward' | 'backward'
) {
  return api.apiRequest<DTOItemQueueItem[]>({
    path: `/item/queue/pub-date/${idText}`,
    method: 'GET',
    config: {
      params: {
        direction
      }
    }
  });
}

export async function reqItemParseAndGetChapters(
  api: ApiRequestService,
  item_id_text: string
) {
  return api.apiRequest<ApiListResponse<DTOItemChapter>>({
    path: `/item/chapters/${item_id_text}/`,
    method: 'GET'
  });
}
