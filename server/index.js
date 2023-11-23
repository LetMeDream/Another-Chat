const http = require('http')

const server = http.createServer()

const io = require('socket.io')(server, {
    cors: { origin: '*' }
})

io.on('connection', (socket) => {
    console.log('Conexión nueva!!!')

    /* 'Reacting' to the 'send_message' custom event emitted on the front */
    socket.on('send_message', (data) => {
        // After receiving the data, this is emited to ALL
        io.emit('add_message', data)
    })
})




server.listen(3000)