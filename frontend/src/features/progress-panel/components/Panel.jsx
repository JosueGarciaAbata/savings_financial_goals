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

const Panel = ({ goal }) => {
  return (
    <>
      <Accordion
        key={goal.id}
        disableGutters
        elevation={0}
        sx={{ border: "1px solid #e0e0e0", mt: 3, borderRadius: 2 }}
      >
        <AccordionSummary>
          <Typography variant="subtitle1">Rendimiento</Typography>
        </AccordionSummary>
        <Box>
          <ProgressBar goal={goal} />
        </Box>
      </Accordion>
    </>
  )
}

export default Panel
