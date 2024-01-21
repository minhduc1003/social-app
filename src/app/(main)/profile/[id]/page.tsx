"use client"
import React, { useEffect } from "react";
import ProfilePic from "../../components/profile/ProfilePic";
import UserInfor from "../../components/profile/UserInfor";
import AddNewFeed from "../../components/homePage/addNewFeed/AddNewFeed";
import Feed from "../../components/homePage/addNewFeed/Feed";
import DetaiInfo from "../../components/profile/DetaiInfo";
import { useDispatch } from "react-redux";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import { useParams } from "next/navigation";
import { getUserData } from "@/redux/feature/userSlice";
import style from "../../styles/profile/profile.module.scss";
const Profile = () => {
  const dispatch = useDispatch<dispatchType>();
  const { isLoadingUserData } = appSelecter((state) => state.user);
  const params = useParams();
  useEffect(() => {
    dispatch(getUserData(params.id));
  }, []);
  return (
    <>
      <aside>
        <ProfilePic></ProfilePic>
        <UserInfor></UserInfor>
        <section className={style.detailProfile}>
          <DetaiInfo></DetaiInfo>
          <div className={style.wrapArticle}>
            <AddNewFeed />
            <Feed />
          </div>
        </section>
      </aside>
    </>
  );
};

export default Profile;
