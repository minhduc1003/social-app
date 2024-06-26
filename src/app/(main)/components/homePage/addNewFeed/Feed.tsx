"use client";
import { useEffect, useState } from "react";
import style from "../../../styles/homePageStyle/feed.module.scss";
import FeedOptions from "./FeedOptions";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import Image from "next/image";
import { TArticle } from "@/redux/saga/article/type";
import FeedInformation from "./FeedInformation";
import { useDispatch } from "react-redux";
import { getArticles } from "@/redux/feature/articleSlice";
import axiosInstance from "@/app/api/configAxios";
import { idShare, openModal, openShareArticle } from "@/redux/feature/modal";
import ModalShare from "./ModalShare";

const Feed = ({ Id }: { Id: string | null | undefined }) => {
  const [post, setPost] = useState<any>([]);
  const [text, setText] = useState<string>("");
  const dispatch = useDispatch<dispatchType>();
  const { user } = appSelecter((state) => state.auth);
  const { idShareArticle } = appSelecter((state) => state.modal);
  const trimUserData = {
    name: user?.name,
    image: user?.photo,
  };
  const { article } = appSelecter((state) => state.article);
  const getPostById = async (postId: string) => {
    const data = await axiosInstance
      .get<TArticle>(`api/post/getPost/${postId}`)
      .then((response) => setPost(response.data));
  };
  const handleLike = async (id: string) => {
    try {
      await axiosInstance.get(`api/post/likes/${id}`).then((response) => {
        let arrayForSort = [...post];
        arrayForSort.forEach((element, index) => {
          if (element._id === response?.data._id) {
            arrayForSort[index] = response?.data;
          }
        });
        setPost(arrayForSort);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleShare = (id: string) => {
    dispatch(openModal(true));
    dispatch(openShareArticle(true));
    dispatch(idShare(id));
    localStorage.setItem("height", `${window.scrollY}`);
  };
  const handleComment = async (id: string) => {
    try {
      await axiosInstance
        .post(`api/post/comments`, {
          id,
          text,
          user: trimUserData,
        })
        .then(() => {
          dispatch(getArticles());
          setText("");
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (Id && Id !== undefined) {
      setPost(() => getPostById(Id) as never);
    } else {
      setPost(article as never);
    }
  }, [Id, article]);
  return (
    <>
      {idShareArticle && <ModalShare data={user}></ModalShare>}
      {post.length > 0 &&
        post.toReversed().map((data: any, index: any) => (
          <div key={data._id} className={style.wrap}>
            <div className={style.wrapTop}>
              <FeedInformation
                id={data.userId}
                time={data?.createdAt}
              ></FeedInformation>
              {data.userId == user?._id && (
                <FeedOptions id={data._id}></FeedOptions>
              )}
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
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
              {data?.share && (
                <div className={style.wrap}>
                  <div className={style.wrapTop}>
                    <FeedInformation
                      id={data?.share.userId}
                      time={data?.share?.createdAt}
                    ></FeedInformation>
                  </div>
                  <div className={style.wrapCenter}>
                    {data?.share?.text && (
                      <div className={style.content}>
                        <p>{data?.share?.text}</p>
                      </div>
                    )}
                    {data?.share?.image && (
                      <div className={style.contentImage}>
                        <Image
                          src={data?.share?.image?.url}
                          alt="img"
                          layout="fill"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={style.contentDetail}>
              <p>
                <span>{data?.comments.length}</span>
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
                <div
                  onClick={() => handleLike(data?._id as string)}
                  className={style.communicateItem}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={
                        data?.likes.includes(user?._id as string)
                          ? "red"
                          : "none"
                      }
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
                <div
                  className={style.communicateItem}
                  onClick={() =>
                    handleShare(data?.share?._id || (data?._id as string))
                  }
                >
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
            {data?.comments.length > 0 &&
              data?.comments.map((comment: any, index: any) => (
                <div key={index} className={style.commentText}>
                  <div className={style.avatarWrap}>
                    <Image
                      src={comment?.user?.image || "/ava.png"}
                      alt="img"
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={style.showComment}>
                    <h3>{comment?.user?.name}</h3>
                    <p>{comment?.text}</p>
                  </div>
                </div>
              ))}
            <div className={style.commentText}>
              <div className={style.avatarWrap}>
                <Image
                  src={user?.photo || "/ava.png"}
                  alt="img"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <input
                placeholder="write a comment..."
                type="text"
                name=""
                id=""
                // value={text}
                className={style.inputText}
                onChange={(e) => setText(e.target.value)}
              />
              <div
                className={style.buttonSentComment}
                onClick={() => handleComment(data._id)}
              >
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
