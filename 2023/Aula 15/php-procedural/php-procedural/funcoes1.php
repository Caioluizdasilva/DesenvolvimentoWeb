<?php
	//1-obterPrecoDeVenda
	function obterPreçoDeVenda(array $produto, float $percentualDeAumento):float{
		return $produto['precoDeCusto'] 
		+ ($produto['precoDeCusto']*$percentualDeAumento/100);
	}
	//2-sacar (sem passagem por referencia)
function sacar(array $conta, float $valor):array{
	$conta['saldo'] -=$valor;
	return $conta;
}
	//4-deposita* (passagem por referência)
	function deposita(array &$conta, float $valor):void{
		$conta['saldo'] +=valor;
	}

	//6-validaCpf recebe uma conta
?>