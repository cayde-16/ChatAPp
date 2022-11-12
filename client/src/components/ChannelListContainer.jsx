import React from 'react';
import { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'
import Citadel from '../assets/CitadelM.png'
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'

const cookies = new Cookies()

const SideBar = ({ logout }) => (
    <div className='channel-list__sidebar'>
        {/* <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={Citadel} alt="HospitalIcon" width="30"/>
            </div>
        </div> */}

        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={LogoutIcon} alt="Logout" width='30' onClick={logout}/>
            </div>
        </div>

    </div>
)

const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Citadel</p>
    </div>
)

const CustomChannelTeamFilters = (channels) => {
    return channels.filter((channels) => channels.type === 'team' );
}

const CustomChannelMessagingFilters = (channels) => {
    return channels.filter((channels) => channels.type === 'messaging' );
}


const ChannelListContent = ({ isCreating, setisCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext()

    const filters = { members: { $in: [client.userID] } } // get all the channels and direct messages where our user is included

    const logout = () => {
        cookies.remove('token');
        cookies.remove('userID');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('phoneNumber');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');

        window.location.reload()
    }



    return(
        <>
           <SideBar logout={logout}/>
           <div className='channel-list__list__wrapper'>
                <CompanyHeader/>
                <ChannelSearch setToggleContainer={setToggleContainer}/>
                <ChannelList  //streamChat allows you to use ChannelList component right out of the box, but we still want to create our own custom channel list
                    filters={filters} // This is an object that allows me to filter some messages
                    channelRenderFilterFn={CustomChannelTeamFilters}  // 
                    List={(listProps) => ( // Render custom list. Done by providing callback function. Get access to custom list
                        <TeamChannelList
                            {...listProps} //grabbing all list props and putting them here...This also get all custom components that the channel list would usally get
                            type='team'
                            isCreating={isCreating} 
                            setisCreating={setisCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type='team'
                            setisCreating={setisCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                />

                <ChannelList  
                    filters={filters}
                    channelRenderFilterFn={CustomChannelMessagingFilters}  
                    List={(listProps) => ( 
                        <TeamChannelList
                            {...listProps} 
                            type='messaging'
                            isCreating={isCreating} 
                            setisCreating={setisCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setisCreating={setisCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type='messaging'
                            
                        />
                    )}
                />
           </div>  
        </>
    )
}

const ChannelListContainer = ({ setCreateType, setIsEditing, setisCreating}) => {
    const [toggleContainer, setToggleContainer] = useState(false)

    return(
        <>
            <div className='channel-list__container'>
                <ChannelListContent 
                    setisCreating={setisCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}/>
            </div>

            <div className='channel-list__container-responsive' style={{left: toggleContainer ? "0%": "-89%", backgroundColor: "var(--primary-colors)"}}>
                <div className='channel-list__container-toggle' onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>                  
                </div>
                <ChannelListContent
                    setisCreating={setisCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                /> 
            </div> 

           

            
        </>
    )
}
export default ChannelListContainer