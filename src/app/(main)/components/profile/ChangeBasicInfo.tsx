"use client";
import  {  useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import style from "../../styles/profile/profile.module.scss";
import Button from "../Button";
import { toast } from "react-toastify";
import axiosInstance from "@/app/api/configAxios";
import { useDispatch } from "react-redux";
import {dispatchType } from "@/redux/configureStore";
import { openBasicInfo, openModal } from "@/redux/feature/modal";
import { getUserData } from "@/redux/feature/userSlice";
import { useParams } from "next/navigation";
const ChangeBasicInfo = () => {
  const [text, setText] = useState<string | undefined>(undefined);
  const [data, setData] = useState<string | undefined|any>(undefined);
  const editable = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<dispatchType>();
  const params = useParams();
  const handleUpdate = async () => {
    try {
       await axiosInstance.patch(
        `api/user/updateuser`,
        {
          bio: text
        }
      ).then((res:any)=>{
        dispatch(getUserData(params.id))
        dispatch(openBasicInfo(false));
        dispatch(openModal(false));
        setData(res.bio);
      });
      toast.success("bio updated successfully");
    } catch (error) {
      toast.error("error updating bio");
    }
  };

  return (
    <Modal>
      <h2>Edit Basic Infor</h2>
      <div
        ref={editable}
        className={style.addText}
        contentEditable={data ? false : true}
        data-text={"Edit basic infor"}
        onInput={() => setText(editable.current?.innerHTML)}
      >
        {data && text}
      </div>
      <Button disabled={text ? false : true} onClick={handleUpdate}>
        Update
      </Button>
    </Modal>
  );
};

export default ChangeBasicInfo;
