"use client";
import React from "react";
import style from "../../styles/profile/profile.module.scss";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import { useDispatch } from "react-redux";
import { openBasicInfo, openModal } from "@/redux/feature/modal";
import ChangeBasicInfo from "./ChangeBasicInfo";
import { getCookies } from "@/utils/cookies";
import { useParams } from "next/navigation";
import axios from "axios";
import { getUserData } from "@/redux/feature/userSlice";
import { getUser } from "@/redux/feature/authSlice";

const UserInfor = () => {
  const dispatch = useDispatch<dispatchType>();
  const { userData } = appSelecter((state) => state.user);
  const { user } = appSelecter((state) => state.auth);
  const { isOpenBasicInfo } = appSelecter((state) => state.modal);
  const cookie = getCookies();
  const params = useParams();
  const followUser = async () => {
    try {
      if (cookie) {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/user/${params.id}/follow`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        dispatch(getUser())
        dispatch(getUserData(params.id))
      }
    } catch (error) {

    }
  }
  const unFollowUser = async () => {
    try {
      if (cookie) {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/user/${params.id}/unfollow`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        dispatch(getUser())
        dispatch(getUserData(params.id))
      }
    } catch (error) {

    }
  }
  return (
    <section className={style.userInfo}>
      <div className={style.nameAndBasicInfo}>
        <div className={style.name}>
          <h2>{userData?.name}</h2>
        </div>
        <div className={style.basicInfo}>
          <p>{userData?.bio}</p>
        </div>
      </div>
      {
        user?._id === userData?._id && (
          <div
            className={style.btnEdit}
            onClick={() => {
              dispatch(openBasicInfo(true));
              dispatch(openModal(true));
            }}
          >
            edit basic info
          </div>
        )
      }
      {
        user?._id === userData?._id && (
          isOpenBasicInfo && <ChangeBasicInfo></ChangeBasicInfo>
        )
      }
      {
        user?._id !== userData?._id && !user?.followings?.includes(params.id as never) && (
          <div className={style.btnEdit} onClick={followUser}>
            followings
          </div>
        )
      }
      {
        user?._id !== userData?._id && user?.followings?.includes(params.id as never) && (
          <div className={style.btnEdit} onClick={unFollowUser}>
            followed
          </div>
        )
      }
    </section>
  );
};

export default UserInfor;
