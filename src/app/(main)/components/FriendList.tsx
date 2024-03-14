'use client'
import  { useEffect, useState } from "react";
import style from "../styles/homePageStyle/friendsList.module.scss";
import { appSelecter } from "@/redux/configureStore";
import { useRouter } from "next/navigation";
const FriendList = () => {
  const { user } = appSelecter((state) => state.auth);
  const [dataFilter,setDataFilter]= useState<any>([]);
  const [filterData,setFilterData] = useState("")
 
  const router = useRouter();

  useEffect(()=>{
    if(filterData!==""){
      setDataFilter(user?.friend as never &&user?.friend.filter((item:any)=>item.name.includes(filterData)));
    }else{
      setDataFilter(user?.friend as never)
    }
  },[user, filterData])

  return (
    <aside className={style.aside}>
      <div className={style.inputWrap}>
        <input type="text" placeholder="Search friends!" onChange={(e:any)=>setFilterData(e.target.value)} />
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
      </div>
      <div className={style.friendList}>
        {dataFilter && dataFilter
          .map((item:any, index:any) => (
            <div key={index} className={style.friendItem} onClick={() => router.push(`messages/${item.userId}`)}>
              <div className={style.friendImageWrap}>
                <img src={item.image} alt="avata" />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default FriendList;
