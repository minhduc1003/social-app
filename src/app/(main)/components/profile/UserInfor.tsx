"use client";
import React from "react";
import style from "../../styles/profile/profile.module.scss";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import { useDispatch } from "react-redux";
import { openBasicInfo, openModal } from "@/redux/feature/modal";
import ChangeBasicInfo from "./ChangeBasicInfo";

const UserInfor = () => {
  const dispatch = useDispatch<dispatchType>();
  const { isOpenBasicInfo } = appSelecter((state) => state.modal);
  return (
    <section className={style.userInfo}>
      <div className={style.nameAndBasicInfo}>
        <div className={style.name}>
          <h2>duc</h2>
        </div>
        <div className={style.basicInfo}>
          <p>asds</p>
        </div>
      </div>
      <div
        className={style.btnEdit}
        onClick={() => {
          dispatch(openBasicInfo(true));
          dispatch(openModal(true));
        }}
      >
        edit basic info
      </div>
      {isOpenBasicInfo && <ChangeBasicInfo></ChangeBasicInfo>}
    </section>
  );
};

export default UserInfor;
