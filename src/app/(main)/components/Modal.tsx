"use client";
import React, { ReactNode, useRef, useState } from "react";
import style from "../styles/modal.module.scss";
import useClickOutside from "@/hooks/useClickOutSide";
import { useDispatch } from "react-redux";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import {
  openAddArticle,
  openBasicInfo,
  openChangeDetailProfile,
  openModal,
} from "@/redux/feature/modal";

const Modal = ({ children }: { children: ReactNode }) => {
  // const [isOpen, setIsOpen] = useState<boolean>(true);
  const divRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<dispatchType>();
  const { isOpenImage, isOpenModal } = appSelecter((state) => state.modal);
  useClickOutside(divRef, () => {
    dispatch(openModal(false));
    dispatch(openAddArticle(false));
    dispatch(openChangeDetailProfile(false));
    dispatch(openBasicInfo(false));
  });

  return (
    <>
      {isOpenModal && (
        <div className={style.overlay}>
          <div className={style.modal} ref={divRef}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
