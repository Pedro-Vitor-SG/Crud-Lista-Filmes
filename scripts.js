//VALORES INCIAIS DO OBJETO
let dados = {
  titulo: "",
  ano: 0,
  categoria: "",
  link: "",
};

//FUNCAO PARA ATUALIZAR DADOS
const atualizarDados = () => {
  //PEGA O OBJ 'dados' E DÁ UM NOVO VALOR PARA AS PROPRIEDADES
  dados = {
    titulo: document.querySelector("#titulo").value,
    ano: document.querySelector("#ano").value,
    categoria: document.querySelector("#categoria").value,
    link: document.querySelector("#link").value,
  };
  //ESSA FUNÇÃO É CHAMADA NOS ELEMENTOS NO PROPRIO HTML COM 'onkeyup' E 'onchange'

  //FAZ COM O ELEMENTO PASSE A TER O CONTEUDO DO OBJ 'dados' NO FORMATO JSON
  document.querySelector("#debug").innerHTML = JSON.stringify(dados);
};

//MONTA O NOVO ITEM DA LISTA
const montaItem = () => {
  //PEGA O TEMPO JÁ QUE O TEMPO NÃO SE REPETE USAMOS COM 'id'
  const id = new Date().getTime();

  //VARIAVEL QUE VAI CRIAR O HTML DO NOVO ITEM SEMPRE COM NOVOS DADOS
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
    `; //TEMOS UM 'tr' QUE VAI TER SEMPRE UM ID DIFERENTE E EXCLUIREMOS A PARTIR DESSE ID
  //TEMOS ALGUNS TD's, SEMPRE ATUALIZANDO AS INFORMAÇÕES, SENDO QUE OS 2 ULTIMOS USAM O ATRIBUTO 'data' PARA, FAZERMOS A FUNÇÃO DE ABRIR O LINK DO FILME E EXCLUIR O FILME PELO ID

  return item;
};

//CADASTRA O NOVO ITEM E O MOSTRAMOS NA TELA
const cadastrar = () => {
  //CONDICIONAL PARA EVITAR QUE ENVIE DADOS VAZIOS
  if (
    dados.titulo === "" ||
    dados.ano === 0 ||
    dados.categoria === "" ||
    dados.link === ""
  ) {
    alert(`Preencha todos os campos!`);
  } else {
    //ADICIONA UM NOVO ITEM SEMPRE EM PRIMEIRO
    document
      .querySelector("#lista-filmes")
      .insertAdjacentHTML("beforeend", montaItem());

    //VARIAVEL VOLTA AO ESTADO INICIAL
    dados = {};

    //OS ELEMENTOS HTML PASSAM A FICAREM VAZIOS NOVAMENTE
    document.querySelector("#ano").value = ``;
    document.querySelector("#titulo").value = ``;
    document.querySelector("#categoria").value = `Categoria 1`;
    document.querySelector("#link").value = ``;
  }
};

document.querySelector("#btn-cad").addEventListener("click", cadastrar);

//ADICIONA EVENTO AO DOCUMENTO, FUNCIONALIDADE DE ABRIR LINK E APAGAR ELEMENTO
document.addEventListener("click", (e) => {
  //VARIAVEL QUE PEGA O 'target.classlist' DO ELEMENTO QUE FOI CLICADO E TRANSFORMA EM ARRAY AS CLASSES
  const listaClasse = Array.prototype.slice.call(e.target.classList);
  console.log(e);

  //SE O ELEMENTO CLICADO TIVER A CLASSE
  if (e.target && listaClasse.includes("acessarFilme")) {
    //VARIAVEL QUE RECEBE O CONTEUDO DO ATRIBUTO DATA NA PROPRIEDADE URL
    const url = e.target.dataset.url;

    //ABRE UMA NOVA JANELA COM ESSA VARIAVEL
    window.open(url, "_blank");
  }

  //SE O ELEMENTO CLICADO TIVER A CLASSE
  if (e.target && listaClasse.includes("excluirFilme")) {
    //VARIAVEL QUE QUARDA A RESPOSTA DO CONFIRM (TRUE OU FALSE)
    const response = confirm(`Quer mesmo excluir esse filme?`);

    //SE 'response' FOR TRUE
    if (response) {
      //VARIAVEL QUE RECEBE O CONTEUDO DO ATRIBUTO DATA NA PROPRIEDADE ID
      const id = e.target.dataset.id;
      
      //EXCLUINDO O ELEMTO COM ESSE ID
      document.getElementById(id).remove();
    }
  }
});
