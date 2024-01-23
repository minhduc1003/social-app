'use client'
import React, { useEffect, useRef, useState } from 'react';
import AddNewFeed from '../../components/homePage/addNewFeed/AddNewFeed';
import Feed from '../../components/homePage/addNewFeed/Feed';
import FriendList from '../../components/FriendList';
import style from '../../styles/messages/message.module.scss'
import { appSelecter, dispatchType } from '@/redux/configureStore';
import { useDispatch } from 'react-redux';
import { getUser } from '@/redux/feature/authSlice';
import io from 'socket.io-client'
import { useParams } from "next/navigation";
import { getFilterData, getUserData } from '@/redux/feature/userSlice';
import axios from 'axios';
import { getCookies } from '@/utils/cookies';
const Messages = () => {
    const socket = io('http://localhost:3009', { transports: ['websocket'] });
    const { user } = appSelecter((state) => state.auth);
    const { userData } = appSelecter((state) => state.user);

    const dispatch = useDispatch<dispatchType>();
    const [message, setMessage] = useState<string>('')

    const [renderMessage, setRenderMessage] = useState<any>([])
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const params = useParams();
    const scrollRef = useRef<HTMLDivElement>();
    useEffect(() => {

        socket.on("getMessage", (data) => {
            console.log(data);
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                conversationMember: data.conversationMember
            });
        });

    }, [socket]);
    useEffect(() => {
        socket.emit("addUser", user?._id);
    }, [socket, user?._id]);
    useEffect(() => {
        arrivalMessage &&
            setRenderMessage((prev: any) => [...prev, arrivalMessage]);
        console.log(renderMessage);
    }, [arrivalMessage, user?._id]);
    useEffect(() => {
        if (params.id && params.id.length > 0) {
            dispatch(getUserData(params.id[0]))
        }
    }, [])
    const addMessage = async () => {
        try {
            if (message !== "") {
                const messageSender = {
                    conversationMember: [user?._id, params.id[0]],
                    sender: user?._id,
                    text: message,
                }
                socket.emit('send_message', {
                    conversationMember: [user?._id, params.id[0]],
                    receiverId: params.id[0],
                    senderId: user?._id,
                    text: message,
                })
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/message`, messageSender, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookies()}`
                    }
                })
                setRenderMessage((prev: any) => [...prev, messageSender]);
            }
            setMessage('')
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const getMessage = async () => {
            try {

                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/message/${user?._id}/${params.id[0]}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookies()}`
                    }
                }).then((res) => {
                    setRenderMessage(res.data);

                })
            }
            catch (error) {
                console.log(error);
            }
        }
        getMessage()
    }, [user?._id])
    useEffect(() => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [renderMessage]);

    return (
        <>
            {
                params.id && params.id.length > 0 && (
                    <section className={style.container}>
                        <div className={style.itemContainer}>
                            <div className={style.top}>
                                <div className={style.userWrap}>
                                    <div>
                                        <img src={userData.photo} alt="ava" />
                                    </div>
                                    <p>{userData.name}</p>
                                </div>
                            </div>
                            <div className={style.center}>
                                {
                                    renderMessage.map((message: any, index: number) => {
                                        return (
                                            <div ref={scrollRef} key={index} className={`${style.message} ${user?._id === message.sender ? style.own : ""}`}>
                                                <div className={style.messageTop}>
                                                    <img
                                                        className={style.messageImg}
                                                        src="/ava.png"
                                                        alt=""
                                                    />
                                                    <p className={style.messageText}>{message.text}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={style.bottom}>
                                <label className={style.sentImg}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <input type="file" name="" id="" />
                                </label>
                                <input className={style.text} value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Send a messages' type="text" name="" id="" />
                                <button className={style.sent} type="submit" onClick={addMessage} >Send</button>
                            </div>
                        </div>
                    </section>
                )
            }
            {
                Object.keys(params).length === 0 && (
                    <section className={style.container}>

                        <p className={style.textWarning}>Pick a friend to chat</p>
                    </section>
                )}
            <FriendList />
        </>
    );
};

export default Messages;