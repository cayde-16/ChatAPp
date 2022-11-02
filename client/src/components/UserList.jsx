import React, {useEffect, useState} from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { InviteIcon } from '../assets/InviteIcon';

const ListContainer = ({ children }) => {
    return(
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>

            { children }
        </div>
    )
}


const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)
    const handleSelect = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUsers) => prevUsers != user.id)) // filtering out the currently clicked item if it was clicked
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return(
        <div className='user-item__wrapper' onClick={handleSelect}>
            <div className='user-item__name-wrapper'>
                <Avatar image={user.image} name={user.name || user.id } size={32}/>
                <p className='user-item__name'>
                { user.name || user.id }
            </p>
            </div>
            { selected ? <InviteIcon/>:  <div className='user-item__invite-empty'/>}
        </div>
    )
}


const Userlist = ({ setSelectedUsers }) => {
    const { client } = useChatContext()
    const [ users, setUsers] = useState([])
    const [ loading, setloading] = useState(false)
    const [ listEmpty, setlistEmpty] =  useState(false)
    const [ error, setError] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;

            setloading(true);

            try{
                const response = await client.queryUsers(
                    { id: {$ne: client.userID} },
                    { id: 1 },
                    { limit: 8 }
                )

                if(response.users.length){
                    setUsers(response.users)
                } else {
                    setlistEmpty(true);
                }
            } catch(error) {
                setError(true)
            }

            setloading(false)
        }

        if(client) getUsers()
    }, {})

    if(error){
        return(
            <ListContainer>
                <div className='user-list__message'> 
                    Error loading, refresh browser
                </div>
            </ListContainer>
            
        )
    }

    if(listEmpty){
        return(
            <ListContainer>
                <div className='user-list__message'> 
                    No users found.
                </div>
            </ListContainer>
            
        )
    }

    return(
        <ListContainer>
            { loading ? <div className='user-list__message'> 
                loading users...
            </div> : (
                users?.map((user, index) => (
                    <UserItem index={index} key={user.id } user={user} setSelectedUsers={setSelectedUsers}/>
                ))
            ) }
        </ListContainer>
    )
}

export default Userlist