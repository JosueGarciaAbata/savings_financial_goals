<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reporte de Progreso de Meta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
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
    </style>
</head>

<body>

    <h1>Reporte de Progreso de Metas</h1>

    <p><strong>Usuario:</strong> {{ $userName }}</p>
    <p><strong>Fecha del reporte:</strong> {{ $currentDate }}</p>

    @foreach ($goals as $goal)
        <h4>
            <strong>Meta:</strong> <span style="font-weight: normal;">{{ $goal->name }}</span>
        </h4>

        <h5>Aportes realizados</h5>
        <table>
            <thead>
                <tr>
                    <th>Fecha de Aporte</th>
                    <th>Monto Aportado</th>
                    <th>Total Aportado</th>
                    <th>Progreso (%)</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $totalSaved = 0;
                @endphp

                @foreach ($goal->contributions as $contribution)
                    @php
                        $totalSaved += $contribution->amount;
                        $progress = $goal->target_amount > 0 ? round(($totalSaved / $goal->target_amount) * 100, 0) : 0;
                    @endphp
                    <tr>
                        <td>{{ \Carbon\Carbon::parse($contribution->contribution_date)->format('d/m/Y') }}</td>
                        <td>${{ number_format($contribution->amount, 2) }}</td>
                        <td>${{ number_format($totalSaved, 2) }}</td>
                        <td>{{ $progress }}%</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach

</body>

</html>
