import { Box, Typography, Divider, Stack, Chip } from "@mui/material"
import EventBusyIcon from "@mui/icons-material/EventBusy"
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function GoalDetail({ data }) {
  console.log("la data en goalDetail es: ", data);
  const { goal, progress } = data
  const today = new Date().toISOString().split("T")[0];
  const overdue = goal.deadline < today;
  const progreso = Math.min(progress.progress_percentage, 100);
  const completed = Math.round(progreso) >= 100;


  let statusChip;

  if (completed) {
    statusChip = (
      <Chip
        label="Cumplida"
        color="success"
        icon={<CheckCircleIcon />}
        sx={{ fontWeight: "bold" }}
      />
    );
  } else if (overdue) {
    statusChip = (
      <Chip
        label="Vencida"
        color="error"
        icon={<EventBusyIcon />}
        sx={{ fontWeight: "bold" }}
      />
    );
  } else {
    statusChip = (
      <Chip
        label="En ejecución"
        color="warning"
        icon={<AccessTimeIcon />}
        sx={{ fontWeight: "bold" }}
      />
    );
  }

  return (
    <Box mb={4}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4" fontWeight="bold">
          {goal.name}
        </Typography>
        {statusChip}
      </Stack>
      {/* para poner mensaje 4. deteccion de inactividad */}
      <Stack spacing={1} sx={{ mt: 2 }}>
        <Typography variant="body1">
          <strong>Categoría:</strong> {goal.category.name}
        </Typography>
        <Typography variant="body1">
          <strong>Monto objetivo:</strong> $
          {parseFloat(goal.target_amount).toFixed(2)}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha límite:</strong> {goal.deadline}
        </Typography>{" "}
        <Typography variant="body1">
          <strong>Sugerencia semanal:</strong>{" "}
          {progress.weekly_suggestion
            ? `Te recomendamos ahorrar $${progress.weekly_suggestion} para alcanzar tu meta`
            : "No hay sugerencia de ahorro disponible en este momento."}{" "}
        </Typography>{" "}
        <Typography>
          <strong>Sugerencia mensual:</strong>{" "}
          {progress.weekly_suggestion
            ? `Te recomendamos ahorrar $${progress.monthly_suggestion} para alcanzar tu meta`
            : "No hay sugerencia de ahorro disponible en este momento."}
        </Typography>
        <Typography variant="body1">
          <strong>Semanas restantes:</strong>{" "}
          {Number(progress.weeks_remaining).toFixed(0)}
        </Typography>
        <Typography variant="body1">
          <strong>Meses restantes:</strong>{" "}
          {progress.months_remaining < 1
            ? "menos de un mes"
            : progress.months_remaining}
        </Typography>
      </Stack>

      <Divider sx={{ mt: 2 }} />
    </Box>
  )
}
