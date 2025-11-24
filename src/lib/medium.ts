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
  CourseL = 19
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
    coursel: MediumEnum.CourseL
  };

  return (sanitizedInput && mapping[sanitizedInput]) || MediumEnum.Podcast;
}

export const supportedPlaylistMediums: { [key: number]: boolean } = {
  [MediumEnum.Podcast]: true,
  [MediumEnum.Music]: true,
  [MediumEnum.Video]: true
};

export const supportedQueueMediums: { [key: number]: boolean } = {
  [MediumEnum.Podcast]: true,
  [MediumEnum.Music]: true,
  [MediumEnum.Video]: true
};

export const QUERY_PARAMS_MEDIUMS = ["all", "podcasts", "videos", "music"] as const;
export type QueryParamsMedium = typeof QUERY_PARAMS_MEDIUMS[number];

export const getMediumFromQueryParam = (val: QueryParamsMedium): MediumEnum | null => {
  switch (val) {
  case "podcasts":
    return MediumEnum.Podcast;
  case "videos":
    return MediumEnum.Video;
  case "music":
    return MediumEnum.Music;
  case "all":
  default:
    return null;
  }
};
