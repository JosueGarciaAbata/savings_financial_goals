<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alerta de Inactividad</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7fb;
            color: #333;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
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
            color: #e74c3c;
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
    </style>
</head>

<body>

    <div class="email-container">
        <h2>Alerta de Inactividad - Aporte Semanal</h2>

        <p>¡Hola {{ $userName }}! Este es un recordatorio sobre tu meta de ahorro.</p>

        <p>Meta: <strong>{{ $goalName }}</strong></p>
        <p><strong>Último Aporte:</strong> {{ $lastContributionDate }}</p>
        <p><strong>No has hecho aportes la semana anterior. Considera actualizar tu plan para lograr tu meta.</p>

        <p><strong>Fecha Actual:</strong> {{ $currentDate }}</p>

        <div class="footer">
            <p>¡Recuerda que tu meta está a tu alcance! Sigue trabajando para lograr tus objetivos.</p>
        </div>
    </div>

</body>

</html>
