import { CategoryMappingKeys } from "../../category";

export interface QueueParamPage {
  page?: number;
}

export const QUERY_PARAMS_STATS_RANGE_VALUES = ["day", "week", "month", "all-time"] as const;

export type QueryParamsStatsRange = typeof QUERY_PARAMS_STATS_RANGE_VALUES[number];

export const QUERY_PARAMS_CHANNELS_TYPE_VALUES = ["all", "subscribed", "category"] as const;
export const QUERY_PARAMS_CHANNELS_SORT_VALUES = ["recent", "oldest", "alphabetical", "top"] as const;

export type QueryParamsChannelsType = typeof QUERY_PARAMS_CHANNELS_TYPE_VALUES[number];
export type QueryParamsChannelsSort = typeof QUERY_PARAMS_CHANNELS_SORT_VALUES[number];

export interface QueryParamChannels extends QueueParamPage {
  type?: QueryParamsChannelsType;
  sort?: QueryParamsChannelsSort;
  range?: QueryParamsStatsRange;
  category?: CategoryMappingKeys;
}
