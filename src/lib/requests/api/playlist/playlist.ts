import { ApiListResponse } from "../..";
import { DTOPlaylist, DTOPlaylistFavorites } from "../../../../dtos";
import { ApiRequestService } from "../_request";
import { QueryParamsPlaylists } from "../queryParams";

export async function reqPlaylistGet(
  api: ApiRequestService,
  id_text: string
) {
  return api.apiRequest<DTOPlaylist>({
    path: `/playlist/${id_text}`,
    method: 'GET',
    config: {
      withCredentials: true
    }
  });
}

export async function reqPlaylistGetManyPublic(
  api: ApiRequestService,
  params: QueryParamsPlaylists
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
  params: QueryParamsPlaylists
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
  params: QueryParamsPlaylists
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

export type ReqPlaylistCreateParams = {
  title: string;
  description?: string;
  medium_id: number;
  sharable_status_id: number;
}

export async function reqPlaylistCreate(api: ApiRequestService, params: ReqPlaylistCreateParams) {
  return api.apiRequest<DTOPlaylist>({
    path: '/playlist',
    method: 'POST',
    config: {
      withCredentials: true,
    },
    data: params
  });
}

export type ReqPlaylistEditParams = {
  id_text: string;
  title: string;
  description?: string;
  medium_id: number;
  sharable_status_id: number;
}

export async function reqPlaylistEdit(api: ApiRequestService, params: ReqPlaylistEditParams) {
  return api.apiRequest<DTOPlaylist>({
    path: `/playlist/${params.id_text}`,
    method: 'PATCH',
    config: {
      withCredentials: true,
    },
    data: {
      title: params.title,
      description: params.description,
      medium_id: params.medium_id,
      sharable_status_id: params.sharable_status_id
    }
  });
}

export async function reqPlaylistDelete(api: ApiRequestService, id_text: string) {
  return api.apiRequest<void>({
    path: `/playlist/${id_text}`,
    method: 'DELETE',
    config: {
      withCredentials: true
    }
  });
}
