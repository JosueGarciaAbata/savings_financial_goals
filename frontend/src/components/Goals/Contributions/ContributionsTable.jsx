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
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteContribution } from "../../../api/goalsApi"

export default function ContributionsTable({ contributions }) {
  const total = contributions.reduce((sum, c) => sum + parseFloat(c.amount), 0)

  // dentro del componente
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteContribution,
    onSuccess: () => {
      queryClient.invalidateQueries(["contributions"])
    },
  })

  return (
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
                      onClick={() => deleteMutation.mutate(c.id)}
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
  )
}
