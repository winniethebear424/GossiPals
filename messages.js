// this is the file of data storage for stage

let messages = []

function addMessages(sender, text){
    const newMsgs = {
        sender: sender,
        text: text,
        avatar: './images/lulupig.webp'
    };
    messages.push(newMsgs);
    return;
}

function isValidMsgs(text) {
    let isValid = true;
    isValid = isValid && text.trim() !== '';
    return isValid;
}

function updateMessages(existingMsgsList) {

    if (!existingMsgsList) {
        return;
    }        

    messages = existingMsgsList;
    
    const textList = document.querySelector('.new-messages');
    textList.innerHTML = '';
    messages.forEach(newMsgs => {
        const mewTextElement =document.createElement('li');
        const senderInfo = document.createElement('div');
        const senderName = document.createElement('p');
        const senderAvatar = document.createElement('img');    
        const sentMsgs = document.createElement('div');
        const textParagraph = document.createElement('p');

        mewTextElement.className = 'message';
        senderInfo.className = 'sender-info column';
        senderName.className = 'username';
        senderAvatar.className = 'avatar';
        sentMsgs.className = 'sent-msgs';

        senderName.innerHTML = newMsgs.sender;
        sentMsgs.innerHTML = newMsgs.text;
        senderAvatar.src = newMsgs.avatar;

        mewTextElement.appendChild(senderInfo);
        mewTextElement.appendChild(sentMsgs);
        senderInfo.appendChild(senderName);
        senderInfo.appendChild(senderAvatar);
        sentMsgs.appendChild(textParagraph);
        textList.appendChild(mewTextElement);
    });
}

module.exports = {
    messages,
    addMessages,
    updateMessages,
    isValidMsgs,
}