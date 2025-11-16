import { SearchPodcastsResponse } from "src/dtos";
import { ApiRequestService } from "../_request";

export async function reqSearchPodcasts(
  api: ApiRequestService,
  options: {
    q: string;
  }
) {
  return api.apiRequest<SearchPodcastsResponse>({
    path: `/search/podcast-index/podcasts?q=${encodeURIComponent(options.q)}`,
    method: 'GET'
  });
}
