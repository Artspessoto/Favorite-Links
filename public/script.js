const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");

async function loadApi() {
  const data = await fetch("http://127.0.0.1:5000/")
    .then((result) => result.json())
    .catch((err) => {
      console.log(err);
    });

  console.log(data);

  data.urls.map(({ name, url }) => addElement({ name, url }));
}

loadApi();

function addElement({ name, url }) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const trash = document.createElement("span");

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.onclick = () => removeElement(trash);

  li.append(a);
  li.append(trash);
  ul.append(li);
}

function removeElement(el) {
  if (confirm("Tem certeza que deseja deletar?")) el.parentNode.remove();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert("Preencha o campo");

  const [name, url] = value.split(",");

  if (!url) return alert("formate o texto da maneira correta(sem espaçamentos)");

  if (!/^http/.test(url)) return alert("Digite a url da maneira correta");

  addElement({ name, url });

  input.value = "";
});
