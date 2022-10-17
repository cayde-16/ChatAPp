const { connect } = require('getstream');
const bcrpyt = require('bcrypt');
const StreamChat = require('stream-chat');
const crypto = require('crypto')

const signup = (req, res) => {
    try{
        const { fullName, username, password, phonenumber } = req.body;
        const userID = crypto 

    }catch(error){
        console.log(error)

        res.status(500).json({ message: error })
    }
    
};

const login = () => {
    try{    
        const { username, password } = req.body;
        
    }catch(error){
        console.log(error)

        res.status(500).json({ message: error })
    }

};


module.exports = {login, signup}