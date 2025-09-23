import { DTOClip } from "../../../../dtos";
import { ApiRequestService } from "../_request";

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
