<?php
  require_once('../model/conexao.php');
  $usuarioDelete = file_get_contents('php://input');
  $usuarioMatriz = json_decode($usuarioDelete, true);
  $nome = (isset($usuarioMatriz["nome"]) && $usuarioMatriz["nome"] != null) 
  ? strtoupper($usuarioMatriz["nome"]) : "";
  $login = (isset($usuarioMatriz["login"]) && $usuarioMatriz["login"] != null) 
  ? strtoupper($usuarioMatriz["login"]) : "";
  $senha = (isset($usuarioMatriz["senha"]) && $usuarioMatriz["senha"] != null) 
  ? strtoupper($usuarioMatriz["senha"]) : "";
  $resposta["erro"] = false;$resposta["msgErro"] = "";
  $resposta["msgSucesso"] = "";$resposta["dados"] = null;
  if( $id != null ){
    try {
        $sql = "DELETE FROM usuario(nome, login, senha) VALUES(?, ?, ?)";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $nome );
        $stmt->bindParam(2, $login );
        $stmt->bindParam(3, $senha );
        $stmt->execute();
        $resposta["msgSucesso"] = "Usuario de id $id excluído com sucesso!";
    }catch(PDOException $e) {
      $resposta["erro"] = true;
      $resposta["msgErro"] = "Erro ao excluir usuario. ".$e->getMessage();
    }finally{
        echo json_encode($resposta);  
        exit();
    }
  }
?>