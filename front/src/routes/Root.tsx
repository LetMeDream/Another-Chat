import React, {useState, useEffect} from 'react'
import '../App.css'
import UsernameModal from '../components/UsernameModal'
import { MenuProfile } from '../components/MenuProfile'
import { Link } from 'react-router-dom'
import QRModal from '../components/QRModal'
import useIncomingVideoModal from '../hooks/useIncomingVideoModal'
import IncomingVideoModal from '../components/IncomingVideoModal'
import socket from '../socket'
import MessageGlobe from '../components/MessageGlobe'

interface Message {
	user: string;
	message: string;
	date: string;
}

const Root = () => {
	/* Messages */
	const [messages, setMessages] = useState<Message[]>([])
	const [newMessage, setNewMessage] = useState('');

	/* USERNAME modal logic */
	const [username, setUsername] = useState('')
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	/* QR modal logic */
	const [openQR, setOpenQR] = React.useState(false)
	const handleOpenQR = () => setOpenQR(true)
	const handleCloseQR = () => setOpenQR(false)

	/* Incoming video logic */
	const { openIncomingVideoModal, handleOpenIncomingVideoModal, handleCloseIncomingVideoModal, payload, setPayload } = useIncomingVideoModal()

	/* Socket logic */
	const [, setIsConnected] = useState(false)
	useEffect(() => {
		/* Subscriptions */
		socket.on('connect', () => setIsConnected(true))
		socket.on('add_message', (data) => {
			setMessages(prevMessages => [...prevMessages, data])
		})
		socket.on('notice_me_user', (data) => {
			console.log(data)
			if((data.user).toLowerCase() == username.toLowerCase()) {
				console.log('Console.log: notice_me_user')
				setNewMessage('Ping desde el mobile a través del web socket')
			}
		})

		socket.on('get_video', (data) => {
			console.log(data)
			if((data.user).toLowerCase() == username.toLowerCase()) {
				setPayload(data)
				handleOpenIncomingVideoModal()
			}
		})

		/* Unsubscriptions */
		return () => {
			socket.off('connect')
			socket.off('add_message')
			socket.off('notice_me_user')
			socket.off('get_video')
		}
	}, [username, setPayload, handleOpenIncomingVideoModal])

	const handleSend = () => {
		/* Start emiting a message */
		socket.emit('send_message', {
			user: username,
			message: newMessage,
			date: new Date()
		})
		setNewMessage('')
	}

	const urlValue = `http://192.168.0.104:5173/redirect/${username}`

  return (
    <div className='flex justify-center w-[100vw]'>
      <div id="sidebar" className='s shadow-lg relative bg-[#d7d5d5] flex flex-col w-full sm:max-w-[70vw]'>

				<div className='border-[1px] border-b-[#e3e3e3] px-0 flex items-center justify-between'>
					<Link to={`/redirect/${username}`} target='_blank'>
						<h1>Another Chat</h1>
					</Link>
					{username.length ? 
							<MenuProfile 
								username={username} 
								setUsername={setUsername}
								handleOpen={handleOpen}

								handleOpenQR={handleOpenQR}
							/>
					: null}
				</div>
				
				<div className='pt-2 grow'>
					<ul className='p-0 m-0 list-none'>
						{
							messages?.map((message, index) => {
								return (
									<MessageGlobe message={message} messages={messages} key={index} idx={index} />
								)
							})
						}


					</ul>
				</div>

        <div 
					id='messageInput'
					className='order-2 border-t-[1px] border-[#e3e3e3] flex py-4'
				>

				<div id="search-form" role="search" className='flex w-full justify-center gap-2'>
					{username.length ? 
					(
					<>
						<input
							id="q"
							aria-label="New message"
							placeholder="Message"
							type="search"
							name="q"
							autoComplete='off'
							className='w-full outline-none py-2 px-3 shadow-custom hover:shadow-customHover active:shadow-customActive focus:shadow-customActive' 
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyUp={(e) => {
								if (e.key === 'Enter'){
									handleSend()
								}
							}}
						/>
						<button type="button" onClick={handleSend} className='py-2 px-3 shadow-custom hover:shadow-customHover'>Send</button>
					</>
					) : null}

					{/* No user yet */}
					{!username.length ? 
						(	
							<div>
								<button 
									type='button'
									onClick={handleOpen}
									className="flex items-center text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded">
									Choose you user name!
								</button>
							</div>
						) : null}
				</div>
          
        </div>

				<UsernameModal handleClose={handleClose} open={open} setUsername={setUsername} username={username} />
				<QRModal handleClose={handleCloseQR} open={openQR} value={urlValue} />
				<IncomingVideoModal handleClose={handleCloseIncomingVideoModal} open={openIncomingVideoModal} payload={payload} />
      </div>
    </div>
  )
}

export default Root