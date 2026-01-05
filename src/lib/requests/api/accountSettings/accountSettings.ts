
import { DTOAccount } from 'src/dtos';
import { ApiRequestService } from '../_request';
import { reqAuthMe } from '../auth/auth';

type ReqNotificationTypeParams = {
	type: string;
};

export async function reqAccountSettingsNotificationTypeCreate(
  api: ApiRequestService,
  params: ReqNotificationTypeParams
): Promise<DTOAccount> {
  await api.apiRequest({
    path: '/account-settings/notification-type',
    method: 'POST',
    data: {
      type: params.type,
    },
    config: {
      withCredentials: true,
    },
  });

  return reqAuthMe(api);
}

export async function reqAccountSettingsNotificationTypeDelete(
  api: ApiRequestService,
  params: ReqNotificationTypeParams
): Promise<DTOAccount> {
  await api.apiRequest({
    path: "/account-settings/notification-type",
    method: 'DELETE',
    data: {
      type: params.type,
    },
    config: {
      withCredentials: true,
    },
  });

  return reqAuthMe(api);
}
