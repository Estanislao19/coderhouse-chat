const socket = io()
const messageForm = document.querySelector('#messageForm')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagePool = document.querySelector('#messagePool')


function sendMessage(messageInfo){
socket.emit('client:message',messageInfo)
}
function renderMessages(messagesInfo){
    
        const html = messagesInfo.map(msgInfo => {
            return(`<div>
                <strong>${msgInfo.username}</strong>:
                <em>${msgInfo.message}</em> </div>`)
        }).join(" ");
        messagePool.innerHTML = html;
}

messageForm.addEventListener('submit', submitHandler)


function submitHandler(event){
    event.preventDefault()
    const messageInfo = {username:usernameInput.value,message:messageInput.value}

    sendMessage(messageInfo)
}

socket.on('server:mensajes',renderMessages)