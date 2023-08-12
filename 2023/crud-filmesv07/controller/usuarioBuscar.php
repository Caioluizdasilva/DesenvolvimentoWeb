<?php
    require_once('../model/autenticar.php');
    require_once('../model/conexao.php');
    $id = (isset($_GET["id"]) && $_GET["id"] >0) ? $_GET["id"] : null;
    //Monte uma resposta na forma de matriz associativa com valores de sucesso.
    $resposta["erro"] = false; 
    $resposta["dados"] = null;
    $resposta["msgErro"] = ""; 
    $resposta["msgSucesso"] = ""; 
    if($id!=null && $autenticado===true){
        try{
            $sql = "SELECT id,nome FROM usuarios WHERE id = ?";
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(1, $id);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            //$result[0] possui o usuário encontrado com base no id fornecido
            $resposta["dados"] = $result[0];
            $resposta["msgSucesso"] = "usuario de id {$id} retornado com sucesso!";
        }catch(PDOException $e){
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro ao retornar usuario de id {$id}. ".$e->getMessage();
        }finally{
            echo json_encode($resposta); exit();
        }
    }   
?>