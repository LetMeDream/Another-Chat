import React, {FC, useState, useEffect, useRef} from 'react'
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

	const inputRef = useRef<HTMLInputElement>()

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
 
	const focus = () => {
		if(inputRef.current) inputRef.current.focus()
	}

	useEffect(() => {
		setTimeout(() => {
			if(open && inputRef.current) {
				inputRef.current.focus()
				inputRef.current.select()
			}
		}, 50);

	}, [open])

	useEffect(() => {
		const getRandomName = async () => {
			const url = 'https://random-user-api.p.rapidapi.com/api';
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
					'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
				}
			};

			try {
				const response = await fetch(url, options);
				const result = await response.json();
				console.log(result.results[0]);
				setNewUsername(result.results[0].name.first || result.results[0].name.last)
			} catch (error) {
				console.error(error);
			}
		}
		if(open) getRandomName()

	}, [open])

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
						ref={inputRef as React.LegacyRef<HTMLInputElement>}
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
					<button onClick={focus} className='p-2 shadow-custom hover:shadow-customHover transition-all hover:border-red-400'>
						<MdDeleteSweep className='text-red-500 text-2xl ' />
					</button>
				</div>
			</Box>
    </Modal>
  )
}

export default UsernameModal
