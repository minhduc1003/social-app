"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import style from "../../styles/profile/profile.module.scss";
import Button from "../Button";
import axios from "axios";
import { toast } from "react-toastify";
import { getCookies } from "@/utils/cookies";
const ChangeBasicInfo = () => {
  const [text, setText] = useState<string | undefined>(undefined);
  const [data, setData] = useState<string | undefined>(undefined);
  const editable = useRef<HTMLDivElement | null>(null);
  const cookie = getCookies();
  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/updateuser`,
        {
          bio: text,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      setData(res.bio);
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
