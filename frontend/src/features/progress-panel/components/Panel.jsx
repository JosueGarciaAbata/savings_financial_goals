// src/features/progress-panel/components/Panel.jsx
// Aqui debe venir un id y con ese id buscar la meta y lo demás se mantiene.
import React from "react"
import GoalItem from "./GoalItem"
import ProgressBar from "./ProgressBar"
// import SuggestionMessage from "./SuggestionMessage"
import {
  Box,
  Paper,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"

const goals = [
  {
    id: 1,
    name: "Viaje a Cusco",
    status: "en progreso",
    target_amount: 500,
    deadline: "2025-04-30",
    created_at: "2025-04-07",
    contributions: [
      { id: 1, contribution_date: "2025-04-10", amount: 200 },
      { id: 1, contribution_date: "2025-04-17", amount: 100 },
    ],
    suggestions: [
      {
        id: 1,
        message:
          "Vas un poco retrasado. Para cumplir tu meta, intenta ahorrar $62.50 por semana.",
        calculated_at: "2025-04-21T10:00:00Z",
      },
    ],
  },
]

const Panel = () => {
  return (
    <Box sx={{ p: 4, bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: "center", mb: 3 }}
      >
        Panel de Progreso
      </Typography>

      <Stack spacing={4}>
        {goals.map((goal) => (
          <Accordion
            key={goal.id}
            disableGutters
            elevation={0}
            sx={{ mb: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}
          >
            <AccordionSummary>
              <Typography variant="subtitle1">
                🎯 Meta: <strong>{goal.name}</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GoalItem goal={goal} />
              <Box mt={2}>
                <ProgressBar goal={goal} />
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  )
}

export default Panel
