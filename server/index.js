const http = require('http');

const server = http.createServer()
const io = require('socket.io')(server, {
    cors: { origin: '*' },
		maxHttpBufferSize: 1e8
});

io.on('connection', (socket) => {
    console.log('Conexión nueva!')

    /* 'Reacting' to the 'send_message' custom event emitted on the front */
    socket.on('send_message', (payload) => {
        console.log(payload)
        // After receiving the payload, this is emited to ALL
        io.emit('add_message', payload)
    })

    socket.on('ping', (payload) => {
        console.log(payload)
        io.emit('notice_me_user', payload)
    })

		socket.on('post_video', (payload) => {
			console.log(payload)
			io.emit('get_video', payload)
		})
})

server.listen(3000)