const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // 获取请求的文件路径
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html";
  }

  // 判断文件是否存在
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404");
    return;
  }

  // 获取文件扩展名
  const extname = path.extname(filePath);

  let contentType = "text/html";

  // 根据文件扩展名设置正确的 content-type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // 读取文件
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404);
        res.end("文件未找到");
      } else {
        res.writeHead(500);
        res.end("服务器错误: " + error.code);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}/`);
});
