"use client";
import  {  useEffect, useState } from "react";
import Modal from "../Modal";
import style from "../../styles/profile/profile.module.scss";
import AddDes from "./AddDes";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button";
import axiosInstance from "@/app/api/configAxios";
import { useDispatch } from "react-redux";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import { getUserData } from "@/redux/feature/userSlice";
import { useParams } from "next/navigation";
import { openChangeDetailProfile, openModal } from "@/redux/feature/modal";
type postData ={
  dayOfBirth?: Date|null,
  location?:string,
  web?:string,
  gender?:string,
  phone?:string,
}
const ChangeDetailInfo = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>("");
  const [web, setWeb] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const dispatch = useDispatch<dispatchType>();
  const params = useParams();
  const { userData } = appSelecter((state) => state.user);
  const regexUrl = /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/ig;
  const postData:postData = {
    dayOfBirth: startDate,
    location,
    web,
    gender,
    phone
  }
 
  //https://restcountries.com/v3.1/name/
  const handleUpdate = async () => {
    if(web!==""&&web.match(regexUrl)){
      try {
        await axiosInstance.patch(
          `api/user/updateuser`,
          postData
        ).then(response =>{
          dispatch(getUserData(params.id))
          dispatch(openModal(false));
          dispatch(openChangeDetailProfile(false));
        });
        toast.success("bio updated successfully");

      } catch (error) {
        toast.error("error updating bio");
      }
    }else{
      toast.error("please write correct url")
    }

  };
  useEffect(()=>{
    setGender(userData.gender);
    setLocation(userData.location);
    setWeb(userData.web);
    setStartDate(userData.dayOfBirth===null?null:new Date(userData.dayOfBirth))
    setPhone(userData.phone)
  },[userData]);
  return (
    <Modal>
      <h2>INTRO</h2>

      <AddDes onClick={() => setStartDate(null)} value={userData.dayOfBirth===null?undefined:userData.dayOfBirth} des="your date of birth">
        <DatePicker
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
        />
      </AddDes>

      <AddDes onClick={() => setLocation("")} des="your location" value={userData.location}>
        <input
          placeholder="type your location"
          className={style.text}
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </AddDes>
      <AddDes onClick={() => setGender("")} des="your gender" value={userData.gender}>
        <div className={style.genderList}>
          <div className={style.gender}>
            <input
              type="radio"
              name="gender"
              onClick={() => setGender("Male")}
              defaultChecked={gender==='Male'}
            />
            <p>Male</p>
          </div>
          <div className={style.gender}>
            <input
              type="radio"
              name="gender"
              onClick={() => setGender("Female")}
              defaultChecked={gender==='Female'}              
            />
            <p>female</p>
          </div>
          <div className={style.gender}>
            <input
              type="radio"
              name="gender"
              onClick={() => setGender("Other")}
              defaultChecked={gender==='Other'}                            
            />
            <p>Other</p>
          </div>
        </div>
      </AddDes>
      <AddDes onClick={() => setWeb("")} des="your own web" value={userData.web}>
        <input
          placeholder="abc.example.com"
          className={style.text}
          type="text"
          name="web"
          value={web}
          onChange={(e) => setWeb(e.target.value)}
        />
      </AddDes>
      <AddDes onClick={() => setPhone("")} des="your number" value={userData.phone}>
        <input
          placeholder="Add your number"
          className={style.text}
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </AddDes>
      <Button
        onClick={handleUpdate}
      >
        Update
      </Button>
    </Modal>
  );
};

export default ChangeDetailInfo;
