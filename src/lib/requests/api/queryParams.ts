import { CategoryMappingKeys } from "../../category";

export interface QueryParamsPage {
  page?: number;
}

export const QUERY_PARAMS_STATS_RANGE_VALUES = ["day", "week", "month", "all-time"] as const;
export type QueryParamsStatsRange = typeof QUERY_PARAMS_STATS_RANGE_VALUES[number];

export const STATS_SORT_COLUMNS = ["day_current_count", "week_current_count", "month_current_count", "all_time_count"] as const;
export type StatsSortColumn = typeof STATS_SORT_COLUMNS[number];

// Channel

export const QUERY_PARAMS_CHANNEL_TYPE_VALUES = ["episodes", "clips"] as const;
export const QUERY_PARAMS_CHANNEL_SORT_VALUES = ["recent", "oldest", "random", "top"] as const;

export type QueryParamsChannelType = typeof QUERY_PARAMS_CHANNEL_TYPE_VALUES[number];
export type QueryParamsChannelSort = typeof QUERY_PARAMS_CHANNEL_SORT_VALUES[number];

export interface QueryParamsChannel extends QueryParamsPage {
  type?: typeof QUERY_PARAMS_CHANNEL_TYPE_VALUES[number];
  sort?: typeof QUERY_PARAMS_CHANNEL_SORT_VALUES[number];
  range?: QueryParamsStatsRange;
}

// Channels

export const QUERY_PARAMS_CHANNELS_TYPE_VALUES = ["all", "subscribed", "category"] as const;
export const QUERY_PARAMS_CHANNELS_SORT_VALUES = ["recent", "oldest", "alphabetical", "top"] as const;

export type QueryParamsChannelsType = typeof QUERY_PARAMS_CHANNELS_TYPE_VALUES[number];
export type QueryParamsChannelsSort = typeof QUERY_PARAMS_CHANNELS_SORT_VALUES[number];

export interface QueryParamsChannels extends QueryParamsPage {
  type?: QueryParamsChannelsType;
  sort?: QueryParamsChannelsSort;
  range?: QueryParamsStatsRange;
  category?: CategoryMappingKeys;
}

// Items

export const QUERY_PARAMS_ITEMS_TYPE_VALUES = ["all", "subscribed", "category"] as const;
export const QUERY_PARAMS_ITEMS_SORT_VALUES = ["recent", "oldest", "alphabetical", "top"] as const;

export type QueryParamsItemsType = typeof QUERY_PARAMS_ITEMS_TYPE_VALUES[number];
export type QueryParamsItemsSort = typeof QUERY_PARAMS_ITEMS_SORT_VALUES[number];

export interface QueryParamsItems extends QueryParamsPage {
  type?: QueryParamsItemsType;
  sort?: QueryParamsItemsSort;
  range?: QueryParamsStatsRange;
  category?: CategoryMappingKeys;
}
