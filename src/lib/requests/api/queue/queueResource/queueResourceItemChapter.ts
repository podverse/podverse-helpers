import { ApiRequestService } from "../../_request";
import { DTOQueueResource } from "../../../../../dtos";
import { BetweenParams } from "../../../../../dtos/betweenParams";
import { QueueExtraParams } from "../../../../../dtos/queueExtraParams";

export async function reqQueueResourceItemChapterAddNowPlaying(
  api: ApiRequestService,
  queue_id_text: string,
  item_chapter_id_text: string,
  params?: QueueExtraParams
) {
  return api.apiRequest<DTOQueueResource>({
    path: `/queue/${queue_id_text}/item-chapter/${item_chapter_id_text}/now-playing`,
    method: 'POST',
    config: {
      withCredentials: true
    },
    data: params
  });
}

export async function reqQueueResourceItemChapterAddNext(
  api: ApiRequestService,
  queue_id_text: string,
  item_chapter_id_text: string
) {
  return api.apiRequest<DTOQueueResource>({
    path: `/queue/${queue_id_text}/item-chapter/${item_chapter_id_text}/next`,
    method: 'POST',
    config: {
      withCredentials: true
    }
  });
}

export async function reqQueueResourceItemChapterAddBetween(
  api: ApiRequestService,
  queue_id_text: string,
  item_chapter_id_text: string,
  params: BetweenParams
) {
  return api.apiRequest<DTOQueueResource>({
    path: `/queue/${queue_id_text}/item-chapter/${item_chapter_id_text}/between`,
    method: 'POST',
    config: {
      withCredentials: true
    },
    data: params
  });
}

export async function reqQueueResourceItemChapterAddLast(
  api: ApiRequestService,
  queue_id_text: string,
  item_chapter_id_text: string
) {
  return api.apiRequest<DTOQueueResource>({
    path: `/queue/${queue_id_text}/item-chapter/${item_chapter_id_text}/last`,
    method: 'POST',
    config: {
      withCredentials: true
    }
  });
}

export async function reqQueueResourceItemChapterAddHistory(
  api: ApiRequestService,
  queue_id_text: string,
  item_chapter_id_text: string,
  params?: QueueExtraParams
) {
  return api.apiRequest<DTOQueueResource>({
    path: `/queue/${queue_id_text}/item-chapter/${item_chapter_id_text}/history`,
    method: 'POST',
    config: {
      withCredentials: true
    },
    data: params
  });
}
