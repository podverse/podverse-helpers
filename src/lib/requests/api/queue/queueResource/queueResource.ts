import { ApiListResponse } from "../..";
import { DTOQueueResource } from "../../../../../dtos";
import { ApiRequestService } from "../../_request";

export async function reqQueueGetNowPlayingByQueueIdText(
  api: ApiRequestService,
  params: { queue_id_text: string }
) {
  return api.apiRequest<DTOQueueResource>({
    path: `/queue/${params.queue_id_text}/resources/now-playing`,
    method: 'GET',
    config: {
      withCredentials: true
    }
  });
}

export async function reqQueueGetAllUpcomingByQueueIdText(
  api: ApiRequestService,
  params: { queue_id_text: string }
) {
  return api.apiRequest<DTOQueueResource[]>({
    path: `/queue/${params.queue_id_text}/resources/upcoming-all`,
    method: 'GET',
    config: {
      withCredentials: true
    }
  });
}

export async function reqQueueGetHistoryByQueueIdTextPaginated(
  api: ApiRequestService,
  params: { queue_id_text: string; page?: number; }
) {
  return api.apiRequest<ApiListResponse<DTOQueueResource>>({
    path: `/queue/${params.queue_id_text}/resources/history-paginated`,
    method: 'GET',
    config: {
      params: {
        ...(params.page ? { page: params.page } : {})
      },
      withCredentials: true
    }
  });
}
