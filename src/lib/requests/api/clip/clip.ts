import { DTOClip } from "../../../../dtos";
import { ApiRequestService } from "../_request";
import { ApiListResponse } from "../_response";
import { QueryParamsClipsByChannel } from "../queryParams";

export type ReqClipCreateParams = {
  item_id_text: string;
  sharable_status_id: number;
  title?: string | null;
  description?: string | null;
  start_time: string;
  end_time?: string | null;
}

export async function reqClipCreate(api: ApiRequestService, params: ReqClipCreateParams) {
  return api.apiRequest<DTOClip>({
    path: '/clip',
    method: 'POST',
    config: {
      withCredentials: true,
    },
    data: params
  });
}

export async function reqClipUpdate(
  api: ApiRequestService,
  clip_id_text: string,
  params: ReqClipCreateParams
) {
  return api.apiRequest<DTOClip>({
    path: `/clip/${clip_id_text}`,
    method: 'PATCH',
    config: {
      withCredentials: true,
    },
    data: params
  });
}

export async function reqClipDelete(
  api: ApiRequestService,
  clip_id_text: string
) {
  return api.apiRequest<{ success: boolean }>({
    path: `/clip/${clip_id_text}`,
    method: 'DELETE',
    config: {
      withCredentials: true,
    }
  });
}

export async function reqClipGet(api: ApiRequestService, clip_id_text: string) {
  return api.apiRequest<DTOClip>({
    path: `/clip/${clip_id_text}`,
    method: 'GET',
    config: {
      withCredentials: true,
    }
  });
}

export async function reqClipGetManyByChannelIdTextPublic(
  api: ApiRequestService,
  channel_id_text: string,
  params: QueryParamsClipsByChannel
) {
  return api.apiRequest<ApiListResponse<DTOClip>>({
    path: `/clip/public/channel/${channel_id_text}`,
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

export async function reqClipGetManyByItemIdTextPublic(
  api: ApiRequestService,
  item_id_text: string,
  params: QueryParamsClipsByChannel
) {
  return api.apiRequest<ApiListResponse<DTOClip>>({
    path: `/clip/public/item/${item_id_text}`,
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
