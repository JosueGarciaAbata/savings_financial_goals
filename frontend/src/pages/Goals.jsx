import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createGoal, updateGoal } from "../api/goalsApi"
import GoalForm from "../components/Goals/GoalForm"
import { Container, Typography, Alert, Paper } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import GoalsDetails from "./GoalsDetails"

export default function GoalsPage() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutationSave = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"])
      navigate("/dashboard/goals")
    },
    onError: () => setError("No se pudo crear la meta."),
  });

  const mutationUpdate = useMutation({
    mutationFn: updateGoal,
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"])
      navigate("/dashboard/goals")
    },
    onError: () => setError("No se pudo actualizar la meta."),
  });

  const [goalToEdit, setGoalToEdit] = useState(null)

  return (
    <Container maxWidth="xl" sx={{ mt: 8 }}>
      <Paper
        elevation={1}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          Crear nueva meta
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
            {error}
          </Alert>
        )}

        <GoalForm
          goal={goalToEdit}
          onSubmit={(formData) => {
            if (formData.goalId) {
              mutationUpdate.mutate(formData);
            } else {
              mutationSave.mutate(formData);
            }
          }}
          onCancel={() => setGoalToEdit(null)}
          isLoading={mutationSave.isPending}
        />
      </Paper>

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        sx={{
          mt: 4,
          textAlign: "center",
        }}
      >
        Tus metas
      </Typography>
      <GoalsDetails onEditGoal={setGoalToEdit}/>
    </Container>
  )
}
