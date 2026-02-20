'use client';

import { useState, useEffect, useRef } from 'react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Hello! Welcome to Vishwak Properties.<br><br>How can I help you find your dream property today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const sendQuickMessage = (text) => {
    setInputMessage(text);
    setTimeout(() => sendMessage(), 100);
  };

  const sanitizeHTML = (html) => html;

  const sendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || isTyping) return;

    const userMessage = {
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowQuickReplies(false);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setIsTyping(false);

      const botReply =
        data?.choices?.[0]?.message?.content ||
        'Sorry, I could not understand that.';

      const botMessage = {
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setShowQuickReplies(true);

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: '⚠️ Unable to connect to server. Please try again.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      setShowQuickReplies(true);
    }
  };

  const quickReplies = [
    { text: 'Show me apartments', emoji: '🏢' },
    { text: 'Show me villas', emoji: '🏡' },
    { text: 'Show me plots', emoji: '📐' },
    { text: 'Calculate EMI for 1 crore', emoji: '💰' },
    { text: 'Contact information', emoji: '📞' },
  ];

  return (
    <>
      <button
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: '#67a139',
          color: 'white',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 1000
        }}
        onClick={toggleChat}
      >
        💬
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '120px',
            left: '30px',
            width: '400px',
            height: '600px',
            background: 'white',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            zIndex: 1001
          }}
        >
          <div
            style={{
              background: '#67a139',
              color: 'white',
              padding: '15px',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px'
            }}
          >
            <strong>Vishwak Properties</strong>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  marginBottom: '10px'
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    background:
                      msg.sender === 'user' ? '#67a139' : '#f1f1f1',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    padding: '10px 15px',
                    borderRadius: '15px',
                    maxWidth: '80%'
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.text) }}
                />
              </div>
            ))}
            {isTyping && <div>Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '10px', borderTop: '1px solid #eee' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                width: '75%',
                padding: '10px',
                borderRadius: '20px',
                border: '1px solid #ccc'
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: '10px',
                padding: '10px 15px',
                borderRadius: '20px',
                border: 'none',
                background: '#67a139',
                color: 'white'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;