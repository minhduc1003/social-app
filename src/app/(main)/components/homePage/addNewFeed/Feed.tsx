"use client";
import React, { useEffect, useState } from "react";
import style from "../../../styles/homePageStyle/feed.module.scss";
import FeedOptions from "./FeedOptions";
import { appSelecter } from "@/redux/configureStore";
import Image from "next/image";
import { TArticle } from "@/redux/saga/article/type";
import axios from "axios";
import { getCookies } from "@/utils/cookies";

const Feed = ({ Id }: { Id: string | null | undefined }) => {
  const [post, setPost] = useState<TArticle>([]);
  const { user } = appSelecter((state) => state.auth);
  const cookie = getCookies();
  const { article } = appSelecter((state) => state.article);
  const getPostById = async (postId: string) => {
    if (cookie) {
      const data = await axios.get<TArticle>(
        `${process.env.NEXT_PUBLIC_API_URL}api/post/getPost/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
        }
      ).then(response =>
        setPost(response.data)

      )
    }
  }
  const handleLike = async (id: string) => {
    if (cookie) {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/post/likes/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${cookie}`,
            },
          }
        ).then(response => {
          console.log(response.data);
          let arrayForSort = [...post]
          arrayForSort.forEach((element, index) => {
            if (element._id === response?.data._id) {
              arrayForSort[index] = response?.data;
            }
          })
          setPost(arrayForSort)
        });
      } catch (error) {
        console.log(error);
      }
    }
  }


  function formatDate(d: string) {
    let date = new Date(d);
    return `${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`;
  }
  useEffect(() => {
    if (Id && Id !== undefined) {
      setPost(() => getPostById(Id) as never)
    } else {
      setPost(article as never)
    }
  }, [Id, article])
  return (
    <>
      {post.length > 0 &&
        post.toReversed().map((data, index) => (
          <div key={data._id} className={style.wrap}>
            <div className={style.wrapTop}>
              <div className={style.wrapTopLeft}>
                <div className={style.avatarWrap}>
                  <img src={user?.photo} alt="ava" />
                </div>
                <div className={style.wrapText}>
                  <h3>{user?.name}</h3>
                  <p>{data?.createdAt && formatDate(data?.createdAt)}</p>
                </div>
              </div>
              <FeedOptions></FeedOptions>
            </div>
            <div className={style.wrapCenter}>
              {data?.text && (
                <div className={style.content}>
                  <p>{data?.text}</p>
                </div>
              )}
              {data?.image && (
                <div className={style.contentImage}>
                  <Image
                    src={data?.image?.url}
                    alt="img"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
            </div>
            <div className={style.contentDetail}>
              <p>
                <span>10</span>
                Comments
              </p>
              <p>
                <span>{data?.likes.length}</span>
                Like
              </p>
            </div>
            <div className={style.communicate}>
              <div className={style.line}></div>
              <div className={style.communicateWrap}>
                <div onClick={() => handleLike(data?._id as string)} className={style.communicateItem}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={data?.likes.includes(user?._id as string) ? "red" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </span>
                  <p>Like</p>
                </div>
                <div className={style.communicateItem}>
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
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </span>
                  <p>Comments</p>
                </div>
                <div className={style.communicateItem}>
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
                        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                      />
                    </svg>
                  </span>
                  <p>Share</p>
                </div>
              </div>
              <div className={style.line}></div>
            </div>
            <div className={style.commentText}>
              <div className={style.avatarWrap}>
                <img src={user?.photo} alt="ava" />
              </div>
              <input
                placeholder="write a comment..."
                type="text"
                name=""
                id=""
                className={style.inputText}
              />
              <div className={style.buttonSentComment}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke=" #377dff"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Feed;
