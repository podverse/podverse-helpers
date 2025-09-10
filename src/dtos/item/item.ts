import { DTOLiveItem } from "../liveItem/liveItem";

export interface DTOItem {
  id: number;
  id_text: string;
  slug?: string | null;
  channel_id: number;
  guid?: string | null;
  guid_enclosure_url?: string | null;
  pub_date?: string | null;
  title?: string | null;
  item_flag_status_id: number;
  live_item?: DTOLiveItem | null;
}
