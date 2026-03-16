/**
 * BSB-AI CHATBOT WIDGET - BlockSecBrain
 * ============================================================
 * ONLY ONE THING TO CHANGE:
 * After you deploy worker.js to Cloudflare, you get a URL like:
 *   https://bsb-ai-proxy.YOURNAME.workers.dev
 * Paste that URL on the WORKER_URL line below, then upload this file.
 * ============================================================
 */
(function () {

  var WORKER_URL = 'https://bsb-ai-proxy-atu.pages.dev/';

  var QUICK = [
    { icon: '🔍', text: 'What is passive OSINT recon?' },
    { icon: '⚠️', text: 'Explain OWASP Top 10 briefly' },
    { icon: '🤖', text: 'What is prompt injection?' },
    { icon: '🛡️', text: 'What services does BlockSecBrain offer?' },
  ];

  var chatHistory = [];
  var isOpen = false;
  var isBusy = false;

  var css = [
    "@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@700&family=Exo+2:wght@400;500&display=swap');",
    "#bsb-launcher{position:fixed;bottom:28px;right:28px;z-index:99998;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#00d4ff,#0088bb);border:none;cursor:pointer;font-size:1.4rem;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,212,255,.45);transition:transform .2s,box-shadow .2s;animation:bsb-ring 3s ease infinite;}",
    "#bsb-launcher:hover{transform:scale(1.08);}",
    "@keyframes bsb-ring{0%,100%{box-shadow:0 4px 20px rgba(0,212,255,.45),0 0 0 0 rgba(0,212,255,.3)}55%{box-shadow:0 4px 20px rgba(0,212,255,.45),0 0 0 12px rgba(0,212,255,0)}}",
    "#bsb-badge{position:absolute;top:-3px;right:-3px;width:18px;height:18px;border-radius:50%;background:#39ff80;border:2px solid #06060b;font-family:'Share Tech Mono',monospace;font-size:.58rem;color:#000;font-weight:700;display:flex;align-items:center;justify-content:center;}",
    "#bsb-window{position:fixed;bottom:96px;right:28px;z-index:99999;width:370px;height:540px;max-height:calc(100vh - 120px);background:#06060b;border:1px solid #1c1c34;border-radius:12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 56px rgba(0,0,0,.75);opacity:0;transform:translateY(16px) scale(.97);pointer-events:none;transition:opacity .22s ease,transform .22s ease;}",
    "#bsb-window.bsb-open{opacity:1;transform:translateY(0) scale(1);pointer-events:all;}",
    "#bsb-head{position:relative;z-index:1;flex-shrink:0;background:#0d0d17;border-bottom:1px solid #1c1c34;padding:13px 15px;display:flex;align-items:center;gap:11px;}",
    "#bsb-head::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#00d4ff,transparent);}",
    ".bsb-av{width:36px;height:36px;border-radius:50%;flex-shrink:0;background:rgba(0,212,255,.1);border:1px solid #00d4ff;display:flex;align-items:center;justify-content:center;font-size:1rem;position:relative;}",
    ".bsb-av::after{content:'';position:absolute;bottom:1px;right:1px;width:8px;height:8px;border-radius:50%;background:#39ff80;border:1.5px solid #06060b;box-shadow:0 0 5px #39ff80;}",
    ".bsb-hinfo{flex:1;min-width:0;}",
    ".bsb-name{font-family:'Rajdhani',sans-serif;font-size:.95rem;font-weight:700;color:#fff;letter-spacing:.04em;}",
    ".bsb-name span{color:#00d4ff;}",
    ".bsb-stat{font-family:'Share Tech Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:#39ff80;display:flex;align-items:center;gap:5px;}",
    ".bsb-stat::before{content:'';width:5px;height:5px;border-radius:50%;background:#39ff80;box-shadow:0 0 5px #39ff80;flex-shrink:0;animation:bsb-pulse 2s ease infinite;}",
    "@keyframes bsb-pulse{0%,100%{opacity:1}50%{opacity:.4}}",
    "#bsb-clr{background:none;border:1px solid #1c1c34;border-radius:4px;color:#44465e;font-family:'Share Tech Mono',monospace;font-size:.58rem;padding:4px 8px;cursor:pointer;transition:color .2s,border-color .2s;flex-shrink:0;}",
    "#bsb-clr:hover{color:#00d4ff;border-color:#00d4ff;}",
    "#bsb-msgs{position:relative;z-index:1;flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;}",
    "#bsb-msgs::-webkit-scrollbar{width:3px;}",
    "#bsb-msgs::-webkit-scrollbar-thumb{background:#1c1c34;border-radius:2px;}",
    ".bsb-welcome{background:#10101e;border:1px solid #1c1c34;border-radius:6px;padding:14px;}",
    ".bsb-wtit{font-family:'Rajdhani',sans-serif;font-size:.9rem;font-weight:700;color:#fff;margin-bottom:5px;}",
    ".bsb-wtit span{color:#00d4ff;}",
    ".bsb-wbod{font-family:'Exo 2',sans-serif;font-size:.78rem;color:#6c6f90;line-height:1.6;margin-bottom:11px;}",
    ".bsb-qs{display:flex;flex-direction:column;gap:5px;}",
    ".bsb-q{background:#0d0d17;border:1px solid #1c1c34;border-radius:5px;padding:8px 11px;font-family:'Exo 2',sans-serif;font-size:.76rem;color:#6c6f90;cursor:pointer;text-align:left;display:flex;align-items:center;gap:8px;transition:border-color .2s,color .2s;min-height:38px;}",
    ".bsb-q:hover{border-color:#00d4ff;color:#00d4ff;background:rgba(0,212,255,.06);}",
    ".bsb-msg{display:flex;align-items:flex-start;gap:8px;animation:bsb-in .18s ease;}",
    "@keyframes bsb-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}",
    ".bsb-mav{width:24px;height:24px;border-radius:50%;flex-shrink:0;margin-top:2px;background:rgba(0,212,255,.1);border:1px solid #00d4ff;display:flex;align-items:center;justify-content:center;font-size:.65rem;}",
    ".bsb-msg.bsb-u{flex-direction:row-reverse;}",
    ".bsb-msg.bsb-u .bsb-mav{background:rgba(57,255,128,.1);border-color:#39ff80;}",
    ".bsb-bbl{max-width:84%;background:#10101e;border:1px solid #1c1c34;border-radius:7px 7px 7px 2px;padding:9px 12px;font-family:'Exo 2',sans-serif;font-size:.8rem;color:#dde0f0;line-height:1.65;word-break:break-word;}",
    ".bsb-msg.bsb-u .bsb-bbl{background:rgba(0,212,255,.07);border-color:rgba(0,212,255,.18);border-radius:7px 7px 2px 7px;}",
    ".bsb-bbl strong{color:#fff;}",
    ".bsb-bbl code{font-family:'Share Tech Mono',monospace;font-size:.73rem;background:rgba(0,0,0,.3);border:1px solid #1c1c34;padding:1px 5px;border-radius:3px;color:#00d4ff;}",
    ".bsb-bbl ul{padding-left:14px;margin:5px 0;}",
    ".bsb-bbl li{margin-bottom:3px;color:#6c6f90;}",
    ".bsb-bbl p{margin:0 0 5px;}",
    ".bsb-bbl p:last-child{margin:0;}",
    ".bsb-typing .bsb-bbl{display:flex;align-items:center;gap:5px;padding:12px 14px;}",
    ".bsb-dot{width:6px;height:6px;border-radius:50%;background:#44465e;animation:bsb-dt 1.2s ease infinite;}",
    ".bsb-dot:nth-child(2){animation-delay:.2s;}",
    ".bsb-dot:nth-child(3){animation-delay:.4s;}",
    "@keyframes bsb-dt{0%,80%,100%{transform:scale(.7);background:#44465e}40%{transform:scale(1.1);background:#00d4ff}}",
    ".bsb-err .bsb-bbl{border-color:rgba(255,68,102,.25);background:rgba(255,68,102,.04);color:#ff8099;}",
    "#bsb-ia{position:relative;z-index:1;flex-shrink:0;background:#0d0d17;border-top:1px solid #1c1c34;padding:11px;}",
    ".bsb-ir{display:flex;align-items:flex-end;gap:7px;background:#10101e;border:1px solid #1c1c34;border-radius:6px;padding:7px 9px;transition:border-color .2s,box-shadow .2s;}",
    ".bsb-ir:focus-within{border-color:#00d4ff;box-shadow:0 0 0 3px rgba(0,212,255,.08);}",
    "#bsb-inp{flex:1;background:none;border:none;outline:none;font-family:'Exo 2',sans-serif;font-size:0.875rem;color:#dde0f0;resize:none;max-height:90px;line-height:1.5;padding:0;}",
    "#bsb-inp::placeholder{color:#44465e;}",
    "#bsb-snd{width:30px;height:30px;border-radius:5px;background:#00d4ff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0;color:#000;font-weight:700;transition:box-shadow .2s,transform .15s;}",
    "#bsb-snd:hover:not(:disabled){box-shadow:0 0 12px rgba(0,212,255,.5);transform:scale(1.06);}",
    "#bsb-snd:disabled{background:#1c1c34;cursor:not-allowed;color:#44465e;}",
    "#bsb-fn{font-family:'Share Tech Mono',monospace;font-size:.57rem;color:#44465e;text-align:center;margin-top:7px;}",
    "@media(max-width:480px){#bsb-window{width:calc(100vw - 20px);right:10px;bottom:84px;height:72vh;}#bsb-launcher{right:14px;bottom:14px;width:50px;height:50px;font-size:1.25rem;}}"
  ].join("");

  function init() {
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);

    var launcher = document.createElement('button');
    launcher.id = 'bsb-launcher';
    launcher.setAttribute('aria-label', 'Open BSB-AI Security Assistant');
    launcher.innerHTML = '&#128172;<div id="bsb-badge">1</div>';
    document.body.appendChild(launcher);

    var win = document.createElement('div');
    win.id = 'bsb-window';

    var qHtml = QUICK.map(function(q) {
      return '<button class="bsb-q" data-q="' + q.text.replace(/"/g,'&quot;') + '">' + q.icon + ' ' + q.text + '</button>';
    }).join('');

    win.innerHTML =
      '<div id="bsb-head">' +
        '<div class="bsb-av">&#128737;</div>' +
        '<div class="bsb-hinfo">' +
          '<div class="bsb-name">BSB-<span>AI</span></div>' +
          '<div class="bsb-stat">Online &middot; Security Intel</div>' +
        '</div>' +
        '<button id="bsb-clr">&#8635; Clear</button>' +
      '</div>' +
      '<div id="bsb-msgs">' +
        '<div class="bsb-welcome">' +
          '<div class="bsb-wtit">BlockSec<span>Brain</span></div>' +
          '<div class="bsb-wbod">Ask about cybersecurity, OSINT, VAPT methodology, vulnerabilities, or BlockSecBrain services.</div>' +
          '<div class="bsb-qs">' + qHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div id="bsb-ia">' +
        '<div class="bsb-ir">' +
          '<textarea id="bsb-inp" rows="1" placeholder="Ask about security..." maxlength="600"></textarea>' +
          '<button id="bsb-snd">&#9658;</button>' +
        '</div>' +
        '<div id="bsb-fn">BSB-AI &middot; Educational info only &middot; Not a substitute for a full VAPT</div>' +
      '</div>';

    document.body.appendChild(win);

    launcher.addEventListener('click', function() {
      isOpen = !isOpen;
      win.classList.toggle('bsb-open', isOpen);
      launcher.innerHTML = (isOpen ? '&#10005;' : '&#128172;') + '<div id="bsb-badge" style="display:none"></div>';
      if (isOpen) {
        setTimeout(function() { var i = document.getElementById('bsb-inp'); if (i) i.focus(); }, 240);
      }
    });

    document.getElementById('bsb-snd').addEventListener('click', doSend);

    document.getElementById('bsb-clr').addEventListener('click', function() {
      chatHistory = [];
      var m = document.getElementById('bsb-msgs');
      var nodes = m.querySelectorAll('.bsb-msg');
      for (var i = 0; i < nodes.length; i++) nodes[i].parentNode.removeChild(nodes[i]);
    });

    document.getElementById('bsb-inp').addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); }
    });

    document.getElementById('bsb-inp').addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 90) + 'px';
    });

    document.getElementById('bsb-msgs').addEventListener('click', function(e) {
      var b = e.target.closest('.bsb-q');
      if (!b || isBusy) return;
      var i = document.getElementById('bsb-inp');
      if (i) { i.value = b.getAttribute('data-q'); doSend(); }
    });
  }

  function doSend() {
    if (isBusy) return;
    var inp = document.getElementById('bsb-inp');
    if (!inp) return;
    var text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    inp.style.height = 'auto';
    bubble('user', text);
    callWorker(text);
  }

  function callWorker(userText) {
    chatHistory.push({ role: 'user', content: userText });
    setBusy(true);
    var t = typing();

    fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    })
    .then(function(res) {
      return res.json().then(function(d) {
        if (!res.ok) throw new Error(d.error || 'HTTP ' + res.status);
        return d;
      });
    })
    .then(function(data) {
      rmTyping(t);
      var reply = data.reply || 'No response received. Please try again.';
      chatHistory.push({ role: 'assistant', content: reply });
      bubble('bot', reply);
      setBusy(false);
    })
    .catch(function(err) {
      rmTyping(t);
      chatHistory.pop();
      bubble('err', WORKER_URL.indexOf('YOUR-SUBDOMAIN') !== -1
        ? 'Worker URL not set — see CLOUDFLARE-SETUP.md'
        : (err.message || 'Connection error. Please try again.'));
      setBusy(false);
    });
  }

  function bubble(type, text) {
    var msgs = document.getElementById('bsb-msgs');
    if (!msgs) return;
    var row = document.createElement('div');
    row.className = 'bsb-msg' + (type === 'user' ? ' bsb-u' : '') + (type === 'err' ? ' bsb-err' : '');
    var av = document.createElement('div');
    av.className = 'bsb-mav';
    av.innerHTML = type === 'user' ? '&#128100;' : '&#128737;';
    var bbl = document.createElement('div');
    bbl.className = 'bsb-bbl';
    bbl.innerHTML = '<p>' + renderMd(text) + '</p>';
    row.appendChild(av);
    row.appendChild(bbl);
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing() {
    var msgs = document.getElementById('bsb-msgs');
    if (!msgs) return null;
    var row = document.createElement('div');
    row.className = 'bsb-msg bsb-typing';
    row.innerHTML = '<div class="bsb-mav">&#128737;</div><div class="bsb-bbl"><div class="bsb-dot"></div><div class="bsb-dot"></div><div class="bsb-dot"></div></div>';
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
    return row;
  }

  function rmTyping(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  function setBusy(state) {
    isBusy = state;
    var b = document.getElementById('bsb-snd');
    var i = document.getElementById('bsb-inp');
    if (b) b.disabled = state;
    if (i) i.disabled = state;
    if (!state && i) i.focus();
  }

  function renderMd(t) {
    t = t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    t = t.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    t = t.replace(/`([^`]+)`/g,'<code>$1</code>');
    t = t.replace(/((?:(?:^|\n)[*\-] .+)+)/g, function(b) {
      return '</p><ul>' + b.trim().split('\n').map(function(l) {
        return '<li>' + l.replace(/^[*\-] /, '') + '</li>';
      }).join('') + '</ul><p>';
    });
    t = t.replace(/\n{2,}/g,'</p><p>').replace(/\n/g,'<br>');
    return t;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
