import { DTOPlaylistFavorites } from "../../../../dtos";
import { ApiRequestService } from "../_request";

export async function reqPlaylistGetAllFavoritesPrivate(api: ApiRequestService) {
  return api.apiRequest<DTOPlaylistFavorites[]>({
    path: '/playlist/private/favorites',
    method: 'GET',
    config: {
      withCredentials: true
    }
  });
}
