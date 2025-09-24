import { DTOClip } from "../../../../dtos";
import { ApiRequestService } from "../_request";
import { ApiListResponse } from "../_response";
import { QueryParamsClipsByChannel } from "../queryParams";

export type ReqClipCreateParams = {
  item_id_text: string;
  sharable_status_id: number;
  title?: string | null;
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

export async function reqClipGetManyByChannelIdTextPublic(
  api: ApiRequestService,
  channel_id_text: string,
  params: QueryParamsClipsByChannel = {}
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
