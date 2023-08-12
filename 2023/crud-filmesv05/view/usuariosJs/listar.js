import { exibirMensagemErro } from "../utilJs/funcoesUtil.js";
import { usuarioExcluirFetch } from "./excluir.js";
import { usuarioBuscarFetch } from "./buscar.js";

$("#btn-novo-jquery").click(function(){
    $("#modal-formulario-inserir").modal({backdrop: 'static'});
    $("#modal-formulario-inserir").modal('show');
});
$("#btn-fechar-jquery").click(function(){
    $("#modal-formulario-inseiri").modal({backdrop: 'static'});
    $("#modal-formulario-inserir").modal('hide');
});
$("#btn-fechar-jquery-alterar").click(function(){
    $("#modal-formulario-alterar").modal({backdrop: 'static'});
    $("modal-formulario-alterar").modal('hide');
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
           fcSucessoListarUsuario(respostaJOSN);
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
    exibirMensagemErro('#msg', erro);
}

// Essa função cria as linhas da tabela com os dados recebidos da CONTROLLER
function montarTabela(dados){
    for( const i in dados){
        let obj = dados[i];
        const $tr = document.createElement('tr');
        //p/ cada atribuito 
    }
}

