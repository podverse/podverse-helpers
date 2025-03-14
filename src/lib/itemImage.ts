type ItemImagePartial = {
  image_width_size: number | null;
  url: string;
}

type Comparison = 'greater' | 'lesser';
type AllowedExtension = 'png' | 'jpg' | 'gif' | 'jpeg';
type ValidExtension = 'png' | 'jpg' | 'gif';

export function findImageBySize(
  itemImages: ItemImagePartial[],
  size: number,
  comparison: Comparison,
  allowedExtensions: AllowedExtension[] = ['png', 'jpg']
): ItemImagePartial | null {
  const extensions: ValidExtension[] = allowedExtensions.map(ext => ext === 'jpeg' ? 'jpg' : ext) as ValidExtension[];
  const isValidExtension = (url: string) => {
    const urlWithoutParams = url.split('?')[0].split('#')[0];
    const extension = urlWithoutParams.split('.').pop()?.toLowerCase();
    return extension ? extensions.includes(extension === 'jpeg' ? 'jpg' : extension as ValidExtension) : false;
  };

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