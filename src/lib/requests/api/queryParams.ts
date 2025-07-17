export interface QueueParamPage {
  page?: number;
}

export const QUERY_PARAM_CHANNEL_SORT_VALUES = ["recent", "oldest", "alphabetical", "top"] as const;
export const QUERY_PARAM_CHANNEL_TYPE_VALUES = ["all", "subscribed", "category"] as const;
export const QUERY_PARAM_CHANNEL_RANGE_VALUES = ["day", "week", "month", "all-time"] as const;

export interface QueryParamChannel extends QueueParamPage {
  sort?: typeof QUERY_PARAM_CHANNEL_SORT_VALUES[number];
  type?: typeof QUERY_PARAM_CHANNEL_TYPE_VALUES[number];
  range?: typeof QUERY_PARAM_CHANNEL_RANGE_VALUES[number];
}
