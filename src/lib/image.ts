import { DTOChannelImage } from "../dtos";

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
  itemImages: ItemImagePartial[] | null | undefined,
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
    const urlWithoutParams = url.split('?')[0].split('#')[0];
    const extension = urlWithoutParams.split('.').pop()?.toLowerCase();
    return extension ? extensions.includes(extension === 'jpeg' ? 'jpg' : extension as ValidExtension) : false;
  };

  if (size === 'largest') {
    const filtered = itemImages
      .filter(image => image.image_width_size !== null && isValidExtension(image.url))
      .sort((a, b) => (b.image_width_size! - a.image_width_size!));
    return filtered[0] || null;
  }
  if (size === 'smallest') {
    const filtered = itemImages
      .filter(image => image.image_width_size !== null && isValidExtension(image.url))
      .sort((a, b) => (a.image_width_size! - b.image_width_size!));
    return filtered[0] || null;
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