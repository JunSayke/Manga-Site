const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const routes = {
  "/": "/src/index.html",
  "/index": "/src/index.html",
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = parsedUrl.pathname;

  // Serve static files
  if (
    pathname.startsWith("/css") ||
    pathname.startsWith("/js") ||
    pathname.startsWith("/img")
  ) {
    const filePath = path.join(__dirname, "src", pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
      } else {
        const ext = path.extname(filePath);
        const mimeType = mimeTypes[ext] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": mimeType });
        res.end(data);
      }
    });
    return;
  }

  // Serve routes
  const route = routes[pathname] || routes["/index"];
  const filePath = path.join(__dirname, route);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
    } else {
      const ext = path.extname(filePath);
      const mimeType = mimeTypes[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
