import { DTOItemEnclosureSource } from "src/dtos";
import { DTOItemEnclosure } from "../../dtos/item/itemEnclosure";
import { formatBitrate, FormattedBitrate } from "../bitrate";

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

function getItemEnclosure(
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

function getItemEnclosureSource(
  enclosure?: DTOItemEnclosure
): DTOItemEnclosureSource | undefined {
  return enclosure?.item_enclosure_sources?.[0];
}

export function getSelectedItemEnclosureUrl(item_enclosures: DTOItemEnclosure[]): string | undefined {
  const selectedItemEnclosure = getItemEnclosure(item_enclosures, "default");
  const selectedItemEnclosureSource = getItemEnclosureSource(selectedItemEnclosure);
  return selectedItemEnclosureSource?.uri;
}

export interface LabeledItemEnclosure {
  enclosure: DTOItemEnclosure;
  mediaType: "audio" | "video";
  label: "audio" | "video"; // base media type label for translation key lookups
  audioBitrate?: FormattedBitrate; // present when mediaType === 'audio' and bitrate is available
  videoHeight?: number; // present when mediaType === 'video' and height is available
  fileExtension?: string; // lowercase extension (e.g. mp3, mp4, mov, ogg) if derivable
}

export function buildLabeledItemEnclosures(
  enclosures: DTOItemEnclosure[]
): LabeledItemEnclosure[] {
  const sorted = [...enclosures].sort((a, b) => {
    if (a.item_enclosure_default === b.item_enclosure_default) return 0;
    return a.item_enclosure_default ? -1 : 1;
  });

  return sorted.map((e) => {
    let mediaType: "audio" | "video";
    if (e.height != null) {
      mediaType = "video";
    } else if (e.type?.startsWith("video/")) {
      mediaType = "video";
    } else {
      mediaType = "audio";
    }

    const labeled: LabeledItemEnclosure = {
      enclosure: e,
      mediaType,
      label: mediaType
    };

    if (mediaType === "audio" && e.bitrate) {
      labeled.audioBitrate = formatBitrate(e.bitrate);
    }
    if (mediaType === "video" && e.height) {
      labeled.videoHeight = e.height;
    }

    // Derive file extension from first source URI if present, else fallback to mime type mapping.
    const source = e.item_enclosure_sources?.[0];
    let ext: string | undefined;
    if (source?.uri) {
      const urlWithoutParams = source.uri.split(/[?#]/)[0];
      const match = urlWithoutParams.match(/\.([a-z0-9]+)$/i);
      if (match) {
        ext = match[1].toLowerCase();
      }
    }
    if (!ext && e.type) {
      // Map common mime types to typical file extensions.
      const mime = e.type.toLowerCase();
      const mimeMap: Record<string, string> = {
        'audio/mpeg': 'mp3',
        'audio/opus': 'opus',
        'audio/aac': 'aac',
        'audio/ogg': 'ogg',
        'audio/wav': 'wav',
        'video/mp4': 'mp4',
        'video/quicktime': 'mov',
        'video/x-matroska': 'mkv',
        'application/x-mpegurl': 'm3u8'
      };
      ext = mimeMap[mime];
    }
    if (ext) {
      labeled.fileExtension = ext;
    }

    return labeled;
  });
}
