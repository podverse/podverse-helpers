import { QueueExtraParams } from '../../../dtos/queueExtraParams';
import { BetweenParams } from '../../../dtos/betweenParams';
import { request } from '../_request';
import { reqAccountChangeEmailAddress, reqAccountCreate, reqAccountGetManyPublic, reqAccountResetPassword,
  reqAccountSendChangeEmailAddressEmail, reqAccountSendResetPasswordEmail, reqAccountSendVerificationEmail,
  reqAccountVerifyEmail } from './account/account';
import { reqAccountFollowChannel, reqAccountUnfollowChannel } from './account/follow/channel';
import { reqAccountFollowPlaylist, reqAccountUnfollowPlaylist } from './account/follow/playlist';
import { reqAuthCheckSession, reqAuthLogin, reqAuthLogout, reqAuthMe } from './auth/auth';
import { reqCategoryGetAll } from './category/category';
import { reqChannelGetByIdOrIdText, reqChannelGetByPodcastIndexId, reqChannelGetMany } from './channel/channel';
import { reqClipCreate, ReqClipCreateParams, reqClipDelete, reqClipGet,
  reqClipGetManyByChannelPublic, reqClipGetManyByItemPublic, reqClipGetManyPublic,
  reqClipUpdate } from './clip/clip';
import { reqItemGetByIdOrIdText, reqItemGetMany, reqItemGetManyByChannel, reqItemGetManyByChannelBySeason,
  reqItemGetManyByChannelShuffle, reqItemGetManyForQueueByPubDate, reqItemGetManyForQueueBySeason,
  reqItemParseAndGetChapters } from './item/item';
import { reqPlaylistCreate, ReqPlaylistCreateParams, reqPlaylistDelete, reqPlaylistEdit, ReqPlaylistEditParams,
  reqPlaylistGet, reqPlaylistGetAllFavoritesPrivate, reqPlaylistGetMany } from './playlist/playlist';
import { reqPlaylistResourceClipAddBetween, reqPlaylistResourceClipAddFirst, reqPlaylistResourceClipAddLast,
  reqPlaylistResourceClipDelete } from './playlist/playlistResource/playlistResourceClip';
import { reqPlaylistResourceItemAddFirst, reqPlaylistResourceItemAddBetween,
  reqPlaylistResourceItemAddLast, 
  reqPlaylistResourceItemDelete} from './playlist/playlistResource/playlistResourceItem';
import { reqPodrollGetForChannel } from './podroll/podroll';
import { QueryDirection, QueryParamsGetMany, QueryParamsGetManyPartial, QueryParamsIndividualList,
  QueryParamsIndividualListMusic,
  QueryParamsItemSoundbitesByChannel, QueryParamsItemSoundbitesByItem, QueryParamsPage, QueryParamsPlaylistResources,
  QueryParamsPlaylists, 
  QueryParamsShuffle} from './queryParams';
import { reqQueueGetAllForAccountPrivate, reqQueueUpdateIsActiveQueue } from './queue/queue';
import { reqQueueResourceItemAddBetween, reqQueueResourceItemAddHistory,
  reqQueueResourceItemAddLast, reqQueueResourceItemAddNext,
  reqQueueResourceItemAddNowPlaying, reqQueueResourceItemDelete } from './queue/queueResource/queueResourceItem';
import { reqQueueResourceClipAddBetween, reqQueueResourceClipAddHistory,
  reqQueueResourceClipAddLast, reqQueueResourceClipAddNext,
  reqQueueResourceClipAddNowPlaying, reqQueueResourceClipDelete } from './queue/queueResource/queueResourceClip';
import { reqQueueResourceItemAddByRSSAddBetween, reqQueueResourceItemAddByRSSAddHistory,
  reqQueueResourceItemAddByRSSAddLast, reqQueueResourceItemAddByRSSAddNext,
  reqQueueResourceItemAddByRSSAddNowPlaying, reqQueueResourceItemAddByRSSDelete
} from './queue/queueResource/queueResourceItemAddByRSS';
import { reqQueueResourceItemSoundbiteAddBetween, reqQueueResourceItemSoundbiteAddHistory,
  reqQueueResourceItemSoundbiteAddLast, reqQueueResourceItemSoundbiteAddNext,
  reqQueueResourceItemSoundbiteAddNowPlaying, reqQueueResourceItemSoundbiteDelete
} from './queue/queueResource/queueResourceItemSoundbite';
import { reqItemSoundbiteGet, reqItemSoundbiteGetManyByChannelIdText,
  reqItemSoundbiteGetManyByItemIdText } from './itemSoundbite/itemSoundbite';
