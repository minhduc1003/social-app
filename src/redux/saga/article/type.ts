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
  comments: userComment[];
  createdAt: string;
  updatedAt: string;
}[];
type userComment = {
  userId: string;
  text: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}