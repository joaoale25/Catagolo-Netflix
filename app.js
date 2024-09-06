//---------------------------VARIAVEIS--------------------------------

const button = document.querySelector("#search-button"); //Aqui estou pedindo para procurar o botão, e guardar em uma variavel
const modal = document.querySelector("dialog"); //modal == janela sobreposta, por cima do conteudo
const closeButton = document.getElementById("botao_fechar_normal");//fecha o popup
const poster = document.getElementById("poster"); //vai pegar os valores de id
const nameFilme = document.getElementById("nome_filme");
nameFilme.classList.add('nome_filme');
const info = document.getElementById("info");
const sinopse = document.getElementById("content_sinopse");
const procurarFilme = document.querySelector('input[type="text"]'); //vai pegar o valor que for escrito no input, e ja definimos que é um texto
let resultadoPesquisa = "";

//---------------------------------------------------------------------


//----------------------BOTÕES DE FECHAR DIALOG------------------

const erro_filme = document.getElementById("filme_nao")
const closeButtonErro = document.getElementById("botao_fechar_erro"); // Seleciona o primeiro elemento com classe .botao_fechar

closeButtonErro.onclick = function () {
  erro_filme.close(); // Fecha o popup de erro
}

closeButton.onclick = function () {
  // Verifica qual popup está aberto e fecha o correto
    modal.close();
}

//----------------------------------------------------------------------

button.onclick = function () {
    let escritaUsuario = procurarFilme.value.toLowerCase(); // aqui quero guardar na variavel, o que o usuario escreveu, e deixar tudo em minusculo para poder comparar depois
    escritaUsuario = escritaUsuario.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ''); //vai procurar por um espaço em branco, e vai trocar por uma espaço vazio, tirando o espaço entre eles, e também vai tirar os acentos
    
    const filmeBuscado = filmes_netflix.find(filme =>filme.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '')=== escritaUsuario);//Criei uma variante dentro do find para guardar a informação que foi buscada dentro da lista de dados, 3 ===, deixa a comparação mais segura


    if (filmeBuscado) { //se o filmebuscado estiver dentro da lista, faça;
        poster.innerHTML = `<img src="${filmeBuscado.cartaz}" alt="${filmeBuscado.titulo}">`;
        info.innerHTML = `
        <h3 class= "info_titulo">Informações:</h3>
        <ul class="lista_objetos">

            <li><span class = "objetos_cor">Ano:</span> 
                <span class="cor_variaveis">
                    ${filmeBuscado.ano}
                </span>
            </li>
            <li><span class = "objetos_cor">Duração:</span> 
                <span class="cor_variaveis">
                    ${filmeBuscado.duracao}
                </span>
            </li>
            <li><span class = "objetos_cor">Autor:</span> 
                <span class="cor_variaveis">
                    ${filmeBuscado.autor}
                </span>
            </li>
                <li><span class = "objetos_cor">Atores principais:</span> 
                <span class="cor_variaveis">
                    ${filmeBuscado.atores}
                </span>
            </li>
        </ul>
        `

    
        modal.showModal();
        nameFilme.innerHTML = `<h1>${filmeBuscado.titulo.toUpperCase()}</h1>` //escreve o titulo no html, namefilme defini la em cima para ser a div do titulo
        sinopse.innerHTML = `
        <h3 class="sinopse_title">Resumo:</h3>
        <p>${filmeBuscado.sinopse}</p>`;
    } else { //senao aparece uma mensagem de erro
            erro_filme.showModal();
    }
}
