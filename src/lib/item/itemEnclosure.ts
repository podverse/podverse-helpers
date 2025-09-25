import { DTOItemEnclosureSource } from "src/dtos";
import { DTOItemEnclosure } from "../../dtos/item/itemEnclosure";

const ALLOWED_TYPES = [
  "audio/mpeg",
  "audio/opus",
  "audio/aac",
  "video/mp4",
  "application/x-mpegURL"
];

const EXTENSION_MEDIA_TYPE_MAP: Record<string, "audio" | "video"> = {
  "mp3": "audio",
  "aac": "audio",
  "opus": "audio",
  "m4a": "audio",
  "ogg": "audio",
  "wav": "audio",
  "mp4": "video",
  "m4v": "video",
  "webm": "video",
  "mov": "video",
  "mkv": "video"
};

export function getMediaTypeFromSource(uri: string): "audio" | "video" | undefined {
  const urlWithoutParams = uri.split(/[?#]/)[0];
  const match = urlWithoutParams.match(/\.([a-z0-9]+)$/i);
  if (!match) return undefined;
  const ext = match[1].toLowerCase();
  return EXTENSION_MEDIA_TYPE_MAP[ext];
}

export function getItemEnclosure(
  enclosures: DTOItemEnclosure[],
  type: string
): DTOItemEnclosure | undefined {
  if (type === "default") {
    return enclosures.find(e => e.item_enclosure_default);
  }
  if (ALLOWED_TYPES.includes(type)) {
    return enclosures.find(e => e.type === type);
  }
  return undefined;
}

export function getItemEnclosureSource(
  enclosure?: DTOItemEnclosure
): DTOItemEnclosureSource | undefined {
  return enclosure?.item_enclosure_sources?.[0];
}

export function getSelectedItemEnclosureUrl(item_enclosures: DTOItemEnclosure[]): string | undefined {
  const selectedItemEnclosure = getItemEnclosure(item_enclosures, "default");
  const selectedItemEnclosureSource = getItemEnclosureSource(selectedItemEnclosure);
  return selectedItemEnclosureSource?.uri;
}
