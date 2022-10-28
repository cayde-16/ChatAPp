import React from 'react';
import { useChatContext } from 'stream-chat-react';

// import { UserList } from './';
// import { CloseCreateChannel } from '../assets';


const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value)
    }

    return(
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="Channel-name (no spaces)" />
            <p>Add members</p>
        </div>
    )
}

const CreateChannel = () => {
    return(
        <>
            CreateChannel
        </>
    )
}

export default CreateChannel