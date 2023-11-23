import React, {useEffect, useState} from 'react'
import { io } from 'socket.io-client'
const socket = io('192.168.0.104:3000')

const RedirectRoute = () => {
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		/* Subscriptions */
		socket.on('connect', () => setIsConnected(true))


		/* Unsubscriptions */
		return () => {
			socket.off('add_message')
		}
	}, [])

	useEffect(() => {
		if(isConnected) alert('Im connected')
	}, [isConnected])

  return (
    <div>redirectRoute</div>
  )
}

export default RedirectRoute