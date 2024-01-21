'use client'
import React, { useEffect, useState } from "react";
import style from "../styles/heading.module.scss";
import Option from "./Option";
import HeadingUser from "./HeadingUser";
import { appSelecter, dispatchType } from "@/redux/configureStore";
import { useDispatch } from "react-redux";
import { getFilterData } from "@/redux/feature/userSlice";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
const Heading = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const { filterUser } = appSelecter((state) => state.user);
  const debouncedValue = useDebounce<string>(search, 500)
  const dispatch = useDispatch<dispatchType>();
  useEffect(() => {
    dispatch(getFilterData(debouncedValue));
  }, [debouncedValue])
  return (
    <header className={style.header}>
      <div className={style.headerWrap}>
        <div className={style.headingleft}>
          <div className={style.logoWrap}>
            <img src="/logo.png" alt="logo" />
          </div>
          <Option />
        </div>

        <div className={style.headingRight}>
          <div className={style.inputWrap}>
            <input value={search} type="text" placeholder="Search for new friend here..." onChange={(e) => setSearch(e.target.value)} />
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <div className='dataResult'>
              {filterUser.length > 0 && filterUser.map(user => (
                <div key={user._id} onClick={() => {
                  router.push(`/profile/${user._id}`)
                  setSearch("")
                }} className='userFilter'>
                  <div>
                    <img src={user?.photo} alt="ava" />
                  </div>
                  <p>{user?.name}</p>
                </div>))}
            </div>
          </div>
          <HeadingUser />
        </div>
      </div>
    </header>
  );
};

export default Heading;
