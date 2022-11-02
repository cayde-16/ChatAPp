import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({setActiveChannel, setisCreating, setIsEditing, setToggleContainer, channel, type}) => {
    const {channel : activeChannel, client } = useChatContext()

    const ChannelPreview = () => (
        <p className='channel-preview__item'>
            # { channel?.data?.name || channel?.data?.id }
        </p>
    );
    
    
    const DirectPreview = () => {
        // data return from this would not be an array...
        // you might think you get back an array of objects like this => [{}, {}]
        // Direct messages gets back an object like this
        //  key would be the ID 

        // {
        //     '9873212' : {}
        //     '1257889' : {}
        //     '9543551' : {}
        // }

        // Each user has a specific ID and based on that the data will be shown



        const members = Object.values(channel.state.members).filter(({ user }) => user.id != client.userID); //Grabs all the values from the members object then filters only the users & checks if your user.id does not equal the client.userID, 
        // if they don't match then the client.userID will be displayed as preview

        console.log(members[0])
        return(
            <div className='channel-preview__item single'>
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.name || members[0]?.user?.name}
                    size={24}
                />
                <p>{members[0]?.user?.name || members[0]?.user?.name}</p>
            </div>
        )
    }

    return(
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
            onClick={() => {
                setisCreating(false);
                setIsEditing(false);
                setActiveChannel(channel)

                if(setToggleContainer) {
                    setToggleContainer((prevState) => !prevState)
                }
            }}
        >
            {type == 'team' ? <ChannelPreview/> : <DirectPreview/> }
        </div>
    )
}
export default TeamChannelPreview