const $btnAlterar = document.querySelector('#alterar')
$btnAlterar.addEventListener('click', function (event) {
    event.preventDefault()
    filmeAlterarFetch()
    $("#modal-formulario-alterar").modal('hide')
})

let filmeAlterarFetch = function() {
    let formAlterar = document.querySelector('#form-alterar')
    let filme = {
        "id": formAlterar.querySelector('#id').value,
        "titulo": formAlterar.querySelector('#titulo').value,
        "avaliacao": parseFloat(formAlterar.querySelector('#avaliacao').value),
        "genero_id": parseFloat(formAlterar.querySelector('#cmbGeneros').value)
    }
    let configMetodo = {
        method: "PUT",
        body: JSON.stringify(filme),
        headers: {"Content-Type": "application/json;charset=UTF-8"}
    }

    fetch("../controller/filmeAlterar.php", configMetodo)
        .then(function (resposta) {
            if(!resposta.ok === true) {
                let msg = resposta.status + " - " + resposta.statusText
                throw new Error(msg)
            } else return resposta.json()
        })
        .then(function (respostaJSON) {
            if(respostaJSON.erro === false) {
                cbSucessoAlterarFilme(respostaJSON)
            } else cbErroAlterarFilme(respostaJSON.msgErro)
        })
        .catch(function (erro) {
            document.querySelector("#msgErro").textContent = erro
        })
}

const $btnCancelar = document.querySelector('#cancelar')
$btnCancelar.addEventListener('click', function() {
    if(confirm('Deseja mesmo cancelar a alteração?')) window.location.href = "../view/filmes.html"
})

function cbSucessoAlterarFilme(respostaJSON) {
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso
    setTimeout(function () {
        window.location.href = "../view/filmes.html"
    }, 3500)
}

function cbErroAlterarFilme(erro) {
    document.querySelector('#msgErro').textContent = erro
    setTimeout(function() {
        limparSpans()
    }, 1500)
}