'use client';

import { useState, useEffect, useRef } from 'react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages]       = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping]         = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const API_URL  = process.env.NEXT_PUBLIC_API_URL;
  const LOGO_URL = '/vlogo.webp';

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) callAPI('hello', null);
  }, [isOpen]);

  useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const toggleChat  = () => { setIsOpen(p => !p); setShowTooltip(false); };
  const scrollToTop = (e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const callAPI = async (value, userLabel) => {
    if (userLabel) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'user',
        text: userLabel,
        time: now(),
      }]);
    }

    setIsTyping(true);

    try {
      const res  = await fetch(`${API_URL}/api/chat`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ message: value }),
      });
      const data  = await res.json();
      const reply = data?.choices?.[0]?.message?.content || 'Sorry, I could not understand that.';
      const btns  = data?.buttons || [];

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        buttons: btns,
        time: now(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: '⚠️ Unable to connect to server.',
        buttons: [],
        time: now(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleButtonClick = (label, value) => {
    if (isTyping) return;
    callAPI(value, label);
  };

  const sendMessage = () => {
    const msg = inputMessage.trim();
    if (!msg || isTyping) return;
    setInputMessage('');
    callAPI(msg, msg);
  };

  const resetChat = () => {
    setMessages([]);
    callAPI('hello', null);
  };

  const groupButtons = (btns = []) => {
    const nearby  = btns.filter(b => /Schools|Colleges|Hospitals/.test(b.label));
    const primary = btns.filter(b => !(/Schools|Colleges|Hospitals/.test(b.label)) && b.label !== '🔙 Main Menu');
    const menu    = btns.filter(b => b.label === '🔙 Main Menu');
    return { primary, nearby, menu };
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

      {/* ── FAB ── */}
      <button className="vp-fab" onClick={toggleChat} aria-label="Toggle chat">
        <div className="vp-fab-ring" />
        <div className="vp-fab-inner">
          <img src={LOGO_URL} alt="VP" className="vp-fab-img"
            onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex'; }}
          />
          <span className="vp-fab-fallback">VP</span>
        </div>
      </button>

      {/* ── Scroll to top ── */}
      {showScrollTop && (
        <button className="vp-scroll-top" onClick={scrollToTop} aria-label="Scroll to top">↑</button>
      )}

      {/* ══════════════ CHAT WINDOW ══════════════ */}
      {isOpen && (
        <div className="vp-window">

          {/* ── Header ── */}
          <div className="vp-header">
            <div className="vp-header-glow" />
            <div className="vp-header-left">
              <div className="vp-avatar">
                <img src={LOGO_URL} alt="VP"
                  onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex'; }}
                />
                <span className="vp-avatar-fallback">VP</span>
                <span className="vp-online-ring" />
              </div>
              <div>
                <h3 className="vp-header-name">Vishwak Assistant</h3>
                <p className="vp-header-status"><span className="vp-status-dot" />Active now</p>
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

          {/* ── Messages ── */}
          <div className="vp-messages">

            {messages.map((msg, idx) => {
              const isLast = idx === messages.length - 1;
              const { primary, nearby, menu } = groupButtons(msg.buttons);

              return (
                <div key={msg.id}>
                  {msg.sender === 'user' && (
                    <div className="vp-row vp-row--user">
                      <div className="vp-msg-group">
                        <div className="vp-bubble vp-bubble--user"
                          dangerouslySetInnerHTML={{ __html: msg.text }} />
                        <span className="vp-time vp-time--user">{msg.time}</span>
                      </div>
                    </div>
                  )}

                  {msg.sender === 'bot' && (
                    <div className="vp-row vp-row--bot">
                      <div className="vp-bot-avatar">
                        <img src={LOGO_URL} alt="VP"
                          onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex'; }}
                        />
                        <span className="vp-bot-avatar-fallback">VP</span>
                      </div>
                      <div className="vp-msg-group">
                        <div className="vp-bubble vp-bubble--bot"
                          dangerouslySetInnerHTML={{ __html: msg.text }} />
                        <span className="vp-time vp-time--bot">{msg.time}</span>

                        {isLast && !isTyping && msg.buttons?.length > 0 && (
                          <div className="vp-actions">

                            {primary.length > 0 && (
                              <div className="vp-action-list">
                                {primary.map((btn, i) => (
                                  <button key={i} className="vp-action-btn"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                    onClick={() => handleButtonClick(btn.label, btn.value)}>
                                    <span>{btn.label}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                      <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            )}

                            {nearby.length > 0 && (
                              <>
                                <p className="vp-section-label">Explore Nearby</p>
                                <div className="vp-nearby-grid">
                                  {nearby.map((btn, i) => (
                                    <button key={i} className="vp-nearby-btn"
                                      style={{ animationDelay: `${(primary.length + i) * 50}ms` }}
                                      onClick={() => handleButtonClick(btn.label, btn.value)}>
                                      <span className="vp-nearby-icon">{btn.label.split(' ')[0]}</span>
                                      <span className="vp-nearby-text">
                                        {btn.label.split(' ').slice(1).join(' ')}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}

                            {menu.length > 0 && (
                              <div className="vp-menu-row">
                                {menu.map((btn, i) => (
                                  <button key={i} className="vp-menu-btn"
                                    onClick={() => handleButtonClick(btn.label, btn.value)}>
                                    {btn.label}
                                  </button>
                                ))}
                              </div>
                            )}

                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="vp-row vp-row--bot">
                <div className="vp-bot-avatar">
                  <img src={LOGO_URL} alt="VP"
                    onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex'; }}
                  />
                  <span className="vp-bot-avatar-fallback">VP</span>
                </div>
                <div className="vp-bubble vp-bubble--bot vp-bubble--typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ── */}
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                  <path d="M22 2L15 22 11 13 2 9l20-7z" fill="white"/>
                </svg>
              </button>
            </div>
            <p className="vp-powered">Powered by Vishwak Properties</p>
          </div>

        </div>
      )}

      {/* ══════════════ STYLES ══════════════ */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

        /* ── FAB ── */
        .vp-fab { position:fixed; bottom:96px; right:28px; background:none; border:none; cursor:pointer; z-index:9999; padding:0; }
        .vp-fab-ring { position:absolute; inset:-6px; border-radius:50%; border:2px solid rgba(103,161,57,.35); animation:fabPulse 2.5s ease-in-out infinite; pointer-events:none; }
        @keyframes fabPulse { 0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.15);opacity:0} }
        .vp-fab-inner { width:58px; height:58px; border-radius:50%; background:#67a139; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; box-shadow:0 8px 24px rgba(103,161,57,.5),0 2px 8px rgba(0,0,0,.2); transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s; }
        .vp-fab:hover .vp-fab-inner { transform:scale(1.08); box-shadow:0 14px 36px rgba(103,161,57,.6),0 4px 12px rgba(0,0,0,.25); }
        .vp-fab-img { width:100%; height:100%; object-fit:cover; border-radius:50%; }
        .vp-fab-fallback { display:none; align-items:center; justify-content:center; width:100%; height:100%; font-size:16px; font-weight:800; color:white; position:absolute; top:0; left:0; }

        /* ── Tooltip ── */
        .vp-tooltip { position:fixed; bottom:106px; right:96px; background:white; border-radius:16px; padding:14px 18px 14px 14px; box-shadow:0 12px 40px rgba(0,0,0,.14),0 2px 8px rgba(0,0,0,.08); display:flex; align-items:center; gap:10px; z-index:9998; min-width:205px; animation:tooltipIn .35s cubic-bezier(.34,1.56,.64,1); border:1px solid rgba(0,0,0,.06); }
        @keyframes tooltipIn { from{opacity:0;transform:translateX(14px) scale(.95)}to{opacity:1;transform:translateX(0) scale(1)} }
        .vp-tooltip::after { content:''; position:absolute; right:-7px; top:50%; transform:translateY(-50%); border:7px solid transparent; border-right:none; border-left-color:white; }
        .vp-tooltip-close { position:absolute; top:-9px; left:-9px; width:20px; height:20px; border-radius:50%; background:#ef4444; color:white; border:2.5px solid white; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(239,68,68,.4); transition:transform .15s; }
        .vp-tooltip-close:hover { transform:scale(1.15); }
        .vp-tooltip-dot { width:9px; height:9px; border-radius:50%; background:#22c55e; flex-shrink:0; box-shadow:0 0 0 3px rgba(34,197,94,.2); animation:statusPulse 2s infinite; }
        @keyframes statusPulse { 0%,100%{opacity:1}50%{opacity:.45} }
        .vp-tooltip-title { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; color:#0f172a; margin:0 0 2px; }
        .vp-tooltip-sub   { font-family:'DM Sans',sans-serif; font-size:11.5px; color:#64748b; margin:0; }

        /* ── Chat Window ── */
        .vp-window { position:fixed; bottom:108px; right:28px; width:390px; height:620px; background:#f0f4ee; border-radius:24px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 32px 80px rgba(0,0,0,.2),0 8px 32px rgba(0,0,0,.1); animation:winUp .4s cubic-bezier(.34,1.4,.64,1); z-index:9999; font-family:'DM Sans',sans-serif; border:1px solid rgba(255,255,255,.8); }
        @keyframes winUp { from{opacity:0;transform:translateY(28px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)} }

        /* ── Header ── */
        .vp-header { background:linear-gradient(140deg,#1a4a0a 0%,#3d7a20 55%,#5ea832 100%); padding:16px 16px 30px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; position:relative; overflow:hidden; }
        .vp-header-glow { position:absolute; top:-40px; right:-30px; width:160px; height:160px; background:rgba(255,255,255,.08); border-radius:50%; pointer-events:none; }
        .vp-header::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:24px; background:#f0f4ee; border-radius:50% 50% 0 0 / 100% 100% 0 0; }
        .vp-header-left { display:flex; align-items:center; gap:11px; position:relative; }
        .vp-header-right { display:flex; gap:6px; position:relative; }
        .vp-avatar { width:44px; height:44px; border-radius:50%; background:green; overflow:hidden; position:relative; flex-shrink:0; box-shadow:0 0 0 2.5px rgba(255,255,255,.5),0 4px 14px rgba(0,0,0,.2); display:flex; align-items:center; justify-content:center; }
        .vp-avatar img { width:100%; height:100%; object-fit:cover; border-radius:50%; }
        .vp-avatar-fallback { display:none; align-items:center; justify-content:center; width:100%; height:100%; font-size:14px; font-weight:800; color:#2d5a18; position:absolute; top:0; left:0; }
        .vp-online-ring { position:absolute; bottom:2px; right:2px; width:11px; height:11px; border-radius:50%; background:#4ade80; border:2px solid white; }
        .vp-header-name   { margin:0; color:white; font-size:15px; font-weight:700; }
        .vp-header-status { margin:3px 0 0; color:rgba(255,255,255,.75); font-size:11.5px; display:flex; align-items:center; gap:5px; }
        .vp-status-dot    { width:6px; height:6px; border-radius:50%; background:#4ade80; display:inline-block; animation:statusPulse 2s infinite; }
        .vp-icon-btn { width:32px; height:32px; border-radius:10px; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.2); color:white; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .2s,transform .15s; backdrop-filter:blur(4px); }
        .vp-icon-btn:hover { background:rgba(255,255,255,.28); transform:scale(1.06); }

        /* ── Messages scroll area ── */
        .vp-messages { flex:1; overflow-y:auto; padding:10px 12px 8px; display:flex; flex-direction:column; gap:4px; scroll-behavior:smooth; }
        .vp-messages::-webkit-scrollbar { width:3px; }
        .vp-messages::-webkit-scrollbar-thumb { background:#c8dfc0; border-radius:3px; }

        /* ── Row layout ── */
        .vp-row { display:flex; align-items:flex-end; gap:8px; margin-bottom:2px; animation:msgIn .25s cubic-bezier(.34,1.36,.64,1); }
        @keyframes msgIn { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
        .vp-row--user { flex-direction:row-reverse; justify-content:flex-start; }
        .vp-row--bot  { flex-direction:row; justify-content:flex-start; }

        /* ── Bot avatar ── */
        .vp-bot-avatar { width:30px; height:30px; border-radius:50%; background:white; overflow:hidden; flex-shrink:0; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,.12); border:1.5px solid #d6eac8; align-self:flex-end; }
        .vp-bot-avatar img { width:100%; height:100%; object-fit:cover; border-radius:50%; }
        .vp-bot-avatar-fallback { display:none; font-size:11px; font-weight:800; color:#2d5a18; }

        /* ── Msg group ── */
        .vp-msg-group { display:flex; flex-direction:column; max-width:87%; }
        .vp-row--user .vp-msg-group { align-items:flex-end; }
        .vp-row--bot  .vp-msg-group { align-items:flex-start; }

      /* ───────────────────────────────────────── */
/*           BUBBLE — FINAL FIX             */
/* ───────────────────────────────────────── */

.vp-bubble {
  padding: 16px 20px;   /* ✅ proper base padding */
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.7;
  word-break: break-word;
}

/* User bubble */
.vp-bubble--user {
  background: linear-gradient(135deg,#5ea832,#2d6614);
  color: white;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 14px rgba(94,168,50,.35);
}

/* Bot bubble */
.vp-bubble--bot {
  background: white;
  color: #1e3a10;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,.07);
  border: 1px solid rgba(0,0,0,.05);

  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 9px 4px;
}

/* ───────────────────────────────────────── */
/*           TABLE — PREMIUM SPACING        */
/* ───────────────────────────────────────── */

.vp-bubble--bot table {
  width: 100%;
  min-width: 480px;   /* little more room */
  border-collapse: collapse;
  font-size: 14px;
  margin-top: 10px;
}

/* Header */
.vp-bubble--bot table th {
  padding: 18px 22px;   /* ✅ larger */
  font-weight: 700;
  font-size: 14px;
  text-align: left;
  color: #2d6614;
  white-space: nowrap;
}

/* Body cells */
.vp-bubble--bot table td {
  padding: 18px 22px;   /* ✅ larger */
  font-size: 14px;
  color: #1e3a10;
  white-space: nowrap;
  vertical-align: middle;
}

/* Row styling */
.vp-bubble--bot table tbody tr {
  border-bottom: 1px solid #eef5e8;
  transition: background 0.2s ease;
}

.vp-bubble--bot table tbody tr:hover {
  background: #f8fcf4;
}

/* Column alignment */
.vp-bubble--bot table th:nth-child(1),
.vp-bubble--bot table td:nth-child(1) {
  width: 60px;
  text-align: center;
  font-weight: 600;
  color: #9ab889;
}

.vp-bubble--bot table th:nth-child(3),
.vp-bubble--bot table td:nth-child(3),
.vp-bubble--bot table th:nth-child(4),
.vp-bubble--bot table td:nth-child(4) {
  text-align: right;
}

/* Scrollbar */
.vp-bubble--bot::-webkit-scrollbar {
  height: 4px;
}

.vp-bubble--bot::-webkit-scrollbar-thumb {
  background: #c8dfc0;
  border-radius: 4px;
}
        /* ── Typing dots ── */
        .vp-bubble--typing { display:flex; align-items:center; gap:5px; padding:13px 16px; }
        .vp-bubble--typing span { width:7px; height:7px; border-radius:50%; background:#67a139; animation:typeBounce 1.3s ease-in-out infinite; }
        .vp-bubble--typing span:nth-child(2) { animation-delay:.18s; }
        .vp-bubble--typing span:nth-child(3) { animation-delay:.36s; }
        @keyframes typeBounce { 0%,80%,100%{transform:translateY(0) scale(.7);opacity:.5}40%{transform:translateY(-5px) scale(1);opacity:1} }

        /* ── Timestamps ── */
        .vp-time { font-size:10px; color:#9ca3af; margin-top:3px; padding:0 4px; }

        /* ── Action buttons container ── */
        .vp-actions { display:flex; flex-direction:column; gap:7px; margin-top:8px; width:100%; }

        .vp-action-list { display:flex; flex-direction:column; gap:6px; }
        .vp-action-btn { width:100%; background:white; border:1.5px solid #d6eac8; border-radius:11px; padding:10px 13px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; color:#1e3a10; transition:all .2s cubic-bezier(.34,1.36,.64,1); box-shadow:0 2px 6px rgba(0,0,0,.04); animation:cardIn .3s cubic-bezier(.34,1.36,.64,1) both; }
        @keyframes cardIn { from{opacity:0;transform:translateY(6px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)} }
        .vp-action-btn:hover { background:linear-gradient(135deg,#5ea832,#2d6614); color:white; border-color:transparent; transform:translateX(2px); box-shadow:0 5px 16px rgba(94,168,50,.35); }
        .vp-action-btn svg { flex-shrink:0; transition:transform .2s; }
        .vp-action-btn:hover svg { transform:translateX(3px); stroke:white; }

        .vp-section-label { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#9ab889; margin:2px 0 0; }

        .vp-nearby-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
        .vp-nearby-btn { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; background:white; border:1.5px solid #d6eac8; border-radius:12px; padding:10px 6px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s cubic-bezier(.34,1.36,.64,1); box-shadow:0 2px 6px rgba(0,0,0,.04); animation:cardIn .3s cubic-bezier(.34,1.36,.64,1) both; }
        .vp-nearby-btn:hover { background:linear-gradient(135deg,#5ea832,#2d6614); border-color:transparent; transform:translateY(-2px); box-shadow:0 6px 18px rgba(94,168,50,.38); }
        .vp-nearby-icon { font-size:19px; line-height:1; }
        .vp-nearby-text { font-size:10.5px; font-weight:600; color:#1e3a10; text-align:center; line-height:1.3; }
        .vp-nearby-btn:hover .vp-nearby-text { color:white; }

        .vp-menu-row { display:flex; margin-top:2px; }
        .vp-menu-btn { background:none; border:1.5px solid #d6eac8; border-radius:50px; padding:7px 16px; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; color:#6b8f5a; cursor:pointer; transition:all .2s; }
        .vp-menu-btn:hover { background:#eaf4e2; border-color:#a8d48a; color:#2d6614; }

        /* ── Input ── */
        .vp-input-wrap { padding:10px 14px 13px; background:white; border-top:1px solid rgba(0,0,0,.06); flex-shrink:0; }
        .vp-input-box { display:flex; align-items:center; gap:8px; background:#f4f9f0; border:1.5px solid #d2e8c4; border-radius:50px; padding:6px 6px 6px 16px; transition:border-color .2s,box-shadow .2s; }
        .vp-input-box:focus-within { border-color:#5ea832; box-shadow:0 0 0 3px rgba(94,168,50,.12); background:white; }
        .vp-input { flex:1; border:none; background:transparent; outline:none; font-size:13.5px; font-family:'DM Sans',sans-serif; color:#1e3a10; }
        .vp-input::placeholder { color:#a8c496; }
        .vp-input:disabled { opacity:.5; }
        .vp-send { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,#5ea832,#2d6614); border:none; cursor:pointer; flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s,opacity .2s; box-shadow:0 3px 12px rgba(94,168,50,.45); }
        .vp-send:hover:not(:disabled) { transform:scale(1.1); box-shadow:0 6px 20px rgba(94,168,50,.55); }
        .vp-send:active:not(:disabled) { transform:scale(.93); }
        .vp-send:disabled { opacity:.3; cursor:not-allowed; }
        .vp-powered { font-size:10px; color:#c0d4b0; text-align:center; margin:7px 0 0; }

        /* ── Scroll to top ── */
        .vp-scroll-top { position:fixed; bottom:28px; right:32px; width:48px; height:48px; border-radius:50%; background:#111827; color:white; border:none; cursor:pointer; font-size:20px; font-weight:bold; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 20px rgba(0,0,0,.25); transition:all .3s ease; z-index:9999; }
        .vp-scroll-top:hover { background:#5ea832; transform:translateY(-4px); box-shadow:0 10px 30px rgba(94,168,50,.5); }

        /* ── Mobile ── */
        @media (max-width: 480px) {
          .vp-window { width:100%; height:100%; bottom:0; right:0; border-radius:0; }
          .vp-fab { bottom:85px; right:18px; }
          .vp-fab-inner { width:48px; height:48px; }
          .vp-fab-ring { inset:-4px; }
          .vp-tooltip { right:69px; bottom:99px; padding:10px 14px; }
          .vp-scroll-top { bottom:18px; right:20px; width:42px; height:42px; font-size:18px; }
          .vp-bubble { font-size:13px; }
          .vp-nearby-btn { padding:9px 4px; }
          .vp-nearby-icon { font-size:17px; }
          .vp-nearby-text { font-size:10px; }
          .vp-bubble--bot table { font-size:11.5px; }
          .vp-bubble--bot table th,
          .vp-bubble--bot table td { padding:6px 6px; }
        }
      `}</style>
    </>
  );
};

export default ChatAssistant;