import React from 'react'

interface Message {
  user: string;
  message: string;
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

  let listItem = (
    <>
      <span className=' font-medium text-gray-800'>
        {message.user}:&nbsp;
      </span>
      <li onClick={handleClick} className='my-1 mx-0 bg-[#e3e3e3] py-2 px-4 cursor-pointer'>
        {message.message}
      </li>
    </>
  )


  if(messages[idx-1]?.user === message?.user) {
    listItem = (
        <li onClick={handleClick} className='my-1 mx-0 bg-[#e3e3e3] py-2 px-4 cursor-pointer'>
          {message.message}
        </li>
    )
  }


  return (
    <>
      {listItem}
    </>
  )
}

export default MessageGlobe