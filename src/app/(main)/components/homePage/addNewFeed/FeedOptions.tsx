"use client";
import { useState } from "react";
import style from "../../../styles/homePageStyle/feed.module.scss";
import { useDispatch } from "react-redux";
import { dispatchType } from "@/redux/configureStore";
import { getArticles } from "@/redux/feature/articleSlice";
import axiosInstance from "@/app/api/configAxios";
const FeedOptions = ({id}:{id:string}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<dispatchType>();
  const handleDelete = async()=>{
    await axiosInstance.delete(`api/post/delete/${id}`).then(()=>{
      dispatch(getArticles())
    })
  }
  return (
    <div className={style.wrapOption} onClick={() => setOpen(!open)}>
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
      {open && (
        <div className={style.options}>
          <div className={style.optionchild} onClick={handleDelete}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </span>
            <p>Delete Post</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedOptions;
