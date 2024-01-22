export type TArticle = {
  _id: string;
  userId: string;
  text: string;
  image?: {
    fileName: string;
    mimeType: string;
    url: string;
    size: string;
  };
  likes: string[];
  createdAt: string;
  updatedAt: string;
}[];
