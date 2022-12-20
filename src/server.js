const express = require('express');
const {Server:IOServer} = require('socket.io')
const path = require('path')
const app = express();
const port =8080
const expressServer = app.listen(port ,() => console.log('Servidor escuchando puerto 8080'))
const io = new IOServer(expressServer)
const messagesArray = []

app.use(express.static(path.join(__dirname + '../public')))

io.on('connection',socket =>{
    console.log(`Se conecto un usuario: ${socket.id}`)
    socket.emit('Server:mensajes', messagesArray)
    socket.on('client:message',messageInfo =>{
        messagesArray.push(messageInfo)
        io.emit('server:mensajes', messagesArray)
    })
})