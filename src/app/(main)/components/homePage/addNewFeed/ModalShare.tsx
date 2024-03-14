"use client";
import  {useEffect, useRef, useState } from "react";
import style from "../../../styles/homePageStyle/addNewFeed/addNewFeed.module.scss";
import useClickOutside from "@/hooks/useClickOutSide";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import { openAddArticle, openImage, openModal, openShareArticle } from "@/redux/feature/modal";
import Modal from "../../Modal";
import Button from "../../Button";
import { getArticles } from "@/redux/feature/articleSlice";
import { useBeforeunload } from 'react-beforeunload';
import axiosInstance from "@/app/api/configAxios";
import { user } from "@/app/(Auth)/types/type";
import FeedInformation from "./FeedInformation";
import FeedOptions from "./FeedOptions";
import Image from "next/image";
const ModalShare = ({ data }: { data: user | undefined}) => {
  const dispatch = useDispatch<dispatchType>();
  const { isOpenImage, isOpenModal, isOpenAddArticle,isOpenShareArticle,idShareArticle } = appSelecter(
    (state) => state.modal
  );
  const [text, setText] = useState<any>("");
  const [imageId, setImageId] = useState<string | undefined>(undefined);
  const divRef = useRef<HTMLDivElement | null>(null);
  const editable = useRef<HTMLDivElement | null>(null);
  const [dataShare,setDataShare] = useState<any>({});
  useClickOutside(divRef, () => dispatch(openModal(false)));
  if (typeof document !== "undefined") {
    let getBody = document.querySelector("body");
    isOpenModal
      ? getBody?.classList.add(style.openModalClass)
      : document.getElementsByClassName(style.openModalClass)
        ? getBody?.classList.remove(style.openModalClass)
        : null;
  }
  const handleUpload = async (e: any) => {
    try {
      await axiosInstance.post(
        `api/post/upload/${imageId ? imageId : ""
        }`,
        {
          text,
        }
      );
      toast.success("upload successfully");
      dispatch(openModal(false));
      dispatch(openShareArticle(false));
      setText("");
      setImageId(undefined);
      dispatch(getArticles());
    } catch (error) {
      toast.error("upload failed");
    }
  };
  useBeforeunload(text !== '' ? (event) => event.preventDefault() : undefined);
  useEffect(() => {
    const fetchPostById = async()=>{
      await axiosInstance.get(
        `api/post/getPostById/${idShareArticle}`
      ).then(response =>{
        setDataShare(response.data[0]);
      });
    }
    fetchPostById();
  },[idShareArticle])
  return (
    <>
      {isOpenShareArticle && (
        <Modal>
          <div className={style.heading}>
            <div className={style.left}></div>
            <div className={style.center}>Share a Post</div>
            <div
              className={style.right}
              onClick={() =>
                dispatch(() => {
                  openModal(false);
                  dispatch(openShareArticle(false));
                })
              }
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className={style.center}>
            <div className={style.centerTop}>
              <div className={style.avatarWrap}>
                <img src={data?.photo} alt="ava" />
              </div>
              <div className={style.nameOfUser}>
                <h3>{data?.name}</h3>
              </div>
            </div>
            <div
              ref={editable}
              className={style.addText}
              contentEditable="true"
              data-text={"What is happening?"}
              onInput={() => {
                setText(editable.current?.innerHTML)
                console.log(editable.current?.innerHTML);
              }}
            ></div>
          </div>
          <div className={style.wrap}>
            <div className={style.wrapTop}>
               <FeedInformation id={dataShare.userId} time={dataShare?.createdAt}></FeedInformation>
              </div>
              <div className={style.wrapCenter}>
                {dataShare?.text && (
                  <div className={style.content}>
                    <p>{dataShare?.text}</p>
                  </div>
                )}
                {dataShare?.image && (
                  <div className={style.contentImage}>
                    <Image
                      src={dataShare?.image?.url}
                      alt="img"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
              </div>
          </div>
          <Button onClick={handleUpload} disabled={text !== "" ? false : true}>
            Post
          </Button>
        </Modal>
      )}
    </>
  );
};

export default ModalShare;
