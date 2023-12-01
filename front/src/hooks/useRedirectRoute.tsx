import { useState } from 'react'
import { RecordRTCPromisesHandler, getSeekableBlob } from 'recordrtc'
import {message} from 'antd'
/* Socket connection */
import { PeerConnection } from '../helpers/peer'

interface RecorderOfMine extends RecordRTCPromisesHandler {
	getArrayOfBlobs?: () => Blob[];
}

export const useRedirectRoute = (userId: string) => {
	/* Recorder logic */
	const [recorder, setRecorder] = useState<RecordRTCPromisesHandler | null>(null)
	const [stream, setStream] = useState<MediaStream | null>()
	const [status, setStatus] = useState('idle') // 'displaying' | inactive | stopped | paused |recording
	const [savedBlob, setSavedBlob] = useState<Blob | MediaSource>()
	//const [savedFile, setSavedFile] = useState<Blob | null>(null)
	const [currentVideoSize, setCurrentVideoSize] = useState(0)

	let buttons: React.ReactNode

	function stopBothVideoAndAudio () {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }

	const previewRecording = async () => {
    const vid: HTMLVideoElement | null = document.querySelector('#cam-recording')
    vid!.controls = false	

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			})
			const recorder = new RecordRTCPromisesHandler(stream, {
				type: 'video',
				timeSlice: 1000
			})
			setStream(stream)
			setRecorder(recorder)
			vid!.srcObject = stream
			setStatus('displaying')
		} catch (error) {
			console.log(error)
			alert('error')
		}

	}

	const startRecording = async () => {
		(async function looper(){
			if(!recorder || await recorder.getState() === 'stopped') return

			const internal = await recorder.getInternalRecorder() as RecorderOfMine
			if(internal && internal.getArrayOfBlobs){
				const blob = new Blob(internal.getArrayOfBlobs(), {
					type: 'video/webm'
				})
				console.log(blob)
			}
			setTimeout(looper, 500)
		})()

		recorder!.startRecording()
		setStatus(await recorder!.getState())
	}

	const handleCancel = () => {
		setStatus('idle')
		stopBothVideoAndAudio()
		const vid: HTMLVideoElement | null = document.querySelector('#cam-recording')
		if(vid){
			vid.srcObject = null
		} 
	}

	const pauseRecording = async () => {
		const vid: HTMLVideoElement | null = document.querySelector('#cam-recording')
		vid!.pause()
		await recorder!.pauseRecording()
		setStatus(await recorder!.getState())
	}

	const resumeRecording = async () => {
		const vid: HTMLVideoElement | null = document.querySelector('#cam-preview')
		vid!.play()
		await recorder!.resumeRecording()
		setStatus(await recorder!.getState())
	}

	const stopRecording = async () => {
		const vid: HTMLVideoElement | null = document.querySelector('#cam-recording')
		const preview: HTMLVideoElement | null = document.querySelector('#recording-preview')
		vid!.pause()
		await recorder!.stopRecording()
		setStatus(await recorder!.getState())
		const blob = await recorder!.getBlob()
		getSeekableBlob(blob, (seekableBlob: Blob) => {
			// const seekableFile = new window.File([seekableBlob], 'auto_video')
			setSavedBlob(seekableBlob)
			preview!.src = URL.createObjectURL(seekableBlob!)
			preview!.controls = true
			vid!.classList.add('hidden')
			preview!.classList.remove('hidden')
		})
	}

	const passVideo = async () => {
		try {
			await PeerConnection.sendData(userId, {
				file: savedBlob
			})
			message.info("Send video successfully")
		} catch (error) {
			console.log(error)
			message.error('Error sending video')
		}
	}

	const retry = async () => {
		recorder?.destroy()
		
		try {
			const vid: HTMLVideoElement | null = document.querySelector('#cam-recording')
			const preview: HTMLVideoElement | null = document.querySelector('#recording-preview')
			vid!.controls = false	
			preview!.classList.add('hidden')
			vid!.classList.remove('hidden')
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			})
			const recorder = new RecordRTCPromisesHandler(stream, {
				type: 'video',
				timeSlice: 1000
			})
			setStream(stream)
			setRecorder(recorder)
			vid!.srcObject = stream
			setStatus('displaying')
		} catch (error) {	
			console.log(error)
			alert('error')
		}
	}

	const sendSomeDataSomehow = async () => {
		try {
			await PeerConnection.sendData(userId, 'hi')
			message.info("Send string successfully")
		} catch (error) {
			console.log(error)
			message.error("Error sending someData")
		}
	}

	switch (status) {
		case 'idle':
				buttons =  (<>
					<div className="buttons flex gap-2">
						<button onClick={previewRecording} className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
							Preview
						</button>
						<button onClick={sendSomeDataSomehow} className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
							Connect!
						</button>
					</div>
				</>);
			break;
		case 'displaying':
			buttons =  (<>
				<div className="buttons flex gap-2">
					<button onClick={startRecording} className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
						Start
					</button>
					<button onClick={handleCancel} className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
						Cancel
					</button>
				</div>
			</>);
		break;
		case 'recording':
			buttons =  (<>
				<div className="buttons flex gap-2">
					<button onClick={stopRecording} className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
						Stop
					</button>
					<button onClick={pauseRecording} className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
						Pause
					</button>
				</div>
			</>);
		break;
		case 'paused':
			buttons =  (<>
				<div className="buttons flex gap-2">
					<button onClick={stopRecording} className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
						Stop
					</button>
					<button onClick={resumeRecording} className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
						Resume
					</button>
				</div>
			</>);
		break;
		case 'stopped':
			buttons =  (<>
				<div className="buttons flex gap-2">
					<button onClick={retry} type='button' className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
						Re try
					</button>
					<button type='button' onClick={passVideo} className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'>
						Socket the video!
					</button>

				</div>
			</>);
		break;
	
		default:
			break;
	}

  return {
		status,
		setStatus,
		buttons
  }
}

