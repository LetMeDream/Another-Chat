import { useParams } from 'react-router-dom'
import usePeer from '../hooks/usePeer'
import { useRedirectRoute } from '../hooks/useRedirectRoute'
import {useEffect} from 'react'
import { bytesToSize } from 'recordrtc'

const RedirectRoute = () => {
	/* Redirect logic */
	const { userId } = useParams()
	const { isConnected } = usePeer(true, userId)
	
	const { buttons, currentVideoSize } = useRedirectRoute(userId)
	useEffect(() => {
		console.log('The id I should autoconnect to is: ' + userId)
	}, [])

  return (
    <div className='flex w-[100vw] min-h-[100-vh] items-center justify-center'>
			<section className='w-full h-full flex flex-col justify-around gap-4 items-center border border-red-500'>
				<div>
					Record your video.
				</div>
				<video autoPlay muted className=' min-h-[50vh]' id='cam-recording' />
				<video className=' min-h-[50vh] hidden' id='recording-preview' />
				{bytesToSize(currentVideoSize)}
				{buttons}
			</section>
		</div>
  )
}

export default RedirectRoute