import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Container, CircularProgress, Alert, Paper, Box } from "@mui/material"
import { getGoal, getContributions, createContribution } from "../api/goalsApi"
import { Button } from "@mui/material"
import { useState } from "react"
import ContributionsTable from "../components/Goals/Contributions/ContributionsTable"
import GoalDetail from "../components/Goals/GoalDetail"
import AddIcon from "@mui/icons-material/Add"
import ContributionModal from "../components/Goals/Contributions/ContributionModal"
import Panel from "../features/progress-panel/components/Panel"

export default function GoalPage() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)

  const {
    data,
    isLoading: loadingGoal,
    error: goalError,
  } = useQuery({
    queryKey: ["goal", id],
    queryFn: () => getGoal(id),
  })

  console.log("Data", data)

  const {
    data: contributions,
    isLoading: loadingContributions,
    error: contributionsError,
  } = useQuery({
    queryKey: ["contributions"],
    queryFn: () => getContributions(id),
  })

  const mutation = useMutation({
    mutationFn: createContribution,
    onSuccess: () => {
      queryClient.invalidateQueries(["contributions"])
    },
  })
  

  if (loadingGoal || loadingContributions) return "Espera, cargando..."
  if (goalError || contributionsError)
    return <Alert severity="error">Error cargando datos.</Alert>

  const today = new Date().toISOString().split("T")[0]
  const overdue = data?.goal?.deadline < today

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Button
        variant="outlined"
        href="/dashboard/goals/"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        ← Volver a metas
      </Button>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <GoalDetail data={data}  />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          {!overdue && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              sx={{ fontWeight: "bold" }}
            >
              Añadir aporte
            </Button>
          )}
        </Box>
        <ContributionsTable contributions={contributions} />
        <ContributionModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          goalId={data.goal.id}
          goalCreatedAt={data.goal.created_at}
          onSubmit={mutation.mutate}
          isLoading={mutation.isPending}
        />

        <Panel data={data} />
      </Paper>
    </Container>
  )
}
