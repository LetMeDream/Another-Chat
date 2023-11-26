import {FC, useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface UsernameModalProps {
  handleClose: () => void;
  open: boolean;
  payload: { user: string, file: File };
}

const IncomingVideoModal: FC<UsernameModalProps> = ({open, handleClose, payload}) => {

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '8px',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 3,
		display: 'flex',
    flexDirection: 'column'
	}

  useEffect(() => {

    setTimeout(() => {
      const video: HTMLVideoElement | null = document.querySelector('#received-video')

      if(video){
        const reader = new FileReader()
        reader.onload = function(e: ProgressEvent<FileReader>) {
          const result = (e.target as FileReader).result
          if(typeof result === 'string') video.src = result

        }
        const blob = new Blob([payload.file], {type: 'video/mp4'})
        reader.readAsDataURL(blob)
        console.log(blob)
      }
  
    }, 500);

  }, [payload])

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          {payload.user}
          <video controls muted className='w-full' id='received-video'>
          </video>
				</Box>
		</Modal>
  )
}

export default IncomingVideoModal