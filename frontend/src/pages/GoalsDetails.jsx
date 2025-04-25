import { useQuery } from "@tanstack/react-query"
import { getAllDashboard } from "../components/service/getAllDashboard"
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material"
import { Link } from "react-router-dom"
import EmptyState from "../components/EmptyState"

export default function GoalsDetails() {
  const {
    data: goals = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: getAllDashboard,
  })

  if (isLoading) return <Typography>Cargando...</Typography>
  if (error) return <Typography>Error al cargar las metas</Typography>

  return goals.length > 0 ? (
    <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {goals.map((goal) => (
        <Paper key={goal.id} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Link al detalle */}
            <Box sx={{ flexGrow: 1 }}>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/dashboard/goals/${goal.id}`}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="primary"
                      >
                        {goal.name}
                      </Typography>
                    }
                    secondary="Haz clic para ver detalles"
                  />
                </ListItemButton>
              </ListItem>
            </Box>

            {/* Botones a la derecha */}
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => console.log("Actualizar", goal.id)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => console.log("Eliminar", goal.id)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Paper>
      ))}
    </List>
  ) : (
    <EmptyState message="Aún no tienes metas registradas" />
  )
}
