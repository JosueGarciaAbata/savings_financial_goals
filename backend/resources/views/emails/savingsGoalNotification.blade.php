<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recordatorio de Meta</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
            color: #333;
        }

        h2 {
            text-align: center;
            font-size: 24px;
            color: #2980b9;
            margin-bottom: 30px;
        }

        p {
            font-size: 16px;
            line-height: 1.5;
            color: #34495e;
        }

        .highlight {
            color: #27ae60;
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #7f8c8d;
        }

        .footer a {
            color: #2980b9;
            text-decoration: none;
        }

        .button {
            display: inline-block;
            background-color: #2980b9;
            color: white;
            font-size: 16px;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 20px;
        }

        .button:hover {
            background-color: #3498db;
        }

        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #34495e;
            margin-bottom: 10px;
        }

        .section {
            margin-bottom: 20px;
        }
    </style>
</head>

<body>

    <div class="email-container">
        <h2>Recordatorio de Ahorro</h2>

        <p>¡Reciba un cordial saludo, {{ $userName }}! Le recordamos que realice su aporte semanal para continuar en
            camino hacia su meta.</p>

        <div class="section">
            <div class="section-title">Detalles de su Meta:</div>
            <p><strong>Meta:</strong> {{ $goal->name }}</p>
            <p><strong>Monto Objetivo:</strong> ${{ $goal->target_amount }}</p>
            <p><strong>Total Aportado:</strong> ${{ $goal->total_saved }}</p>
            <p><strong>Monto Restante:</strong> ${{ $goal->target_amount - $goal->total_saved }}</p>
            <p><strong>Fecha Límite:</strong> {{ \Carbon\Carbon::parse($goal->deadline)->format('d/m/Y') }}</p>
            <p><strong>Ahorro Semanal Recomendado:</strong> ${{ $recommendedWeeklySavings }}</p>
        </div>

        <p>Recuerde que el cumplimiento de su aporte semanal es fundamental para cumplir su objetivo de ahorro.</p>

    </div>

</body>

</html>
