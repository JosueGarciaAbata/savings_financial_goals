import { Typography, Card, CardContent, Stack } from "@mui/material"

const GoalItem = ({ goal }) => {
  const diasRestantes = Math.ceil(
    (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  )

  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Estado:</strong> {goal.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Objetivo:</strong> ${goal.target_amount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Fecha límite:</strong>{" "}
            {diasRestantes >= 0
              ? `${diasRestantes} días restantes`
              : `${Math.abs(diasRestantes)} días de retraso`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default GoalItem
