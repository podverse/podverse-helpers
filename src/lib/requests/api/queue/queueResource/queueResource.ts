import { DTOQueue } from "../../../../../dtos";
import { ApiRequestService } from "../../_request";

export async function reqQueueGetAllNowPlayingOrUpcomingByQueueIdText(
  api: ApiRequestService,
  params: { queue_id_text: string }
) {
  return api.apiRequest<DTOQueue[]>({
    path: `/queue/${params.queue_id_text}/resources/now-playing-or-upcoming`,
    method: 'GET',
    config: {
      withCredentials: true
    }
  });
}