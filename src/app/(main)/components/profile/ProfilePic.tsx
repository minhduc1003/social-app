"use client";
import React, { useEffect, useState } from "react";
import style from "../../styles/profile/profile.module.scss";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import axios from "axios";
import { getCookies } from "@/utils/cookies";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/feature/authSlice";
import { useParams } from "next/navigation";
import { user } from "@/app/(Auth)/types/type";
import { getUserData } from "@/redux/feature/userSlice";
const ProfilePic = () => {
  const cookie = getCookies();
  const { userData } = appSelecter((state) => state.user);
  const [render, setRender] = useState<user>()
  const param = useParams()
  const dispatch = useDispatch<dispatchType>();
  const handleUploadBG = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      const data = new FormData();
      data.append("image", image);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/image/bg`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${cookie}`,
          },
        }
      ).then(res => {
        // dispatch(getUserData(param.id as string))
      });
    }
  };
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      const data = new FormData();
      data.append("image", image);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/image/pt`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${cookie}`,
          },
        }
      ).then(res => {
        // dispatch(getUserData(param.id as string))
      });
    }
  };
  useEffect(() => {

    setRender(userData)

  }, [userData])
  return (
    <section className={style.topWrapper}>
      <label className={style.bgImage}>
        <img
          src={render?.profilePicture}
          alt="bgImage"
        />
        <input type="file" name="bgImage" onChange={handleUploadBG} />
      </label>
      <label className={style.avaImage}>
        <img src={render?.photo} alt="photo" />
        <input type="file" name="photo" onChange={handleUploadImage} />
      </label>
    </section>
  );
};

export default ProfilePic;
