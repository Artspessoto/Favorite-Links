const http = require("http");
const port = 3000;
const hostname = "127.0.0.1";
const fs = require("fs");
const path = require("path");

/**
 * res = É sempre a resposta que o servidor vai enviar
 * req = é a requisição, pedido que fazemos ao servidor
 */
const server = http.createServer((req, res) => {
  const file = req.url === "/" ? "index.html" : req.url;
  const filePath = path.join(__dirname, "public", file);
  const extensionFile = path.extname(filePath);

  const allowedFiles = [".html", ".css", ".js"];
  const allowed = allowedFiles.find((item) => item == extensionFile);

  if (!allowed) return;

  fs.readFile(filePath, (err, content) => {
    if (err) throw err;
    res.end(content);
  });
});

server.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}/`)
);
