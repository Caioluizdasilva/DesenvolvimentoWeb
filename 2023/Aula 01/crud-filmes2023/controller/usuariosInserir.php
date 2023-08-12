<?php
  require_once('../model/conexao.php');
  $usuarioPost = file_get_contents('php://input');
  $usuarioMatriz = json_decode($usuarioPost, true);
  $nome = (isset($usuarioMatriz["nome"]) && $usuarioMatriz["nome"] != null) 
  ? strtoupper($usuarioMatriz["nome"]) : "";
  $login = (isset($usuarioMatriz["login"]) && $usuarioMatriz["login"] != null) 
  ? strtoupper($usuarioMatriz["login"]) : "";
  $senha = (isset($usuarioMatriz["senha"]) && $usuarioMatriz["senha"] != null) 
  ? strtoupper($usuarioMatriz["senha"]) : "";
  //Monta a resposta padrão
  $resposta["erro"] = false; $resposta["msgErro"] = "";
  $resposta["msgSucesso"] = ""; $resposta["dados"] = null;
  if( $nome != "" && $login != "" || $senha != ""  ){
    try {
        $sql = "INSERT INTO usuario(nome, login, senha) VALUES(?, ?, ?)";
        //Prepara a instrução e em seguida passa os argumentos. Evita SQL Injection
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $nome );
        $stmt->bindParam(2, $login );
        $stmt->bindParam(3, $senha );
        $stmt->execute();
        $resposta["msgSucesso"] = "{$stmt->rowCount()} usuario inserido com sucesso! O id inserido 
        foi {$conexao->lastInsertId()}"; 
    }catch(PDOException $e) {
      $resposta["erro"] = true;
      $resposta["msgErro"] = "Erro: Não foi possível efetuar a inserção no BD".$e->getMessage();
    }finally{
      echo json_encode($resposta);  
    }
  }
?>