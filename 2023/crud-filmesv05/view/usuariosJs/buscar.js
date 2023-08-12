import { exbibirMensagem, exibirMensagemErro, limparSpan } from "../utilJs/funcoesUtil.js";
function usuarioBuscarFetch(id){
    //Fetch enviando o id do usuario a ser recuperado
    fetch("../controller/usuarioBuscar.php?id="+id+"")
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
           fcSucessoBuscarusuario(respostaJSON);
        else 
            fcErroBuscarusuario(respostaJOSN.msgErro);
    })
    .catch(function(erro){
        exibirMensagemErro("#msg", erro);
     });
}

function fcSucessoBuscarusuario(respostaJSON){
    $("#modal-formulario-alterar").modal({backdrop: 'static'});
    $("modal-formulario-alterar").modal('show');
    let fromAlterar = document.querySelector('#form-alterar');
    let usuario = respostaJSON.dados;
    fromAlterar.querySelector('#id').value = usuario.id;
    formAlterar.querySelector('#nome').value = usuario.nome;
}

function fcErroBuscarusuario(erro){
    exibirMensagemErro("#msg" , erro);
    setTimeout(function(){
        limparSpan('#msg');
    }, 1500);
}

export {usuarioBuscarFetch};