"use client";
import React, { useState } from "react";
import style from "../../../styles/homePageStyle/addNewFeed/addNewFeed.module.scss";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import ModalAddNew from "./ModalAddNew";
import { useDispatch } from "react-redux";
import { openAddArticle, openImage, openModal } from "@/redux/feature/modal";

const AddNewFeed = () => {
  const { user } = appSelecter((state) => state.auth);
  const dispatch = useDispatch<dispatchType>();
  const { isOpenImage, isOpenModal } = appSelecter((state) => state.modal);
  return (
    <div className={style.wrap}>
      <div className={style.topWrap}>
        <div className={style.avatarWrap}>
          <img src={user?.photo} alt="ava" />
        </div>
        <ModalAddNew data={user}></ModalAddNew>
      </div>
      <div className={style.botWrap}>
        <div className={style.feature}>
          <span
            onClick={() => {
              dispatch(openModal(true));
              dispatch(openAddArticle(true));
              dispatch(openImage(true));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </span>
          <p>Photo</p>
        </div>
        <div className={style.feature}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </span>
          <p>Live Video</p>
        </div>
        <div className={style.feature}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </span>
          <p>Feeling</p>
        </div>
      </div>
    </div>
  );
};

export default AddNewFeed;
