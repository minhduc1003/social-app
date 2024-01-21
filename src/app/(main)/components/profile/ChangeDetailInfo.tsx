"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import style from "../../styles/profile/profile.module.scss";
import AddDes from "./AddDes";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button";
import axios from "axios";
import { getCookies } from "@/utils/cookies";
const ChangeDetailInfo = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState<string>("");
  const [web, setWeb] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const cookie = getCookies();
  //https://restcountries.com/v3.1/name/
  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/updateuser`,
        {
          dayOfBirth: startDate,
          location,
          web,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      toast.success("bio updated successfully");
    } catch (error) {
      toast.error("error updating bio");
    }
  };

  return (
    <Modal>
      <h2>INTRO</h2>

      <AddDes onClick={() => setStartDate(undefined)} des="your date of birth">
        <DatePicker
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
        />
      </AddDes>

      <AddDes onClick={() => setLocation("")} des="your location">
        <input
          placeholder="type your location"
          className={style.text}
          type="text"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
        />
      </AddDes>
      <AddDes onClick={() => setGender("")} des="your gender">
        <div className={style.genderList}>
          <div className={style.gender}>
            <input
              type="radio"
              name="gender"
              onClick={() => setGender("Male")}
            />
            <p>Male</p>
          </div>
          <div className={style.gender}>
            <input
              type="radio"
              name="gender"
              onClick={() => setGender("Female")}
            />
            <p>female</p>
          </div>
          <div className={style.gender}>
            <input
              type="radio"
              name="gender"
              onClick={() => setGender("Other")}
            />
            <p>Other</p>
          </div>
        </div>
      </AddDes>
      <AddDes onClick={() => setWeb("")} des="your own web">
        <input
          placeholder="abc.example.com"
          className={style.text}
          type="text"
          name="web"
          onChange={(e) => setWeb(e.target.value)}
        />
      </AddDes>
      <Button
        onClick={handleUpdate}
        disabled={
          startDate == undefined && location == "" && web == "" && gender == ""
            ? true
            : false
        }
      >
        Update
      </Button>
    </Modal>
  );
};

export default ChangeDetailInfo;
