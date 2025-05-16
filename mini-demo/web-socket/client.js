let ws = null;
let username = '';

const usernameForm = document.getElementById('usernameForm');
const chatArea = document.getElementById('chatArea');
const usernameInput = document.getElementById('usernameInput');
const joinButton = document.getElementById('joinButton');
const userInfo = document.getElementById('userInfo');
const statusEl = document.getElementById('status');
const messagesEl = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const connectButton = document.getElementById('connectButton');

// 添加消息到界面
function addMessage(text, type = 'received') {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${type}`;
  messageEl.innerHTML = `
            <div>${text}</div>
            <small style="color: #666; font-size: 0.8em;">
                ${new Date().toLocaleTimeString()}
            </small>
        `;
  messagesEl.appendChild(messageEl);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// 更新连接状态
function updateStatus(connected) {
  if (connected) {
    statusEl.textContent = '已连接到服务器';
    statusEl.className = 'status connected';
    sendButton.disabled = false;
    connectButton.textContent = '断开连接';
  } else {
    statusEl.textContent = '未连接';
    statusEl.className = 'status disconnected';
    sendButton.disabled = true;
    connectButton.textContent = '重新连接';
  }
}

// 连接WebSocket服务器
function connect() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
    return;
  }

  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    console.log('已连接到WebSocket服务器');
    updateStatus(true);
    addMessage('✅ 已连接到服务器', 'system');
    // 连接成功后发送用户名
    ws.send(JSON.stringify({ type: 'join', username: username }));
  };

  ws.onmessage = (event) => {
    console.log('收到消息:', event.data);
    addMessage(event.data, 'received');
  };

  ws.onclose = () => {
    console.log('与服务器连接已关闭');
    updateStatus(false);
    addMessage('❌ 连接已断开', 'system');
  };

  ws.onerror = (error) => {
    console.error('WebSocket错误:', error);
    addMessage('❌ 连接错误', 'system');
  };
}

// 发送消息
function sendMessage() {
  const message = messageInput.value.trim();
  if (message && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'message', username: username, text: message }));
    addMessage(`${username}: ${message}`, 'sent');
    messageInput.value = '';
  }
}

// 加入聊天
function joinChat() {
  const enteredUsername = usernameInput.value.trim();
  if (enteredUsername) {
    username = enteredUsername;
    usernameForm.classList.add('hidden');
    chatArea.classList.add('visible');
    userInfo.textContent = `当前用户: ${username}`;
    connect();
  } else {
    alert('请输入用户名');
  }
}

// 事件监听器
joinButton.addEventListener('click', joinChat);
connectButton.addEventListener('click', connect);
sendButton.addEventListener('click', sendMessage);

// 用户名输入回车加入
usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    joinChat();
  }
});

// 消息输入回车发送
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// 页面加载时聚焦到用户名输入框
document.addEventListener('DOMContentLoaded', () => {
  usernameInput.focus();
});

// 处理程序退出
process.on('SIGINT', () => {
  console.log('\n正在关闭客户端...');
  ws.close();
  process.exit(0);
});
