<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Recordatorio de Meta</title>
</head>

<body>
    <h2>¡Hola!</h2>
    <p>Te recordamos que tu meta <strong>{{ $goal['name'] }}</strong> tiene como fecha límite el
        <strong>{{ $goal['deadline'] }}</strong>.
    </p>
    <p>Lleva ahorrado: <strong>${{ $goal['saved'] }} / ${{ $goal['target'] }}</strong>.</p>
    <p>¡Sigue así! 🎯</p>
</body>

</html>
