window.onload = () => {
    filmeListarFetch()
}

let filmeListarFetch = () => {
    document.querySelector('tbody').innerHTML = ""
    fetch("../controller/filmeListar.php")
        .then((resposta) => {
            if(!resposta.ok === true) {
                let msg =resposta.status + " - " + resposta.statusText
                throw new Error(msg)
            } else return resposta.json()
        })
        .then((respostaJSON) => {
            respostaJSON.erro === false ? cbSucessoListarFilme(respostaJSON) : cbErroListarFilme(respostaJSON.msgErro)
        })
        .catch((erro) => {
            document.querySelector('#msgErro').textContent = erro
        })
}

const cbSucessoListarFilme = (respostaJSON) => montarTabela(respostaJSON.dados)

const cbErroListarFilme = (erro) => document.querySelector('#msgErro').textContent = erro

const montarTabela = (dados) => {
    for (const i in dados) {
        let filme = dados[i]
        const $tr = document.createElement('tr')
        criarTDePendurar($tr, filme.id, false)
        criarTDePendurar($tr, filme.titulo, false)
        criarTDePendurar($tr, filme.avaliacao, false)
        criarTDePendurar($tr, filme.genero_descricao, false)
        let links = "<a href=# '>[Editar]</a>"
        links+= "<a href=# '>[Excluir]</a>"
        criarTDePendurar($tr, links, true)
        document.querySelector('tbody').appendChild($tr)
    }
}

const criarTDePendurar = (noPai, informacao, ehHtml) => {
    let td = document.createElement('td')
    ehHtml ? td.innerHTML = informacao : td.textContent = informacao
    noPai.appendChild(td)
}

const $corpoTabela = document.querySelector('tbody')

$corpoTabela.addEventListener('click', (event) => {
    if(event.target.tagName === 'A') {
        let link = event.target
        let filmeId = obterValorDaColunaId(link)
        filmeId > 0 && link.textContent === "[Excluir]" ? filmeExcluirFetch(filmeId) : (filmeId > 0 && link.textContent === "[Editar]" ? filmeBuscarFetch(filmeId) : "")
    }
})

const obterValorDaColunaId = (link) => {
    let coluna = link.parentNode
    let linha = coluna.parentNode
    let idText = linha.firstChild
    return parseInt(idText.textContent)
}

const limparSpans = () => {
    document.querySelector('#msgErro').textContent = ""
    document.querySelector('#msgSucesso').textContent = ""
}