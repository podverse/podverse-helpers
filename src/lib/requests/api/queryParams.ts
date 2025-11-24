import { MediumEnum, QueryParamsMedium } from "../../../lib/medium";
import { CategoryMappingKeys } from "../../category";

export interface QueryParamsPage {
  page?: number;
}

export const QUERY_PARAMS_STATS_RANGE_VALUES = ["day", "week", "month", "all-time"] as const;
export type QueryParamsStatsRange = typeof QUERY_PARAMS_STATS_RANGE_VALUES[number];

export const STATS_SORT_COLUMNS = ["day_current_count", "week_current_count", "month_current_count", "all_time_count"] as const;
export type StatsSortColumn = typeof STATS_SORT_COLUMNS[number];

// Channel

export const QUERY_PARAMS_CHANNEL_TYPE_VALUES = ["episodes", "soundbites", "clips", "about", "podroll"] as const;
export const QUERY_PARAMS_CHANNEL_SORT_VALUES = ["recent", "oldest", "top"] as const;

export type QueryParamsChannelType = typeof QUERY_PARAMS_CHANNEL_TYPE_VALUES[number];
export type QueryParamsChannelSort = typeof QUERY_PARAMS_CHANNEL_SORT_VALUES[number];

export interface QueryParamsChannel extends QueryParamsPage {
  type?: typeof QUERY_PARAMS_CHANNEL_TYPE_VALUES[number];
  sort?: typeof QUERY_PARAMS_CHANNEL_SORT_VALUES[number];
  range?: QueryParamsStatsRange;
}

// Channels

export const QUERY_PARAMS_CHANNELS_TYPE_VALUES = ["global", "subscribed", "category"] as const;
export const QUERY_PARAMS_CHANNELS_SORT_VALUES = ["recent", "oldest", "a_z", "top"] as const;

export type QueryParamsChannelsType = typeof QUERY_PARAMS_CHANNELS_TYPE_VALUES[number];
export type QueryParamsChannelsSort = typeof QUERY_PARAMS_CHANNELS_SORT_VALUES[number];

export interface QueryParamsChannels extends QueryParamsPage {
  type?: QueryParamsChannelsType;
  sort?: QueryParamsChannelsSort;
  range?: QueryParamsStatsRange;
  category?: CategoryMappingKeys;
  medium?: QueryParamsMedium;
}

// Clips

export const QUERY_PARAMS_CLIPS_BY_CHANNEL_SORT_VALUES = ["recent", "oldest", "top"];

export type QueryParamsClipsByChannelSort = typeof QUERY_PARAMS_CLIPS_BY_CHANNEL_SORT_VALUES[number];

export interface QueryParamsClipsByChannel extends QueryParamsPage {
  sort?: QueryParamsClipsByChannelSort;
  range?: QueryParamsStatsRange;
}

// Home

export const QUERY_PARAMS_HOME_SORT_VALUES = ["a_z", "recent", "oldest"] as const;

export type QueryParamsHomeSort = typeof QUERY_PARAMS_HOME_SORT_VALUES[number];

export interface QueryParamsHome extends QueryParamsPage {
  medium?: QueryParamsMedium;
  sort?: QueryParamsHomeSort;
}

// Item

export const QUERY_PARAMS_ITEM_TYPE_VALUES = ["summary", "chapters", "soundbites", "clips", "transcript"] as const;
export const QUERY_PARAMS_ITEM_SORT_VALUES = ["recent", "oldest", "top"] as const;

export type QueryParamsItemType = typeof QUERY_PARAMS_ITEM_TYPE_VALUES[number];
export type QueryParamsItemSort = typeof QUERY_PARAMS_ITEM_SORT_VALUES[number];

export interface QueryParamsItem extends QueryParamsPage {
  type?: typeof QUERY_PARAMS_ITEM_TYPE_VALUES[number];
  sort?: typeof QUERY_PARAMS_ITEM_SORT_VALUES[number];
  range?: QueryParamsStatsRange;
}

// Items

export const QUERY_PARAMS_ITEMS_TYPE_VALUES = ["global", "subscribed", "category"] as const;
export const QUERY_PARAMS_ITEMS_SORT_VALUES = ["recent", "oldest", "top"] as const;

export type QueryParamsItemsType = typeof QUERY_PARAMS_ITEMS_TYPE_VALUES[number];
export type QueryParamsItemsSort = typeof QUERY_PARAMS_ITEMS_SORT_VALUES[number];

export interface QueryParamsItems extends QueryParamsPage {
  type?: QueryParamsItemsType;
  sort?: QueryParamsItemsSort;
  range?: QueryParamsStatsRange;
  category?: CategoryMappingKeys;
}

// Item Soundbites

export const QUERY_PARAMS_ITEM_SOUNDBITES_BY_CHANNEL_SORT_VALUES = ["recent", "oldest"] as const;

export type QueryParamsItemSoundbitesByChannelSort = typeof QUERY_PARAMS_ITEM_SOUNDBITES_BY_CHANNEL_SORT_VALUES[number];

export interface QueryParamsItemSoundbitesByChannel extends QueryParamsPage {
  sort?: QueryParamsItemSoundbitesByChannelSort;
}

export const QUERY_PARAMS_ITEM_SOUNDBITES_BY_ITEM_SORT_VALUES = ["recent", "oldest"] as const;

export type QueryParamsItemSoundbitesByItemSort = typeof QUERY_PARAMS_ITEM_SOUNDBITES_BY_ITEM_SORT_VALUES[number];

export interface QueryParamsItemSoundbitesByItem extends QueryParamsPage {
  sort?: QueryParamsItemSoundbitesByItemSort;
}

// Playlists

export const QUERY_PARAMS_PLAYLISTS_TYPE_VALUES = ["my_playlists", "subscribed", "global"] as const;
export const QUERY_PARAMS_PLAYLISTS_SORT_VALUES = ["top", "a_z", "recent", "oldest"] as const;

export type QueryParamsPlaylistsType = typeof QUERY_PARAMS_PLAYLISTS_TYPE_VALUES[number];
export type QueryParamsPlaylistsSort = typeof QUERY_PARAMS_PLAYLISTS_SORT_VALUES[number];

export interface QueryParamsPlaylists extends QueryParamsPage {
  type?: QueryParamsPlaylistsType;
  sort?: QueryParamsPlaylistsSort;
  range?: QueryParamsStatsRange;
  medium_id?: MediumEnum | null;
}

// Playlist Resources

export type QueryParamsPlaylistResources = QueryParamsPage;

// Queues

export type QueryParamsQueues = QueryParamsPage & {
  medium_id?: MediumEnum | null;
}

export type QueryParamsHistory = QueryParamsPage & {
  medium_id?: MediumEnum | null;
}

// MISC

export type QueryParamsDirection = {
  direction: "forward" | "backward";
}

export const QUERY_PARAMS_DIRECTION_VALUES = ["forward", "backward"] as const;

// GLOBAL

export const QUERY_PARAMS_GLOBAL_GET_MANY_SORT_VALUES = ["top", "recent"] as const;
export type QueryParamsGlobalGetManySort = typeof QUERY_PARAMS_GLOBAL_GET_MANY_SORT_VALUES[number];
