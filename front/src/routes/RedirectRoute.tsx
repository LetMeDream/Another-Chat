import React, {useEffect, useState} from 'react'
import { io } from 'socket.io-client'
const socket = io('192.168.0.104:3000')
import { useParams } from 'react-router-dom'

const RedirectRoute = () => {
	const [isConnected, setIsConnected] = useState(false)
	const { username } = useParams()

	useEffect(() => {
		/* Subscriptions */
		socket.on('connect', () => setIsConnected(true))


		/* Unsubscriptions */
		return () => {
			socket.off('add_message')
		}
	}, [])

	useEffect(() => {
		if(isConnected && username) console.log('Hello ' + username)
	}, [isConnected, username])

  return (
    <div className='flex w-[100vw] min-h-[90-vh] items-center justify-center'>
			<section className='w-full flex flex-col gap-4 items-center'>
				<div>
					Grabe su vídeo, <span className=' font-medium uppercase'>{username}</span>
				</div>
				<div className="cam-preview border min-w-[50%] w-[50%] h-[200px] border-red-600">

				</div>
				<button className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
					Iniciar grabación
				</button>

				{/* <div className="btns">
					<button className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>Yes</button>
					<button className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>No</button>
				</div> */}
			</section>
		</div>
  )
}

export default RedirectRoute