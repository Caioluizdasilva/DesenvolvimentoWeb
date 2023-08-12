const filmeExcluirFetch = (id) => {
    if(confirm('Confirma a exclusão do filme de id' + id + '?')) {
        let filme = {'id': id}
        let configMetodo = {
            method: "DELETE",
            body: JSON.stringify(filme),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }
        fetch("../controller/filmeExcluir.php", configMetodo)
            .then((resposta) => {
                if(!resposta.ok === true) {
                    let msg = resposta.status + " - " + resposta.statusText
                    throw new Error(msg)
                } else return resposta.json()
            })
            .then((respostaJSON) => {
                respostaJSON.erro === false ? cbSucessoExcluirFilme(respostaJSON) : cbErroExcluirFilme(respostaJSON.msgErro)
            })
            .catch((erro) => {
                document.querySelector('#msgErro').textContent = erro
            })
    }
}

const cbSucessoExcluirFilme = (respostaJSON) => {
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso
    setTimeout(() => {
        limparSpans()
        filmeListarFetch()
    }, 1500)
}

const cbErroExcluirFilme = (erro) => {
    document.querySelector('#msgErro').textContent = erro
    setTimeout(() => {
        limparSpans()
    }, 1500)
}