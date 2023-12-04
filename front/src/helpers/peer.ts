import Peer, {DataConnection} from "peerjs"
import {message} from "antd" 
let peer: Peer | undefined
const connectionMap: Map<string, DataConnection> = new Map<string, DataConnection>()

export enum DataType {
	FILE = 'FILE',
	OTHER = 'OTHER'
}

export interface Data {
	file?: Blob | MediaSource | undefined
}

export const PeerConnection = {
  getPeer: () => peer,
  startPeerSession: (
		setIsConnected: (value: boolean) => void, 
		setId: (value: string) => void
	) => new Promise<string>((resolve, reject) => {
		try {
			peer = new Peer()
			peer.on('open', (id) => {
				console.log('My ID: ' + id)
				setId(id)
				setIsConnected(true)
				resolve(id)
			})
			peer.on('error', (err) => {
				console.log(err)
				setIsConnected(false)
				message.error(err.message)
			})
		} catch (err) {
			console.log(err)
			reject()
		}
  }),
  onIncomingConnection: (callback: (conn: DataConnection) => void) => {
		peer?.on('connection', function (conn) {
				console.log("Incoming connection: " + conn.peer)
				connectionMap.set(conn.peer, conn)
				callback(conn)
		});
  },
	onConectionDisconected: (id: string, callback: () => void) => {
		if (!peer) {
			throw new Error("Peer doesn't start yet")
		}
		if (!connectionMap.has(id)) {
				throw new Error("Connection didn't exist")
		}
		const conn = connectionMap.get(id)
		if (conn) {
			conn.on('close', () => {
				console.log("Connection closed: " + id)
				connectionMap.delete(id)
				callback()
			})
		}

	},
	onConectionReceiveData: (id: string, callback: (data: Data) => void) => {
		if (!peer) {
			throw new Error("Peer doesn't start yet")
		}
		if (!connectionMap.has(id)) {
				throw new Error("Connection didn't exist")
		}
		const conn = connectionMap.get(id)
		if(conn){
			conn.on('data', (receivedData) => {
				console.log('Receiving data from ' + id)
				callback(receivedData)
			})
		}
	},
	connectPeer: (remoteId: string, setIsPeerConnected: (val: boolean) => void) => new Promise<void>((resolve, reject) => {
		if (!peer) {
			reject(new Error("Peer doesn't start yet"))
			return
		}
		if(connectionMap.has(remoteId)) {
			reject(new Error("Connection already existed"))
			return
		}
		try {
			const conn = peer?.connect(remoteId, {reliable: true})
			if (!conn) {
					reject(new Error("Connection can't be established"))
			} else {
					conn.on('open', function() {
							console.log("Connect to: " + remoteId)
							setIsPeerConnected(true)
							connectionMap.set(remoteId, conn)
							resolve()
					})
					conn.on('error', function(err: string) {
							console.log(err)
							reject(err)
					})
			}
		} catch (err) {
				console.log(err)
				reject(err)
		}
	}),
	sendData: (remoteId: string, data: Data | string) => new Promise((resolve, reject) => {
		if (!connectionMap.has(remoteId)) {
			reject(new Error("Connection doesn't exist"))
			return
		}
		try {
			const conn = connectionMap.get(remoteId)
			if (conn) {
				conn.send(data)
				resolve(data)
			}
		} catch (error) {
			reject(error)
		}
	})
}