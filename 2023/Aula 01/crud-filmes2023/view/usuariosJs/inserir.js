//Recupera o elemento (Também poderíamos usar o form e o evento submit)        
const $btnEnviar = document.querySelector('#enviar');
$btnEnviar.addEventListener('click', function(event) {
    event.preventDefault();
    usuariosInserirFetch();
    $("#modal-formulario").modal('hide');
});

let usuariosInserirFetch = function () {
    let usuario= {
        "nome": document.querySelector('#nome').value,
        "senha": document.querySelector('#senha').value,
        "login": document.querySelector('#login').value,
    };
    let configMetodo = {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {"Content-Type": "application/json;charset=UTF-8"}
    };

    //fetch enviando o genero a ser inserido
    fetch("../controller/usuariosInserir.php", configMetodo)
        .then(function(resposta){
            if(!resposta.ok===true){
                let msg = resposta.status + " - " + resposta.statusText;
                throw new Error(msg);
            }
            else
                return resposta.json();
        })
        .then(function(respostaJSON){
            if(respostaJSON.erro===false)
                cbSucessoInserirUsuarios(respostaJSON);
            else
                cbErroInserirUsuarios(respostaJSON.msgErro);
        })
        .catch(function(erro){
            cbErroInserirUsuarios(erro);
        });
}

function limparSpans() {
    document.querySelector('#msgErro').textContent = '';
    document.querySelector('#msgSucesso').textContent = '';
}
//Função de callback
function cbSucessoInserirUsuarios(respostaJSON){
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    setTimeout(function(){
        limparSpans()
        usuarioListarFetch()
    },1500);
}

function cbErroInserirUsuarios(erro) {
    document.querySelector('#msgErro').textContent = erro;
    setTimeout(function() {
        limparSpans()
        usuarioListarFetch()
    }, 1500)
}
