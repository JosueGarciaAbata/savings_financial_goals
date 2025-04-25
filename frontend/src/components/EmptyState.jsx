// src/components/EmptyState.jsx
import { Box, Typography } from "@mui/material"
import InboxIcon from "@mui/icons-material/Inbox"
import { Link } from "react-router-dom"

export default function EmptyState({ message = "No hay datos disponibles" }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 2,
        color: "text.secondary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <InboxIcon sx={{ fontSize: 48, mb: 1, color: "action.disabled" }} />
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <Typography variant="body2">
        <Link to="/dashboard/goals">
          Puedes comenzar creando tu primera meta 💡
        </Link>
      </Typography>
    </Box>
  )
}
