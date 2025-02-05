const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(async (req, res) => {
  // 这里实现一个请求为 test 的 sse
  console.log("===req.url", req.url);
  if (req.url === "/sse") {
    // 告诉客户端这是一个 sse
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    const loneText = `SSE 是 Server-Sent Events（服务器发送事件）的缩写。
    它是一种 单向、基于 HTTP 的推送技术，允许服务器向浏览器持续发送数据，而客户端不需要不断轮询。
    SSE 的特点
    单向通信：服务器 → 客户端（不像 WebSocket 是双向的）。
    基于 HTTP：使用标准 HTTP 连接，不需要额外协议。
    自动重连：浏览器的 EventSource 会自动重连断开的 SSE 连接。
    文本传输：支持 text/event-stream 传输，不适用于二进制数据（如 WebSocket）。
    SSE 的使用场景
    大模型对话流式输出（如 ChatGPT）
    实时日志流（如服务器日志、系统监控）
    股票行情推送（如交易市场数据）
    社交媒体通知（如 Twitter 实时推送）
    协作编辑（如 Google Docs 共享文档编辑提醒）`;
    const chunkSize = 20; // 每 10 个字符分割一次
    // 模拟发送数据
    console.log("===1");

    for (let i = 0; i < loneText.length; i += chunkSize) {
      const chunk = loneText.slice(i, i + chunkSize);
      await new Promise((resolve) =>
        setTimeout(() => {
          console.log("===chunk", chunk);
          // 将换行符转换为特殊字符序列，在客户端再转换回来
          const encodedChunk = chunk.replace(/\n/g, "\\n");
          resolve(res.write(`data: ${encodedChunk}\n\n`));
        }, 200)
      ); // 模拟延迟
    }
    res.end();
    return;
  }

  // favicon.ico 请求相应
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end(fs.readFileSync(path.join(__dirname, "./favicon.ico")));
    return;
  }

  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(fs.readFileSync(path.join(__dirname, "./index.html")));
  return;
});

const PORT = 3000;
// 启动服务器
server.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
