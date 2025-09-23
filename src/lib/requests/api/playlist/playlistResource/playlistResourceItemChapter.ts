import { DTOPlaylistResource } from "src/dtos";
import { ApiRequestService } from "../../_request";

export async function reqPlaylistResourceItemChapterAddFirst(
  api: ApiRequestService,
  playlist_id_text: string,
  item_chapter_id_text: string
) {
  return api.apiRequest<DTOPlaylistResource>({
    path: `/playlist/${playlist_id_text}/item-chapter/${item_chapter_id_text}/first`,
    method: 'POST',
    config: {
      withCredentials: true
    }
  });
}

export async function reqPlaylistResourceItemChapterAddBetween(
  api: ApiRequestService,
  playlist_id_text: string,
  item_chapter_id_text: string
) {
  return api.apiRequest<DTOPlaylistResource>({
    path: `/playlist/${playlist_id_text}/item-chapter/${item_chapter_id_text}/between`,
    method: 'POST',
    config: {
      withCredentials: true
    }
  });
}

export async function reqPlaylistResourceItemChapterAddLast(
  api: ApiRequestService,
  playlist_id_text: string,
  item_chapter_id_text: string
) {
  return api.apiRequest<DTOPlaylistResource>({
    path: `/playlist/${playlist_id_text}/item-chapter/${item_chapter_id_text}/last`,
    method: 'POST',
    config: {
      withCredentials: true
    }
  });
}
