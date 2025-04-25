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

        h1 {
            text-align: center;
            font-size: 24px;
            color: #2980b9;
        }

        p {
            font-size: 16px;
            line-height: 1.5;
            color: #34495e;
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
    </style>
</head>

<body>
    <div class="email-container">
        <h1>Reporte de Progreso de Meta</h1>

        <p>Estimado/a {{ $user->full_name }},</p>

        <p>Adjuntamos el reporte de progreso de sus metas activas.</p>

        <p>Por favor, revise el archivo adjunto para más detalles sobre el progreso de su meta y sus aportes.</p>

        <div class="footer">
            <p>Este es un mensaje automático, por favor no lo responda.</p>
        </div>
    </div>
</body>

</html>
