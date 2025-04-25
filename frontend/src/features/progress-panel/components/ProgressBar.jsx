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

const colorMap = {
  low: "#2e7d32",
  medium: "#ed6c02",
  high: "#d32f2f",
}

const ProgressBar = ({ data }) => {
  const { goal, progress } = data

  const color = colorMap[progress.risk_levels.weekly] || "success"
  const progreso = Math.min(progress.progress_percentage, 100)
  const totalAportado = parseFloat(progress.total_saved)

  const lineColor = color

  const chartData = goal.contributions.map((c, index) => {
    const acumulado = goal.contributions
      .slice(0, index + 1)
      .reduce((sum, a) => sum + parseFloat(a.amount), 0)

    return {
      date: c.contribution_date,
      amount: acumulado,
    }
  })

  return (
    <Card sx={{ mt: 2, boxShadow: "none" }}>
      <CardContent>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            <strong>Progreso:</strong> {Math.round(progreso)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progreso}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: color,
              },
            }}
          />
        </Box>

        {progress.risk_levels.weekly === "high" && (
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
            <LineChart data={chartData}>
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
