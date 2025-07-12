
import { apiRequest, ApiRequestParams } from "../_request";
import {
  CreateAccountData,
  UpdateAccountData,
  SendVerificationEmailData,
  VerifyEmailData,
  SendEmailChangeVerificationEmailData,
  VerifyEmailChangeData,
  SendResetPasswordEmailData,
  ResetPasswordData,
  CreateFCMDeviceData,
  UpdateFCMDeviceData,
  DeleteFCMDeviceData,
  FollowAccountData,
  UnfollowAccountData,
  AddOrUpdateRSSChannelData,
  RemoveRSSChannelData,
  FollowChannelData,
  UnfollowChannelData,
  FollowPlaylistData,
  UnfollowPlaylistData,
  CreateNotificationChannelData,
  DeleteNotificationChannelData
} from "./account.types";

export const getManyPublicAccounts = (params: Omit<ApiRequestParams, 'path' | 'method' | 'data'> = {}) =>
  apiRequest({ path: '/', method: 'GET', ...params });

export const getAccountByIdText = (id_text: string, params: Omit<ApiRequestParams, 'path' | 'method' | 'data'> = {}) =>
  apiRequest({ path: `/${id_text}`, method: 'GET', ...params });

export const createAccount = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: CreateAccountData }) =>
  apiRequest({ path: '/', method: 'POST', ...params });

export const updateAccount = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: UpdateAccountData }) =>
  apiRequest({ path: '/', method: 'PUT', ...params });

export const sendVerificationEmail = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: SendVerificationEmailData }) =>
  apiRequest({ path: '/send-verification-email', method: 'POST', ...params });

export const verifyEmail = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: VerifyEmailData }) =>
  apiRequest({ path: '/verify-email', method: 'POST', ...params });

export const sendEmailChangeVerificationEmail = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: SendEmailChangeVerificationEmailData }) =>
  apiRequest({ path: '/send-email-change-verification-email', method: 'POST', ...params });

export const verifyEmailChange = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: VerifyEmailChangeData }) =>
  apiRequest({ path: '/verify-email-change', method: 'POST', ...params });

export const sendResetPasswordEmail = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: SendResetPasswordEmailData }) =>
  apiRequest({ path: '/send-reset-password-email', method: 'POST', ...params });

export const resetPassword = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: ResetPasswordData }) =>
  apiRequest({ path: '/reset-password', method: 'POST', ...params });

export const deleteAccount = (params: Omit<ApiRequestParams, 'path' | 'method' | 'data'> = {}) =>
  apiRequest({ path: '/delete', method: 'DELETE', ...params });

export const createFCMDevice = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: CreateFCMDeviceData }) =>
  apiRequest({ path: '/fcm-device/create', method: 'POST', ...params });
export const updateFCMDevice = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: UpdateFCMDeviceData }) =>
  apiRequest({ path: '/fcm-device/update', method: 'PUT', ...params });
export const deleteFCMDevice = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: DeleteFCMDeviceData }) =>
  apiRequest({ path: '/fcm-device/delete', method: 'DELETE', ...params });

export const followAccount = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: FollowAccountData }) =>
  apiRequest({ path: '/follow/account', method: 'POST', ...params });
export const unfollowAccount = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: UnfollowAccountData }) =>
  apiRequest({ path: '/unfollow/account', method: 'POST', ...params });
export const getFollowedAccounts = (account_id_text: string, params: Omit<ApiRequestParams, 'path' | 'method' | 'data'> = {}) =>
  apiRequest({ path: `/${account_id_text}/followed/accounts`, method: 'GET', ...params });

export const addOrUpdateRSSChannel = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: AddOrUpdateRSSChannelData }) =>
  apiRequest({ path: '/follow/add-by-rss-channel', method: 'POST', ...params });
export const removeRSSChannel = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: RemoveRSSChannelData }) =>
  apiRequest({ path: '/unfollow/add-by-rss-channel', method: 'POST', ...params });
export const getFollowedAddByRSSChannels = (account_id_text: string, params: Omit<ApiRequestParams, 'path' | 'method' | 'data'> = {}) =>
  apiRequest({ path: `/${account_id_text}/followed/add-by-rss-channels`, method: 'GET', ...params });

export const followChannel = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: FollowChannelData }) =>
  apiRequest({ path: '/follow/channel', method: 'POST', ...params });
export const unfollowChannel = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: UnfollowChannelData }) =>
  apiRequest({ path: '/unfollow/channel', method: 'POST', ...params });
export const getFollowedChannels = (account_id_text: string, params: Omit<ApiRequestParams, 'path' | 'method' | 'data'> = {}) =>
  apiRequest({ path: `/${account_id_text}/followed/channels`, method: 'GET', ...params });

export const followPlaylist = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: FollowPlaylistData }) =>
  apiRequest({ path: '/follow/playlist', method: 'POST', ...params });
export const unfollowPlaylist = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: UnfollowPlaylistData }) =>
  apiRequest({ path: '/unfollow/playlist', method: 'POST', ...params });
export const getFollowedPlaylists = (account_id_text: string, params: Omit<ApiRequestParams, 'path' | 'method' | 'data'> = {}) =>
  apiRequest({ path: `/${account_id_text}/followed/playlists`, method: 'GET', ...params });

export const getNotificationChannel = (channel_id_text: string, params: Omit<ApiRequestParams, 'path' | 'method' | 'data'> = {}) =>
  apiRequest({ path: `/notification/channel/${channel_id_text}`, method: 'GET', ...params });
export const getNotificationChannels = (params: Omit<ApiRequestParams, 'path' | 'method' | 'data'> = {}) =>
  apiRequest({ path: '/notification/channels', method: 'GET', ...params });
export const createNotificationChannel = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: CreateNotificationChannelData }) =>
  apiRequest({ path: '/notification/channel', method: 'POST', ...params });
export const deleteNotificationChannel = (params: Omit<ApiRequestParams, 'path' | 'method'> & { data: DeleteNotificationChannelData }) =>
  apiRequest({ path: '/notification/channel', method: 'DELETE', ...params });
