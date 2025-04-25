import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
} from "@mui/material"

export default function ContributionsTable({ contributions }) {
  const total = contributions.reduce((sum, c) => sum + parseFloat(c.amount), 0)

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}
