import { QueryParamsMedium } from "../../../lib/medium";
import { CategoryMappingKeys } from "../../category";

// Helpers

export const getValidQueryParam = <T extends string>(
  validParams: readonly T[],
  param: string | null,
  defaultParam: T
): T => {
  if (param && (validParams as readonly string[]).includes(param)) {
    return param as T;
  }
  return defaultParam;
};

// Global

export interface QueryParamsPage {
  page: number;
}

export interface QueryParamsPageRange {
  page: number;
  range: QueryParamsStatsRange;
}

export interface QueryParamsIndividualList {
  idOrIdText: string;
  page: number;
  sort: QueryParamsSubscribedPartialSort;
  range: QueryParamsStatsRange | null;
}

export interface QueryParamsGetMany {
  page: number;
  medium: QueryParamsMedium;
  type: QueryParamsSubscribedType;
  sort: QueryParamsSubscribedFullSort;
  range: QueryParamsStatsRange | null;
  category: string | null;
}

export interface QueryParamsGetManyPartial {
  page: number;
  medium: QueryParamsMedium;
  type: QueryParamsSubscribedType;
  sort: QueryParamsSubscribedPartialSort;
  range: QueryParamsStatsRange | null;
  category: string | null;
}

export type QueryParamsGlobalRecent = {
  page: number;
  medium: QueryParamsMedium;
}

export type QueryParamsGlobalTop = {
  page: number;
  medium: QueryParamsMedium;
  range: QueryParamsStatsRange;
}

export type QueryParamsCategoryRecent = {
  page: number;
  medium: QueryParamsMedium;
  category: CategoryMappingKeys;
}

export type QueryParamsCategoryTop = {
  page: number;
  medium: QueryParamsMedium;
  range: QueryParamsStatsRange;
  category: CategoryMappingKeys;
}

export type QueryParamsSubscribedAZ = {
  page: number;
  medium: QueryParamsMedium;
}

export type QueryParamsSubscribedRecent = {
  page: number;
  medium: QueryParamsMedium;
}

export type QueryParamsSubscribedTop = {
  page: number;
  medium: QueryParamsMedium;
  range: QueryParamsStatsRange;
}

export const QUERY_PARAMS_SUBSCRIBED_TYPE = ["global", "subscribed", "category"] as const;
export type QueryParamsSubscribedType = typeof QUERY_PARAMS_SUBSCRIBED_TYPE[number];

export const QUERY_PARAMS_GLOBAL_SORT_VALUES = ["recent", "oldest", "top"] as const;
export type QueryParamsGlobalSort = typeof QUERY_PARAMS_GLOBAL_SORT_VALUES[number];

export const QUERY_PARAMS_SUBSCRIBED_FULL_SORT = ["recent", "oldest", "a_z", "top"] as const;
export type QueryParamsSubscribedFullSort = typeof QUERY_PARAMS_SUBSCRIBED_FULL_SORT[number];

export const QUERY_PARAMS_SUBSCRIBED_PARTIAL_SORT = QUERY_PARAMS_GLOBAL_SORT_VALUES;
export type QueryParamsSubscribedPartialSort = typeof QUERY_PARAMS_SUBSCRIBED_PARTIAL_SORT[number];

// Stats

export const QUERY_PARAMS_STATS_RANGE_VALUES = ["day", "week", "month", "all-time"] as const;
export type QueryParamsStatsRange = typeof QUERY_PARAMS_STATS_RANGE_VALUES[number];

export const STATS_SORT_COLUMNS = ["day_current_count", "week_current_count", "month_current_count", "all_time_count"] as const;
export type StatsSortColumn = typeof STATS_SORT_COLUMNS[number];

// Channel

export const QUERY_PARAMS_CHANNEL_TYPE_VALUES = ["episodes", "soundbites", "clips", "about", "podroll"] as const;
export const QUERY_PARAMS_CHANNEL_SORT_VALUES = ["recent", "oldest", "top"] as const;

export type QueryParamsChannelType = typeof QUERY_PARAMS_CHANNEL_TYPE_VALUES[number];
export type QueryParamsChannelSort = typeof QUERY_PARAMS_CHANNEL_SORT_VALUES[number];

export interface QueryParamsChannel {
  page: number;
  type: typeof QUERY_PARAMS_CHANNEL_TYPE_VALUES[number];
  sort: typeof QUERY_PARAMS_CHANNEL_SORT_VALUES[number];
  range: QueryParamsStatsRange | null;
}

// Channels

export interface QueryParamsChannels {
  page: number;
  type?: QueryParamsSubscribedType;
  sort?: QueryParamsSubscribedFullSort;
  range?: QueryParamsStatsRange;
  category?: CategoryMappingKeys;
  medium: QueryParamsMedium;
}

// Clips

export const QUERY_PARAMS_CLIPS_BY_CHANNEL_SORT_VALUES = ["recent", "oldest", "top"];

export type QueryParamsClipsByChannelSort = typeof QUERY_PARAMS_CLIPS_BY_CHANNEL_SORT_VALUES[number];

