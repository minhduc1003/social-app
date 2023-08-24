"use client";
import React, { useState } from "react";
import style from "../styles/heading.module.scss";

const Option = () => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className={style.option}>
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
