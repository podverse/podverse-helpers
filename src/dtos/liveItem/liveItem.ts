export interface DTOLiveItem {
  id: number;
  item_id: number;
  live_item_status: 1 | 2 | 3; // 1=Pending, 2=Live, 3=Ended
  start_time: string;
  end_time?: string | null;
  chat_web_url?: string | null;
}
