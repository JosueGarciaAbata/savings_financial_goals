import React from "react"
import GoalItem from "./GoalItem"
import ProgressBar from "./ProgressBar"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Box,
  Paper,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"

const Panel = ({ data }) => {
  const { goal } = data

  return (
    <>
      <Accordion key={goal.id} disableGutters elevation={0} sx={{ mt: 3 }}>
        <Box>
          <ProgressBar data={data} />
        </Box>
      </Accordion>
    </>
  )
}

export default Panel
