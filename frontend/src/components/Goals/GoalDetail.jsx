import { Box, Typography, Divider, Stack } from "@mui/material";
import EventBusyIcon from "@mui/icons-material/EventBusy";

export default function GoalDetail({ goal }) {
    const today = new Date().toISOString().split("T")[0];
    const overdue = goal.deadline < today;

  return (
    <Box mb={4}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4" fontWeight="bold">
          {goal.name}
        </Typography>
        {overdue && (
          <Chip
            label="Vencida"
            color="error"
            icon={<EventBusyIcon />}
            sx={{ fontWeight: "bold" }}
          />
        )}
      </Stack>
      {/* para poner mensaje 4. deteccion de inactividad */}
      <Stack spacing={1}>

      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">
          <strong>Categoría:</strong> {goal.category.name}
        </Typography>
        <Typography variant="body1">
          <strong>Monto objetivo:</strong> $
          {parseFloat(goal.target_amount).toFixed(2)}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha límite:</strong> {goal.deadline}
        </Typography>
      </Stack>

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
