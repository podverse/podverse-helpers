export interface DTOItemEnclosure {
  id: number;
  item_id: number;
  type: string;
  length?: number | null;
  bitrate?: number | null;
  height?: number | null;
  language?: string | null;
  title?: string | null;
  rel?: string | null;
  codecs?: string | null;
  item_enclosure_default: boolean;
}
