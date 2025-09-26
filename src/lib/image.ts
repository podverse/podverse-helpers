import { DTOChannelImage, DTOItemImage } from "../dtos";

type ItemImagePartial = {
  image_width_size: number | null;
  url: string;
}

type Comparison = 'greater' | 'lesser' | null;
type AllowedExtension = 'png' | 'jpg' | 'gif' | 'jpeg';
type ValidExtension = 'png' | 'jpg' | 'gif';

export function findDTOChannelImageBySize(
  channelImages: DTOChannelImage[] | null | undefined,
  size: number | 'largest' | 'smallest',
  comparison: Comparison = null,
  allowedExtensions: AllowedExtension[] = ['png', 'jpg']
): ItemImagePartial | null {
  if (!channelImages || channelImages.length === 0) {
    return null;
  } else {
    return findImageBySize(channelImages, size, comparison, allowedExtensions);
  }
}

export function findDTOItemImageBySize(
  itemImages: DTOItemImage[] | null | undefined,
  size: number | 'largest' | 'smallest',
  comparison: Comparison = null,
  allowedExtensions: AllowedExtension[] = ['png', 'jpg']
): ItemImagePartial | null {
  if (!itemImages || itemImages.length === 0) {
    return null;
  } else {
    return findImageBySize(itemImages, size, comparison, allowedExtensions);
  }
}

export function findImageBySize(
  itemImages: ItemImagePartial[],
  size: number | 'largest' | 'smallest',
  comparison: Comparison = null,
  allowedExtensions: AllowedExtension[] = ['png', 'jpg']
): ItemImagePartial | null {
  const extensions: ValidExtension[] = allowedExtensions.map(ext => ext === 'jpeg' ? 'jpg' : ext) as ValidExtension[];
  const isValidExtension = (url: string) => {
    // Match .jpg, ?.jpg, etc. at the end of the URL (before query/hash)
    const match = url.match(/(\?|\.)(jpg|jpeg|png|gif|webp|svg)(?=($|\?|#))/i);

    if (!match) {
      return false;
    }

    const ext = match[2].toLowerCase() === 'jpeg' ? 'jpg' : match[2].toLowerCase();
    return extensions.includes(ext as ValidExtension);
  };

  if (size === 'largest') {
    const filtered = itemImages
      .filter(image => image.image_width_size !== null && isValidExtension(image.url))
      .sort((a, b) => (b.image_width_size! - a.image_width_size!));
    if (filtered.length > 0) {
      return filtered[0];
    }

    const nullSizeImage = itemImages.find(image => image.image_width_size === null && isValidExtension(image.url));
    return nullSizeImage || null;
  }
  if (size === 'smallest') {
    const filtered = itemImages
      .filter(image => image.image_width_size !== null && isValidExtension(image.url))
      .sort((a, b) => (a.image_width_size! - b.image_width_size!));
    if (filtered.length > 0) {
      return filtered[0];
    }
    
    const nullSizeImage = itemImages.find(image => image.image_width_size === null && isValidExtension(image.url));
    return nullSizeImage || null;
  }

  let filteredImages: ItemImagePartial[] = [];
  
  if (comparison === 'greater') {
    filteredImages = itemImages
      .filter(image => image.image_width_size !== null && image.image_width_size >= size && isValidExtension(image.url))
      .sort((a, b) => (a.image_width_size! - b.image_width_size!));
  } else if (comparison === 'lesser') {
    filteredImages = itemImages
      .filter(image => image.image_width_size !== null && image.image_width_size <= size && isValidExtension(image.url))
      .sort((a, b) => (b.image_width_size! - a.image_width_size!));
  }

  if (filteredImages.length > 0) {
    return filteredImages[0];
  }

  if (comparison === 'greater') {
    filteredImages = itemImages
      .filter(image => image.image_width_size !== null && image.image_width_size < size && isValidExtension(image.url))
      .sort((a, b) => (b.image_width_size! - a.image_width_size!));
  } else if (comparison === 'lesser') {
    filteredImages = itemImages
      .filter(image => image.image_width_size !== null && image.image_width_size > size && isValidExtension(image.url))
      .sort((a, b) => (a.image_width_size! - b.image_width_size!));
  }

  if (filteredImages.length > 0) {
    return filteredImages[0];
  }

  const nullSizeImage = itemImages.find(image => image.image_width_size === null && isValidExtension(image.url));
  
  return nullSizeImage || null;
}