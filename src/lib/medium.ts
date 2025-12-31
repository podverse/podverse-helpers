export enum MediumEnum {
  Publisher = 1,
  Podcast = 2,
  Music = 3,
  Video = 4,
  Film = 5,
  Audiobook = 6,
  Newsletter = 7,
  Blog = 8,
  Course = 9,
  Mixed = 10,
  PodcastL = 11,
  MusicL = 12,
  VideoL = 13,
  FilmL = 14,
  AudiobookL = 15,
  NewsletterL = 16,
  BlogL = 17,
  PublisherL = 18,
  CourseL = 19,
  AV = 20
}

export function getMediumEnumValue(input: string | null): MediumEnum {
  const sanitizedInput = input?.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');

  const mapping: { [key: string]: MediumEnum } = {
    publisher: MediumEnum.Publisher,
    podcast: MediumEnum.Podcast,
    music: MediumEnum.Music,
    video: MediumEnum.Video,
    film: MediumEnum.Film,
    audiobook: MediumEnum.Audiobook,
    newsletter: MediumEnum.Newsletter,
    blog: MediumEnum.Blog,
    course: MediumEnum.Course,
    mixed: MediumEnum.Mixed,
    podcastl: MediumEnum.PodcastL,
    musicl: MediumEnum.MusicL,
    videol: MediumEnum.VideoL,
    filml: MediumEnum.FilmL,
    audiobookl: MediumEnum.AudiobookL,
    newsletterl: MediumEnum.NewsletterL,
    blogl: MediumEnum.BlogL,
    publisherl: MediumEnum.PublisherL,
    coursel: MediumEnum.CourseL,
    av: MediumEnum.AV
  };

  return (sanitizedInput && mapping[sanitizedInput]) || MediumEnum.Podcast;
}

export const supportedPlaylistMediums: { [key: number]: boolean } = {
  [MediumEnum.AV]: true,
  [MediumEnum.Music]: true
};

export const supportedQueueMediums: { [key: number]: boolean } = {
  [MediumEnum.AV]: true,
  [MediumEnum.Music]: true
};

export const QUERY_PARAMS_MEDIUMS = ["all", "podcasts", "videos", "music", "av", "publisher-av", "publisher-music"] as const;
export type QueryParamsMedium = typeof QUERY_PARAMS_MEDIUMS[number];

export const QUERY_PARAMS_QUEUE_MEDIUMS = ["all", "av", "music", "publisher-av", "publisher-music"] as const;
export type QueryParamsQueueMedium = typeof QUERY_PARAMS_QUEUE_MEDIUMS[number];

export const getMediumFromQueryParam = (val: QueryParamsMedium): MediumEnum | null => {
  switch (val) {
  case "podcasts":
    return MediumEnum.Podcast;
  case "videos":
    return MediumEnum.Video;
  case "av":
    return MediumEnum.AV;
  case "music":
    return MediumEnum.Music;
  case "publisher-av": // TODO
    return MediumEnum.Publisher;
  case "publisher-music": // TODO
    return MediumEnum.Publisher;
  case "all":
  default:
    return null;
  }
};

export const getQueryParamFromMediumId = (mediumId: number | null): QueryParamsMedium => {
  switch (mediumId) {
  case MediumEnum.Podcast:
    return "podcasts";
  case MediumEnum.Video:
    return "videos";
  case MediumEnum.AV:
    return "av";
  case MediumEnum.Music:
    return "music";
  case MediumEnum.Publisher:
    return "publisher-music"; // TODO: need separate handling for publisher-av
  default:
    return "all";
  }
};

export const getQueryParamFromQueueMediumId = (mediumId: number | null): QueryParamsQueueMedium => {
  switch (mediumId) {
  case MediumEnum.AV:
    return "av";
  case MediumEnum.Podcast:
    return "av";
  case MediumEnum.Video:
    return "av";
  case MediumEnum.Music:
    return "music";
  default:
    return "all";
  }
};

export const getMediumIdArrayFromType = (type: QueryParamsMedium | null): number[] | null => {
  switch (type) {
  case "podcasts":
    return [MediumEnum.Podcast];
  case "videos":
    return [MediumEnum.Video];
  case "music":
    return [MediumEnum.Music];
  case "av":
    return [MediumEnum.Podcast, MediumEnum.Video];
  case "publisher-av": // TODO
    return [MediumEnum.Publisher];
  case "publisher-music": // TODO
    return [MediumEnum.Publisher];
  case "all":
  default:
    return null;
  }
};

export const getQueueMediumIdFromType = (type: QueryParamsQueueMedium | null): MediumEnum | null => {
  switch (type) {
  case "av":
    return MediumEnum.AV;
  case "music":
    return MediumEnum.Music;
  default:
    return null;
  }
};

export const getQueueMediumIdFromMediumId = (mediumId: number | null): MediumEnum | null => {
  return getQueueMediumIdFromType(getQueryParamFromQueueMediumId(mediumId));
};
