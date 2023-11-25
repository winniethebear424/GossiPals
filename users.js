// this is the file of data storage for stage

let userList = []

function updateUserList(username){

    const newUser = {
        username: username,
        online:true,
        avatar: './images/lulupig.webp'
    };
    userList.push(newUser);
    return userList;
}

function printOnlineUserList(onlineUserslist,elementId){

    const divSection = document.getElementById(elementId);
    divSection.innerHTML = '';
    if(onlineUserslist){
        userList = onlineUserslist;
        userList.forEach(user => {

            const span = document.createElement('span');
            const img = document.createElement('img');

            span.classList.add('existingUser');
            img.classList.add('avatar');        

            span.innerHTML = user.username;
            img.src = user.avatar;

            divSection.appendChild(span); 
            span.appendChild(img);
        });
        return divSection;
    }
}

//sanitize the username
function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && typeof username === 'string' && username.trim() !== '';
    isValid = isValid && username.match(/^[a-z][a-z0-9]{2,19}$/i);
    return isValid;
}



module.exports = {
    userList,
    isValidUsername,
    updateUserList,
    printOnlineUserList
}