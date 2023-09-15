import axios from "axios";
import { getCookies } from "@/utils/cookies";
import { TArticle } from "./type";

export const getArticlesApi = async () => {
  const cookie = getCookies();
  if (cookie) {
    return await axios.get<TArticle>(
      `${process.env.NEXT_PUBLIC_API_URL}api/post/getDashboardPost`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
  }
};
