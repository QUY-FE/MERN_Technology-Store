export interface News {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  author: string;
  status: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateNewsDto = {
  title: string;
  slug: string;
  thumbnail?: string;
  content: string;
  author: string;
  status: string;
};

export type UpdateNewsDto = Partial<CreateNewsDto>;
