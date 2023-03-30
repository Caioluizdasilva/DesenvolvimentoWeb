<?php
       $dns = "mysql:host=localhost;dbname=cinedesweb";
       $user = "root";
       $pass = ""; // Nas máquinas do wamp a senha costuma ser wamp
       try{
        //Argumentos: data soucre name (driver, host e base de dados), usuário e senha
        $conexao = new PDO($dns,$user,$pass);
        // Coloca o PDO para trabalhar no modo de tratamento de exceções
        $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       } catch(PDOException $e){
        // Se não for possível conectar, montar uma resposta para ser devolvida com JSON
        $resposta["erro"]=true;
        $resposta["msgErro"] = "Erro ao conectar com o BD. ".$e->getMessage();
        // Transformando a matriz associativa num objeto JSON em forma de texto
        // e devolvendo para o cliente (javascript)
        echo json_encde($resposta);
        exit();
      }

?>
