import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'

const SideBar = () => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={HospitalIcon} alt="HospitalIcon" width="30"/>
            </div>
        </div>

        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={LogoutIcon} alt="Logout" width='30'/>
            </div>
        </div>

    </div>
)

const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Citadel</p>
    </div>
)
    
const ChannelListContainer = () => {
    return(
        <>
           <SideBar/>
           <div className='channel-list__list__wrapper'>
                <CompanyHeader/>
                <ChannelSearch/>
                <ChannelList  //streamChat allows you to use ChannelList component right out of the box, but we still want to create our own custom channel list
                    filters={{}} // This is an object that allows me to filter some messages
                    channelRenderFilterFn={() => {}}  // 
                    List={(listProps) => ( // Render custom list. Done by providing callback function. Get access to custom list
                        <TeamChannelList
                            {...listProps} //grabbing all list props and putting them here...This also get all custom components that the channel list would usally get
                            type='team'
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type='team'
                        />
                    )}
                />

                <ChannelList  
                    filters={{}}
                    channelRenderFilterFn={() => {}}  
                    List={(listProps) => ( 
                        <TeamChannelList
                            {...listProps} 
                            type='messaging'
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type='messaging'
                        />
                    )}
                />
           </div>  
        </>
    )
}

export default ChannelListContainer