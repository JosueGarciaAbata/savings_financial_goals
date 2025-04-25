<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <h1>Reporte General De Metas De Ahorro</h1>

</body>

<table border="1">
    <thead>
        <tr>
            <th>Meta</th>
            <th>Estado</th>
            <th>Monto Objetivo</th>
            <th>Total Aportado</th>
            <th>Fecha Límite</th>
            <th>Progreso obtenido</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
            </tr>
        @endforeach
    </tbody>
</table>


</html>
