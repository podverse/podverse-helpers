import { DTOClip } from "../clip";
import { DTOItem } from "../item/item";
import { DTOItemChapter } from "../item/itemChapter";
import { DTOItemSoundbite } from "../item/itemSoundbite";

export interface DTOPlaylistResource {
  id: number;
  playlist_id: number;
  list_position: string;
  clip?: DTOClip;
  item?: DTOItem;
  item_chapter?: DTOItemChapter;
  item_soundbite?: DTOItemSoundbite;
  add_by_rss_hash_id?: string;
  add_by_rss_resource_data?: object;
}

export interface DTOPlaylistResourceIdsOnly {
  clip_id?: number;
  item_id?: number;
  item_chapter_id?: number;
  item_soundbite_id?: number;
  add_by_rss_hash_id?: string;
}
