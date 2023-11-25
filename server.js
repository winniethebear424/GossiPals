// this is the server side JS

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const sessions = require('./sessions');
const users = require('./users');
const textList = require('./messages');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./public'));


// set dummy data
let onlineUsers = new Set();
let existingMsgsListessages = new Set();

// initialize online users list
onlineUsers.add({username: 'Amit', online: true, avatar: './images/avatar-amit.jpg'});
onlineUsers.add({username: 'NaNa', online: true, avatar: './images/avatar-nana.jpg'});
onlineUsers.add({username: 'DaBao', online: true, avatar: './images/DaBao.jpeg'});

//check if user is logged in
app.use((req, res, next) => {
    const sid = req.cookies.sid;
    const username = sessions.getUsername(sid);
    if (req.url === '/api/v1/login' || req.url === '/api/v1/logout'){
        next();
    }else{
        if(!sid || !username){
        res.status(401).json({error: 'unauthorized'})
        return;
        }
    }
    next();
})

//GET homepage 
app.get('/api/v1',(req,res)=> {
    const sid = req.cookies.sid;
    const username = sessions.getUsername(sid);

    if(!sid || !username){
        res.status(401).json({error: 'unauthorized'});
        return;
    }else{
        const onlineUsersArray = [...onlineUsers];
        const onlineFolks = onlineUsersArray.filter(user => user.online);
        const msmgListArray = Array.from(existingMsgsListessages);
        res.status(200).json({ onlineFolks, msmgListArray, username });
    }
})

// GET login page
app.get('/api/v1/login',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sid? sessions.getUsername(sid): "";
    if(!sid || !username){
        res.status(401).json({error: 'unauthorized'});
        return;
    }
    else{
        res.json({username});
    }
})

// GET online users
app.get('/api/v1/online-users', (req, res) => {

    const onlineUsersArray = [...onlineUsers];
    const onlineFolks = onlineUsersArray.filter(user => user.online);

    res.status(200).json({onlineFolks});
});

app.get('/api/v1/chat',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sessions.getUsername(sid);
    if(!sid || !username){
        res.status(401).json({error: 'unauthorized'});
        return;
    }
    msmgListArray = Array.from(existingMsgsListessages);
    res.status(200).json({msmgListArray});
})

// POST login page
app.post('/api/v1/login', (req, res) => {
    const { username } = req.body;
    if(!users.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if(username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }
    handleLogin(req, res, username);
});

// POST logout page
app.post('/api/v1/logout',(req,res)=>{
    const sid = req.cookies.sid;    

    if (!sid || !sessions.sidExists(sid)) {
        res.status(401).json({ error: 'unauthorized' });
        return;
    }
    // Get the username from the sid
    const username = sessions.getUsername(sid);

    // Remove user from the list of online users
    sessions.deleteSession(sid);

    // Check if the user has any remaining active sessions, // If not, mark the user as offline
    const user = [...onlineUsers].find(user => user.username === username);
    user.online = false;

    // Clear the session cookie
    res.clearCookie('sid');
    res.json({success: 'logout sussessful'});
})

// POST messages
app.post('/api/v1/chat',(req,res)=>{
    const sid = req.cookies.sid;
    //check if user exists
    if(!sid ){
        res.status(401).json({error: 'unauthorized'});
        return;
    }
    const sender = sessions.getUsername(sid)
    const newTextData = req.body;
    const text = newTextData.message;

    //check if message exists
    if(!textList.isValidMsgs(text)){
        res.status(400).json({error: 'msgs-required'});
        return;
    }
    const newMsgs = { sender: sender, text: text, avatar: './images/lulupig.webp' };
    existingMsgsListessages.add(newMsgs);
    res.status(200).json(newMsgs);
})

function handleLogin(req, res, username) {
    // Then check if user exists but loggedin from different browser
    const existingUser = [...onlineUsers].some(user => user.username === username);
    if(existingUser){
        //update existing sid
        existingUser.online = true;
        const newSid = sessions.createSession(username);
        res.cookie('sid', newSid);
        const onlineUsersArray = [...onlineUsers];
        const onlineFolks = onlineUsersArray.filter(user => user.online);
        const msmgListArray = Array.from(existingMsgsListessages);
        res.status(200).json({onlineFolks,msmgListArray});
        return;
    } 
    // If the user is not exist, create a new user and session
    const newUser = { username, online: true, avatar: './images/lulupig.webp' };
    onlineUsers.add(newUser);
    const newSid = sessions.createSession(username);
    res.cookie('sid', newSid);
    const UsersArray = Array.from(onlineUsers);
    const onlineFolks = UsersArray.filter(user => user.online);
    const msmgListArray = Array.from(existingMsgsListessages);
    res.status(200).json({onlineFolks, msmgListArray, newUser});
}

app.listen(PORT, () =>{console.log(`Listening on port ${PORT}`)});