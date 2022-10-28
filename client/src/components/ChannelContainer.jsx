import React from 'react';
import { Channel, useChatContext, MessageSimple, FixedHeightMessage, VirtualizedMessageList , MessageTeam, Message, ChannelListMessenger } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel, TeamMessage } from  './'

const ChannelContainer = ({ isCreating, setisCreating, isEditing, setIsEditing, createType}) => {
    const { channel } = useChatContext()

    if(isCreating){
        return(
            <div className='channel__container'>
                <CreateChannel
                    createType={createType} 
                    setisCreating={setisCreating}
                />
            </div>
        )
    }

    if(isEditing){
        return(
            <div className='channel__container'>
                <EditChannel
                    setIsEditing={setIsEditing} 
                />
            </div>
        )
    }

    const EmptyState = () => (
        <div className='channel-empty__container'>
            <p className='channel-empty__first'> This is the start of your chat history</p>
            <p className='channel-empty__second'> Send messages, attachments, links, emojis, and more!</p>
        </div>
    )


    return(
        <div className='channel__container'>
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, index) => <MessageSimple key={index} {...messageProps}/>}
            >
                <ChannelInner setIsEditing={setIsEditing}/>
            </Channel>
        </div>
    );
}

export default ChannelContainer