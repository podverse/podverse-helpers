export interface DTOFeed {
  id: number;
  url: string;
  feed_flag_status_id: number;
  is_parsing: string | null; // ISO string
  parsing_priority: number;
  last_parsed_file_hash: string | null;
  container_id: string | null;
  channel_id: number;
  created_at: string;
  updated_at: string;
}
