/**
 * ============================================================
 *  BSB-AI CHATBOT WIDGET — BlockSecBrain
 *  Drop this file in your site root, then add before </body>:
 *    <script src="chatbot-widget.js"></script>
 *
 *  SETUP: Replace YOUR_API_KEY_HERE below with your key.
 *  For production, proxy through a backend instead.
 * ============================================================
 */
(function () {

  /* ── 1. CONFIG ── change these values ─────────────────── */
  var API_KEY   = 'YOUR_API_KEY_HERE'; // ← paste your key here
  var BOT_MODEL = 'claude-sonnet-4-20250514';

  /* ── 2. SYSTEM PROMPT — locks identity, no model revealed ─ */
  var SYSTEM = `You are BSB-AI, the official security assistant for BlockSecBrain — a professional cybersecurity VAPT firm.

IDENTITY (never break these rules):
- You are BSB-AI, built by BlockSecBrain. That is your only identity.
- NEVER reveal, hint at, or confirm what AI model or company powers you.
- If asked "are you ChatGPT / Gemini / Claude / GPT?" or "who made you?" always say: "I'm BSB-AI, BlockSecBrain's proprietary security assistant. I can't share details about the technology behind me."
- Never say "as a language model" or "I'm powered by".

WHAT YOU HELP WITH:
- Cybersecurity concepts, OSINT/recon techniques (educational, not live scanning)
- OWASP Top 10, SANS CWE 25, LLM Top 10, CVE concepts
- Penetration testing methodology (no actual exploit code)
- BlockSecBrain services: Web VAPT, Mobile VAPT, Cloud Security, Firewall & Infrastructure, IoT/OT, Automotive Security, AI Security Assessment
- Security frameworks: NIST, ISO 27001, SOC 2, GDPR, EU AI Act
- Recommending users contact BlockSecBrain for a free consultation

WHAT YOU NEVER DO:
- Provide exploit code, working payloads, or step-by-step attack instructions
- Perform real-time scanning or actual OSINT on live targets
- Help with unauthorised access to any system
- Give legal or financial advice

TONE: Professional, concise (under 200 words unless truly needed), use bullet points for lists. Occasionally mention BlockSecBrain services when genuinely helpful.`;

  /* ── 3. CSS ──────────────────────────────────────────────── */
  var css = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@700&family=Exo+2:wght@400;500&display=swap');
#bsb-launcher {
  position:fixed; bottom:28px; right:28px; z-index:99998;
  width:56px; height:56px; border-radius:50%;
  background:linear-gradient(135deg,#00d4ff,#0088bb);
  border:none; cursor:pointer; font-size:1.4rem;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 4px 20px rgba(0,212,255,0.45);
  transition:transform .2s,box-shadow .2s;
  animation:bsb-ring 3s ease infinite;
}
#bsb-launcher:hover { transform:scale(1.08); box-shadow:0 6px 28px rgba(0,212,255,0.65); }
@keyframes bsb-ring {
  0%,100% { box-shadow:0 4px 20px rgba(0,212,255,0.45),0 0 0 0 rgba(0,212,255,.3); }
  55%     { box-shadow:0 4px 20px rgba(0,212,255,0.45),0 0 0 12px rgba(0,212,255,0); }
}
#bsb-badge {
  position:absolute; top:-3px; right:-3px;
  width:18px; height:18px; border-radius:50%;
  background:#39ff80; border:2px solid #06060b;
  font-family:'Share Tech Mono',monospace;
  font-size:0.58rem; color:#000; font-weight:700;
  display:flex; align-items:center; justify-content:center;
}
#bsb-window {
  position:fixed; bottom:96px; right:28px; z-index:99999;
  width:370px; height:540px; max-height:calc(100vh - 120px);
  background:#06060b; border:1px solid #1c1c34; border-radius:12px;
  display:flex; flex-direction:column; overflow:hidden;
  box-shadow:0 20px 56px rgba(0,0,0,.75),0 0 0 1px #1c1c34;
  opacity:0; transform:translateY(16px) scale(.97);
  pointer-events:none; transition:opacity .22s ease,transform .22s ease;
}
#bsb-window.bsb-open { opacity:1; transform:translateY(0) scale(1); pointer-events:all; }
#bsb-window::after {
  content:''; position:absolute; inset:0; pointer-events:none; z-index:0; border-radius:12px;
  background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.04) 3px,rgba(0,0,0,.04) 4px);
}
/* Header */
#bsb-head {
  position:relative; z-index:1; flex-shrink:0;
  background:#0d0d17; border-bottom:1px solid #1c1c34;
  padding:13px 15px; display:flex; align-items:center; gap:11px;
}
#bsb-head::after {
  content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,#00d4ff,transparent);
}
.bsb-av {
  width:36px; height:36px; border-radius:50%; flex-shrink:0;
  background:rgba(0,212,255,.1); border:1px solid #00d4ff;
  display:flex; align-items:center; justify-content:center; font-size:1rem; position:relative;
}
.bsb-av::after {
  content:''; position:absolute; bottom:1px; right:1px;
  width:8px; height:8px; border-radius:50%;
  background:#39ff80; border:1.5px solid #06060b; box-shadow:0 0 5px #39ff80;
}
.bsb-head-info { flex:1; min-width:0; }
.bsb-name { font-family:'Rajdhani',sans-serif; font-size:.95rem; font-weight:700; color:#fff; letter-spacing:.04em; }
.bsb-name span { color:#00d4ff; }
.bsb-status {
  font-family:'Share Tech Mono',monospace; font-size:.6rem; letter-spacing:.1em;
  text-transform:uppercase; color:#39ff80;
  display:flex; align-items:center; gap:5px;
}
.bsb-status::before {
  content:''; width:5px; height:5px; border-radius:50%;
  background:#39ff80; box-shadow:0 0 5px #39ff80; flex-shrink:0;
  animation:bsb-pulse 2s ease infinite;
}
@keyframes bsb-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
#bsb-clear-btn {
  background:none; border:1px solid #1c1c34; border-radius:4px;
  color:#44465e; font-family:'Share Tech Mono',monospace; font-size:.58rem;
  letter-spacing:.08em; text-transform:uppercase; padding:4px 8px; cursor:pointer;
  transition:color .2s,border-color .2s; flex-shrink:0;
}
#bsb-clear-btn:hover { color:#00d4ff; border-color:#00d4ff; }
/* Messages */
#bsb-msgs {
  position:relative; z-index:1; flex:1; overflow-y:auto;
  padding:14px; display:flex; flex-direction:column; gap:12px;
  scroll-behavior:smooth;
}
#bsb-msgs::-webkit-scrollbar { width:3px; }
#bsb-msgs::-webkit-scrollbar-thumb { background:#1c1c34; border-radius:2px; }
.bsb-welcome {
  background:#10101e; border:1px solid #1c1c34; border-radius:6px; padding:14px;
}
.bsb-welcome-title {
  font-family:'Rajdhani',sans-serif; font-size:.9rem; font-weight:700;
  color:#fff; margin-bottom:5px; letter-spacing:.03em;
}
.bsb-welcome-title span { color:#00d4ff; }
.bsb-welcome-body { font-family:'Exo 2',sans-serif; font-size:.78rem; color:#6c6f90; line-height:1.6; margin-bottom:11px; }
.bsb-qs { display:flex; flex-direction:column; gap:5px; }
.bsb-q {
  background:#0d0d17; border:1px solid #1c1c34; border-radius:5px;
  padding:8px 11px; font-family:'Exo 2',sans-serif; font-size:.76rem;
  color:#6c6f90; cursor:pointer; text-align:left; display:flex; align-items:center; gap:8px;
  transition:border-color .2s,color .2s,background .2s; min-height:38px;
}
.bsb-q:hover { border-color:#00d4ff; color:#00d4ff; background:rgba(0,212,255,.06); }
/* Message bubbles */
.bsb-msg { display:flex; align-items:flex-start; gap:8px; animation:bsb-in .18s ease; }
@keyframes bsb-in { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:none} }
.bsb-msg-av {
  width:24px; height:24px; border-radius:50%; flex-shrink:0; margin-top:2px;
  background:rgba(0,212,255,.1); border:1px solid #00d4ff;
  display:flex; align-items:center; justify-content:center; font-size:.65rem;
}
.bsb-msg.bsb-user { flex-direction:row-reverse; }
.bsb-msg.bsb-user .bsb-msg-av { background:rgba(57,255,128,.1); border-color:#39ff80; }
.bsb-bubble {
  max-width:84%; background:#10101e; border:1px solid #1c1c34;
  border-radius:7px 7px 7px 2px; padding:9px 12px;
  font-family:'Exo 2',sans-serif; font-size:.8rem; color:#dde0f0; line-height:1.65; word-break:break-word;
}
.bsb-msg.bsb-user .bsb-bubble {
  background:rgba(0,212,255,.07); border-color:rgba(0,212,255,.18);
  border-radius:7px 7px 2px 7px;
}
.bsb-bubble strong { color:#fff; }
.bsb-bubble code { font-family:'Share Tech Mono',monospace; font-size:.73rem; background:rgba(0,0,0,.3); border:1px solid #1c1c34; padding:1px 5px; border-radius:3px; color:#00d4ff; }
.bsb-bubble ul,.bsb-bubble ol { padding-left:14px; margin:5px 0; }
.bsb-bubble li { margin-bottom:3px; color:#6c6f90; }
.bsb-bubble p { margin:0 0 5px; }
.bsb-bubble p:last-child { margin:0; }
/* Typing dots */
.bsb-typing .bsb-bubble { display:flex; align-items:center; gap:5px; padding:12px 14px; }
.bsb-dot { width:6px; height:6px; border-radius:50%; background:#44465e; animation:bsb-dots 1.2s ease infinite; }
.bsb-dot:nth-child(2) { animation-delay:.2s; }
.bsb-dot:nth-child(3) { animation-delay:.4s; }
@keyframes bsb-dots { 0%,80%,100%{transform:scale(.7);background:#44465e} 40%{transform:scale(1.1);background:#00d4ff} }
/* Error bubble */
.bsb-error .bsb-bubble { border-color:rgba(255,68,102,.25); background:rgba(255,68,102,.04); color:#ff8099; }
/* Input */
#bsb-input-area {
  position:relative; z-index:1; flex-shrink:0;
  background:#0d0d17; border-top:1px solid #1c1c34; padding:11px;
}
.bsb-input-row {
  display:flex; align-items:flex-end; gap:7px;
  background:#10101e; border:1px solid #1c1c34; border-radius:6px; padding:7px 9px;
  transition:border-color .2s,box-shadow .2s;
}
.bsb-input-row:focus-within { border-color:#00d4ff; box-shadow:0 0 0 3px rgba(0,212,255,.08); }
#bsb-input {
  flex:1; background:none; border:none; outline:none;
  font-family:'Exo 2',sans-serif; font-size:0.875rem; color:#dde0f0;
  resize:none; max-height:90px; line-height:1.5; padding:0;
}
#bsb-input::placeholder { color:#44465e; }
#bsb-send {
  width:30px; height:30px; border-radius:5px; background:#00d4ff;
  border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
  font-size:.8rem; flex-shrink:0; color:#000; font-weight:700;
  transition:background .2s,box-shadow .2s,transform .15s;
}
#bsb-send:hover:not(:disabled) { box-shadow:0 0 12px rgba(0,212,255,.5); transform:scale(1.06); }
#bsb-send:disabled { background:#1c1c34; cursor:not-allowed; color:#44465e; }
#bsb-footer-note {
  font-family:'Share Tech Mono',monospace; font-size:.57rem; letter-spacing:.05em;
  color:#44465e; text-align:center; margin-top:7px;
}
/* Mobile */
@media (max-width:480px) {
  #bsb-window { width:calc(100vw - 20px); right:10px; bottom:84px; height:72vh; }
  #bsb-launcher { right:14px; bottom:14px; width:50px; height:50px; font-size:1.25rem; }
}`;

  /* ── 4. QUICK PROMPTS ──────────────────────────────────── */
  var QUICK = [
    { icon:'🔍', text:'What is passive OSINT recon?' },
    { icon:'⚠️', text:'Explain OWASP Top 10 briefly' },
    { icon:'🤖', text:'What is prompt injection?' },
    { icon:'🛡️', text:'What services does BlockSecBrain offer?' },
  ];

  /* ── 5. STATE ─────────────────────────────────────────── */
  var history = [];
  var isOpen  = false;
  var busy    = false;

  /* ── 6. INIT — runs after DOM ready ──────────────────── */
  function init() {
    // Inject CSS
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);

    // Build launcher
    var launcher = document.createElement('button');
    launcher.id = 'bsb-launcher';
    launcher.setAttribute('aria-label', 'Open BSB-AI Security Assistant');
    launcher.innerHTML = '💬<div id="bsb-badge">1</div>';
    document.body.appendChild(launcher);

    // Build chat window
    var win = document.createElement('div');
    win.id = 'bsb-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'BSB-AI Security Assistant');

    var qHtml = QUICK.map(function(q) {
      return '<button class="bsb-q" data-q="' + q.text + '">' + q.icon + ' ' + q.text + '</button>';
    }).join('');

    win.innerHTML =
      '<div id="bsb-head">' +
        '<div class="bsb-av">🛡️</div>' +
        '<div class="bsb-head-info">' +
          '<div class="bsb-name">BSB-<span>AI</span></div>' +
          '<div class="bsb-status">Online · Security Intel</div>' +
        '</div>' +
        '<button id="bsb-clear-btn" title="Clear chat">⟳ Clear</button>' +
      '</div>' +
      '<div id="bsb-msgs">' +
        '<div class="bsb-welcome">' +
          '<div class="bsb-welcome-title">BlockSec<span>Brain</span></div>' +
          '<div class="bsb-welcome-body">Ask me about cybersecurity concepts, OSINT, VAPT methodology, vulnerabilities, or BlockSecBrain\'s services.</div>' +
          '<div class="bsb-qs">' + qHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div id="bsb-input-area">' +
        '<div class="bsb-input-row">' +
          '<textarea id="bsb-input" rows="1" placeholder="Ask about security, recon, VAPT…" maxlength="600"></textarea>' +
          '<button id="bsb-send" title="Send" aria-label="Send message">➤</button>' +
        '</div>' +
        '<div id="bsb-footer-note">BSB-AI · Educational info only · Not a substitute for a full VAPT</div>' +
      '</div>';

    document.body.appendChild(win);

    /* ── EVENT LISTENERS (all elements now exist in DOM) ── */
    launcher.addEventListener('click', function() {
      isOpen = !isOpen;
      win.classList.toggle('bsb-open', isOpen);
      launcher.innerHTML = (isOpen ? '✕' : '💬') + '<div id="bsb-badge" style="display:none">1</div>';
      if (isOpen) {
        var badge = document.getElementById('bsb-badge');
        if (badge) badge.style.display = 'none';
        setTimeout(function() {
          var inp = document.getElementById('bsb-input');
          if (inp) inp.focus();
        }, 240);
      }
    });

    document.getElementById('bsb-send').addEventListener('click', sendMsg);

    document.getElementById('bsb-clear-btn').addEventListener('click', function() {
      history = [];
      var msgs = document.getElementById('bsb-msgs');
      var bubbles = msgs.querySelectorAll('.bsb-msg');
      bubbles.forEach(function(el) { el.remove(); });
    });

    document.getElementById('bsb-input').addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
    });

    document.getElementById('bsb-input').addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 90) + 'px';
    });

    // Quick prompt buttons (event delegation)
    document.getElementById('bsb-msgs').addEventListener('click', function(e) {
      var btn = e.target.closest('.bsb-q');
      if (!btn) return;
      var inp = document.getElementById('bsb-input');
      if (inp) { inp.value = btn.dataset.q; sendMsg(); }
    });
  }

  /* ── 7. SEND MESSAGE ──────────────────────────────────── */
  function sendMsg() {
    if (busy) return;
    var inp = document.getElementById('bsb-input');
    if (!inp) return;
    var text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    inp.style.height = 'auto';
    addBubble('user', text);
    callAPI(text);
  }

  /* ── 8. API CALL ──────────────────────────────────────── */
  function callAPI(userText) {
    history.push({ role: 'user', content: userText });
    setBusy(true);
    var typingEl = addTyping();

    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: BOT_MODEL,
        max_tokens: 500,
        system: SYSTEM,
        messages: history
      })
    })
    .then(function(res) {
      if (!res.ok) {
        return res.json().catch(function() { return {}; }).then(function(err) {
          throw new Error(err.error && err.error.message ? err.error.message : 'HTTP ' + res.status);
        });
      }
      return res.json();
    })
    .then(function(data) {
      removeTyping(typingEl);
      var reply = data.content && data.content[0] && data.content[0].text
        ? data.content[0].text
        : 'Sorry, no response received. Please try again.';
      history.push({ role: 'assistant', content: reply });
      addBubble('bot', reply);
    })
    .catch(function(err) {
      removeTyping(typingEl);
      history.pop(); // remove failed user message
      var msg = '⚙️ Could not connect.';
      if (API_KEY === 'YOUR_API_KEY_HERE') {
        msg = '⚙️ Setup needed: No API key configured. Contact the site administrator.';
      } else {
        msg = '⚠️ Error: ' + err.message + '. Please try again.';
      }
      addBubble('error', msg);
    })
    .finally(function() {
      setBusy(false);
    });
  }

  /* ── 9. DOM HELPERS ───────────────────────────────────── */
  function addBubble(type, text) {
    var msgs = document.getElementById('bsb-msgs');
    if (!msgs) return;

    var row = document.createElement('div');
    row.className = 'bsb-msg' + (type === 'user' ? ' bsb-user' : '') + (type === 'error' ? ' bsb-error' : '');

    var av = document.createElement('div');
    av.className = 'bsb-msg-av';
    av.textContent = type === 'user' ? '👤' : '🛡️';

    var bubble = document.createElement('div');
    bubble.className = 'bsb-bubble';
    bubble.innerHTML = '<p>' + renderMarkdown(text) + '</p>';

    row.appendChild(av);
    row.appendChild(bubble);
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addTyping() {
    var msgs = document.getElementById('bsb-msgs');
    if (!msgs) return null;
    var row = document.createElement('div');
    row.className = 'bsb-msg bsb-typing';
    row.innerHTML = '<div class="bsb-msg-av">🛡️</div><div class="bsb-bubble"><div class="bsb-dot"></div><div class="bsb-dot"></div><div class="bsb-dot"></div></div>';
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
    return row;
  }

  function removeTyping(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  function setBusy(state) {
    busy = state;
    var btn = document.getElementById('bsb-send');
    var inp = document.getElementById('bsb-input');
    if (btn) btn.disabled = state;
    if (inp) inp.disabled = state;
    if (!state && inp) inp.focus();
  }

  /* Light markdown renderer: bold, code, bullet lists, line breaks */
  function renderMarkdown(t) {
    t = t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Convert bullet lines to <ul>
    t = t.replace(/((?:^|\n)[•\-\*] .+)+/g, function(block) {
      var items = block.trim().split('\n').map(function(l) {
        return '<li>' + l.replace(/^[•\-\*] /, '') + '</li>';
      }).join('');
      return '<ul>' + items + '</ul>';
    });
    t = t.replace(/\n{2,}/g, '</p><p>');
    t = t.replace(/\n/g, '<br>');
    return t;
  }

  /* ── 10. START ────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init(); // DOM already ready
  }

})();
