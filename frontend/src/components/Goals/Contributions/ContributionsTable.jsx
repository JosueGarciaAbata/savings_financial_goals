import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Tooltip,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteContribution } from "../../../api/goalsApi"
import { useState } from "react"
import { toast } from "react-toastify"

export default function ContributionsTable({ contributions }) {
  const total = contributions.reduce((sum, c) => sum + parseFloat(c.amount), 0)
  const [open, setOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState(null)
  // dentro del componente
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteContribution,
    onSuccess: () => {
      queryClient.invalidateQueries(["contributions"])
      toast.success("Aporte eliminado correctamente")
    },
  })

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

  return (
    <>
      <Paper sx={{ mt: 4, p: 3 }} elevation={0}>
        <Typography variant="h6" gutterBottom>
          Aportes realizados (Total: ${total.toFixed(2)})
        </Typography>

        {contributions.length === 0 ? (
          <Box sx={{ py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              No hay aportes registrados por el momento.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contributions.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.contribution_date}</TableCell>
                  <TableCell>${parseFloat(c.amount).toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Eliminar aporte">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleOpenModal(c.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>¿Eliminar aporte?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción no se puede deshacer. ¿Estás seguro de que deseas
            eliminar este aporte?
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
      </Dialog>{" "}
    </>
  )
}
