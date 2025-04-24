import { Box, Typography } from "@mui/material"

const GoalItem = () => {
  const goal = {
    name: "Viaje a Cusco",
    status: "en progreso",
    target_amount: 500,
    contributions: [
      { id: 1, contribution_date: "2025-04-05", amount: 50 },
      { id: 2, contribution_date: "2025-04-12", amount: 75 },
      { id: 3, contribution_date: "2025-04-19", amount: 100 },
    ],
    suggestions: [
      {
        id: 1,
        message:
          "Vas un poco retrasado. Para cumplir tu meta, intenta ahorrar $62.50 por semana.",
        calculated_at: "2025-04-21T10:00:00Z",
      },
    ],
  }

  return (
    <Box sx={{ p: 3, mb: 4 }}>
      <Typography variant="subtitle1">
        <strong>Meta:</strong> {goal.name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <strong>Estado:</strong> {goal.status}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <strong>Objetivo:</strong> {goal.target_amount}
      </Typography>
    </Box>
  )
}

export default GoalItem
