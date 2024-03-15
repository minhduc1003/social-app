import  { useEffect, useState } from 'react';
import style from "../../../styles/homePageStyle/feed.module.scss";
import { user } from '@/app/(Auth)/types/type';
import axiosInstance from '@/app/api/configAxios';
import Image from 'next/image';

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
    },[id])
    return (
        <div className={style.wrapTopLeft}>
        <div className={style.avatarWrap}>
        <Image
           src={data?.photo||'/ava.png'}
            alt="img"
           fill
           sizes='(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px'
            style={{objectFit:"cover"}}
            />
        </div>
        <div className={style.wrapText}>
          <h3>{data?.name}</h3>
          <p>{time && formatDate(time)}</p>
        </div>
      </div>
    );
};

export default FeedInformation;