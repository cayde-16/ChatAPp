import React from 'react'
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie'; 
import {Auth} from './components'
import { ChannelContainer, ChannelListContainer } from './components'
import './App.css'

const apiKey = 'faswz67ajqhu';

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
    if(!authtoken) return <Auth/>
    
    return(
        <div className='app__wrapper'>
            <Chat client={client} theme='team light'>
                <ChannelListContainer/>
                <ChannelContainer/>
            </Chat>
        </div>
    )
}

export default App