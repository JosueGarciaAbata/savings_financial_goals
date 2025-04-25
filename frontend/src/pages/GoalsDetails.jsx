import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { Link } from "react-router-dom"
import EmptyState from "../components/EmptyState"
import { getAllDashboard } from "../components/service/getAllDashboard"
import { deleteGoal } from "../api/goalsApi"
import { useState } from "react"

export default function GoalsDetails({ onEditGoal }) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState(null)

  const {
    data: goals = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: getAllDashboard,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"])
    },
  })

  if (isLoading) return "Cargando..."
  if (error) return "Error al cargar las metas."

  const handleOpenModal = (goalId) => {
    setGoalToDelete(goalId)
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
    setGoalToDelete(null)
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate(goalToDelete)
    handleCloseModal()
  }

  return goals.length > 0 ? (
    <>
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
                  onClick={() => onEditGoal(goal)}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleOpenModal(goal.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          </Paper>
        ))}
      </List>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>¿Eliminar meta?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción no se puede deshacer. ¿Estás seguro de que deseas
            eliminar esta meta?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <EmptyState message="Aún no tienes metas registradas" />
  )
}
