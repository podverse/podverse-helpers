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

export function getMediumEnumValue(input: string | null): MediumEnum | null {
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

  return (sanitizedInput && mapping[sanitizedInput]) || null;
}

const supportedMediums: { [key: number]: boolean } = {
  [MediumEnum.Publisher]: true,
  [MediumEnum.Podcast]: true,
  [MediumEnum.Music]: true,
  [MediumEnum.Video]: true,
  [MediumEnum.Film]: true,
  [MediumEnum.Audiobook]: true,
  [MediumEnum.Newsletter]: false,
  [MediumEnum.Blog]: false,
  [MediumEnum.Course]: false,
  [MediumEnum.Mixed]: false,
  [MediumEnum.PodcastL]: false,
  [MediumEnum.MusicL]: false,
  [MediumEnum.VideoL]: false,
  [MediumEnum.FilmL]: false,
  [MediumEnum.AudiobookL]: false,
  [MediumEnum.NewsletterL]: false,
  [MediumEnum.BlogL]: false,
  [MediumEnum.PublisherL]: false,
  [MediumEnum.CourseL]: false
};

export const checkIfSupportedMedium = (mediumEnumKey: number | null): boolean => {
  return (mediumEnumKey && supportedMediums[mediumEnumKey]) || false;
};
