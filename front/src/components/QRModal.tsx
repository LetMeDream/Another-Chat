import React, {FC} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import QRCode from 'react-qr-code';

interface UsernameModalProps {
  handleClose: () => void;
  open: boolean;
	value: string
}

const QRModal: FC<UsernameModalProps> = ({open, handleClose, value}) => {

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


  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
					<QRCode
						size={256}
						style={{ height: "auto", maxWidth: "100%", width: "100%" }}
						value={value}
						viewBox={`0 0 256 256`}
					/>
				</Box>
		</Modal>
  )
}

export default QRModal