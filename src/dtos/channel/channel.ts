export interface DTOChannel {
  id: number;
  id_text: string;
  slug: string | null;
  feed_id: number;
  podcast_index_id: number;
  podcast_guid: string | null;
  title: string | null;
  sortable_title: string | null;
  medium: string | null;
  has_podcast_index_value: boolean;
  has_value_time_splits: boolean;
}
