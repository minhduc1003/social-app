"use client";
import React, { useEffect } from "react";
import style from "../../styles/profile/profile.module.scss";
import { appSelecter, dispatchType } from "@/redux/configureStore";
const ProfilePic = () => {
  const { userData } = appSelecter((state) => state.user);
  return (
    <section className={style.topWrapper}>
      <div className={style.bgImage}>
        <img
          src="https://images.unsplash.com/photo-1453792963263-c85413bfdb63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="bgImage"
        />
      </div>
      <div className={style.avaImage}>
        <img src={userData?.photo} alt="" />
      </div>
    </section>
  );
};

export default ProfilePic;
