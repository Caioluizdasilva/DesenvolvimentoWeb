<!doctype html>
<html lang=pt-br>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Torcedor...</title>
</head>
<body>
<main>
    <div class="card-name">
        <h1>Dados Pessoais</h1>

        <p><?php if (!empty($_POST['formName']))
                echo $_POST['formName'], '</br>'; ?></p>

        <p><?php if (!empty($_POST['formEmail']))
                echo $_POST['formEmail'], '</br>'; ?></p>

        <p><?php if (!empty($_POST['formCell']))
                echo $_POST['formTel'], '</br>'; ?></p>
    </div>

    <section class="card-flex">
        <div class="card">
            <h2>País: </h2>
            <p><?php if (!empty($_POST['formCoutry']))
                    echo $_POST['formCoutry'], '</br>'; ?></p>
        </div>
        <div class="card">
            <h2>Estado:</h2>
            <p><?php if (!empty($_POST['formstade']))
                    echo $_POST['formstade'], '</br>'; ?></p>
        </div>
    </section>

    <section class="card-flex">
        <div class="card">
            <h2>Cidade: </h2>
            <p><?php if (!empty($_POST['formCity']))
                    echo $_POST['formCity'], '</br>'; ?></p>
        </div>
        <div class="card">
            <h2>Dados enviados em: </h2>
            <p><?php date_default_timezone_set('America/Sao_Paulo');
                echo date("d/m/Y H:i:s"); ?></p>
        </div>
    </section>
</main>
</body>
</html>