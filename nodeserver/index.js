//const io = require('socket.io')(8000);
const io = require("socket.io")(8000, {
    cors: {
      
      origin: "http://localhost:5500",
      methods: ["GET", "POST"]
    }
  });


const users={};

io.on('connection', socket=>{
    socket.on('newuser', name =>{
        console.log("New user joined", name);
        users[socket.id]=name;
        socket.broadcast.emit('userjoined', name)
    });

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message : message , name : users[socket.id]})
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});


