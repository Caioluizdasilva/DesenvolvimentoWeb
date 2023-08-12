window.onload = ()=>{
    usuarioListarFetch();
}


let usuarioListarFetch = function(){
    document.querySelector('tbody').innerHTML="";
    fetch("../controller/usuariosListar.php")
    .then(function(resposta){
        if( ! resposta.ok===true){
            let msg = resposta.status + " - " + resposta.statusText;

            throw new Error(msg);
        }else
            return resposta.json();
    })
    .then(function(respostaJSON){
        if(respostaJSON.erro===false)
            cbSucessoListarUsuarios(respostaJSON);
        else 
            cbErroListarUsuarios(respostaJSON.msgErro);
    })
    .catch(function(erro){
        document.querySelector('#msgErro').textContent = erro;
    })
};

// Função de callback
function cbSucessoListarUsuarios(respostaJSON){
    montarTabela(respostaJSON.dados);
}
function cbErroListarUsuarios(Erro){
    document.querySelector('#msgErro').textContent = erro;
}

function montarTabela(dados){
    for (const i in dados){
        let usuario = dados[i];
        const $tr = document.createElement('tr');

        criarTDePendurar($tr, usuario.id , false);
        criarTDePendurar($tr, usuario.nome, false);

        let links = "<a href=# '>[Editar]</a>";
        links+= "<a href=# '> [Excluir],</a>"
        criarTDePendurar($tr, links, true);

        document.querySelector('tbody').appendChild($tr);
    }
}


const $corpoTabela = document.querySelector('tbody');
$corpoTabela.addEventListener('click',function(event){
    if(event.target.tagName==='A'){
        let link = event.target;
        let usuarioId = obterValorDaColunaId(link);
        if(usuarioId>0 && link.textContent === "[Excluir]")
         usuarioExcluirFetch(usuarioId);
         else if(usuarioId>0 && link.textContent === "[Editar]")
         usuarioBuscarFetch(usuarioId); 
    }
});

function obterValorDaColunaId(link){
    if(link.textContent === "[Excluir]" || link.textContent === "[Editar]"){
        //parentNode = nó pai
        let coluna = link.parentNode;
        let linha = coluna.parentNode;
        //firstChild = primeiro filho
        let idText = linha.firstChild;
        return parseInt(idText.textContent);
    }
    return null;
}
function criarTDePendurar(noPai, informacao, ehHtml){
    let td = document.createElement('td');
    if(ehHtml)
        td.innerHTML = informacao;
    else
        td.textContent = informacao;
    noPai.appendChild(td);
}



