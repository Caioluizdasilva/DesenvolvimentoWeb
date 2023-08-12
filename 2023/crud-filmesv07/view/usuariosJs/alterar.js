import { exibirMensagem,exibirMensagemErro,limparSpan } from "../utilJs/funcoesUtil.js";
import { usuarioListarFetch } from "./listar.js";

//Recupera o botão alterar (Também poderíamos usar o form e o evento submit)        
const $btnAlterar = document.querySelector('#alterar');
$btnAlterar.addEventListener('click', function(event){
    event.preventDefault();
    usuarioAlterarFetch();
    $("#modal-formulario-alterar").modal('hide');
});

let usuarioAlterarFetch = function(){
    let formAlterar = document.querySelector('#form-alterar');
    let usuario = {
        "id": formAlterar.querySelector('#id').value,
        "nome": formAlterar.querySelector('#nome').value
    };
    let configMetodo = {
        method: "PUT"
        ,body: JSON.stringify(usuario)
        ,headers: {"Content-Type":"application/json;charset=UTF-8"}
    };

    fetch("../controller/usuarioAlterar.php", configMetodo)
        .then(function(resposta){
            if(!resposta.ok===true){
                if(resposta.status===401)
                    window.location.href = "../view/index.html";
                let msg = resposta.status + " - " + resposta.statusText;
                throw new Error(msg);
            }
            else
                return resposta.json();
        })
        .then(function(respostaJSON){
            if(respostaJSON.erro===false)
                fcSucessoAlterarUsuario(respostaJSON);
            else
                fcErroAlterarUsuario(respostaJSON.msgErro);
        })
        .catch(function(erro){
            exibirMensagemErro('#msg',erro);
        });
}

const $btnCancelar = document.querySelector('#cancelar');
$btnCancelar.addEventListener('click',function(){
    if(confirm('Deseja mesmo cancelar a alteração?'))
        window.location.href = "../view/usuarios.html";
})

function fcSucessoAlterarUsuario(respostaJSON){
    exibirMensagem('#msg',respostaJSON.msgSucesso);
    setTimeout(function(){
        limparSpan('#msg');
        usuarioListarFetch();
    },1500);
}

function fcErroAlterarUsuario(erro){
    exibirMensagemErro('#msg',erro);
    setTimeout(function(){
        limparSpan('#msg');
    },1500);
}