<?php
   require_onde('../model/autenticar.php');
   require_onde('../model/conexao.php');
   $resposta["erro"] = false;
   $resposta["dados"] = null;
   $resposta["msgSucesso"] = "";
   $resposta["msgErro"] = "";
    if($autentificado===true){
        try{
            $sql="SELECT id,nome FROM usuarios ORDER BY nome";
            $stmt = $conexao->prepare($sql);
            $stmt->execute();
            $resposta["dados"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $resposta["msgSucesso"] = "Usuários listados com sucesso! ";
        }catch (PDOException $e){
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro ao listar usuários. "$e->getMessage();
          }finally{
            echo json_encode($resposta);
          }

        }
?>
