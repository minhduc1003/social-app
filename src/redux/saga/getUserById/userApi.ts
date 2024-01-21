import axios from "axios";
import { user } from "./type";
import { getCookies } from "@/utils/cookies";

export const getUser = async (id: string) => {
  const cookie = getCookies();
  if (cookie) {
    return await axios.get<user>(
      `${process.env.NEXT_PUBLIC_API_URL}api/user/getAnotherUser/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
  }
};