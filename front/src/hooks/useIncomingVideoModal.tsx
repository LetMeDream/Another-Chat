import {useState} from 'react'

const useIncomingVideoModal = () => {
  const [openIncomingVideoModal, setOpenIncomingVideoModal] = useState(false)
  const [payload, setPayload] = useState<{ user: string, file: File }>({ user: '', file: new File([], 'dummy') })
	const handleOpenIncomingVideoModal = () => {
    setOpenIncomingVideoModal(true)
  }
	const handleCloseIncomingVideoModal = () => setOpenIncomingVideoModal(false)

  return {
    openIncomingVideoModal,
    handleOpenIncomingVideoModal,
    handleCloseIncomingVideoModal,
    payload,
    setPayload
  }
}

export default useIncomingVideoModal