"use client";
import React, { useEffect } from "react";
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
import { io } from "socket.io-client";

const UserInfor = () => {
  const socket = io('http://localhost:3009', { transports: ['websocket'] });
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
          `${process.env.NEXT_PUBLIC_API_URL}api/user/follow/${params.id}`,
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
      console.log(error);
    }
  }
  const unFollowUser = async () => {
    try {
      if (cookie) {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/user/unfollow/${params.id}`,
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
      console.log(error);
    }
  }
  useEffect(() => {
    socket.on('sent_Accepted', (data) => {
      dispatch(getUser())
    })
  }, [socket]);
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
        user?._id !== userData?._id && !user?.friend?.some((item) => item.userId == params.id) && (
          <div className={style.btnEdit} onClick={followUser}>
            Add new
          </div>
        )
      }
      {
        user?._id !== userData?._id && user?.friend?.some((item) => item.status == "Pending") && (
          <div className={style.btnEdit}>
            Requested
          </div>
        )
      }
      {
        user?._id !== userData?._id && user?.friend?.some((item) => item.userId == params.id) && user?.friend?.some((item) => item.status == "Accepted") && (
          <div className={style.btnEdit} onClick={unFollowUser}>
            Friend
          </div>
        )
      }
    </section>
  );
};

export default UserInfor;
