import { DTOClip } from "../clip";
import { DTOItem } from "../item/item";
import { DTOItemSoundbite } from "../item/itemSoundbite";

export interface DTOQueueResource {
  id: number;
  playlist_id: number;
  list_position: string;
  playback_position: string;
  media_file_duration: string;
  completed: boolean;
  clip?: DTOClip;
  item?: DTOItem;
  item_soundbite?: DTOItemSoundbite;
  add_by_rss_hash_id?: string;
  add_by_rss_resource_data?: object;
}

export interface DTOQueueResourceAbridged {
  i: number; // id
  p: string; // playback_position
  d: string; // media_file_duration
  z?: boolean; // completed
  c?: number; // clip_id
  t?: number; // item_id
  s?: number; // item_soundbite_id
  a?: string; // add_by_rss_hash_id
}
