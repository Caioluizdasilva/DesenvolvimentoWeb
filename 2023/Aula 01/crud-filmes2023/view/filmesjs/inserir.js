$("#btn-novo-jquery").click(() => {
    filmeListarGeneroInserirFetch()
    $("#modal-formulario").modal({backdrop: "static"})
    $("#modal-formulario").modal('show')
})
$("#btn-fechar-jquery").click(() => {
    $("#modal-formulario").modal({backdrop: 'static'})
    $("#modal-formulario").modal('hide')
})

const $btnEnviar = document.querySelector('#enviar')
$btnEnviar.addEventListener('click', (event) => {
    event.preventDefault()
    filmeInserirFetch()
    $("#modal-formulario").modal('hide')
})

let filmeListarGeneroInserirFetch = () => {
    fetch("../controller/generoListar.php")
        .then((resposta) => {
            if (!resposta.ok === true) {
                let msg = resposta.status + " - " + resposta.statusText
                throw new Error(msg)
            } else return resposta.json()
        })
        .then((respostaJSON) => respostaJSON.erro === false ? cbSucessoListarGeneroInserir(respostaJSON) : cbErroListarGeneroInserir(respostaJSON.msgErro))
        .catch((erro) => document.querySelector('#msgErro').textContent = erro)
}

const cbSucessoListarGeneroInserir = (respostaJSON) => montarSelect(respostaJSON.dados)

const cbErroListarGeneroInserir = (erro) => document.querySelector('#msgErro').textContent = erro

const montarSelect = (dados) => {
    document.querySelector('#cmbGeneros').textContent = erro
    for (const i in dados) {
        let genero = dados[i]
        let $opt = document.createElement('option')
        $opt.value = genero.id
        $opt.textContent = genero.descricao
        document.querySelector('#cmbGeneros').appendChild($opt)
    }
}

let filmeInserirFetch = () => {
    let filme = {
        'titulo': document.querySelector('#titulo').value,
        'avaliacao': parseFloat(document.querySelector('#avaliacao').value),
        'genero_id': parseInt(document.querySelector('#cmbGeneros').value)
    }

    let configMetodo = {
        method: "POST",
        body: JSON.stringify(filme),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    }

    fetch("../controller/filmeInserir.php", configMetodo)
        .then((resposta) => {
                if (!resposta.ok === true) {
                    let msg = resposta.status + " - " + resposta.statusText
                    throw new Error(msg)
                } else return resposta.json()
            }
        )
        .then((respostaJSON) => {
            respostaJSON.erro === false ? cbSucessoInserirFilme(respostaJSON) : cbErroInserirFilme(respostaJSON.msgErro)
        })
        .catch((erro) => cbErroInserirFilme(erro))
}

const cbSucessoInserirFilme = (respostaJSON) => {
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso
    setTimeout(() => {
        limparSpans()
        filmeListarFetch()
    }, 1500)
}

const cbErroInserirFilme = (erro) => {
    document.querySelector('#msgErro').textContent = erro
    setTimeout(() => {
        limparSpans()
    }, 2000)
}