import React, { useState } from 'react';
import Sidebar from '../../components/chat/Sidebar';
import Chat from '../../components/chat/Chat';

const ChatHome = () => {
  const [show, setShow] = useState(false);
  const [back, setBack] = useState(false);

  const handleShow = (value) => {
    setShow(value);
  };

  const handleBack = (value) => {
    setBack(value);
  };

  return (
    <div className="home">
      <div className="container">
        <div className={show ? 'hidden-chat' : ''}>
          <h2 class="font-bold text-[32px] leading-[43px] text-[#121212] mb-8">Mensajeros</h2>
          <Sidebar handleBack={handleBack} handleShowParent={handleShow} />
        </div>
        <div className={show ? 'wide-container' : 'wide-container hidden-chat'}>
          <Chat handleShowParent={handleShow} handleBack={handleBack} />
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
