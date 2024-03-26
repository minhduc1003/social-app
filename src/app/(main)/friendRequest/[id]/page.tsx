"use client";

import { appSelecter, dispatchType } from "@/redux/configureStore";
import FriendList from "../../components/FriendList";
import style from "../../styles/notification/noti.module.scss";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { getUser } from "@/redux/feature/authSlice";
import { getUserData } from "@/redux/feature/userSlice";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axiosInstance from "@/app/api/configAxios";
import Image from "next/image";
const Notification = () => {
  const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
    transports: ["websocket"],
  });
  const { user } = appSelecter((state) => state.auth);
  const dispatch = useDispatch<dispatchType>();
  const params = useParams();
  const acceptNewFriend = async (id: string) => {
    try {
      await axiosInstance.get(`api/user/accept/${id}`);
      dispatch(getUser());
      dispatch(getUserData(params.id));
    } catch (error) {
      console.log(error);
    }
  };
  const unAcceptNewFriend = async (id: string) => {
    try {
      await axiosInstance.get(`api/user/unAccept/${id}`);
      dispatch(getUser());
      dispatch(getUserData(params.id));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    socket.on("sent_notification", (data) => {
      dispatch(getUser());
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <>
      <section className={style.container}>
        {user?.notification &&
          user?.notification.length > 0 &&
          user?.notification.map((item, i) => (
            <div key={i} className={style.notiItem}>
              <div className={style.imageWrapper}>
                <Image
                  src={item.image || ""}
                  alt="img"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={style.textWrapper}>
                <h3>{item.name}</h3>
                <p>{item.des}</p>
              </div>
              <div className={style.iconWrapper}>
                <div
                  className={style.itemIcon}
                  onClick={() => acceptNewFriend(item.userId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div
                  className={style.itemIcon}
                  onClick={() => unAcceptNewFriend(item.userId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </section>
      <FriendList />
    </>
  );
};

export default Notification;
