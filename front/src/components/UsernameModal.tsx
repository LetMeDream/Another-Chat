import React, {FC, useState} from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { MdDeleteSweep } from "react-icons/md"

interface UsernameModalProps {
  handleClose: () => void;
  open: boolean;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	username: string;
}

const UsernameModal: FC<UsernameModalProps> = ({handleClose, open, setUsername, username}) => {
	const [newUsername, setNewUsername] = useState(username || '')

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
		display: 'flex'
	}

	const saveUsername = () => {
		setUsername(newUsername)
		handleClose()
	}

	const handleKey = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') saveUsername()
	}

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
			<Box sx={style}>
				<div className='w-full flex gap-1'>
					<input 
						value={newUsername}
						onChange={(e) => setNewUsername(e.target.value)}
						onKeyUp={handleKey}
						type='text' 
						placeholder='Username' 
						className='grow py-2 px-3 shadow-custom hover:shadow-customHover active:shadow-customActive focus:shadow-customActive outline-none' />
					<button 
						onClick={saveUsername}
						disabled={newUsername.length <= 2}
						className='py-2 px-3 shadow-custom hover:enabled:shadow-customHover'
					>
						Ready
					</button>
					<button className='p-2 shadow-custom hover:shadow-customHover transition-all hover:border-red-400'>
						<MdDeleteSweep className='text-red-500 text-2xl ' />
					</button>
				</div>
			</Box>
    </Modal>
  )
}

export default UsernameModal
