function limparSpan(idElemento){
    document.querySelector(idElemento).textContent = "";
}

function exibirMensagem(elemento,msg){
    document.querySelector(elemento).classList.remove('msgErro');
    document.querySelector(elemento).classList.add('msgSucesso');
    document.querySelector(elemento).textContent = msg;
}

function exibirMensagemErro(elemento,msg){
    document.querySelector(elemento).classList.remove('msgSucesso');
    document.querySelector(elemento).classList.add('msgErro');
    document.querySelector(elemento).textContent = msg;
}

const paginaLogin = "../view/index.html";

function fazFetch(url,metodo,objetoLiteral,cbSucesso,cbErro){
    let configMetodo = {
        method: metodo
        ,body: (obejtoLiteral!=null)?JSON.stringify(objetoLiteral):null
        ,headers: {"Content-Type": "application/json;charset=UTF-8"}
    };
    fetch(url, configMetodo)
    .then(function(resposta){
        if(!resposta.ok===true){
            let msg = resposta.status + " - " + resposta.statusText;
            if(resposta.status===401){
                window.location.href = paginaLogin;
            }
            throw new Error(msg);
        }else
         return resposta.json();
    })
    .then(function(respostaJSON){
        if(!resposta.erro===false)
            cbSucesso(respostaJSON);
        else 
             cbErro(respotaJOSN.msgErro);
        })
        .catch(function(erro){
            cbErro(erro);
        })
        .finallu(()=> console.log('requisição encerrada'))
}

export {limparSpan, exibirMensagem, exibirMensagemErro};