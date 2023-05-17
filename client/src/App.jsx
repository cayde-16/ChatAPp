import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie'; 
import {Auth} from './components';
import { ChannelContainer, ChannelListContainer } from './components';
import './App.css';
import './CustomMessage.scss'


const apiKey = 'vu9hrarvhps4';


const client = StreamChat.getInstance(apiKey)

const cookies = new Cookies()

const authtoken = cookies.get('token');



if(authtoken){
    client.connectUser({ 
        id: cookies.get('userID'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        phoneNumber: cookies.get('phoneNumber'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword')
     }, authtoken)
}

const App = () => {
    const [createType, setCreateType] = useState()
    const [isCreating, setisCreating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)


    if(!authtoken) return <Auth/>
    
    return(
        <div className='app__wrapper'>
            <Chat client={client} theme='team light'>
                <ChannelListContainer
                    isCreating={isCreating}
                    setisCreating={setisCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setisCreating={setisCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                    
                />
            </Chat>
        </div>
    )
}

export default App