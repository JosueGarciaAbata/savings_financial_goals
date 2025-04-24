import React from "react"
import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Alert,
  LinearProgress,
  Paper,
} from "@mui/material"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { differenceInDays, parseISO } from "date-fns"

const colorMap = {
  success: "#2e7d32",
  warning: "#ed6c02",
  error: "#d32f2f",
}

const ProgressBar = ({ goal }) => {
  let color = "success"

  const totalAportado = goal.contributions.reduce((sum, c) => sum + c.amount, 0)
  const startDate = parseISO(goal.created_at)
  const endDate = parseISO(goal.deadline)
  const today = new Date()

  const totalDays = differenceInDays(endDate, startDate)
  const elapsedDays = differenceInDays(today, startDate)
  const remainingDays = differenceInDays(endDate, today)

  const totalWeeks = totalDays / 7
  const elapsedWeeks = elapsedDays / 7
  const remainingWeeks = remainingDays / 7

  const savings = goal.target_amount
  const savingsExpectedPerWeek = savings / totalWeeks
  const savingsExpectedDate = savingsExpectedPerWeek * elapsedWeeks

  const savingsRemaining = savings - totalAportado
  const savingsNeededPerWeek = savingsRemaining / remainingWeeks

  // Meta en riesgo si el nuevo ritmo necesario es el doble del ritmo original
  const goalInRisk = savingsNeededPerWeek > 2 * savingsExpectedPerWeek

  // Lógica de color
  if (
    goalInRisk ||
    totalAportado < savingsExpectedDate - savingsExpectedPerWeek
  ) {
    color = "error" // rojo
  } else if (totalAportado < savingsExpectedDate) {
    color = "warning" // amarillo
  } else {
    color = "success" // verde
  }
  const lineColor = colorMap[color]

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
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            <strong>Progreso:</strong> {Math.round(progreso)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progreso}
            color={color}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>

        {goalInRisk && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Estás lejos del ritmo esperado. Considera hacer mayores aportes para
            alcanzar la meta a tiempo.
          </Alert>
        )}

        {totalAportado >= goal.target_amount && (
          <Alert severity="success" sx={{ mt: 2 }}>
            ¡Meta cumplida! Has alcanzado tu objetivo de ahorro.
          </Alert>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Evolución de tus aportes
        </Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="amount"
                stroke={lineColor}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </CardContent>
    </Card>
  )
}

export default ProgressBar