import { reqItemTranscriptGet } from './itemTranscript/itemTranscript';
import { reqQueueResourcesGetAllByAccountAbridged, reqQueueResourcesGetAllUpcomingByQueueIdText,
  reqQueueResourcesGetHistoryByQueueIdTextPaginated, reqQueueResourcesGetNowPlayingByQueueIdText
} from './queue/queueResource/queueResource';
import { reqItemChapterGetByIdText } from './itemChapter/itemChapter';
import { reqPlaylistResourceItemSoundbiteAddFirst, reqPlaylistResourceItemSoundbiteAddLast,
  reqPlaylistResourceItemSoundbiteAddBetween, 
  reqPlaylistResourceItemSoundbiteDelete } from './playlist/playlistResource/playlistResourceItemSoundbite';
import { reqPlaylistResourceGetAllByPlaylistIdTextPrivate,
  reqPlaylistResourceGetManyByPlaylistIdText } from './playlist/playlistResource/playlistResource';
import { reqLiveItemGetMany, reqLiveItemGetManyByChannel } from './liveItem/liveItem';
import { reqPodcastIndexFeedById, reqPodcastIndexSearchPodcasts } from './externalServices/podcastIndex';
import { reqMQRSSAddOnDemand, reqMQRSSRefreshOnDemand } from './mq/mq';
import { reqFeedGetByPodcastIndexId } from './feed/feed';
import { LiveItemStatus } from 'src';
import { reqAccountNotificationChannelCreate, reqAccountNotificationChannelDelete } from './account/notification/channel';

export type AbortOpts = { controller: AbortController; timeoutMs: number };

export interface ApiRequestParams {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  config?: Record<string, unknown>;
  abort?: AbortOpts;
  userAgent?: string;
  jwt?: string;
}

export class ApiRequestService {
  private apiBase: string;
  private jwt?: string;

  constructor(params: {
    protocol: string;
    host: string;
    port?: string | number;
    prefix: string;
    version: string;
    jwt?: string;
  }) {
    const { protocol, host, port, prefix, version, jwt } = params;
    const portPart = port ? `:${port}` : '';
    this.apiBase = `${protocol}://${host}${portPart}${prefix.replace(/\/$/, '')}${version}`;
    this.jwt = jwt;
  }

