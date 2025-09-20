import { DTOItemEnclosureSource } from "src/dtos";
import { DTOItemEnclosure } from "../../dtos/item/itemEnclosure";

const ALLOWED_TYPES = [
  "audio/mpeg",
  "audio/opus",
  "audio/aac",
  "video/mp4",
  "application/x-mpegURL"
];

export function getEnclosure(
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

export function getEnclosureSource(
  enclosure?: DTOItemEnclosure
): DTOItemEnclosureSource | undefined {
  return enclosure?.item_enclosure_sources?.[0];
}
