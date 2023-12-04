import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { PeerConnection } from '../helpers/peer'
import {message} from 'antd'


/**
 * Description placeholder
 * @date 12/1/2023 - 10:57:31 AM
 * @param {boolean} autoStart - Boolean variable that determines whether or not run 'startPeerConnection', for its initial own connection.
 * @param {string} userId - User id to stablish P2P connection to. Connection not attempted if value is '' (empty string).
 */
const usePeer = (autoStart: boolean = false, userId: string = '', handleOpenIncomingVideoModal?: () => void, setPayload?: Dispatch<SetStateAction<{ user: string, file: File }>>) => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [isPeerConnected, setIsPeerConnected] = useState(false)

  
  useEffect(() => {

    /**
     * Starts own connection
     * 
     * @date 11/30/2023 - 5:14:01 PM
     * @returns {Promise<void>}
     *
     * @async
     * */
    const startPeerConnection = async () => {
      try {
        await PeerConnection.startPeerSession(setIsConnected, setId)
        /* Handling connection */
        PeerConnection.onIncomingConnection((conn) => {
          const peerId = conn.peer 
          message.info('Incoming connection from: ' + peerId)
          /* Handling disconections */
          PeerConnection.onConectionDisconected(peerId, () => {
            message.info('Conection closed')
          })
          /* Handling receiving data */
          PeerConnection.onConectionReceiveData(peerId, (receivedData) => {
            message.info('Data!!!!')
            const blob = new Blob([receivedData.file as BlobPart], { type: 'video' })
            const file = new File([blob], 'autovideo', { type: 'video' })
            console.log(blob)
            console.log(file)
            console.log(receivedData) 
            if(handleOpenIncomingVideoModal && setPayload){
              handleOpenIncomingVideoModal()
              setPayload({
                user: 'we_user',
                file: file
              })
            }
          })
        })
      } catch (error) {
        console.log(error)
      }
    }

    // 'autoStart' is created so that we can pass an 'open' modal boolean state variable to it, and it only triggers when the modal opens
    if(autoStart) startPeerConnection()
  }, [autoStart])

  
  /**
   * connects to the remoteId passed.
   * 
   * @date 11/30/2023 - 5:06:19 PM
   * @param {string} remoteId - Id to connect to
   * @returns {Promise<void>}
   *
   * @async
   * */
  const connectPeer = async (remoteId: string, setIsPeerConnected: (val: boolean) => void) => {
    try {
      await PeerConnection.connectPeer(remoteId, setIsPeerConnected)
    } catch (error) {
      console.log(error)
    }
  }
  /* Only 'connectPeer' if there's an 'userId' */
  if(userId && !isPeerConnected){
    console.log('connectin to ' + userId)
    connectPeer(userId, setIsPeerConnected)
  }
  

  return {
    id,
    isConnected
  }
}

export default usePeer