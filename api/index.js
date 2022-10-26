//arquivos e módulos
const express = require("express");
const data = require("./urls.json");
const URL = require("url");
const { handleFile } = require("./createFile.js");

//servidor e porta
const app = express();
const port = 5000;
const hostname = "127.0.0.1";

app.use(express.json(), (req, res, next)=>{
  //permitindo que a aplicação pode ser acessada de qualquer lugar
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
  });
  next();

});

app.post("/", (req, res) => {
  const { name, url } = req.body;

  const favorites = {
    name,
    url,
  };

  data.urls.push(favorites);
  handleFile(data.urls);

  res.status(200).json({message: "favorito cadastrado com sucesso!"});
});

app.get("/", (req, res) => {
  const { name, url } = URL.parse(req.url, true).query;

  //all resources (listagem)
  if (!name || !url) return res.end(JSON.stringify(data));

  return res.json(data.urls);
});

app.delete("/remove/:name", (req, res) => {
  const { name } = req.body;
  const linkName = data.urls.findIndex((link) => link.name === name);

  data.urls.splice(linkName, 1);

  return res.json({ message: "Link removido com sucesso!" });
});

app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}/`)
);

