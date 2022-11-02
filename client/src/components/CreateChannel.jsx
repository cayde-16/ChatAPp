import React, {useState} from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets/CloseCreateChannel';


const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const { client, setActiveChannel } = useChatContext()
    const [ selectedUsers, setSelectedUsers ] = useState([client.userID || '']) // Created the selected users field and immediatly added ourselfs into that group, because when we create a group chat we would want to be inside that group chat as well

    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value)
    }

    return(
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="Channel-name" />
            <p>Add members</p>
        </div>
    )
}

const CreateChannel = ({ createType, setisCreating }) => {
    const [ channelName, setChannelName ] = useState('');
    const { client, setActiveChannel } = useChatContext();
    const [ selectedUsers, setSelectedUsers] = useState([client.userID || '']);

    const CreateChannel = async (event) => {
        event.preventDefault() //prevents the browser from reloading

        try{
            const newChannel =  client.channel(createType, channelName, { 
                name:channelName,
                members: selectedUsers
            }) // attempts to create a new channel, 1st it figures out the type of channel being created with "createType", 
            //then it takes the channelName from 'ChannelNameInput' and creates the channel with the name and selected members

            await newChannel.watch() // you want to keep watch on the channel to see if there is a new message in that channel

            // once the channel as been created, we are going to do a bit of clean up
            setChannelName(''); // we are going to reset ChannelNameField
            setisCreating(false); // setisCreating to false because we are no longer creating a new channel
            setSelectedUsers([client.userID]); // clear all selected users in the area excepted for your own, because if & when you create another channel, you always want to be in that channel,(you don't want to create a group chat and your not even in it)
            setActiveChannel(newChannel)
        }catch(error){
            console.log(error)
        }

    }

    return(
        <div className='create-channel_container'>
            <div className='create-channel__header'>
                <p>{ createType == 'team' ? 'Create a new channel' : 'Send a Direct Messsage' }</p>
                <CloseCreateChannel setisCreating={setisCreating} />
            </div>
            { createType == 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/> }
            <UserList setSelectedUsers={setSelectedUsers}/>

            <div className='create-channel__button-wrapper' onClick={CreateChannel}>
                <p>
                    {createType === 'team' ? 'Create Channel' : 'Create Message Group'}
                </p>
            </div>
        </div>
    )
}

export default CreateChannel