export interface QueryParamsClipsByChannel {
  page: number;
  sort: QueryParamsClipsByChannelSort;
  range: QueryParamsStatsRange | null;
}

// Home

export const QUERY_PARAMS_HOME_SORT_VALUES = ["a_z", "recent", "oldest"] as const;

export type QueryParamsHomeSort = typeof QUERY_PARAMS_HOME_SORT_VALUES[number];

export interface QueryParamsHome {
  page: number;
  medium: QueryParamsMedium;
  sort: QueryParamsHomeSort;
}

// Item

export const QUERY_PARAMS_ITEM_TYPE_VALUES = ["summary", "chapters", "soundbites", "clips", "transcript"] as const;
export const QUERY_PARAMS_ITEM_SORT_VALUES = ["recent", "oldest", "top"] as const;

export type QueryParamsItemType = typeof QUERY_PARAMS_ITEM_TYPE_VALUES[number];
export type QueryParamsItemSort = typeof QUERY_PARAMS_ITEM_SORT_VALUES[number];

export interface QueryParamsItem {
  page: number;
  type: typeof QUERY_PARAMS_ITEM_TYPE_VALUES[number];
  sort: typeof QUERY_PARAMS_ITEM_SORT_VALUES[number];
  range: QueryParamsStatsRange | null;
}

// Items

export const QUERY_PARAMS_ITEMS_TYPE_VALUES = ["global", "subscribed", "category"] as const;
export const QUERY_PARAMS_ITEMS_SORT_VALUES = ["recent", "oldest", "top"] as const;

export type QueryParamsItemsType = typeof QUERY_PARAMS_ITEMS_TYPE_VALUES[number];
export type QueryParamsItemsSort = typeof QUERY_PARAMS_ITEMS_SORT_VALUES[number];

export interface QueryParamsItems {
  page: number;
  type?: QueryParamsItemsType;
  sort?: QueryParamsItemsSort;
  range?: QueryParamsStatsRange;
  category?: CategoryMappingKeys;
}

// Item Soundbites

export const QUERY_PARAMS_ITEM_SOUNDBITES_BY_CHANNEL_SORT_VALUES = ["recent", "oldest"] as const;

export type QueryParamsItemSoundbitesByChannelSort = typeof QUERY_PARAMS_ITEM_SOUNDBITES_BY_CHANNEL_SORT_VALUES[number];

export interface QueryParamsItemSoundbitesByChannel {
  page: number;
  sort?: QueryParamsItemSoundbitesByChannelSort;
}

export const QUERY_PARAMS_ITEM_SOUNDBITES_BY_ITEM_SORT_VALUES = ["recent", "oldest"] as const;

export type QueryParamsItemSoundbitesByItemSort = typeof QUERY_PARAMS_ITEM_SOUNDBITES_BY_ITEM_SORT_VALUES[number];

export interface QueryParamsItemSoundbitesByItem {
  page: number;
  sort?: QueryParamsItemSoundbitesByItemSort;
}

// Playlists

export const QUERY_PARAMS_PLAYLISTS_TYPE_VALUES = ['public', 'private', 'private_followed'] as const;
export type QueryParamsPlaylistsType = (typeof QUERY_PARAMS_PLAYLISTS_TYPE_VALUES)[number];

export interface QueryParamsPlaylists {
  page: number;
  medium: QueryParamsMedium;
  type: QueryParamsPlaylistsType;
  sort: QueryParamsSubscribedFullSort;
  range: QueryParamsStatsRange | null;
}

export type QueryParamsPlaylistsPublicTop = {
  page: number;
  medium: QueryParamsMedium;
  range: QueryParamsStatsRange;
};

export type QueryParamsPlaylistsPrivateAZ = {
  page: number;
  medium: QueryParamsMedium;
};

export type QueryParamsPlaylistsPrivateOldest = {
  page: number;
  medium: QueryParamsMedium;
};

export type QueryParamsPlaylistsPrivateRecent = {
  page: number;
  medium: QueryParamsMedium;
};

export type QueryParamsPlaylistsPrivateTop = {
  page: number;
  medium: QueryParamsMedium;
  range: QueryParamsStatsRange;
};

export type QueryParamsPlaylistsPrivateFollowedAZ = {
  page: number;
  medium: QueryParamsMedium;
};

export type QueryParamsPlaylistsPrivateFollowedOldest = {
  page: number;
  medium: QueryParamsMedium;
};

export type QueryParamsPlaylistsPrivateFollowedRecent = {
  page: number;
  medium: QueryParamsMedium;
};

export type QueryParamsPlaylistsPrivateFollowedTop = {
  page: number;
  medium: QueryParamsMedium;
  range: QueryParamsStatsRange;
};

// Playlist Resources

export type QueryParamsPlaylistResources = QueryParamsPage;

// Queues

export type QueryParamsQueues = {
  medium: QueryParamsMedium;
}

export type QueryParamsHistory = {
  page: number;
  medium: QueryParamsMedium;
}

// MISC

export type QueryParamsDirection = {
  direction: "forward" | "backward";
}

export const QUERY_PARAMS_DIRECTION_VALUES = ["forward", "backward"] as const;
