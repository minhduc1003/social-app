import Image from "next/image";
import React from "react";
import style from "../styles/heading.module.scss";
import Option from "./Option";
const Heading = () => {
  return (
    <header className={style.header}>
      <div className={style.headerWrap}>
        <div className={style.headingleft}>
          <div className={style.logoWrap}>
            <img src="./logo.png" alt="logo" />
          </div>
          <Option />
        </div>

        <div className={style.headingRight}>
          <div className={style.inputWrap}>
            <input type="text" placeholder="Search for something here..." />
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
          </div>
          <div className={style.userWrap}>
            <p>ducdzvcc</p>
            <div>
              <img src="./ava.png" alt="ava" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Heading;
