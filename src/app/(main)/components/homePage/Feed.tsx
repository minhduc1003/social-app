import React from "react";
import style from "../../styles/homePageStyle/feed.module.scss";

const Feed = () => {
  return (
    <div className={style.wrap}>
      <div className={style.wrapTop}>
        <div className={style.wrapTopLeft}>
          <div className={style.avatarWrap}>
            <img src="./ava.png" alt="ava" />
          </div>
          <div className={style.wrapText}>
            <h3>ada</h3>
            <p>asdsa</p>
          </div>
        </div>
        <div className={style.wrapOption}>
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
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className={style.wrapCenter}>
        <div className={style.contentImage}>
          <img
            src="https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80"
            alt="img"
          />
        </div>
      </div>
      <div className={style.contentDetail}>
        <p>
          <span>10</span>
          Comments
        </p>
        <p>
          <span>10</span>
          Share
        </p>
      </div>
      <div className={style.communicate}>
        <div className={style.line}></div>
        <div className={style.communicateWrap}>
          <div className={style.communicateItem}>
            <p>Like</p>
          </div>
          <div className={style.communicateItem}>
            <p>Comments</p>
          </div>
          <div className={style.communicateItem}>
            <p>Share</p>
          </div>
        </div>
        <div className={style.line}></div>
      </div>
      <div className={style.commentText}>
        <div className={style.avatarWrap}>
          <img src="./ava.png" alt="ava" />
        </div>
        <input
          placeholder="write a comment..."
          type="text"
          name=""
          id=""
          className={style.inputText}
        />
        <div className={style.buttonSentComment}>
          <img src="./sent.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Feed;
