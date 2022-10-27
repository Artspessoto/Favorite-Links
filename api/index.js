//arquivos e módulos
const express = require("express");
const data = require("./urls.json");
const URL = require("url");
const handleFile = require("./utils/handleFile");
const cors = require("cors");

//servidor e porta
const app = express();
const port = 5000;
const hostname = "127.0.0.1";

app.use(express.json());

//permitindo que a aplicação pode ser acessada de qualquer lugar
app.use(cors({ origin: ["http://127.0.0.1:3000", "http://localhost:3001"] }));

app.post("/", (req, res) => {
  const { name, url } = req.body;

  const favorites = {
    name,
    url,
  };

  data.urls.push(favorites);
  handleFile(data);

  res.status(200).json({ message: "favorito cadastrado com sucesso!" });
});

app.get("/", (req, res) => {
  const { name, url } = URL.parse(req.url, true).query;

  //all resources (listagem)
  if (!name || !url) return res.end(JSON.stringify(data));

  return res.json(data.urls);
});

app.delete("/remove/:name", (req, res) => {
  const name  = req.params.name;
  const linkName = data.urls.findIndex((link) => link.name === name);

  data.urls.splice(linkName, 1);

  handleFile(data);

  return res.json({
    message: "O seu site marcado como favorito foi removido com sucesso!",
  });
});

app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}/`)
);
