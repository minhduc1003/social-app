import  { useEffect, useState } from 'react';
import style from "../../../styles/homePageStyle/feed.module.scss";
import { user } from '@/app/(Auth)/types/type';
import axiosInstance from '@/app/api/configAxios';

const FeedInformation = ({id,time}:{id:any,time:any}) => {
    const [data,setData] = useState<user>()

    function formatDate(d: string) {
        let date = new Date(d);
        return `${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`;
      }
    useEffect(()=>{
        const getdata = async()=>{
                await axiosInstance.get<user>(
                 `api/user/getAnotherUser/${id}`
               ).then((res:any)=>{
                setData(res.data)
               });
             }
        getdata()
    },[])
    return (
        <div className={style.wrapTopLeft}>
        <div className={style.avatarWrap}>
          <img src={data?.photo} alt="ava" />
        </div>
        <div className={style.wrapText}>
          <h3>{data?.name}</h3>
          <p>{time && formatDate(time)}</p>
        </div>
      </div>
    );
};

export default FeedInformation;