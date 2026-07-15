const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") filePath = "./index.html";
  const ext = path.extname(filePath) || ".html";
  const map = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
  };
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": map[ext] || "text/plain" });
    res.end(data);
  });
});

server.listen(port, () => console.log(`Servidor en http://localhost:${port}`));
