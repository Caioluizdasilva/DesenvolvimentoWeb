//Ao carregar a página
window.onload = function () {
    let qs = window.location.search.replace('?', '');
    let parametrosBuscar = qs.split('=');
    let id = parametrosBuscar[1];
    usuariosBuscarFetch(id);
    // buscarGenero(id);
}

function usuariosBuscarFetch(id) {
    fetch("../controller/usuariosBuscar.php?id=" + id + "")
        .then(function (resposta) {
            if (!resposta.ok === true) {
                let msg = resposta.status + " - " + resposta.statusText;
                throw new Error(msg);
            } else return resposta.json();
        })
        .then(function (respostaJson) {
            if (respostaJson.erro === false) {
                cbSucessoBuscarUsuarios(respostaJson);
                document.querySelector('#msgSucesso').textContent = respostaJson.msgSucesso;
                setTimeout(function () {
                    document.querySelector('#msgSucesso').textContent = "";
                }, 1500)
            } else cbErroBuscarUsuarios(respostaJson.msgErro);
        })
        .catch(function(erro) {
            document.querySelector('#msgSucesso').textContent = erro;
        })
}

function cbSucessoBuscarUsuarios(responseJSON) {
    $("#modal-formulario-alterar").modal({backdrop: 'static'});
    $("#modal-formulario-alterar").modal('show');
    let formAlterar = document.querySelector('#form-alterar');
    let genero = responseJSON.dados;
    formAlterar.querySelector('#id').value = genero.id;
    formAlterar.querySelector('#descricao').value = genero.descricao;
}

function cbErroBuscarUsuarios(erro) {
    document.querySelector('#msgErro').textContent = erro;
    setTimeout(function() {
        limparSpans();
        generoListarFetch();
    }, 1500)
}