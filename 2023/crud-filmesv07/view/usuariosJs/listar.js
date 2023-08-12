import { exibirMensagemErro } from "../utilJs/funcoesUtil.js";
import { usuarioExcluirFetch } from "./excluir.js";
import { usuarioBuscarFetch } from "./buscar.js";

$("#btn-novo-jquery").click(function(){
    $("#modal-formulario-inserir").modal({backdrop: 'static'});
    $("#modal-formulario-inserir").modal('show');
});
$("#btn-fechar-jquery").click(function(){
    $("#modal-formulario-inserir").modal({backdrop: 'static'});
    $("#modal-formulario-inserir").modal('hide');
});
$("#btn-fechar-jquery-alterar").click(function(){
    $("#modal-formulario-alterar").modal({backdrop: 'static'});
    $("#modal-formulario-alterar").modal('hide');
});
$("#btn-home-jquery").click(function(){
    window.location.href = "index.html";
});
window.onload = ()=>{
    usuarioListarFetch();
}

let usuarioListarFetch = function(){
    document.querySelector('tbody').innerHTML="";
    fetch("../controller/usuarioListar.php")
    .then(function(resposta){
        if(! resposta.ok===true){
            if(resposta.status===401)
                window.location.href = "../view/index.html";
            let msg = resposta.status + " - " + resposta.statusText;
            throw new Error(msg);
        }else
            return resposta.json();
    })
    .then(function(respostaJSON){
        if(respostaJSON.erro===false)
            fcSucessoListarUsuario(respostaJSON);
        else
            fcErroListarUsuario(respostaJSON.msgErro);
    })
    .catch(function(erro){
        fcErroListarUsuario(erro);
    });
};

function fcSucessoListarUsuario(respostaJSON){
    montarTabela(respostaJSON.dados);
}
function fcErroListarUsuario(erro){
    exibirMensagemErro('#msg',erro);
}

//Esta função cria as linhas da tabela com os dados recebidos da CONTROLLER
function montarTabela(dados){
    for (const i in dados) {
        let obj = dados[i];
        const $tr = document.createElement('tr');
        //p/ cada atributo faça
        criarTDePendurar($tr, obj.id , false);
        criarTDePendurar($tr, obj.nome , false);
        //Cria os links para as operações editar e excluir
        let links = "<a href=# '>[Editar]</a>";
        links+= "<a href=#  '>[Excluir]</a>" 
        //true indica que é um código html
        criarTDePendurar($tr, links , true);
        //Pendura a linha criada a cada iteração no tbody da tabela
        document.querySelector('tbody').appendChild($tr);
    }//Fim do for in
}//Fim da função

//Lógica de exclusão. A função excluirUsuario está em usuariosjs/excluir.js
const $corpoTabela = document.querySelector('tbody');
$corpoTabela.addEventListener('click',function(event){
    if(event.target.tagName==='A'){
        let link = event.target;
        let objId = obterValorDaColunaId(link);
        if(objId>0 && link.textContent === "[Excluir]")
            usuarioExcluirFetch(objId); 
        else if(objId>0 && link.textContent === "[Editar]")
            usuarioBuscarFetch(objId);        
    } 
});

function obterValorDaColunaId(link){
    //parentNode = nó pai
    let coluna = link.parentNode;
    let linha = coluna.parentNode;
    //firstChild = primeiro filho
    let idText = linha.firstChild;
    return parseInt(idText.textContent);
}

function criarTDePendurar(noPai, informacao, ehHtml){
    let td = document.createElement('td');
    if(ehHtml)
        td.innerHTML = informacao;
    else
        td.textContent = informacao;
    noPai.appendChild(td);
}

export {usuarioListarFetch};
