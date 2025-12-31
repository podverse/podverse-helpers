import { DTOChannel } from "./channel/channel";
import { DTOItem } from "./item/item";
import { PodcastBatchByFeedGuidResponse } from "./podcast-index/podcastBatchByFeedGuid";

export interface RemoteItemResponse {
  channelsAdded: DTOChannel[];
  channelsUnadded: PodcastBatchByFeedGuidResponse['feeds'];
  itemsAdded: DTOItem[];
  itemsUnadded: DTOItem[];
}

export type RemoteItemGeneric = {
  feed_guid: string;
  feed_url: string | null;
  item_guid: string | null;
}
