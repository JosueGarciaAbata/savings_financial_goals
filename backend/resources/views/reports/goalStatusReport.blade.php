<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Metas por Estado</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 20px;
            color: #333;
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #2c3e50;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #f5f5f5;
            color: #2c3e50;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #eef;
        }

        .category-title {
            font-size: 16px;
            font-weight: bold;
            color: #2c3e50;
            margin-top: 30px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }

        .no-goals {
            text-align: center;
            color: #e74c3c;
            font-weight: bold;
        }
    </style>
</head>

<body>

    <h1>Reporte de Metas por Estado</h1>

    <p><strong>Usuario:</strong> {{ $userName }}</p>
    <p><strong>Fecha del reporte:</strong> {{ $currentDate }}</p>

    <div class="category-title">Metas Completadas</div>
    @if ($completedGoals->isEmpty())
        <p class="no-goals">No tienes metas completadas.</p>
    @else
        <table>
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
                @foreach ($completedGoals as $goal)
                    <tr>
                        <td>{{ $goal->name }}</td>
                        <td>{{ $goal->status }}</td>
                        <td>${{ number_format($goal->target_amount, 2) }}</td>
                        <td>${{ number_format($goal->total_saved, 2) }}</td>
                        <td>{{ $goal->deadline }}</td>
                        <td>{{ $goal->progress }}%</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    <div class="category-title">Metas Vencidas</div>
    @if ($expiredGoals->isEmpty())
        <p class="no-goals">No tienes metas vencidas.</p>
    @else
        <table>
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
                @foreach ($expiredGoals as $goal)
                    <tr>
                        <td>{{ $goal->name }}</td>
                        <td>{{ $goal->status }}</td>
                        <td>${{ number_format($goal->target_amount, 2) }}</td>
                        <td>${{ number_format($goal->total_saved, 2) }}</td>
                        <td>{{ $goal->deadline }}</td>
                        <td>{{ $goal->progress }}%</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    <div class="category-title">Metas en Ejecución</div>
    @if ($activeGoals->isEmpty())
        <p class="no-goals">No tienes metas en ejecución.</p>
    @else
        <table>
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
                @foreach ($activeGoals as $goal)
                    <tr>
                        <td>{{ $goal->name }}</td>
                        <td>{{ $goal->status }}</td>
                        <td>${{ number_format($goal->target_amount, 2) }}</td>
                        <td>${{ number_format($goal->total_saved, 2) }}</td>
                        <td>{{ $goal->deadline }}</td>
                        <td>{{ $goal->progress }}%</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

</body>

</html>
