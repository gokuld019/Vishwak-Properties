'use client';

import { useState, useEffect, useRef } from 'react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen]             = useState(false);
  const [showTooltip, setShowTooltip]   = useState(true);
  const [messages, setMessages]         = useState([]);
  const [buttons, setButtons]           = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping]         = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  const API_URL  = process.env.NEXT_PUBLIC_API_URL;
  const LOGO_URL = '/logo.png'; // 🔁 Replace with your actual logo path

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, buttons]);

  useEffect(() => {
    if (isOpen && messages.length === 0) callAPI('hello');
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(p => !p);
    setShowTooltip(false);
  };

  const callAPI = async (text) => {
    setIsTyping(true);
    setButtons([]);
    try {
      const res  = await fetch(`${API_URL}/api/chat`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setIsTyping(false);
      const botReply = data?.choices?.[0]?.message?.content || 'Sorry, I could not understand that.';
      setMessages(prev => [...prev, {
        sender: 'bot',
        text  : botReply,
        time  : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      if (data?.buttons?.length) setButtons(data.buttons);
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text  : '⚠️ Unable to connect to server.',
        time  : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  };

  const sendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || isTyping) return;
    setButtons([]);
    setMessages(prev => [...prev, {
      sender: 'user',
      text  : message,
      time  : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInputMessage('');
    await callAPI(message);
  };

  const handleButtonClick = async (label, value) => {
    if (isTyping) return;
    setButtons([]);
    setMessages(prev => [...prev, {
      sender: 'user',
      text  : label,
      time  : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    await callAPI(value);
  };

  const resetChat = () => {
    setMessages([]);
    setButtons([]);
    setInputMessage('');
    callAPI('hello');
  };

  return (
    <>
      {/* ── Tooltip ── */}
      {showTooltip && !isOpen && (
        <div className="vp-tooltip">
          <button className="vp-tooltip-close" onClick={() => setShowTooltip(false)}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="vp-tooltip-dot" />
          <div>
            <p className="vp-tooltip-title">We&apos;re Online!</p>
            <p className="vp-tooltip-sub">How may I assist you today?</p>
          </div>
        </div>
      )}

      {/* ── FAB Button ── */}
      <button className="vp-fab" onClick={toggleChat} aria-label="Toggle chat">
        <div className="vp-fab-ring" />
        <div className="vp-fab-inner">
          <img
            src={LOGO_URL}
            alt="VP"
            className="vp-fab-img"
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
          <span className="vp-fab-fallback">VP</span>
        </div>
        <span className="vp-fab-badge">
          {isOpen ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : 'CHAT'}
        </span>
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="vp-window">

          {/* Header */}
          <div className="vp-header">
            <div className="vp-header-glow" />
            <div className="vp-header-left">
              <div className="vp-avatar">
                <img
                  src={LOGO_URL}
                  alt="VP"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                <span className="vp-avatar-fallback">VP</span>
                <span className="vp-online-ring" />
              </div>
              <div>
                <h3 className="vp-header-name">Vishwak Assistant</h3>
                <p className="vp-header-status">
                  <span className="vp-status-dot" />
                  Active now
                </p>
              </div>
            </div>
            <div className="vp-header-right">
              <button onClick={resetChat} className="vp-icon-btn" title="New chat">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
              </button>
              <button onClick={toggleChat} className="vp-icon-btn" title="Close">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="vp-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`vp-msg vp-msg--${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="vp-bot-avatar">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 5c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4zM3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2H3z"/>
                    </svg>
                  </div>
                )}
                <div className="vp-msg-body">
                  <div
                    className="vp-bubble"
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                  <span className="vp-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="vp-msg vp-msg--bot">
                <div className="vp-bot-avatar">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 5c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4zM3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2H3z"/>
                  </svg>
                </div>
                <div className="vp-bubble vp-bubble--typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {/* Quick-reply buttons */}
            {!isTyping && buttons.length > 0 && (
              <div className="vp-btns">
                {buttons.map((btn, i) => (
                  <button
                    key={i}
                    className="vp-qbtn"
                    onClick={() => handleButtonClick(btn.label, btn.value)}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="vp-input-wrap">
            <div className="vp-input-box">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Message Vishwak..."
                disabled={isTyping}
                className="vp-input"
              />
              <button
                onClick={sendMessage}
                disabled={isTyping || !inputMessage.trim()}
                className="vp-send"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                  <path d="M22 2L15 22 11 13 2 9l20-7z" fill="white"/>
                </svg>
              </button>
            </div>
            <p className="vp-powered">Powered by Vishwak Properties</p>
          </div>

        </div>
      )}

      {/* ════════════════ STYLES ════════════════ */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* ── FAB ── */
        .vp-fab {
          position: fixed; bottom: 28px; right: 28px;
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          background: none; border: none; cursor: pointer; z-index: 9999; padding: 0;
        }
        .vp-fab-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 2px solid rgba(103,161,57,0.35);
          animation: fabPulse 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes fabPulse {
          0%,100% { transform: scale(1);    opacity: .7; }
          50%      { transform: scale(1.15); opacity: 0;  }
        }
        .vp-fab-inner {
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(145deg, #67a139, #3d6b21);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; position: relative;
          box-shadow: 0 8px 24px rgba(103,161,57,0.5), 0 2px 8px rgba(0,0,0,0.2);
          transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
        }
        .vp-fab:hover .vp-fab-inner {
          transform: scale(1.08);
          box-shadow: 0 14px 36px rgba(103,161,57,0.6), 0 4px 12px rgba(0,0,0,0.25);
        }
        .vp-fab-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .vp-fab-fallback {
          display: none; align-items: center; justify-content: center;
          width: 100%; height: 100%; font-family: 'Inter', sans-serif;
          font-size: 16px; font-weight: 800; color: white;
          position: absolute; top: 0; left: 0;
        }
        .vp-fab-badge {
          background: #111827; color: white;
          font-family: 'Inter', sans-serif; font-size: 9px;
          font-weight: 800; letter-spacing: 1.5px;
          padding: 3px 10px; border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3); min-width: 48px;
          transition: background .2s;
        }
        .vp-fab:hover .vp-fab-badge { background: #000; }

        /* ── Tooltip ── */
        .vp-tooltip {
          position: fixed; bottom: 47px; right: 102px;
          background: white; border-radius: 16px;
          padding: 14px 18px 14px 14px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08);
          display: flex; align-items: center; gap: 10px;
          z-index: 9998; min-width: 205px;
          animation: tooltipIn .35s cubic-bezier(.34,1.56,.64,1);
          border: 1px solid rgba(0,0,0,0.06);
        }
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(14px) scale(.95); }
          to   { opacity: 1; transform: translateX(0)    scale(1);   }
        }
        .vp-tooltip::after {
          content: ''; position: absolute; right: -7px; top: 50%;
          transform: translateY(-50%);
          border: 7px solid transparent; border-right: none; border-left-color: white;
        }
        .vp-tooltip-close {
          position: absolute; top: -9px; left: -9px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #ef4444; color: white; border: 2.5px solid white;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 6px rgba(239,68,68,.4); transition: transform .15s;
        }
        .vp-tooltip-close:hover { transform: scale(1.15); }
        .vp-tooltip-dot {
          width: 9px; height: 9px; border-radius: 50%; background: #22c55e;
          flex-shrink: 0; box-shadow: 0 0 0 3px rgba(34,197,94,.2);
          animation: statusPulse 2s infinite;
        }
        @keyframes statusPulse { 0%,100% { opacity: 1; } 50% { opacity: .45; } }
        .vp-tooltip-title {
          font-family: 'Inter', sans-serif; font-size: 13px;
          font-weight: 700; color: #0f172a; margin: 0 0 2px;
        }
        .vp-tooltip-sub {
          font-family: 'Inter', sans-serif; font-size: 11.5px; color: #64748b; margin: 0;
        }

        /* ── Chat Window ── */
        .vp-window {
          position: fixed; bottom: 108px; right: 28px;
          width: 385px; height: 615px;
          background: #f1f5f9; border-radius: 26px;
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.22), 0 8px 32px rgba(0,0,0,0.1);
          animation: winUp .4s cubic-bezier(.34,1.4,.64,1);
          z-index: 9999; font-family: 'Inter', sans-serif;
          border: 1px solid rgba(255,255,255,0.7);
        }
        @keyframes winUp {
          from { opacity: 0; transform: translateY(28px) scale(.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);   }
        }

        /* ── Header ── */
        .vp-header {
          background: linear-gradient(140deg, #1e4d0c 0%, #4a8c29 55%, #6dba3c 100%);
          padding: 16px 16px 28px;
          display: flex; justify-content: space-between; align-items: center;
          flex-shrink: 0; position: relative; overflow: hidden;
        }
        .vp-header-glow {
          position: absolute; top: -40px; right: -30px;
          width: 150px; height: 150px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%; pointer-events: none;
        }
        .vp-header::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 22px;
          background: #f1f5f9; border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        .vp-header-left  { display: flex; align-items: center; gap: 11px; position: relative; }
        .vp-header-right { display: flex; gap: 6px; position: relative; }

        .vp-avatar {
          width: 45px; height: 45px; border-radius: 50%;
          background: white; overflow: hidden; position: relative; flex-shrink: 0;
          box-shadow: 0 0 0 2.5px rgba(255,255,255,0.55), 0 4px 14px rgba(0,0,0,0.22);
          display: flex; align-items: center; justify-content: center;
        }
        .vp-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .vp-avatar-fallback {
          display: none; align-items: center; justify-content: center;
          width: 100%; height: 100%;
          font-size: 14px; font-weight: 800; color: #2d5a18;
          position: absolute; top: 0; left: 0;
        }
        .vp-online-ring {
          position: absolute; bottom: 2px; right: 2px;
          width: 11px; height: 11px; border-radius: 50%;
          background: #4ade80; border: 2px solid white;
        }
        .vp-header-name {
          margin: 0; color: white; font-size: 15px;
          font-weight: 700; letter-spacing: -0.01em;
        }
        .vp-header-status {
          margin: 3px 0 0; color: rgba(255,255,255,.8);
          font-size: 11.5px; display: flex; align-items: center; gap: 5px;
        }
        .vp-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80; display: inline-block;
          animation: statusPulse 2s infinite;
        }
        .vp-icon-btn {
          width: 32px; height: 32px; border-radius: 10px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          color: white; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s, transform .15s; backdrop-filter: blur(4px);
        }
        .vp-icon-btn:hover { background: rgba(255,255,255,.28); transform: scale(1.06); }

        /* ── Messages ── */
        .vp-messages {
          flex: 1; padding: 6px 14px 12px; overflow-y: auto;
          display: flex; flex-direction: column; gap: 9px; scroll-behavior: smooth;
        }
        .vp-messages::-webkit-scrollbar { width: 3px; }
        .vp-messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }

        .vp-msg {
          display: flex; align-items: flex-end; gap: 7px;
          animation: msgIn .28s cubic-bezier(.34,1.36,.64,1);
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .vp-msg--user { flex-direction: row-reverse; align-self: flex-end; max-width: 83%; }
        .vp-msg--bot  { align-self: flex-start; max-width: 85%; }

        .vp-bot-avatar {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg,#67a139,#3d6b21);
          color: white; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(103,161,57,.35);
        }
        .vp-msg-body { display: flex; flex-direction: column; gap: 3px; }
        .vp-msg--user .vp-msg-body { align-items: flex-end; }
        .vp-msg--bot  .vp-msg-body { align-items: flex-start; }

        .vp-bubble {
          padding: 11px 15px; border-radius: 20px;
          font-size: 13.5px; line-height: 1.65;
        }
        .vp-msg--user .vp-bubble {
          background: linear-gradient(140deg,#67a139,#3d6b21);
          color: white; border-bottom-right-radius: 5px;
          box-shadow: 0 4px 16px rgba(103,161,57,.35);
        }
        .vp-msg--bot .vp-bubble {
          background: white; color: #1e293b;
          border-bottom-left-radius: 5px;
          box-shadow: 0 2px 12px rgba(0,0,0,.07);
          border: 1px solid rgba(0,0,0,.05);
        }
        .vp-msg--user .vp-bubble strong { color: rgba(255,255,255,.9); }
        .vp-msg--bot  .vp-bubble strong { color: #3d6b21; }

        .vp-time { font-size: 10px; color: #9ca3af; padding: 0 4px; }

        /* ── Typing ── */
        .vp-bubble--typing {
          display: flex; align-items: center; gap: 5px; padding: 14px 18px;
        }
        .vp-bubble--typing span {
          width: 7px; height: 7px; border-radius: 50%;
          background: linear-gradient(135deg,#67a139,#4e7d2c);
          animation: typeBounce 1.3s ease-in-out infinite;
        }
        .vp-bubble--typing span:nth-child(2) { animation-delay: .18s; }
        .vp-bubble--typing span:nth-child(3) { animation-delay: .36s; }
        @keyframes typeBounce {
          0%,80%,100% { transform: translateY(0)    scale(.7); opacity: .5; }
          40%          { transform: translateY(-5px) scale(1);  opacity: 1;  }
        }

        /* ── Quick Buttons ── */
        .vp-btns {
          display: flex; flex-wrap: wrap; gap: 7px;
          padding: 2px 0 2px 35px;
          animation: msgIn .3s ease .12s both;
        }
        .vp-qbtn {
          background: white; color: #3d6b21;
          border: 1.5px solid #b8dda0; border-radius: 50px;
          padding: 8px 15px; font-size: 12px; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer; white-space: nowrap;
          transition: all .22s cubic-bezier(.34,1.36,.64,1);
          box-shadow: 0 2px 8px rgba(103,161,57,.12);
        }
        .vp-qbtn:hover {
          background: linear-gradient(135deg,#67a139,#3d6b21);
          color: white; border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(103,161,57,.4);
        }
        .vp-qbtn:active { transform: scale(.96); }

        /* ── Input ── */
        .vp-input-wrap {
          padding: 10px 14px 13px; background: white;
          border-top: 1px solid rgba(0,0,0,.06); flex-shrink: 0;
        }
        .vp-input-box {
          display: flex; align-items: center; gap: 8px;
          background: #f8fafc; border: 1.5px solid #e2e8f0;
          border-radius: 50px; padding: 5px 5px 5px 16px;
          transition: border-color .2s, box-shadow .2s;
        }
        .vp-input-box:focus-within {
          border-color: #67a139;
          box-shadow: 0 0 0 3px rgba(103,161,57,.12);
          background: white;
        }
        .vp-input {
          flex: 1; border: none; background: transparent; outline: none;
          font-size: 13.5px; font-family: 'Inter', sans-serif; color: #1e293b;
        }
        .vp-input::placeholder { color: #94a3b8; }
        .vp-input:disabled     { opacity: .6; }

        .vp-send {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg,#67a139,#3d6b21);
          border: none; color: white;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s, opacity .2s;
          box-shadow: 0 3px 12px rgba(103,161,57,.45);
        }
        .vp-send:hover:not(:disabled) { transform: scale(1.1); box-shadow: 0 6px 20px rgba(103,161,57,.55); }
        .vp-send:active:not(:disabled){ transform: scale(.93); }
        .vp-send:disabled { opacity: .3; cursor: not-allowed; }

        .vp-powered {
          font-size: 10px; color: #cbd5e1; text-align: center;
          margin: 8px 0 0; font-family: 'Inter', sans-serif; letter-spacing: .02em;
        }

        /* ── Mobile ── */
        @media (max-width: 480px) {

  /* Fullscreen chat window */
  .vp-window  {
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }

  /* Floating Button Position */
  .vp-fab {
    bottom: 18px;
    right: 18px;
  }

  /* Smaller Logo Button */
  .vp-fab-inner {
    width: 48px;
    height: 48px;
  }

  /* Adjust outer pulse ring */
  .vp-fab-ring {
    inset: -4px;
  }

  /* Smaller CHAT badge */
  .vp-fab-badge {
    font-size: 8px;
    padding: 2px 8px;
    min-width: 40px;
  }

  /* Slightly smaller avatar inside chat header */
  .vp-avatar {
    width: 38px;
    height: 38px;
  }

  /* Reduce header padding slightly */
  .vp-header {
    padding: 14px 14px 24px;
  }

  /* Slightly smaller message text for better fit */
  .vp-bubble {
    font-size: 13px;
  }

  /* Adjust tooltip position */
  .vp-tooltip {
    right: 80px;
    padding: 10px 14px;
  }

}
      `}</style>
    </>
  );
};

export default ChatAssistant;