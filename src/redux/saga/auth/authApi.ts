import axios from "axios";
import { user } from "./type";
import { getCookies } from "@/utils/cookies";

export const getUser = async () => {
  const cookie = getCookies();
  if (cookie) {
    return await axios.get<user>(
      `${process.env.NEXT_PUBLIC_API_URL}api/user/getuser`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
  }
};
