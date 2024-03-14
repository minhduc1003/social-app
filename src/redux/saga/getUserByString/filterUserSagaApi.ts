import { user } from "@/app/(Auth)/types/type";
import axiosInstance from "@/app/api/configAxios";

export const getFilter = async (name: string) => {
    return await axiosInstance.get<user[]>(
      `api/user/search?name=${name}`
    );
};
