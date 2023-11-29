import React, { useEffect, useState } from 'react'
import { DateTime } from "luxon"
import Tooltip from '@mui/material/Tooltip';

interface Message {
  user: string;
  message: string;
  date: string;
}

interface MessageGlobe {
  message: Message;
  messages: Message[];
  idx: number;
}

const MessageGlobe: React.FC<MessageGlobe> = ({message, messages, idx}) => {

  const handleClick = () => {
    console.log(messages)
  }
  const [relativeTimeElapsed, setRelativeTimeElapsed] = useState<string | null>()
  useEffect(() => {
    const updateTimestamp = () => {
      const dateTime = DateTime.fromISO(message.date)
      setRelativeTimeElapsed(dateTime.toRelative({ base: DateTime.now() }))
    }
    const update = setInterval(updateTimestamp, 1000)

    return () => {
      clearInterval(update)
    }
  }, [])


  let listItem = (
    <>
      <span className=' font-medium text-gray-800'>
        {message.user}
        &nbsp;
        <span className=' text-slate-400 text-xs'>
          {relativeTimeElapsed}
        </span>
      </span>
      <Tooltip title={relativeTimeElapsed}>
      <li onClick={handleClick} className='my-1 mx-0 bg-[#e3e3e3] py-2 px-4 cursor-pointer'>
        {message.message}
      </li>
      </Tooltip>
    </>
  )


  if(messages[idx-1]?.user === message?.user) {
    listItem = (
      <Tooltip title={relativeTimeElapsed}>
        <li onClick={handleClick} className='my-1 mx-0 bg-[#e3e3e3] py-2 px-4 cursor-pointer'>
          {message.message}
        </li>
      </Tooltip>
    )
  }


  return (
    <>
      {listItem}
    </>
  )
}

export default MessageGlobe