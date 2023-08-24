import React from "react";
import style from "../styles/friendsList.module.scss";
const FriendList = () => {
  return (
    <aside className={style.aside}>
      <div className={style.inputWrap}>
        <input type="text" placeholder="Search friends!" />
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
      <div className={style.friendList}>
        {Array(20)
          .fill(0)
          .map((item, index) => (
            <div key={index} className={style.friendItem}>
              <div className={style.friendImageWrap}>
                <img src="./ava.png" alt="avata" />
              </div>
              <p>sdada</p>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default FriendList;
