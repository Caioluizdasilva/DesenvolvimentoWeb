function generoExcluirFetch(id){
    if(confirm('Confirma a exclusão do genero de id '+id+'?')){ 
        let usuario = {'id': id}
        let configMetodo = {
            method: "DELETE",
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }
        //fetch enviando o id do genero a ser excluído
        fetch("../controller/usuarioExcluir.php", configMetodo)
            .then(function(resposta){
                if(!resposta.ok===true){
                    let msg = resposta.status + " - " + resposta.statusText;
                    throw new Erro(msg);
                }else
                    return resposta.json();
            })
            .then(function(respostaJSON){
                if(respostaJSON.erro===false)
                    cbSucessoExcluirUsuarios(respostaJSON);
                else
                    cbErroExcluirUsuarios(respostaJSON.msgErro);
            })
            .catch(function(erro){
                cbErroExcluirUsuarios(erro);
            })
    }
}

//Função de callback
function cbSucessoExcluirUsuarios(respostaJSON){
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    //Em seguida, redirecione para a página principal
    setTimeout(function(){
        limparSpans();
        usuarioListarFetch();
    },1500);
}

function cbErroExcluirUsuarios(erro) {
    document.querySelector('#msgErro').textContent = erro;
    setTimeout(function() {
        limparSpans();
        usuarioListarFetch();
    }, 1500);
}