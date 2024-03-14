import { user } from "@/app/(Auth)/types/type";
import axiosInstance from "@/app/api/configAxios";

export const getUser = async (id: string) => {
    return await axiosInstance.get<user>(
      `api/user/getAnotherUser/${id}`
    );
  
};
