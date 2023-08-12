<?php
  require_once('../model/conexao.php');
  $usuarioPut = file_get_contents('php://input');$usuarioMatriz = json_decode($usuarioPut, true);
  //id e descrição do gênero a ser alterado
  $id = (isset($usuarioMatriz["id"]) && $usuarioMatriz["id"] >0) ? $usuarioMatriz["id"] : null; 
  $descricao = (isset($usuarioMatriz["descricao"]) && $usuarioMatriz["descricao"] != null) 
  ? strtoupper($usuarioMatriz["descricao"]) : "";
  $resposta["erro"] = false; $resposta["msgErro"] = "";
  $resposta["msgSucesso"] = "";$resposta["dados"] = null;
  if( $descricao != "" && $id != ""){
    try {
        $sql = "UPDATE usuario SET descricao=? WHERE id=?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $descricao );$stmt->bindParam(2, $id);
        $stmt->execute();
        $resposta["msgSucesso"] = "{$stmt->rowCount()} genero alterado com sucesso! 
        O id do genero alterado foi {$id}"; 
    }catch(PDOException $e) {
      $resposta["erro"] = true;
      $resposta["msgErro"] = "Erro: Não foi possível efetuar a alteração no BD".$e->getMessage();
    }finally{
      echo json_encode($resposta);  
    }
  }
?>