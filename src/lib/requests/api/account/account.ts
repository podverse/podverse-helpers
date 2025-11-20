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

export async function reqAccountCreate(
  api: ApiRequestService,
  params: { email: string; password: string }
): Promise<{ message: string }> {
  return api.apiRequest<{ message: string }>({
    path: '/account',
    method: 'POST',
    data: params
  });
}

export async function reqAccountSendVerificationEmail(
  api: ApiRequestService,
  params: { email: string }
): Promise<{ message: string }> {
  return api.apiRequest<{ message: string }>({
    path: '/account/send-verification-email',
    method: 'POST',
    data: params
  });
}

export async function reqAccountVerifyEmail(
  api: ApiRequestService,
  params: { token: string }
): Promise<{ message: string }> {
  return api.apiRequest<{ message: string }>({
    path: '/account/verify-email',
    method: 'POST',
    data: params
  });
}

export async function reqAccountSendResetPasswordEmail(
  api: ApiRequestService,
  params: { email: string }
): Promise<{ message: string }> {
  return api.apiRequest<{ message: string }>({
    path: '/account/send-reset-password-email',
    method: 'POST',
    data: params
  });
}

export async function reqAccountResetPassword(
  api: ApiRequestService,
  params: { token: string; password: string }
): Promise<{ message: string }> {
  return api.apiRequest<{ message: string }>({
    path: '/account/reset-password',
    method: 'POST',
    data: params
  });
}
