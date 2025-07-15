import { ApiRequestService } from '../_request';
import { ApiListResponse } from '../_response';
import { DTOAccount } from '../../../../dtos/account/account';

export async function reqAccountGetManyPublic(
  api: ApiRequestService
): Promise<ApiListResponse<DTOAccount>> {
  return api.apiRequest<ApiListResponse<DTOAccount>>({
    path: '/account',
    method: 'GET'
  });
}
