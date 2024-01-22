import axios from "axios";
import { getCookies } from "@/utils/cookies";
import { user } from "@/app/(Auth)/types/type";

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
