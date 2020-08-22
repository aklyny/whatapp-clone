import React,{useEffect,useState} from 'react';
import './sidebar.css'
import {Avatar,IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons';
import db from '../firebase'
import SidebarChat from './sidebarChat';
import { useStateValue } from './stateprovider';

const SideBar = ()=>{
    const [room,setRoom] = useState([])
    const [{user},dispatch] = useStateValue()

    useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>(
            setRoom(snapshot.docs.map(snap=>({
                id:snap.id,
                data:snap.data()
            })))
        ))
        return ()=>{
            unsubscribe()
        }
    },[])
    return(
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar 
                   src={user ? user.photoURL :''} 
                />
                <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>    
                    <ChatIcon />
                </IconButton>
                <IconButton>    
                    <MoreVertIcon />
                </IconButton>  
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <SearchOutlined /> 
                <input placeholder="Search or Start a new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chat">
                <SidebarChat addNewChat />
                {
                    room.map(data=>(
                        <SidebarChat key={data.id} id= {data.id} name= {data.data.name} />
                    ))
                }
            </div>
        </div>
    )
}


export default SideBar;