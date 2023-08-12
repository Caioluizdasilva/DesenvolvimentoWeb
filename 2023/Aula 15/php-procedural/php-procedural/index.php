<?php
	declare(strict_types=1);
	require_once('funcoes1.php');
	require_once('funcoes2.php');
	$produtos = [
		'1' => [
			'descricao' => 'Cerveja',
			'precoDeCusto' => 4
		],
		'2' => [
			'descricao' => 'Guaraná',
			'precoDeCusto' => 5
		]
	];
	$contas = [
		'1' =>[
			'cpf' => '123.456.789-10',
			'titular' => 'Rafael',
			'saldo' => 3000
		],
		'2' =>[
			'cpf' => '123.456.789-11',
			'titular' => 'Renata',
			'saldo' => 5000
		],
		'3' =>[
			'cpf' => '123.456.789-12',
			'titular' => 'Maria',
			'saldo' => 2500
		]
	];

// $precoDeVendaDaCerveja = obterPrecoDeVenda($produtos['1'],50);
// echo " O preço de venda do produto".$profutos['1']['descricao']. "é $precoDeVendaDaCerveja <br><hr>";
// echo "A conta do Rafael tem saldo {$contas['1]['saldo']}<br><hr>";
// $contaDoRafaelApoSaque = sacar($contas['1],2000);
// $contas['1] = $contaDoRafaelApoSaque;
// echo "Apos o saque: <br/>;
// echo ""A conta do Rafael tem saldo {$contas['1]['saldo']}<br><hr>";


echo "A conta da Renata tem saldo {$contas['2]['saldo']}<br><hr>";
saca($contas['2'],2000);
echo "Apos o saque: <br/>;
echo ""A conta do Renata tem saldo {$contas['2]['saldo']}<br><hr>";

if(validarCpf)


// // print_r($produto1);
// 	// echo "<hr>";
// 	// print_r($contas);


// 	// $produto1 = $pordutos['1'];
// 	// $conta2 = $contas['2'];
// 	// print_r($produto1);
// 	// echo "<hr>";
// 	// print_r($contas2);*/
// ?>