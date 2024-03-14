"use client";

import style from "../styles/heading.module.scss";
import { appSelecter} from "@/redux/configureStore";


const HeadingUser = () => {
  const { user } = appSelecter((state) => state.auth);

  return (
    <div className={style.userWrap}>
      <p>{user?.name}</p>
      <div>
        <img src={user?.photo} alt="ava" />
      </div>
    </div>
  );
};

export default HeadingUser;
