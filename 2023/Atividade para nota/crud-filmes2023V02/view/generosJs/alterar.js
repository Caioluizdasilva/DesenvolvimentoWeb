// Recupera o botão alterar (Também poderíamos usar o form e o evento submit)
const $btnAlterar = document.querySelector('#alterar');
$btnAlterar.addEventListener('click', function(event){
    event.preventDefault();
    filmeALterarFetch();
    $btnAlterar("modal-formulario-alterar").modal('hide');
});

let filmeALterarFetch = function(){
    let formALterar = document.querySelector('#form-alterar');
    // Monta um objeto filme recuperando os elementos do DOM
    let filme = {
        "id" : formALterar.querySelector('#id').value,"titulo": formALterar.querySelector('#titulo').value,
        "avaliacao" : parseFloat(formALterar.querySelector('#avaliacao').value),
        "genero_id" : parseInt(formAlterar.querySelector('#cmbGeneros').value)
 }; 
 let configMetodo = {
    method : "PUT", body : JSON.stringify(filme), //Texto JSON
    headers : {"Content-Type" : "application/json;charset=UTF-8"}
}
// fetch enviando o filme a ser alterado
fetch("../controller/filmeAlterar.php", configMetodo)
 .then(function(resposta){
    if(!resposta.ok===true){
        let msg = resposta.status + " - " + resposta.statusText;
        throw new Error(msg);
    }else 
       return resposta.json();
 })
 .then(function(respotaJSON){
    if(respostaJSON.erro===false)
      cbSucessoAlterarFilme(respostaJSON);
      else 
       cbErroAlterarFilme(respostaJSON.msgErro);
 })
 .catch(function(erro){
    document.querySelector('#msgErro').textContent = erro;
 });
};
// Recupera o botão cancelar
const $btnCancelar = document.querySelector('#cancelar');
$btnCancelar.addEventListener('click', function(){
    if(confirm('Deseja mesmo cancelar a alteração?'))
    window.location.href = "../view/filmes.html";
})
// Função de callback
function cbSucessoAlterarFilme(respostaJSON){
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    setTimeout(function(){
    window.location.href = "../view/filmes.html";
    }, 3500)
}

function cbErroAlterarFilme(erro){
    document.querySelector('#msgErro').textContent = erro;
    setTimeout(function(){
        
        limparSpans();
    },1500);
}