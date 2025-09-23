import { DTOPlaylistResource } from "src/dtos";
import { ApiRequestService } from "../../_request";

export async function reqPlaylistResourceClipAddFirst(
  api: ApiRequestService,
  playlist_id_text: string,
  clip_id_text: string
) {
  return api.apiRequest<DTOPlaylistResource>({
    path: `/playlist/${playlist_id_text}/clip/${clip_id_text}/first`,
    method: 'POST',
    config: {
      withCredentials: true
    }
  });
}

export async function reqPlaylistResourceClipAddBetween(
  api: ApiRequestService,
  playlist_id_text: string,
  clip_id_text: string
) {
  return api.apiRequest<DTOPlaylistResource>({
    path: `/playlist/${playlist_id_text}/clip/${clip_id_text}/between`,
    method: 'POST',
    config: {
      withCredentials: true
    }
  });
}

export async function reqPlaylistResourceClipAddLast(
  api: ApiRequestService,
  playlist_id_text: string,
  clip_id_text: string
) {
  return api.apiRequest<DTOPlaylistResource>({
    path: `/playlist/${playlist_id_text}/clip/${clip_id_text}/last`,
    method: 'POST',
    config: {
      withCredentials: true
    }
  });
}
