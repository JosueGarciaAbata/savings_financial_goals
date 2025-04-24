import React from "react"
import { Typography, Paper, Box } from "@mui/material"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

const ProgressBar = ({ goal }) => {
  const totalAportado = goal.contributions.reduce((sum, c) => sum + c.amount, 0)
  const progreso = (totalAportado / goal.target_amount) * 100

  const data = goal.contributions.map((c, index) => {
    const acumulado = goal.contributions
      .slice(0, index + 1)
      .reduce((s, a) => s + a.amount, 0)
    return {
      date: c.contribution_date,
      amount: acumulado,
    }
  })

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Meta: {goal.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Estado: {goal.status} | Objetivo: ${goal.target_amount.toFixed(2)}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Progreso: {Math.round(progreso)}%
      </Typography>

      <Box sx={{ mt: 3 }}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#1976d2"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  )
}

export default ProgressBar
