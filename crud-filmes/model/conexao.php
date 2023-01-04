<?php
      $dns = "mysql:host=localhost; dbname=cinesweb";
      $user= "root"
      $pass = "";
      try{
        $conexao = new PDO($dns, $user, $pass);
        $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       }catch(PDOException $e){
        $resposta["erro"]=true;
        $resposta["msgErro"]= "Erro ao conectar com o BD. ".$e->getMenssagge();
        echo json_encode($resposta)
        exit();
       }

?>
