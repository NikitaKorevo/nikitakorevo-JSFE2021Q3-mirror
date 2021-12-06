export interface DataNews {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface DataSources {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

export type DrawNewsData = {
  status: string;
  totalResults: number;
  articles: DataNews[];
};

export type DrawSourcesData = {
  status: string;
  sources: DataSources[];
};
