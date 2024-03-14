import { user } from "@/app/(Auth)/types/type";
import axiosInstance from "@/app/api/configAxios";

export const getUser = async () => {
    return await axiosInstance.get<user>(
      `api/user/getuser`
    );
};
