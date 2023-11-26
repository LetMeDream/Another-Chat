import { useParams } from 'react-router-dom'

import { useRedirectRoute } from '../hooks/useRedirectRoute'

const RedirectRoute = () => {
	const { username } = useParams()
	/* Redirect logic */
	const { buttons} = useRedirectRoute(username)

  return (
    <div className='flex w-[100vw] min-h-[90-vh] items-center justify-center'>
			<section className='w-full flex flex-col gap-4 items-center'>
				<div>
					Record your video, <span className=' font-medium uppercase'>{username}</span>
				</div>
				<video autoPlay muted className='w-[520px] max-w-[100vw] min-h-[50vh] h-[260px]' id='cam-recording' />
				<video className='w-[520px] max-w-[100vw] min-h-[50vh] h-[260px] border border-red-900 hidden' id='recording-preview' />

				{buttons}
			</section>
		</div>
  )
}

export default RedirectRoute