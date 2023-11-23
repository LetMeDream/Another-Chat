import React, {useState, useEffect} from 'react'
import '../App.css'
import UsernameModal from '../components/UsernameModal'
import { MenuProfile } from '../components/MenuProfile'
import { io } from 'socket.io-client'

const socket = io('192.168.0.104:3000')

interface Message {
	user: string;
	message: string;
}

const Root = () => {
	/* Messages */
	const [messages, setMessages] = useState<Message[]>([])
	const [newMessage, setNewMessage] = useState('');

	/* Username logic */
	const [username, setUsername] = useState('Let')
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	/* Socket logic */
	const [isConnected, setIsConnected] = useState(false)
	useEffect(() => {
		/* Subscriptions */
		socket.on('connect', () => setIsConnected(true))
		socket.on('add_message', (data) => {
			setMessages(prevMessages => [...prevMessages, data])
		})

		/* Unsubscriptions */
		return () => {
			socket.off('add_message')
			socket.off('connect')
		}
	}, [])

	const handleSend = () => {
		/* Start emiting a message */
		socket.emit('send_message', {
			user: username,
			message: newMessage
		})
		setNewMessage('')
	}

  return (
    <div className='flex justify-center w-[100vw]'>
      <div id="sidebar" className='s shadow-lg relative bg-[#d7d5d5] flex flex-col w-full sm:max-w-[70vw]'>

				<div className='border-[1px] border-b-[#e3e3e3] px-0 flex items-center justify-between'>
					<h1>Such a chat</h1>
					{username.length ? 
							<MenuProfile 
								username={username} 
								setUsername={setUsername}
								handleOpen={handleOpen}
							/>
					: null}
				</div>
				
				<div className='pt-2 grow'>
					<ul className='p-0 m-0 list-none'>
						{
							messages?.map((message) => {
								return (
									<li className='my-1 mx-0 bg-[#e3e3e3] py-2 px-4 cursor-pointer'>
										<span className=' font-medium text-gray-800'>
											{message.user}:&nbsp;
										</span>
										{message.message}
										{/* <a href={`/contacts/1`}>Your Name</a> */}
									</li>
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
      </div>
    </div>
  )
}

export default Root