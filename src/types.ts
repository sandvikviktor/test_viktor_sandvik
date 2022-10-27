export type TvShowResponse = {
  score: number;
  show: TvShow;
};

export type TvShowSeason = {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number;
  premiereDate?: string;
  endDate?: string;
  network?: any;
  webChannel: WebChannel;
  image: Image;
  summary: string;
  _links: Links;
};

export type TvShow = {
  id: string;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel?: any;
  dvdCountry?: any;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: Links;
};

type Links = {
  self: Self;
  previousepisode: Self;
};

type Self = {
  href: string;
};

type Image = {
  medium?: string;
  original?: string;
};

type Externals = {
  tvrage: number;
  thetvdb: number;
  imdb: string;
};

type Network = {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
};

type Country = {
  name: string;
  code: string;
  timezone: string;
};

type Rating = {
  average: number;
};

type Schedule = {
  time: string;
  days: string[];
};

type WebChannel = {
  id: number;
  name: string;
  country?: any;
  officialSite: string;
};
