import { TArticle } from "./type";
import axiosInstance from "@/app/api/configAxios";

export const getArticlesApi = async () => {
    return await axiosInstance.get<TArticle>(
      `api/post/getPostIncludeFriend`
    );
};
