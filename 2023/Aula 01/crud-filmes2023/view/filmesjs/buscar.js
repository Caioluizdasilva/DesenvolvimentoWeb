$("btn-fechar-jquery-alterar").click(function() {
    $("#modal-formulario-alterar").modal({backdrop: 'static'})
    $("#modal-formulario-alterar").modal('hide')
})

let filmeBuscarFetch = function(id) {
    fetch("../controller/filmeBuscar.php?id="+id+"")
        .then(function (resposta) {
            if(!resposta.ok === true) {
                let msg = resposta.status + " - " + resposta.statusText
                throw new Error(msg)
            } else return resposta.json()
        })
        .then(function (respostaJSON) {
            if(respostaJSON.erro === false) cbSucessoBuscarFilme(respostaJSON)
            else cbErroBuscarFilme(respostaJSON.msgErro)
            return respostaJSON.dados.genero_id
        })
        .then(function (idGeneroAtual) {
            buscarEposicionarGeneros(idGeneroAtual)
        })
        .catch(function (erro) {
            document.querySelector('#msgErro').textContent = erro
        })
}

function cbSucessoBuscarFilme(respostaJSON) {
    $("#modal-formulario-alterar").modal({backdrop: 'static'})
    $("#modal-formulario-alterar").modal('show')
    let formAlterarFilme = document.querySelector('#form-alterar')
    let filme = respostaJSON.dados
    formAlterarFilme.querySelector('#id').value = filme.id
    formAlterarFilme.querySelector('#titulo').value = filme.titulo
    formAlterarFilme.querySelector('#avaliacao').value = filme.avaliacao
}

function cbErroBuscarFilme(erro) {
    document.querySelector('#msgErro').textContent = erro
}

function buscarEposicionarGeneros(idGeneroAtual) {
    fetch("../controller/generoListar.php")
        .then(function (resposta) {
            if(!resposta.ok === true) {
                let msg = resposta.status + " - " + resposta.statusText
                throw new Error(msg)
            } else return resposta.json()
        })
        .then(function (respostaJSON) {
            if(respostaJSON.erro === false) {
                cbSucessoListarGeneroBuscar(respostaJSON, idGeneroAtual)
                document.querySelector("#msgSucesso").textContent = respostaJSON.msgSucesso
                setTimeout(function() {
                    document.querySelector("#msgSucesso").textContent = ""
                }, 2500)
            } else cbErroListarGeneroBuscar(respostaJSON.msgErro)
        })
        .catch(function (erro) {
            document.querySelector('#msgErro').textContent = erro
        })
}

function cbSucessoListarGeneroBuscar(respostaJSON, idGeneroAtual) {
    console.log("id", idGeneroAtual)
    let generos = respostaJSON.dados
    if(generos != null) montarSelectGeneros(generos, idGeneroAtual)
}

function cbErroListarGeneroBuscar(erro) {
    document.querySelector("#msgErro").textContent = erro
}

function montarSelectGeneros(generos, idGeneroAtual) {
    let formAlterarFilme = document.querySelector('#form-alterar')
    formAlterarFilme.querySelector('#cmbGeneros').innerHTML = ""
    for (const i in generos) {
        let genero = generos[i]
        let $opt = document.createElement('option')
        $opt.value = genero.id
        if(genero.id == idGeneroAtual) $opt.setAttribute('selected', 'selected')
        $opt.textContent = genero.descricao
        formAlterarFilme.querySelector('#cmbGeneros').appendChild($opt)
    }
}