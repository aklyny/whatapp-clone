import React, { useState, useEffect } from 'react';
import './chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { InsertEmoticon,Mic } from '@material-ui/icons';
import {useParams} from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from './stateprovider';
import firebase from 'firebase';

const Chat = ()=>{
    const [text,setText] = useState('');
    const {roomId} = useParams()
    const [roomName,setRoomName] = useState("")
    const [messages,setMessages] = useState([])
    const [{user},dispatch] = useStateValue()

    useEffect(()=>{
           if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snap=>{
                setRoomName(snap.data().name)
        })
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snap=>(
                setMessages(snap.docs.map(msg=>msg.data()))
            ))
           } 
        
    },[roomId])


    const msgSend = (e)=>{
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages')
        .add({
            message:text,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setText("")
    }
    return(
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                    last seen{" "}
                    {
                        new Date(
                            messages[messages.length-1]?.
                            timestamp?.toDate()
                        ).toString()
                    }</p>
                </div>
                <div className="chat__headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>    
                    <AttachFile />
                </IconButton>
                <IconButton>    
                    <MoreVertIcon />
                </IconButton>  
                </div>
            </div>
            <div className="chat__body">
            {messages.map(msg=>(
                <p className={`chat__msg ${msg.name === user.displayName && 'chat__receiver'}`}>
                <span className="chat__name">{msg.name}</span>
                {msg.message}
                <span className="chat__time">
                    {new Date(msg.timestamp?.toDate()).toString()}
                </span>
                </p>
               
            ))}
            {/* <p className={`chat__msg ${true && 'chat__receiver'}`}>
                <span className="chat__name ">Dass</span>
                Hello! Who is this?
                <span className="chat__time">7:38pm</span>
                </p> */}
               
 
            </div>
            <div className="chat__footer">
                
                <IconButton>
                <InsertEmoticon />
                </IconButton>
                <form>
                    <input type="text"
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    placeholder="Type a message here..."
                     />
                    <button onClick={msgSend} type="submit">Send this message</button>
                </form>
                <IconButton>
                    <Mic/>
                </IconButton>
            </div>
        </div>
    )
}



export default Chat;