<?php
    require_once('../model/conexao.php');
    //Monte um resposta na forma de matriz associativa com valores de sucesso.
    // Essa matriz deverá ser devolvida para o cliente ( javascript) no formato de texto JSON
    $response["erro"] = false;
    $response["dados"] = null;
    $response["msgErro"] = '';
    $response["msgSucesso"] = '';
    // Tente executar o comando de consulta na referida tabela

try {
    $sql = 'SELECT * FROM generos ORDER BY descricao';
    $stmt = $connection -> prepare($sql);
    $stmt -> execute();
  // Em caso de sucesso, envie as linhas da tabela pelo atribuito dados de $resposta
  // Esses dados deverão estar no formato de matriz associativa (PDO::FETCH_ASSOC)
    $response["dados"] = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    // Envie também uma mensagem de sucesso
    $response["msgSucesso"] = 'Generos listado com sucesso!';
} catch (PDOException $e) {
    // Em caso de erro, sinalize o erro e crie uma mensagem de erro
    $response["erro"] = true;
    $response["msgErro"] = 'Erro ao listar generos. '.$e -> getMessage();
} finally {
    // Devolva a resposta para o cliente no formato de texto JSON
    echo json_encode($response);
}