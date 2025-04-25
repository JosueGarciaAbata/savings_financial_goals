<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte por Categoría</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 30px;
            color: #333;
        }

        h1 {
            text-align: center;
            font-size: 28px;
            color: #2c3e50;
            margin-bottom: 30px;
        }

        .category-title {
            font-size: 22px;
            font-weight: bold;
            color: #34495e;
            margin-top: 40px;
            margin-bottom: 15px;
            text-transform: uppercase;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        .status {
            font-weight: bold;
            color: #27ae60;
        }
    </style>
</head>

<body>
    <h1>Reporte de Metas por Categoría</h1>
    <p>Usuario: {{ $userName }}</p>
    <p>Fecha: {{ $currentDate }}</p>

    @foreach ($categoryGoals as $categoryData)
        <div class="category-title">
            {{ $categoryData['category']->name }}
        </div>

        <table>
            <thead>
                <tr>
                    <th>Meta</th>
                    <th>Objetivo</th>
                    <th>Ahorro Total</th>
                    <th>Progreso</th>
                    <th>Fecha Límite</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($categoryData['goals'] as $goal)
                    <tr>
                        <td>{{ $goal->name }}</td>
                        <td>${{ $goal->target_amount }}</td>
                        <td>${{ $goal->total_saved }}</td>
                        <td>{{ $goal->progress }}%</td>
                        <td>{{ $goal->deadline }}</td>
                        <td class="status">{{ $goal->status }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach
</body>

</html>
