const WebSocket = require('ws');

// 创建WebSocket服务器，监听8080端口
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket服务器已启动，监听端口8080...');

// 存储客户端信息
const clients = new Map();

// // 每隔3秒广播当前时间给所有客户端
// setInterval(() => {
//   const currentTime = new Date().toLocaleString('zh-CN');
//   const timeMessage = `📅 服务器时间: ${currentTime}`;

//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(timeMessage);
//     }
//   });
// }, 3000);

// 当有客户端连接时触发
wss.on('connection', (ws) => {
  console.log('新客户端已连接');

  // 监听客户端发送的消息
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'join') {
        // 处理用户加入
        clients.set(ws, { username: data.username });
        console.log(`用户 ${data.username} 已加入聊天`);
        ws.send(`欢迎 ${data.username} 加入聊天室！`);

        // 广播用户加入消息给其他用户
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(`🎯 ${data.username} 加入了聊天室`);
          }
        });
      } else if (data.type === 'message') {
        // 处理聊天消息
        console.log(`${data.username}: ${data.text}`);

        // 广播消息给所有其他客户端
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(`${data.username}: ${data.text}`);
          }
        });
      }
    } catch (error) {
      // 处理旧格式的纯文本消息
      console.log('收到消息:', message.toString());
      const clientInfo = clients.get(ws);
      const senderName = clientInfo ? clientInfo.username : '匿名用户';

      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(`${senderName}: ${message}`);
        }
      });
    }
  });

  // 当客户端断开连接时触发
  ws.on('close', () => {
    const clientInfo = clients.get(ws);
    if (clientInfo) {
      console.log(`用户 ${clientInfo.username} 已断开连接`);
      // 广播用户离开消息
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`👋 ${clientInfo.username} 离开了聊天室`);
        }
      });
      clients.delete(ws);
    } else {
      console.log('客户端已断开连接');
    }
  });

  // 错误处理
  ws.on('error', (error) => {
    console.error('WebSocket错误:', error);
  });
});
