//this is Client Side JS
import * as users from '../users'; 
import * as text from '../messages';  
import * as ErrorMessages from '../errors';

const loginForm = document.getElementById('login-form');
const Error = document.getElementById('error');
const inputText = document.querySelector('input[name="send-message"]');
const logoutButton = document.querySelector('.logout-button');
const chatApp = document.getElementById('chat-app');
const outgoingMsgsForm = document.querySelector('.outgoing');
const loadingIndicator = document.getElementById('loading-indicator');
const usersContent = document.getElementById('user');
// initialize state
const appState = {
    messages: [], // chat msgs
    onlineUsers: [], // online users
    t1: null, //timer for polling online users
  };
// Polling every 5 seconds
function startPolling() {
    setInterval(function () {
        fetch('/api/v1/online-users', {
            method: 'GET',
            headers: {},
        })
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            if (!response.ok) {
                const errorData = response.json();
                return errorData.then(error => {
                    ErrorMessages.renderErrorMessage(error.error,'error');
                });
            }
        })
        .then(onlineUsersData => {
            // Update online user list
            appState.onlineUsers = [...onlineUsersData.onlineFolks];
            renderOnlineUserList(appState.onlineUsers);
        })
        .catch(error => {
            if(error.error){
                ErrorMessages.renderErrorMessage(error.error,'error')
            }
        })
    
        fetch('/api/v1/chat', {
            method: 'GET',
            headers: {},
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            if (!response.ok) {
                const errorData = response.json();
                return errorData.then(error => {
                    ErrorMessages.renderErrorMessage(error.error,'error');
                });
            }
        })
        .then(chatData => {
            // Update state(chat list)
            appState.messages = [...chatData.msmgListArray];
            renderChatList(appState.messages);
        })
        .catch(error => {
            if(error.error){
                ErrorMessages.renderErrorMessage(error.error,'error')
            }
        })
    }, 5000);
}

document.addEventListener('DOMContentLoaded',function() {
    // Initial rendering
    fetch('/api/v1', {
        method: 'GET',
        headers:{}
    })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            if (!response.ok) {
                Error.innerHTML = '';
            }
        })
        .then(data=>{
            appState.onlineUsers = data.onlineFolks;
            appState.messages = data.msmgListArray;
            renderChatApp();
            renderAll(appState.onlineUsers, appState.messages);
            startPolling();  
        })
        .catch(error => {
            if(error.error == 'network-error'){
                ErrorMessages.renderErrorMessage(error.error,'error')
            }
            else{
                Error.innerHTML = '';
            }
        })

});

// login form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('input[name="inputUsername"]');
    const username = input.value;
    const userData = {username: username};

    fetch('/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
    })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            if (!response.ok) {
                const errorData = response.json();
                return errorData.then(error => {
                    ErrorMessages.renderErrorMessage(error.error,'error');
                if(response.error.error == 'wrong password'){
                    throw new Error('wrong password');                    
                }
                });
            }
        })    
        .then(data=>{
            //update users info, render existing chat list & online user list
            Error.innerHTML = '';
            appState.onlineUsers = Array.from(data.onlineFolks);
            appState.messages = Array.from(data.msmgListArray);
            renderChatApp();
            renderAll(appState.onlineUsers, appState.messages);

            // Start polling
            startPolling();  
        }) 
        .catch(error => {
            if(error.error){
                ErrorMessages.renderErrorMessage(error.error,'error')
            }
        })
});

// send msgs
outgoingMsgsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msgsData = {
        message: inputText.value,
    };

    fetch('/api/v1/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(msgsData),
        credentials: 'include'
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        if (!response.ok) {
            const errorData = response.json();
            return errorData.then(error => {
                ErrorMessages.renderErrorMessage(error.error,'error');
            });
        }
    })
    .then(data => {
        inputText.value = '';
        // Update state and render
        appState.messages = Array.from(appState.messages).concat(data);
        text.updateMessages(appState.messages)
    })
    .catch(error => {
        if(error.error){
            ErrorMessages.renderErrorMessage(error.error,'error')
        }
    })
});

//logout 
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/api/v1/logout', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        credentials: 'include'
    })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            if (!response.ok) {
                const errorData = response.json();
                return errorData.then(error => {
                    ErrorMessages.renderErrorMessage(error.error,'error');
                });
            }
        })
        .then(data =>{
            if(data.success){
                clearInterval(appState.t1);
                Error.style.display = 'block';
                Error.innerHTML = 'Thank you for using our chat app';
            }
            renderLoginForm();
        })
        .catch(error => {
            if(error.error){
                ErrorMessages.renderErrorMessage(error.error,'error')
            }
        })
});

function renderAll(onlineUsers, messages) {
    return new Promise((resolve) => {
        // spinner, when the whole page is loading
        loadingIndicator.classList.remove('hidden');
        renderOnlineUserList(onlineUsers);
        renderChatList(messages);
        loadingIndicator.classList.add('hidden')
        resolve();
    });
    return;
}
   
// render Login Form{
function renderLoginForm(){
    loginForm.style.display = 'block';
    chatApp.style.display = 'none';
}

function renderChatApp(){
    chatApp.style.display = 'block';
    loginForm.style.display = 'none';
    return;
}

function renderOnlineUserList(onlineUsers){
    // spinner, when the whole page is loading
    loadingIndicator.classList.remove('hidden');
    users.printOnlineUserList(onlineUsers, 'user');
    loadingIndicator.classList.add('hidden');
    return;
}

function renderChatList(existingMsgsListessages){
    // spinner, when the whole page is loading
    loadingIndicator.classList.remove('hidden');

    text.updateMessages(existingMsgsListessages);
    loadingIndicator.classList.add('hidden');
    return;
}
