import { DTOQueue } from "../../../../dtos";
import { ApiRequestService } from "../_request";

export async function reqQueueGetAllForAccountPrivate(api: ApiRequestService) {
  return api.apiRequest<DTOQueue[]>({
    path: `/queue/all-for-account/private`,
    method: 'GET',
    config: {
      withCredentials: true
    }
  });
}
