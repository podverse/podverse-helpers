import { ApiRequestService } from '../_request';
import { DTOItem } from '../../../../dtos';

export async function reqLiveItemGetManyByChannel(
  api: ApiRequestService,
  channelIdOrIdText: string
) {
  return api.apiRequest<DTOItem[]>({
    path: `/live-item/channel/${channelIdOrIdText}`,
    method: 'GET'
  });
}
