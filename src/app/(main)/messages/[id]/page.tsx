'use client'
import React, { useEffect, useState } from 'react';
import AddNewFeed from '../../components/homePage/addNewFeed/AddNewFeed';
import Feed from '../../components/homePage/addNewFeed/Feed';
import FriendList from '../../components/FriendList';
import style from '../../styles/messages/message.module.scss'
import { appSelecter, dispatchType } from '@/redux/configureStore';
import { useDispatch } from 'react-redux';
import { getUser } from '@/redux/feature/authSlice';
import io from 'socket.io-client'

const Messages = () => {
    const socket = io('http://localhost:3009', { transports: ['websocket'] });
    const { user } = appSelecter((state) => state.auth);
    const dispatch = useDispatch<dispatchType>();
    const [message, setMessage] = useState<string>('')
    const [receiveMessage, setReceiveMessage] = useState<string>('')
    const [myMessage, setMyMessage] = useState<string>('')
    const [renderMessage, setRenderMessage] = useState([])
    const sendMassage = () => {
        setMyMessage(message)
        socket.emit('send_message', { message })
        setMessage('')
    }
    useEffect(() => {
        socket.on('receive_message', (data) => {
            setReceiveMessage(data.message)
        })
        return () => {
            socket.disconnect();
        };
    }, [socket]);
    return (
        <>
            <section className={style.container}>
                <div className={style.itemContainer}>
                    <div className={style.top}>
                        <div className={style.userWrap}>
                            <div>
                                <img src={user?.photo} alt="ava" />
                            </div>
                            <p>{user?.name}</p>
                        </div>
                    </div>
                    <div className={style.center}>
                        {myMessage !== "" && <p>my message: {myMessage}</p>}
                        {receiveMessage !== "" && <p>receive message: {receiveMessage}</p>}
                    </div>
                    <div className={style.bottom}>
                        <label className={style.sentImg}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <input type="file" name="" id="" />
                        </label>
                        <input className={style.text} onChange={(e) => setMessage(e.target.value)} placeholder='Send a messages' type="text" name="" id="" />
                        <button className={style.sent} type="button" onClick={sendMassage}>Send</button>
                    </div>
                </div>
            </section>
            <FriendList />
        </>
    );
};

export default Messages;