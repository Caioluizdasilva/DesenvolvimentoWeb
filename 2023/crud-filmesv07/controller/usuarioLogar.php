<?php
  require_once('../model/conexao.php');
  $usuarioPost = file_get_contents('php://input');
  $usuarioMatriz = json_decode($usuarioPost, true);
  $login = (isset($usuarioMatriz["login"]) && $usuarioMatriz["login"] != null) 
  ? $usuarioMatriz["login"] : "";
  $senha = (isset($usuarioMatriz["senha"]) && $usuarioMatriz["senha"] != null) 
  ? $usuarioMatriz["senha"] : "";
  $senha = hash('sha256',$senha);
  //Monta a resposta padrão
  $resposta["erro"] = false; $resposta["msgErro"] = "";
  $resposta["msgSucesso"] = ""; $resposta["dados"] = null;
  if( $login != "" && $senha != ""){
    try {
        $sql = "SELECT id,nome FROM usuarios WHERE login=? and senha =?";
        //Prepara a instrução e em seguida passa os argumentos. Evita SQL Injection
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $login );
        $stmt->bindParam(2, $senha);
        $stmt->execute();
        if($stmt->rowCount()>0){
            $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $resposta["dados"] = $dados;
            $resposta["msgSucesso"] = "usuario logado com sucesso!";

            if(session_status() === PHP_SESSION_NONE){
              session_start();
              $_SESSION['usuario'] = $dados[0]["nome"]; 
              $_SESSION['usuario_id'] = $dados[0]["id"]; 
              $_SESSION['ultima_atividade'] = time(); 
              $resposta["mensagem"] = "Sessao Criada com sucesso";
              $resposta["data"] = $dados[0];
            }
        }else{
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro: Usuário não logado. Login e ou senha inválidos";
        }
    }catch(PDOException $e) {
      $resposta["erro"] = true;
      $resposta["msgErro"] = "Erro: Usuário não logado".$e->getMessage();
    }finally{
      echo json_encode($resposta);  
    }
  }
?>