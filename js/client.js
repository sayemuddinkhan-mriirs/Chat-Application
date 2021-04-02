const socket = io('http://localhost:8000');

const form = document.getElementById('sendContainer');

const messageInput = document.getElementById('messageInp');

const messageContainer = document.querySelector('.messageContainer');

const append = (message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position=='left')
    {
        audio.play();
    }
};

var audio = new Audio('notification.mp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value='';
})

const name = prompt("Enter your Username to join the chat");

socket.emit('newuser',name);

socket.on('userjoined', name=>{
    append(`${name} joined the chat`,'left')
});

socket.on('receive', data=>{
    append(`${data.name}:${data.message}`,'left')
});

socket.on('left', name=>{
    append(`${name} has left the chat`,'left');
});









socket.on('connect', function(data) {
    console.log("connected");
});

