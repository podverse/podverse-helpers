import { ApiRequestService } from '../_request';
import { DTOPodroll } from 'src/dtos';

export async function reqPodrollGetForChannel(
  api: ApiRequestService,
  idOrIdText: string
) {
  return api.apiRequest<DTOPodroll>({
    path: `/podroll/channel/${idOrIdText}`,
    method: 'GET'
  });
}