  async apiRequest<T>({ path, method = 'GET', data, config = {}, abort, userAgent }: ApiRequestParams): Promise<T> {
    try {
      const mergedConfig = {
        ...config,
        ...(userAgent ? { userAgent } : {}),
        ...(this.jwt ?
          {
            headers: {
              ...(config.headers || {}),
              Cookie: `jwt=${this.jwt}`,
            },
          }
          : {}),
      };
      
      const options =
        method === 'GET' || method === 'DELETE'
          ? { method, ...mergedConfig }
          : { method, data, ...mergedConfig };

      const response = await request<T>(
        `${this.apiBase}${path}`,
        options,
        abort
      );
      return response.data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  /* ACCOUNT */

  reqAccountGetManyPublic() {
    return reqAccountGetManyPublic(this);
  }

  reqAccountCreate(params: { email: string; password: string }) {
    return reqAccountCreate(this, params);
  }

  reqAccountSendVerificationEmail(params: { email: string }) {
    return reqAccountSendVerificationEmail(this, params);
  }

  reqAccountVerifyEmail(params: { token: string }) {
    return reqAccountVerifyEmail(this, params);
  }

  reqAccountSendResetPasswordEmail(params: { email: string }) {
    return reqAccountSendResetPasswordEmail(this, params);
  }

  reqAccountResetPassword(params: { token: string; password: string }) {
    return reqAccountResetPassword(this, params);
  }

  reqAccountSendChangeEmailAddressEmail(params: { new_email: string }) {
    return reqAccountSendChangeEmailAddressEmail(this, params);
  }

  reqAccountChangeEmailAddress(params: { token: string }) {
    return reqAccountChangeEmailAddress(this, params);
  }

  /* ACCOUNT > FOLLOW > CHANNEL */

  reqAccountFollowChannel(params: { channel_id_text: string }) {
    return reqAccountFollowChannel(this, params);
  }

  reqAccountUnfollowChannel(params: { channel_id_text: string }) {
    return reqAccountUnfollowChannel(this, params);
  }
  
  /* ACCOUNT > FOLLOW > PLAYLIST */

  reqAccountFollowPlaylist(params: { playlist_id_text: string }) {
    return reqAccountFollowPlaylist(this, params);
  }

  reqAccountUnfollowPlaylist(params: { playlist_id_text: string }) {
    return reqAccountUnfollowPlaylist(this, params);
  }

  /* ACCOUNT > NOTIFICATION > CHANNEL */

  reqAccountNotificationChannelCreate(params: { channel_id_text: string }) {
    return reqAccountNotificationChannelCreate(this, params);
  }

  reqAccountNotificationChannelDelete(params: { channel_id_text: string }) {
    return reqAccountNotificationChannelDelete(this, params);
  }

  /* AUTH */

  reqAuthLogin(params: {
    email: string;
    password: string;
    includeTokenInResponseBody?: boolean;
  }) {
    return reqAuthLogin(this, params);
  }

  reqAuthLogout() {
    return reqAuthLogout(this);
  }

  reqAuthMe() {
    return reqAuthMe(this);
  }

  reqAuthCheckSession() {
    return reqAuthCheckSession(this);
  }

  /* CATEGORY */
  
  reqCategoryGetAll() {
    return reqCategoryGetAll(this);
  }

  /* CHANNEL */

  reqChannelGetByIdOrIdText(idOrIdText: number | string) {
    return reqChannelGetByIdOrIdText(this, idOrIdText);
  }

  reqChannelGetByPodcastIndexId(podcast_index_id: number | string) {
    return reqChannelGetByPodcastIndexId(this, podcast_index_id);
  }

  reqChannelGetMany(params: QueryParamsGetMany) {
    return reqChannelGetMany(this, params);
  }

  /* CLIP */

  reqClipCreate(params: ReqClipCreateParams) {
    return reqClipCreate(this, params);
  }

  reqClipUpdate(clip_id_text: string, params: ReqClipCreateParams) {
    return reqClipUpdate(this, clip_id_text, params);
  }

  reqClipDelete(clip_id_text: string) {
    return reqClipDelete(this, clip_id_text);
  }

  reqClipGet(clip_id_text: string) {
    return reqClipGet(this, clip_id_text);
  }

  reqClipGetManyPublic(params: QueryParamsGetManyPartial) {
    return reqClipGetManyPublic(this, params);
  }

  reqClipGetManyByChannelPublic(params: QueryParamsIndividualList) {
    return reqClipGetManyByChannelPublic(this, params);
  }

  reqClipGetManyByItemPublic(params: QueryParamsIndividualList) {
    return reqClipGetManyByItemPublic(this, params);
  }

  /* EXTERNAL SERVICES > PODCAST INDEX */

  reqPodcastIndexFeedById(podcast_index_id: string) {
    return reqPodcastIndexFeedById(this, podcast_index_id);
  }

  reqPodcastIndexSearchPodcasts(options: { q: string; }) {
    return reqPodcastIndexSearchPodcasts(this, options);
  }

  /* FEED */

  reqFeedGetByPodcastIndexId(podcast_index_id: number | string) {
    return reqFeedGetByPodcastIndexId(this, podcast_index_id);
  }

  /* ITEM */

  reqItemGetByIdOrIdText(idOrIdText: string) {
    return reqItemGetByIdOrIdText(this, idOrIdText);
  }

  reqItemGetMany(params: QueryParamsGetManyPartial) {
    return reqItemGetMany(this, params);
  }

  reqItemGetManyByChannel(params: QueryParamsIndividualList) {
    return reqItemGetManyByChannel(this, params);
  }

  reqItemGetManyByChannelBySeason(params: QueryParamsIndividualListMusic) {
    return reqItemGetManyByChannelBySeason(this, params);
  }

  reqItemGetManyByChannelShuffle(idText: string, params: QueryParamsShuffle) {
    return reqItemGetManyByChannelShuffle(this, idText, params);
  }

  reqItemGetManyForQueueByPubDate(idText: string, direction: QueryDirection) {
    return reqItemGetManyForQueueByPubDate(this, idText, direction);
  }

  reqItemGetManyForQueueBySeason(idText: string, direction: QueryDirection) {
    return reqItemGetManyForQueueBySeason(this, idText, direction);
  }

  /* ITEM CHAPTER */

  reqItemParseAndGetChapters(item_id_text: string) {
    return reqItemParseAndGetChapters(this, item_id_text);
  }

  reqItemChapterGetByIdText(item_chapter_id_text: string) {
    return reqItemChapterGetByIdText(this, item_chapter_id_text);
  }

  /* ITEM SOUNDBITE */

  reqItemSoundbiteGet(item_soundbite_id_text: string) {
    return reqItemSoundbiteGet(this, item_soundbite_id_text);
  }

  reqItemSoundbiteGetManyByChannelIdText(channel_id_text: string, params: QueryParamsItemSoundbitesByChannel) {
    return reqItemSoundbiteGetManyByChannelIdText(this, channel_id_text, params);
  }

  reqItemSoundbiteGetManyByItemIdText(item_id_text: string, params: QueryParamsItemSoundbitesByItem) {
    return reqItemSoundbiteGetManyByItemIdText(this, item_id_text, params);
  }

  /* ITEM TRANSCRIPT */

  reqItemTranscriptGet(item_transcript_id_text: string) {
    return reqItemTranscriptGet(this, item_transcript_id_text);
  }

  /* LIVE ITEM */

  reqLiveItemGetMany(params: QueryParamsGetManyPartial, liveItemType: LiveItemStatus) {
    return reqLiveItemGetMany(this, params, liveItemType);
  }
  
  reqLiveItemGetManyByChannel(channelIdOrIdText: string) {
    return reqLiveItemGetManyByChannel(this, channelIdOrIdText);
  }

  /* MQ */

  reqMQRSSAddOnDemand(params: {
    url: string;
    podcast_index_id: number;
  }) {
    return reqMQRSSAddOnDemand(this, params);
  }

  reqMQRSSRefreshOnDemand(params: {
    url: string;
    podcast_index_id: number;
  }) {
    return reqMQRSSRefreshOnDemand(this, params);
  }

  /* PLAYLIST */

  reqPlaylistGet(id_text: string) {
    return reqPlaylistGet(this, id_text);
  }

  reqPlaylistGetMany(params: QueryParamsPlaylists) {
    return reqPlaylistGetMany(this, params);
  }

  reqPlaylistGetAllFavoritesPrivate() {
    return reqPlaylistGetAllFavoritesPrivate(this);
  }

  reqPlaylistCreate(params: ReqPlaylistCreateParams) {
    return reqPlaylistCreate(this, params);
  }

  reqPlaylistEdit(params: ReqPlaylistEditParams) {
    return reqPlaylistEdit(this, params);
  }

  reqPlaylistDelete(id_text: string) {
    return reqPlaylistDelete(this, id_text);
  }

  /* PLAYLIST RESOURCE */

  reqPlaylistResourceGetAllByPlaylistIdTextPrivate(playlist_id_text: string) {
    return reqPlaylistResourceGetAllByPlaylistIdTextPrivate(this, playlist_id_text);
  }

  reqPlaylistResourceGetManyByPlaylistIdText(playlist_id_text: string, params: QueryParamsPlaylistResources) {
    return reqPlaylistResourceGetManyByPlaylistIdText(this, playlist_id_text, params);
  }

  /* PLAYLIST RESOURCE > CLIP */

  reqPlaylistResourceClipAddFirst(playlist_id_text: string, clip_id_text: string) {
    return reqPlaylistResourceClipAddFirst(this, playlist_id_text, clip_id_text);
  }

  reqPlaylistResourceClipAddBetween(playlist_id_text: string, clip_id_text: string, params: BetweenParams) {
    return reqPlaylistResourceClipAddBetween(this, playlist_id_text, clip_id_text, params);
  }

  reqPlaylistResourceClipAddLast(playlist_id_text: string, clip_id_text: string) {
    return reqPlaylistResourceClipAddLast(this, playlist_id_text, clip_id_text);
  }

  reqPlaylistResourceClipDelete(playlist_id_text: string, clip_id_text: string) {
    return reqPlaylistResourceClipDelete(this, playlist_id_text, clip_id_text);
  }

  /* PLAYLIST RESOURCE > ITEM */

  reqPlaylistResourceItemAddFirst(playlist_id_text: string, item_id_text: string) {
    return reqPlaylistResourceItemAddFirst(this, playlist_id_text, item_id_text);
  }

  reqPlaylistResourceItemAddBetween(playlist_id_text: string, item_id_text: string, params: BetweenParams) {
    return reqPlaylistResourceItemAddBetween(this, playlist_id_text, item_id_text, params);
  }

  reqPlaylistResourceItemAddLast(playlist_id_text: string, item_id_text: string) {
    return reqPlaylistResourceItemAddLast(this, playlist_id_text, item_id_text);
  }

  reqPlaylistResourceItemDelete(playlist_id_text: string, item_id_text: string) {
    return reqPlaylistResourceItemDelete(this, playlist_id_text, item_id_text);
  }

  /* PLAYLIST RESOURCE > ITEM SOUNDBITE */

  reqPlaylistResourceItemSoundbiteAddFirst(playlist_id_text: string, item_soundbite_id_text: string) {
    return reqPlaylistResourceItemSoundbiteAddFirst(this, playlist_id_text, item_soundbite_id_text);
  }

  reqPlaylistResourceItemSoundbiteAddBetween(playlist_id_text: string, item_soundbite_id_text: string, params: BetweenParams) {
    return reqPlaylistResourceItemSoundbiteAddBetween(this, playlist_id_text, item_soundbite_id_text, params);
  }

  reqPlaylistResourceItemSoundbiteAddLast(playlist_id_text: string, item_soundbite_id_text: string) {
    return reqPlaylistResourceItemSoundbiteAddLast(this, playlist_id_text, item_soundbite_id_text);
  }

  reqPlaylistResourceItemSoundbiteDelete(playlist_id_text: string, item_soundbite_id_text: string) {
    return reqPlaylistResourceItemSoundbiteDelete(this, playlist_id_text, item_soundbite_id_text);
  }

  /* PODROLL */

  reqPodrollGetForChannel(idOrIdText: string) {
    return reqPodrollGetForChannel(this, idOrIdText);
  }

  /* QUEUE */

  reqQueueGetAllForAccountPrivate() {
    return reqQueueGetAllForAccountPrivate(this);
  }

  reqQueueUpdateIsActiveQueue(queue_id_text: string, is_active_queue: boolean) {
    return reqQueueUpdateIsActiveQueue(this, { queue_id_text, is_active_queue });
  }

  /* QUEUE RESOURCE */

  reqQueueResourcesGetNowPlayingByQueueIdText(queue_id_text: string) {
    return reqQueueResourcesGetNowPlayingByQueueIdText(this, { queue_id_text });
  }

  reqQueueResourcesGetAllUpcomingByQueueIdText(queue_id_text: string) {
    return reqQueueResourcesGetAllUpcomingByQueueIdText(this, { queue_id_text });
  }

  reqQueueResourcesGetHistoryByQueueIdTextPaginated(queue_id_text: string, page?: number) {
    return reqQueueResourcesGetHistoryByQueueIdTextPaginated(this, { queue_id_text, page });
  }

  reqQueueResourcesGetAllByAccountAbridged() {
    return reqQueueResourcesGetAllByAccountAbridged(this);
  }

  /* QUEUE RESOURCE > CLIP */
  
  reqQueueResourceClipAddNowPlaying(queue_id_text: string, clip_id_text: string, params?: QueueExtraParams) {
    return reqQueueResourceClipAddNowPlaying(this, queue_id_text, clip_id_text, params);
  }

  reqQueueResourceClipAddNext(queue_id_text: string, clip_id_text: string) {
    return reqQueueResourceClipAddNext(this, queue_id_text, clip_id_text);
  }

  reqQueueResourceClipAddBetween(queue_id_text: string, clip_id_text: string, params: BetweenParams) {
    return reqQueueResourceClipAddBetween(this, queue_id_text, clip_id_text, params);
  }

  reqQueueResourceClipAddLast(queue_id_text: string, clip_id_text: string) {
    return reqQueueResourceClipAddLast(this, queue_id_text, clip_id_text);
  }

  reqQueueResourceClipAddHistory(queue_id_text: string, clip_id_text: string, params?: QueueExtraParams) {
    return reqQueueResourceClipAddHistory(this, queue_id_text, clip_id_text, params);
  }

  reqQueueResourceClipDelete(queue_id_text: string, clip_id_text: string) {
    return reqQueueResourceClipDelete(this, queue_id_text, clip_id_text);
  }

  /* QUEUE RESOURCE > ITEM */

  reqQueueResourceItemAddNowPlaying(queue_id_text: string, item_id_text: string, params?: QueueExtraParams) {
    return reqQueueResourceItemAddNowPlaying(this, queue_id_text, item_id_text, params);
  }

  reqQueueResourceItemAddNext(queue_id_text: string, item_id_text: string) {
    return reqQueueResourceItemAddNext(this, queue_id_text, item_id_text);
  }

  reqQueueResourceItemAddBetween(queue_id_text: string, item_id_text: string, params: BetweenParams) {
    return reqQueueResourceItemAddBetween(this, queue_id_text, item_id_text, params);
  }

  reqQueueResourceItemAddLast(queue_id_text: string, item_id_text: string) {
    return reqQueueResourceItemAddLast(this, queue_id_text, item_id_text);
  }

  reqQueueResourceItemAddHistory(queue_id_text: string, item_id_text: string, params?: QueueExtraParams) {
    return reqQueueResourceItemAddHistory(this, queue_id_text, item_id_text, params);
  }

  reqQueueResourceItemDelete(queue_id_text: string, item_id_text: string) {
    return reqQueueResourceItemDelete(this, queue_id_text, item_id_text);
  }

  /* QUEUE RESOURCE > ITEM ADD BY RSS */

  reqQueueResourceItemAddByRSSAddNowPlaying(queue_id_text: string, params: QueueExtraParams & { add_by_rss_resource_data: object }) {
    return reqQueueResourceItemAddByRSSAddNowPlaying(this, queue_id_text, params);
  }

  reqQueueResourceItemAddByRSSAddNext(queue_id_text: string, params: { add_by_rss_resource_data: object }) {
    return reqQueueResourceItemAddByRSSAddNext(this, queue_id_text, params);
  }

  reqQueueResourceItemAddByRSSAddBetween(queue_id_text: string, params: BetweenParams & { add_by_rss_resource_data: object }) {
    return reqQueueResourceItemAddByRSSAddBetween(this, queue_id_text, params);
  }

  reqQueueResourceItemAddByRSSAddLast(queue_id_text: string, params: { add_by_rss_resource_data: object }) {
    return reqQueueResourceItemAddByRSSAddLast(this, queue_id_text, params);
  }

  reqQueueResourceItemAddByRSSAddHistory(queue_id_text: string, params: QueueExtraParams & { add_by_rss_resource_data: object }) {
    return reqQueueResourceItemAddByRSSAddHistory(this, queue_id_text, params);
  }

  reqQueueResourceItemAddByRSSDelete(queue_id_text: string, add_by_rss_hash_id: string) {
    return reqQueueResourceItemAddByRSSDelete(this, queue_id_text, add_by_rss_hash_id);
  }

  /* QUEUE RESOURCE > ITEM SOUNDBITE */

  reqQueueResourceItemSoundbiteAddNowPlaying(queue_id_text: string, item_soundbite_id_text: string, params?: QueueExtraParams) {
    return reqQueueResourceItemSoundbiteAddNowPlaying(this, queue_id_text, item_soundbite_id_text, params);
  }

  reqQueueResourceItemSoundbiteAddNext(queue_id_text: string, item_soundbite_id_text: string) {
    return reqQueueResourceItemSoundbiteAddNext(this, queue_id_text, item_soundbite_id_text);
  }

  reqQueueResourceItemSoundbiteAddBetween(queue_id_text: string, item_soundbite_id_text: string, params: BetweenParams) {
    return reqQueueResourceItemSoundbiteAddBetween(this, queue_id_text, item_soundbite_id_text, params);
  }

  reqQueueResourceItemSoundbiteAddLast(queue_id_text: string, item_soundbite_id_text: string) {
    return reqQueueResourceItemSoundbiteAddLast(this, queue_id_text, item_soundbite_id_text);
  }

  reqQueueResourceItemSoundbiteAddHistory(queue_id_text: string, item_soundbite_id_text: string, params?: QueueExtraParams) {
    return reqQueueResourceItemSoundbiteAddHistory(this, queue_id_text, item_soundbite_id_text, params);
  }

  reqQueueResourceItemSoundbiteDelete(queue_id_text: string, item_soundbite_id_text: string) {
    return reqQueueResourceItemSoundbiteDelete(this, queue_id_text, item_soundbite_id_text);
  }

}

export type ApiRequestServiceMethod = {
  [K in keyof ApiRequestService]: ApiRequestService[K] extends (...args: unknown[]) => unknown ? ApiRequestService[K] : never;
}[keyof ApiRequestService];
