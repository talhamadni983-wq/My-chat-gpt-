<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<title>Talha AI</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:#0b0f0d;color:#f5f7f6}
.app{height:100vh;display:flex}.side{width:260px;background:#111814;border-right:1px solid #26332c;padding:16px;display:flex;flex-direction:column;gap:12px}.brand{font-size:21px;font-weight:800;color:#62e6a0}.new,.tool,.icon,.close{border:0;border-radius:12px;padding:10px;background:#1a261f;color:#eaf5ee;cursor:pointer}.new{background:#1f9d61;font-weight:700}.chats{flex:1;overflow:auto}.chat{padding:10px;border-radius:10px;color:#cbd6cf;margin-bottom:5px;background:#141c17}.main{flex:1;display:flex;flex-direction:column;min-width:0}.top{height:58px;border-bottom:1px solid #26332c;display:flex;align-items:center;justify-content:space-between;padding:0 18px}.model{font-weight:800}.pill{font-size:11px;background:#173d2a;color:#68e6a2;padding:5px 8px;border-radius:99px;margin-left:6px}.messages{flex:1;overflow:auto;padding:28px 6%;scroll-behavior:smooth}.welcome{text-align:center;max-width:700px;margin:10vh auto}.welcome h1{font-size:34px;margin:0 0 10px}.welcome p{color:#9aa59e}.quick,.tools{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.msg{display:flex;gap:10px;margin:14px auto;max-width:850px}.avatar{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#173d2a;flex:none}.bubble{background:#151e18;border:1px solid #26332c;border-radius:16px;padding:12px 15px;white-space:pre-wrap;word-break:break-word}.user{flex-direction:row-reverse}.user .bubble{background:#1b5e3c}.composerWrap{padding:10px 5% 16px;border-top:1px solid #26332c}.tools{justify-content:flex-start;margin-bottom:8px}.tools .tool{font-size:12px}.composer{max-width:900px;margin:auto;display:flex;gap:8px;background:#141c17;border:1px solid #304037;border-radius:18px;padding:8px}.composer textarea{flex:1;resize:none;background:transparent;color:#fff;border:0;outline:0;font:inherit;padding:10px}.send{background:#1f9d61}.record{background:#a33}.status{text-align:center;color:#7f8c84;font-size:11px;margin-top:7px}.panel{position:fixed;inset:0;background:#0009;display:none;align-items:center;justify-content:center;padding:20px}.modal{width:min(430px,100%);background:#111814;border:1px solid #304037;border-radius:18px;padding:20px}.field{width:100%;padding:11px;border-radius:10px;border:1px solid #304037;background:#0b0f0d;color:#fff;margin:7px 0 14px}.row{display:flex;gap:8px}.row>*{flex:1}@media(max-width:700px){.side{display:none}.messages{padding:20px 12px}.welcome h1{font-size:28px}.composerWrap{padding:8px}.tools{overflow:auto;flex-wrap:nowrap;justify-content:flex-start}.tools .tool{white-space:nowrap}}
</style>
</head>
<body>
<div class="app">
<aside class="side">
<div class="brand">✦ <span>Talha AI</span></div>
<button class="new" onclick="newChat()">＋ New Chat</button>
<div class="chats" id="chatList"></div>
<small>AI Chat • Voice • Code • Image • Video</small>
<button class="tool" onclick="openSettings()">⚙ Settings</button>
</aside>
<main class="main">
<header class="top"><div class="model">Talha AI <span class="pill">AI Assistant</span></div><button class="icon" onclick="openSettings()">⚙</button></header>
<section class="messages" id="messages">
<div class="welcome" id="welcome"><h1>Hello, I'm Talha AI</h1><p>Chat, search, understand images/files, create code, and build apps from your ideas.</p>
<div class="quick"><button class="tool" onclick="setPrompt('Build a modern Daily Azkar app')">🛠 Create App</button><button class="tool" onclick="setPrompt('Explain this topic simply: ')">💬 Ask AI</button><button class="tool" onclick="setPrompt('Create HTML CSS and JavaScript for: ')">💻 Code</button><button class="tool" onclick="imageMode()">🎨 Image</button><button class="tool" onclick="videoMode()">🎬 Video</button></div></div>
</section>
<div class="composerWrap">
<div class="tools">
<button class="tool" onclick="document.getElementById('file').click()">📎 File</button>
<button class="tool" onclick="document.getElementById('photo').click()">📷 Image</button>
<button class="tool" onclick="webMode()">🌐 Web Search</button>
<button class="tool" onclick="codeMode()">💻 Code</button>
<button class="tool" onclick="imageMode()">🎨 Generate Image</button>
<button class="tool" onclick="videoMode()">🎬 Generate Video</button>
<button class="tool" onclick="appMode()">🛠 Create App</button>
</div>
<div class="composer">
<input id="file" type="file" hidden onchange="filePicked(this)">
<input id="photo" type="file" accept="image/*" hidden onchange="photoPicked(this)">
<button class="icon" onclick="document.getElementById('file').click()">＋</button>
<textarea id="input" rows="1" placeholder="Message Talha AI..." onkeydown="keySend(event)"></textarea>
<button class="icon" id="mic" onclick="toggleMic()">🎤</button>
<button class="icon send" onclick="send()">➤</button>
</div>
<div class="status" id="status">Secure backend not connected</div>
</div>
</main></div>

<div class="panel" id="panel"><div class="modal">
<h2>⚙ Settings</h2>
<label>Secure backend endpoint</label>
<input class="field" id="endpoint" placeholder="https://your-backend.com/api/chat">
<label>AI voice</label>
<select class="field" id="voiceMode"><option value="auto">Auto</option><option value="male">Male</option><option value="female">Female</option></select>
<label>Language</label>
<select class="field" id="lang"><option value="en-US">English</option><option value="ur-PK">Urdu</option><option value="ar-SA">Arabic</option></select>
<div class="row"><button class="new" onclick="saveSettings()">Save</button><button class="close" onclick="closeSettings()">Close</button></div>
<p style="color:#9aa59e;font-size:12px">API keys stay on your backend and are never stored in this HTML.</p>
</div></div>

<script>
const $=id=>document.getElementById(id);
let recognition=null,recording=false,chats=JSON.parse(localStorage.getItem('talhaChats')||'[]');
$('endpoint').value=localStorage.getItem('endpoint')||'';
$('voiceMode').value=localStorage.getItem('voiceMode')||'auto';
$('lang').value=localStorage.getItem('lang')||'en-US';
renderChats();

function saveSettings(){localStorage.setItem('endpoint',$('endpoint').value.trim());localStorage.setItem('voiceMode',$('voiceMode').value);localStorage.setItem('lang',$('lang').value);closeSettings();updateStatus()}
function updateStatus(){$('status').textContent=localStorage.getItem('endpoint')?'Backend endpoint saved':'Secure backend not connected'}
function openSettings(){$('panel').style.display='flex'}function closeSettings(){$('panel').style.display='none'}
function newChat(){$('messages').innerHTML='';welcome();$('input').value=''}
function welcome(){$('messages').innerHTML='<div class="welcome" id="welcome"><h1>Hello, I\'m Talha AI</h1><p>What would you like to create today?</p><div class="quick"><button class="tool" onclick="appMode()">🛠 Create App</button><button class="tool" onclick="imageMode()">🎨 Image</button><button class="tool" onclick="videoMode()">🎬 Video</button></div></div>'}
function setPrompt(x){$('input').value=x;$('input').focus()}
function keySend(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}
function addMsg(text,who='bot'){let w=$('welcome');if(w)w.remove();let d=document.createElement('div');d.className='msg '+who;d.innerHTML='<div class="avatar">'+(who==='user'?'👤':'✦')+'</div><div class="bubble">'+escapeHtml(String(text))+'</div>';$('messages').appendChild(d);$('messages').scrollTop=$('messages').scrollHeight}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
async function send(){
let text=$('input').value.trim();if(!text)return;
addMsg(text,'user');$('input').value='';
let ep=localStorage.getItem('endpoint');
if(!ep){addMsg('Open Settings and add your secure backend endpoint first.');return}
try{
$('status').textContent='Thinking…';
let r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});
let data=await r.json();
if(!r.ok)throw new Error(data.error||'Request failed');
let reply=data.reply||data.text||data.message||'No response received.';
addMsg(reply);speak(reply);$('status').textContent='Ready';
}catch(e){addMsg('Backend error: '+e.message);$('status').textContent='Backend request failed'}
}
function saveChat(t){chats.unshift({title:t.slice(0,35),time:Date.now()});chats=chats.slice(0,30);localStorage.setItem('talhaChats',JSON.stringify(chats));renderChats()}
function renderChats(){$('chatList').innerHTML=chats.map(c=>'<div class="chat">💬 '+escapeHtml(c.title)+'</div>').join('')}
function toggleMic(){if(!('webkitSpeechRecognition'in window||'SpeechRecognition'in window)){alert('Speech recognition is not supported in this browser/WebView.');return}if(recording){recognition.stop();return}let R=window.SpeechRecognition||window.webkitSpeechRecognition;recognition=new R();recognition.lang=localStorage.getItem('lang')||'en-US';recognition.continuous=false;recognition.interimResults=true;recognition.onstart=()=>{recording=true;$('mic').classList.add('record');$('status').textContent='Listening…'};recognition.onresult=e=>{$('input').value=Array.from(e.results).map(x=>x[0].transcript).join('')};recognition.onend=()=>{recording=false;$('mic').classList.remove('record');updateStatus()};recognition.start()}
function speak(text){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);let voices=speechSynthesis.getVoices();let mode=localStorage.getItem('voiceMode')||'auto';let candidates=voices.filter(v=>/en|ur|ar/i.test(v.lang));if(mode==='female')candidates=candidates.filter(v=>/female|zira|samantha|susan|karen|google us english/i.test(v.name));if(mode==='male')candidates=candidates.filter(v=>/male|david|daniel|alex|mark|google uk english male/i.test(v.name));if(candidates[0])u.voice=candidates[0];u.lang=localStorage.getItem('lang')||'en-US';speechSynthesis.speak(u)}
function filePicked(el){if(el.files[0])setPrompt('Please analyze this file: '+el.files[0].name)}
function photoPicked(el){if(el.files[0])setPrompt('Please analyze this image: '+el.files[0].name)}
function webMode(){setPrompt('Search the web for: ')}function codeMode(){setPrompt('Create HTML/CSS/JavaScript for: ')}function imageMode(){setPrompt('Generate an AI image of: ')}function videoMode(){setPrompt('Generate an AI video of: ')}function appMode(){setPrompt('Create a complete mobile-friendly app for: ')}
updateStatus();
</script>
</body></html>
