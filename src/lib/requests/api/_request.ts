import { request } from '../_request';
import { reqAccountGetManyPublic } from './account/account';
import { reqAccountFollowChannel, reqAccountUnfollowChannel } from './account/follow/channel';
import { reqAccountFollowPlaylist, reqAccountUnfollowPlaylist } from './account/follow/playlist';
import { reqAuthCheckSession, reqAuthLogin, reqAuthLogout, reqAuthMe } from './auth/auth';
import { reqCategoryGetAll } from './category/category';
import { reqChannelGetByIdOrIdText, reqChannelGetMany } from './channel/channel';
import { reqClipCreate, ReqClipCreateParams, reqClipDelete, reqClipGet, reqClipGetManyByChannelIdTextPublic, reqClipUpdate, ReqClipUpdateParams, ReqClipUpdateParams } from './clip/clip';
import { reqItemGetByIdOrIdText, reqItemGetMany, reqItemGetManyWithoutLiveItemByChannel } from './item/item';
import { reqPlaylistCreate, ReqPlaylistCreateParams, reqPlaylistDelete, reqPlaylistEdit, ReqPlaylistEditParams, reqPlaylistGet,
  reqPlaylistGetAllFavoritesPrivate, reqPlaylistGetManyPrivate, reqPlaylistGetManyPrivateFollowed, reqPlaylistGetManyPublic } from './playlist/playlist';
import { reqPlaylistResourceClipAddBetween, reqPlaylistResourceClipAddFirst, reqPlaylistResourceClipAddLast } from './playlist/playlistResource/playlistResourceClip';
import { reqPlaylistResourceItemAddFirst, reqPlaylistResourceItemAddBetween,
  reqPlaylistResourceItemAddLast } from './playlist/playlistResource/playlistResourceItem';
import { reqPlaylistResourceItemChapterAddBetween, reqPlaylistResourceItemChapterAddFirst, reqPlaylistResourceItemChapterAddLast } from './playlist/playlistResource/playlistResourceItemChapter';
import { reqPodrollGetForChannel } from './podroll/podroll';
import { QueryParamsChannel, QueryParamsChannels, QueryParamsClipsByChannel, QueryParamsPlaylists } from './queryParams';

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

  reqChannelGetByIdOrIdText(idOrIdText: string) {
    return reqChannelGetByIdOrIdText(this, idOrIdText);
  }

  reqChannelGetMany(params: QueryParamsChannels = {}) {
    return reqChannelGetMany(this, params);
  }

  /* CLIP */

  reqClipCreate(params: ReqClipCreateParams) {
    return reqClipCreate(this, params);
  }

  reqClipUpdate(clip_id_text: string, params: ReqClipUpdateParams) {
    return reqClipUpdate(this, clip_id_text, params);
  }

  reqClipDelete(clip_id_text: string) {
    return reqClipDelete(this, clip_id_text);
  }

  reqClipGet(clip_id_text: string) {
    return reqClipGet(this, clip_id_text);
  }

  reqClipGetManyByChannelIdTextPublic(channel_id_text: string, params: QueryParamsClipsByChannel) {
    return reqClipGetManyByChannelIdTextPublic(this, channel_id_text, params);
  }

  /* ITEM */

  reqItemGetByIdOrIdText(idOrIdText: string) {
    return reqItemGetByIdOrIdText(this, idOrIdText);
  }

  reqItemGetMany(params: QueryParamsChannels = {}) {
    return reqItemGetMany(this, params);
  }

  reqItemGetManyWithoutLiveItemByChannel(channel_id: string, params: QueryParamsChannel = {}) {
    return reqItemGetManyWithoutLiveItemByChannel(this, channel_id, params);
  }

  /* PLAYLIST */

  reqPlaylistGet(id_text: string) {
    return reqPlaylistGet(this, id_text);
  }

  reqPlaylistGetManyPublic(params: QueryParamsPlaylists = {}) {
    return reqPlaylistGetManyPublic(this, params);
  }

  reqPlaylistGetManyPrivate(params: QueryParamsPlaylists = {}) {
    return reqPlaylistGetManyPrivate(this, params);
  }

  reqPlaylistGetManyPrivateFollowed(params: QueryParamsPlaylists = {}) {
    return reqPlaylistGetManyPrivateFollowed(this, params);
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

  /* PLAYLIST RESOURCE > CLIP */

  reqPlaylistResourceClipAddFirst(playlist_id_text: string, clip_id_text: string) {
    return reqPlaylistResourceClipAddFirst(this, playlist_id_text, clip_id_text);
  }

  reqPlaylistResourceClipAddBetween(playlist_id_text: string, clip_id_text: string) {
    return reqPlaylistResourceClipAddBetween(this, playlist_id_text, clip_id_text);
  }

  reqPlaylistResourceClipAddLast(playlist_id_text: string, clip_id_text: string) {
    return reqPlaylistResourceClipAddLast(this, playlist_id_text, clip_id_text);
  }

  /* PLAYLIST RESOURCE > ITEM */

  reqPlaylistResourceItemAddFirst(playlist_id_text: string, item_id_text: string) {
    return reqPlaylistResourceItemAddFirst(this, playlist_id_text, item_id_text);
  }

  reqPlaylistResourceItemAddBetween(playlist_id_text: string, item_id_text: string) {
    return reqPlaylistResourceItemAddBetween(this, playlist_id_text, item_id_text);
  }

  reqPlaylistResourceItemAddLast(playlist_id_text: string, item_id_text: string) {
    return reqPlaylistResourceItemAddLast(this, playlist_id_text, item_id_text);
  }

  /* PLAYLIST RESOURCE > ITEM CHAPTER */

  reqPlaylistResourceItemChapterAddFirst(playlist_id_text: string, item_chapter_id_text: string) {
    return reqPlaylistResourceItemChapterAddFirst(this, playlist_id_text, item_chapter_id_text);
  }

  reqPlaylistResourceItemChapterAddBetween(playlist_id_text: string, item_chapter_id_text: string) {
    return reqPlaylistResourceItemChapterAddBetween(this, playlist_id_text, item_chapter_id_text);
  }

  reqPlaylistResourceItemChapterAddLast(playlist_id_text: string, item_chapter_id_text: string) {
    return reqPlaylistResourceItemChapterAddLast(this, playlist_id_text, item_chapter_id_text);
  }

  /* PLAYLIST RESOURCE > ITEM SOUNDBITE */

  reqPlaylistResourceItemSoundbiteAddFirst(playlist_id_text: string, item_soundbite_id_text: string) {
    return reqPlaylistResourceItemChapterAddFirst(this, playlist_id_text, item_soundbite_id_text);
  }

  reqPlaylistResourceItemSoundbiteAddBetween(playlist_id_text: string, item_soundbite_id_text: string) {
    return reqPlaylistResourceItemChapterAddBetween(this, playlist_id_text, item_soundbite_id_text);
  }

  reqPlaylistResourceItemSoundbiteAddLast(playlist_id_text: string, item_soundbite_id_text: string) {
    return reqPlaylistResourceItemChapterAddLast(this, playlist_id_text, item_soundbite_id_text);
  }

  /* PODROLL */

  reqPodrollGetForChannel(idOrIdText: string) {
    return reqPodrollGetForChannel(this, idOrIdText);
  }

}

export type ApiRequestServiceMethod = {
  [K in keyof ApiRequestService]: ApiRequestService[K] extends (...args: unknown[]) => unknown ? ApiRequestService[K] : never;
}[keyof ApiRequestService];
