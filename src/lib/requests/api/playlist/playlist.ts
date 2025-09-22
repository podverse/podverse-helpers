import { ApiListResponse } from "../..";
import { DTOPlaylist, DTOPlaylistFavorites } from "../../../../dtos";
import { ApiRequestService } from "../_request";
import { QueryParamsPlaylists } from "../queryParams";

export async function reqPlaylistGetManyPublic(
  api: ApiRequestService,
  params: QueryParamsPlaylists = {}
) {
  return api.apiRequest<ApiListResponse<DTOPlaylist>>({
    path: '/playlist/public',
    method: 'GET',
    config: {
      params: {
        ...(params.page ? { page: params.page } : {}),
        ...(params.sort ? { sort: params.sort } : {}),
        ...(params.range ? { range: params.range } : {}),
        ...(params.medium_id ? { medium_id: params.medium_id } : {})
      }
    }
  });
}

export async function reqPlaylistGetManyPrivate(
  api: ApiRequestService,
  params: QueryParamsPlaylists = {}
) {
  return api.apiRequest<ApiListResponse<DTOPlaylist>>({
    path: '/playlist/private',
    method: 'GET',
    config: {
      withCredentials: true,
      params: {
        ...(params.page ? { page: params.page } : {}),
        ...(params.sort ? { sort: params.sort } : {}),
        ...(params.range ? { range: params.range } : {}),
        ...(params.medium_id ? { medium_id: params.medium_id } : {})
      }
    }
  });
}

export async function reqPlaylistGetManyPrivateFollowed(
  api: ApiRequestService,
  params: QueryParamsPlaylists = {}
) {
  return api.apiRequest<ApiListResponse<DTOPlaylist>>({
    path: '/playlist/private/followed',
    method: 'GET',
    config: {
      withCredentials: true,
      params: {
        ...(params.page ? { page: params.page } : {}),
        ...(params.sort ? { sort: params.sort } : {}),
        ...(params.range ? { range: params.range } : {}),
        ...(params.medium_id ? { medium_id: params.medium_id } : {})
      }
    }
  });
}

export async function reqPlaylistGetAllFavoritesPrivate(api: ApiRequestService) {
  return api.apiRequest<DTOPlaylistFavorites[]>({
    path: '/playlist/private/favorites',
    method: 'GET',
    config: {
      withCredentials: true
    }
  });
}
