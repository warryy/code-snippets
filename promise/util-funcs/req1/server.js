const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // 获取请求的文件路径
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html";
  }
  if (filePath === "./favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end(fs.readFileSync("./favicon.ico"));
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

  if (!req.url.startsWith("/api")) {
    res.writeHead(200, { "Content-Type": contentType });
    // 这里返回当前目录下的 index.html 文件
    res.end(fs.readFileSync(filePath, "utf-8"));
    return;
  }

  // 这里mock数据, 返回json
  // 请求支持 GET 和 POST
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": contentType });
    setTimeout(() => {
      res.end(
        JSON.stringify({
          code: 0,
          message: "success",
          data: {
            name: "test",
            path: filePath,
            method: "GET",
            params: req.url.split("?")[1],
          },
        })
      );
    }, 2000);
    return;
  }

  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(
        JSON.stringify({
          code: 0,
          message: "success",
          data: {
            name: "test",
            path: filePath,
            method: "POST",
            body: JSON.parse(body),
          },
        })
      );
    });
  }
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}/`);
});
