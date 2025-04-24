import { useQuery } from "@tanstack/react-query"
import { getAllDashboard } from "./service/getAllDashboard"
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material"
import { Link } from "react-router-dom"
import EmptyState from "../components/EmptyState"

export default function DashboardHome() {
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
        </Paper>
      ))}
    </List>
  ) : (
    <EmptyState message="Aún no tienes metas registradas" />
  )
}
