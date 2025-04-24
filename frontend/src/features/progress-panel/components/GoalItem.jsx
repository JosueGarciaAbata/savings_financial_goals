import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material"

const GoalItem = ({ goal }) => {
  return (
    <Box sx={{ p: 2, mb: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="subtitle1">
        <strong>Meta:</strong> {"Meta..."}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <strong>Estado:</strong> {"En progreso"}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <strong>Objetivo:</strong> {"Objetivo"}
      </Typography>
    </Box>
  )
}

export default GoalItem
