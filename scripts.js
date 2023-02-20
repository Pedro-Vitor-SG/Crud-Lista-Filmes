document.addEventListener("click", (e) => {
  const listaClasse = Array.prototype.slice.call(e.target.classList);
  console.log(e);
  if (e.target && listaClasse.includes("acessarFilme")) {
    const url = e.target.dataset.url;
    window.open(url, "_blank");
  }

  if (e.target && listaClasse.includes("excluirFilme")) {
    const response = confirm(`Quer mesmo excluir o filme: ${dados.titulo}?`);

    if (response) {
      const id = e.target.dataset.id;
      document.getElementById(id).remove();
    }
  }
});

let dados = {
  titulo: "",
  ano: 0,
  categoria: "",
  link: "",
};

const atualizarDados = () => {
  dados = {
    titulo: document.querySelector("#titulo").value,
    ano: document.querySelector("#ano").value,
    categoria: document.querySelector("#categoria").value,
    link: document.querySelector("#link").value,
  };

  document.querySelector("#debug").innerHTML = JSON.stringify(dados);
};

const montaItem = () => {
  const id = new Date().getTime();

  const item = `
        <tr id="${id}">
            <td>${dados.titulo}</td>
            <td>${dados.categoria}</td>
            <td>${dados.ano}</td>
            <td class="text-right">
            <button class="btn btn-info acessarFilme"  data-url="${dados.link}">Acessar</button
            ><button class="btn btn-danger excluirFilme" data-id="${id}">Excluir</button>
            </td>
        <tr>
    `;

  return item;
};
const cadastrar = () => {
  if (
    dados.titulo === "" ||
    dados.ano === 0 ||
    dados.categoria === "" ||
    dados.link === ""
  ) {
    alert(`Preencha todos os campos!`);
  } else {
    document
      .querySelector("#lista-filmes")
      .insertAdjacentHTML("beforeend", montaItem());

    dados = {};

    document.querySelector("#ano").value = ``;
    document.querySelector("#titulo").value = ``;
    document.querySelector("#categoria").value = `Categoria 1`;
    document.querySelector("#link").value = ``;
  }
};

document.querySelector("#btn-cad").addEventListener("click", cadastrar);
