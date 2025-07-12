export interface CreateAccountData {
  email: string;
  password: string;
}

export interface UpdateAccountData {
  display_name?: string;
  bio?: string;
  sharable_status?: number;
}

export interface SendVerificationEmailData {
  email: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface SendEmailChangeVerificationEmailData {
  new_email: string;
}

export interface VerifyEmailChangeData {
  token: string;
}

export interface SendResetPasswordEmailData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface CreateFCMDeviceData {
  fcm_token: string;
}

export interface UpdateFCMDeviceData {
  previous_fcm_token: string;
  new_fcm_token: string;
}

export interface DeleteFCMDeviceData {
  account_id: string;
  fcm_token: string;
}

export interface FollowAccountData {
  following_account_id_text: string;
}

export interface UnfollowAccountData {
  following_account_id_text: string;
}

export interface AddOrUpdateRSSChannelData {
  feed_url: string;
  title?: string | null;
  image_url?: string | null;
}

export interface RemoveRSSChannelData {
  feed_url: string;
}

export interface FollowChannelData {
  channel_id_text: string;
}

export interface UnfollowChannelData {
  channel_id_text: string;
}

export interface FollowPlaylistData {
  playlist_id_text: string;
}

export interface UnfollowPlaylistData {
  playlist_id_text: string;
}

export interface CreateNotificationChannelData {
  channel_id_text: string;
  type?: string;
  endpoint?: string;
}

export interface DeleteNotificationChannelData {
  channel_id_text: string;
}
