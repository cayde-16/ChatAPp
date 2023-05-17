import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signInImage from '../assets/signup.jpg'
import purpleSignImage from '../assets/purplethemeImage.jpg'
import flowerImage from '../assets/Pngtreepurple_theme .png'
import purplebrick from '../assets/purple_brick.jpg'
import purpleCrest from '../assets/purple_crest.jpg'
import treeSchool from '../assets/Pngtreeschool.png'


const cookies = new Cookies();

const initalState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phonenumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initalState)
    const [isSignup, setisSignup] = useState(true)
    

    const handleChange = (event) => {
        setForm({...form, [event.target.name]:event.target.value});
    }


    const switchMode = () => {
        setisSignup((prev) => !prev) // this line changes state depending on previous state
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {username, password, phonenumber, avatarURL} = form;

        // const URL = 'https://citadel-messanger.herokuapp.com/auth';

        const URL = 'http://localhost:5000/auth';
 
        const { data: { token, userID, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`,{
            username, password, fullName: form.fullName, phonenumber, avatarURL,
        } )

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userID', userID);

        if(isSignup){
            cookies.set('phoneNumber', phonenumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();

    }
    
    return(
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </p>  
                        <form onSubmit={handleSubmit} action="">
                            {isSignup && (
                                <div className='auth__form-container_fields-content_input'>
                                    <label htmlFor="fullName">
                                            Full Name
                                    </label>

                                    <input 
                                        name="fullName"
                                        type="text" 
                                        placeholder='Full Name'
                                        onChange={handleChange}
                                        required    
                                    />
                                </div>
                            )}
                            
                            <div className='auth__form-container_fields-content_input'>
                                    <label htmlFor="username">
                                        UserName
                                    </label>

                                    <input 
                                        name="username"
                                        type="text" 
                                        placeholder='Username'
                                        onChange={handleChange}
                                        required    
                                    />
                            </div>

                            {isSignup && (
                                <div className='auth__form-container_fields-content_input'>
                                    <label htmlFor="phonenumber">
                                        Phone Number
                                    </label>

                                    <input 
                                        name="phonenumber"
                                        type="text" 
                                        placeholder='123-456-789'
                                        onChange={handleChange}
                                        required    
                                    />
                                </div>
                            )}

                            {isSignup && (
                                <div className='auth__form-container_fields-content_input'>
                                    <label htmlFor="avatarURL">
                                        Avatar
                                    </label>

                                    <input 
                                        name="avatarURL"
                                        type="text" 
                                        placeholder='AvatarURL'
                                        onChange={handleChange}
                                        required    
                                    />
                                </div>
                            )}

                                <div className='auth__form-container_fields-content_input'>
                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    <input 
                                        name="password"
                                        type="password" 
                                        placeholder='Password'
                                        onChange={handleChange}
                                        required    
                                    />
                                </div>

                                
                                {isSignup && (
                                    <div className='auth__form-container_fields-content_input'>
                                        <label htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>

                                        <input 
                                            name="confirmPassword"
                                            type="password" 
                                            placeholder='Confirm Password'
                                            onChange={handleChange}
                                            required    
                                        />
                                    </div>    
                                )}
                                <div className='auth__form-container_fields-content_button'>
                                    <button>{isSignup ? "Sign Up" : "Log In"}</button>
                                </div>
                        </form>
                    <div className='auth__form-container_fields-account'>
                            <p>
                                {isSignup 
                                ? "Already have an account?"
                                : "Don't have an account? "
                                }
                                <span onClick={switchMode}>
                                    {isSignup ? ' Sign In ' : ' Sign Up '} 
                                </span>
                            </p>
                    </div>
                </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={treeSchool} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth