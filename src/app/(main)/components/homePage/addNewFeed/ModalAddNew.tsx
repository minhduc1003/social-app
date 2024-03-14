"use client";
import  {useRef, useState } from "react";
import style from "../../../styles/homePageStyle/addNewFeed/addNewFeed.module.scss";
import useClickOutside from "@/hooks/useClickOutSide";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import { openAddArticle, openImage, openModal } from "@/redux/feature/modal";
import Modal from "../../Modal";
import Button from "../../Button";
import { getArticles } from "@/redux/feature/articleSlice";
import { useBeforeunload } from 'react-beforeunload';
import axiosInstance from "@/app/api/configAxios";
import { user } from "@/app/(Auth)/types/type";
const ModalAddNew = ({ data }: { data: user | undefined }) => {
  const dispatch = useDispatch<dispatchType>();
  const { isOpenImage, isOpenModal, isOpenAddArticle } = appSelecter(
    (state) => state.modal
  );
  const [text, setText] = useState<any>("");
  const [imageId, setImageId] = useState<string | undefined>(undefined);
  const divRef = useRef<HTMLDivElement | null>(null);
  const editable = useRef<HTMLDivElement | null>(null);

  useClickOutside(divRef, () => dispatch(openModal(false)));
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      const data = new FormData();
      data.append("image", image);
      const res = await axiosInstance.post(
        `$api/post/image`,
        data
      );
      toast.success("upload successfully");
      setImageId(res.data.imageId);
    }
  };
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
      dispatch(openAddArticle(false));
      setText("");
      setImageId(undefined);
      dispatch(getArticles());
    } catch (error) {
      toast.error("upload failed");
    }
  };
  useBeforeunload(text !== '' ? (event) => event.preventDefault() : undefined);

  return (
    <>
      <div
        className={style.fakeInput}
        onClick={() => {
          dispatch(openModal(true));
          dispatch(openAddArticle(true));
          dispatch(openImage(false));
          localStorage.setItem("height",`${window.scrollY}`)
        }}
      >
        <p>What is happening?</p>
      </div>
      {isOpenAddArticle && (
        <Modal>
          <div className={style.heading}>
            <div className={style.left}></div>
            <div className={style.center}>Create a new Post</div>
            <div
              className={style.right}
              onClick={() =>
                dispatch(() => {
                  openModal(false);
                  dispatch(openAddArticle(false));
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
            {isOpenImage && (
              <label className={style.addImage}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z" />
                    <path d="m8 11-3 4h11l-4-6-3 4z" />
                    <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
                  </svg>
                </span>
                <input type="file" name="image" onChange={handleUploadImage} />
              </label>
            )}
            <div className={style.addToArticle}>
              <p>Add to your article</p>
              <div className={style.emojiAndImage}>
                <div onClick={() => dispatch(openImage(!isOpenImage))}>
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
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <div>
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
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                </div>
              </div>
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

export default ModalAddNew;
