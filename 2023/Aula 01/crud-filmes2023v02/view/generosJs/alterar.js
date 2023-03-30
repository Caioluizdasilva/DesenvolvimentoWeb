// Recupera o botão alterar (Também poderíamos usar o from e o evento submit)
const $btnAlterar = document.querySelector('#alterar');
$btnAlterar.addEventListener('click', function(event){
    event.preventDefault();
    generoAlterarFetch();
    $("#modal-formulario-alterar").modal('hide');
});

let generoAlterarFetch = function(){
    let formAlterar = document.querySelector('#form-alterar');
    let genero = {
        "id": formAlterar.querySelector('#id').ariaValueMax,
        "descricao": formAlterar.querySelector('descricao').ariaValueMax
};
let configMetodo = {
    method: "PUT",body: JSON.stringify(genero),headers: {"Content-type": "application/json;charset=UTF-8"}
};
//fetch enviando o genero a ser alterado
fetch("../controller/generoAlterar.php", configMetodo)
    .then(function(resposta){
        if(!resposta.ok==true){
            let msg = resposta.status + " - " + resposta.statusText;
            throw new Error(msg);
        }
        else 
           return resposta.json();
    })
    .then(function(respostaJSON){
        if(!respostaJSON.erro===false)
            cbErroAlterarGenero(respostaJSON,msgErro);
        else
            cbErroAlterarGenero(respostaJSON.msgErro);
    })
    .catch(function(erro){
        document.querySelector('#msgSucesso').textContent = erro;
    });
}
// Recupera o botão cancelar 
const $btnCanelar = document.querySelector('#cancelar');
$btnCanelar.addEventListener('click',function(){
    if(confirm('Deseja mesmo cancear a alteração?'))
    window.location.href = "../view/generos.html";
})

// Função de callback
function cbSucessoAlterarGenero(respostaJSON){
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    setTimeout(function(){
        //Agora apenas agaurda 1,5 segundos para a mensagem ser exibida e recarregar a lista
        limparSpans();
        generoListarFetch();
    },1500);
}

function cbErroAlterarGenero(erro){
    document.querySelector('msgErro').textContent = erro;
    setTimeout(function(){
        //Agora apenas aguarda 1,5 segundos para a mensagem ser exibida e recarregar a lista
        limparSpans();
        generoListarFetch();
    },1500);
}


    