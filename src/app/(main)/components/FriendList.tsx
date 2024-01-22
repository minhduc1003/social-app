'use client'
import React from "react";
import style from "../styles/homePageStyle/friendsList.module.scss";
import { appSelecter } from "@/redux/configureStore";
import { useRouter } from "next/navigation";
const FriendList = () => {
  const { user } = appSelecter((state) => state.auth);
  const router = useRouter();
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
        {user?.friend && user.friend
          .map((item, index) => (
            <div key={index} className={style.friendItem} onClick={() => router.push(`messages/${item.userId}`)}>
              <div className={style.friendImageWrap}>
                <img src={item.image} alt="avata" />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default FriendList;
