<?php
require_once "conexao.php";
$genres = [
    ['title' => 'Terror'],
    ['title' => 'Aventura'],
    ['title' => 'Dança'],
    ['title' => 'Drama'],
    ['title' => 'Fantasia']
];

$movies = [
    ['title' => 'Whatchmen', 'releaseDate' => '2009-01-01', 'IMDB' => 9.2, 'idGenre' => 5],
    ['title' => 'Viúva Negra', 'releaseDate' => '2008-07-18', 'IMDB' => 9.0, 'idGenre' => 4],
    ['title' => 'Os Guardiões', 'releaseDate' => '1999-05-21', 'IMDB' => 8.7, 'idGenre' => 2],
    ['title' => 'Eternos', 'releaseDate' => '2002-08-30', 'IMDB' => 8.6, 'idGenre' => 5],
    ['title' => 'Não!Não olhe', 'releaseDate' => '2014-11-06', 'IMDB' => 8.6, 'idGenre' => 1],
    ['title' => 'Sorria', 'releaseDate' => '1985-12-25', 'IMDB' => 8.5, 'idGenre' => 5],
    ['title' => 'Esquadrão Suicida', 'releaseDate' => '2008-06-27', 'IMDB' => 8.4, 'idGenre' => 5],
    ['title' => 'A Mulher Rei', 'releaseDate' => '2019-10-03', 'IMDB' => 8.3, 'idGenre' => 3],
    ['title' => 'Trem bala', 'releaseDate' => '1995-12-22', 'IMDB' => 8.3, 'idGenre' => 2],
    ['title' => 'O Homem do Norte', 'releaseDate' => '2019-04-25', 'IMDB' => 8.3, 'idGenre' => 4]
];

$sqlMovies = "INSERT INTO movie(title, releaseDate, IMDB, idGenre) VALUES(?,?,?,?);";
$sqlGenres = "INSERT INTO genre(name) VALUES(?);";

try {
    foreach ($genres as $genre) {
        $stmt = $connection -> prepare($sqlGenres);
        $stmt -> bindParam(1,$genre['title']);
        $stmt -> execute();
    }
    foreach ($movies as $movie) {
        $stmt = $connection -> prepare($sqlMovies);
        $stmt -> bindParam(1,$movie['title']);
        $stmt -> bindParam(2,$movie['releaseDate']);
        $stmt -> bindParam(3,$movie['IMDB']);
        $stmt -> bindParam(4,$movie['idGenre']);
        $stmt -> execute();
    }
} catch (PDOException $e) {
    echo "Erro ao inserir.".$e->getMessage()."<br/>";
};