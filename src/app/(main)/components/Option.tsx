"use client";
import  { useEffect, useState } from "react";
import style from "../styles/heading.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "@/redux/feature/globalSlice";
import { appSelecter, dispatchType } from "@/redux/configureStore";

const Option = () => {
  const dispatch = useDispatch<dispatchType>();
  const { menuActive } = appSelecter((state) => state.global);
  const [isOpen, setIsOpen] = useState<boolean>(menuActive);
  useEffect(() => {
    dispatch(changeMenuActive(isOpen));
  }, [dispatch, isOpen]);
  return (
    <div className={style.option} onClick={() => setIsOpen(!isOpen)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
};

export default Option;
