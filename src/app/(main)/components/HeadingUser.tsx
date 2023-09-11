"use client";

import React, { useEffect } from "react";
import style from "../styles/heading.module.scss";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/feature/authSlice";
import { getCookies } from "@/utils/cookies";

const HeadingUser = () => {
  const { user } = appSelecter((state) => state.auth);
  const dispatch = useDispatch<dispatchType>();

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);
  return (
    <div className={style.userWrap}>
      <p>{user?.name}</p>
      <div>
        <img src={user?.photo} alt="ava" />
      </div>
    </div>
  );
};

export default HeadingUser;
