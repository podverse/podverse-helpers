import { DTOAccountFCMDevice } from 'src/dtos';
import { ApiRequestService } from '../../_request';
export async function reqAccountFCMDeviceCreate(api: ApiRequestService, params: { fcm_token: string; installation_id: string }) {
  return api.apiRequest<DTOAccountFCMDevice>({
    path: '/account/fcm-device/create',
    method: 'POST',
    data: params,
    config: { withCredentials: true }
  });
}

export async function reqAccountFCMDeviceUpdate(api: ApiRequestService, params: { previous_fcm_token: string; new_fcm_token: string; installation_id: string }) {
  return api.apiRequest<DTOAccountFCMDevice>({
    path: '/account/fcm-device/update',
    method: 'PUT',
    data: params,
    config: { withCredentials: true }
  });
}

export async function reqAccountFCMDeviceDelete(api: ApiRequestService, params: { fcm_token?: string; installation_id?: string }) {
  return api.apiRequest<void>({
    path: '/account/fcm-device/delete',
    method: 'DELETE',
    data: params,
    config: { withCredentials: true }
  });
}

export async function reqAccountFCMDeviceGetAllForAccount(api: ApiRequestService) {
  return api.apiRequest<DTOAccountFCMDevice[]>({
    path: '/account/fcm-device/all-for-account',
    method: 'GET',
    config: { withCredentials: true }
  });
}
