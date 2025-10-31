import { ApiRequestService } from '../../_request';
import { DTOPlaylistResource } from '../../../../../dtos';
import { ApiListResponse } from '../../_response';
import { QueryParamsPlaylistResources } from '../../queryParams';

export async function reqPlaylistResourceGetAllByPlaylistIdTextPrivate(
  api: ApiRequestService,
  playlist_id_text: string
) {
  return api.apiRequest<DTOPlaylistResource[]>({
    path: `/playlist/${playlist_id_text}/resources/private-all`,
    method: 'GET',
    config: {
      withCredentials: true
    }
  });
}

export async function reqPlaylistResourceGetManyByPlaylistIdText(
  api: ApiRequestService,
  playlist_id_text: string,
  params: QueryParamsPlaylistResources = {}
) {
  return api.apiRequest<ApiListResponse<DTOPlaylistResource>>({
    path: `/playlist/${playlist_id_text}/resources`,
    method: 'GET',
    config: {
      withCredentials: true,
      params
    }
  });
}
