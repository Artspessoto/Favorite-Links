//servidor e porta
const http = require("http");
const port = 5000;
const hostname = "127.0.0.1";

//arquivos e módulos
const data = require("./urls.json");
const URL = require("url");
const path = require("path");
const fs = require("fs");

function writeFile(callback) {
  fs.writeFile(
    path.join(__dirname, "urls.json"), //caminho do diretório
    JSON.stringify(data, null, 2), //os dados
    (err) => {
      //callback
      if (err) throw err;

      callback(JSON.stringify({ message: "ok" }));
    }
  );
}

/**
 * res = É sempre a resposta que o servidor vai enviar
 * req = é a requisição, pedido que fazemos ao servidor
 */
const server = http.createServer((req, res) => {
  const { name, url, del } = URL.parse(req.url, true).query;


  //permitindo que a aplicação pode ser acessada de qualquer lugar
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })

  //all resources (listagem)
  if (!name || !url) return res.end(JSON.stringify(data));

  //delete
  if (del) {
    data.urls = data.urls.filter((item) => String(item.url) !== String(url));
    //o writeFile vai reescrever o arquivo e esse método tem 3 parâmetros
    return writeFile((message) => res.end(message));
  }

  //create
  data.urls.push({ name, url });

  return writeFile((message) => res.end(message));
});

server.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}/`)
);
