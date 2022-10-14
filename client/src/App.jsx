import React from 'react'
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie'; 
import {Auth} from './components'
import { ChannelContainer, ChannelListContainer } from './components'
import './App.css'

const apiKey = 'faswz67ajqhu';

const client = StreamChat.getInstance(apiKey)

const authtoken = false

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