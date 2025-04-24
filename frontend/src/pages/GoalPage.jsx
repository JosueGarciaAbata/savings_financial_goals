import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, CircularProgress, Alert, Paper, Box } from "@mui/material";
import { getGoal, getContributions, createContribution } from "../api/goalsApi";
import ContributionsTable from "../components/Goals/Contributions/ContributionsTable";
import GoalDetail from "../components/Goals/GoalDetail";
import ContributionForm from "../components/Goals/Contributions/ContributionForm";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import ContributionModal from "../components/Goals/Contributions/ContributionModal";

export default function GoalPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: goal,
    isLoading: loadingGoal,
    error: goalError,
  } = useQuery({
    queryKey: ["goal", id],
    queryFn: () => getGoal(id),
  });

  const {
    data: contributions = [],
    isLoading: loadingContributions,
    error: contributionsError,
  } = useQuery({
    queryKey: ["contributions", id],
    queryFn: () => getContributions(id),
  });

  const mutation = useMutation({
    mutationFn: createContribution,
    onSuccess: () => {
      queryClient.invalidateQueries(["contributions", id]);
    },
  });

  if (loadingGoal || loadingContributions) return <CircularProgress />;
  if (goalError || contributionsError)
    return <Alert severity="error">Error cargando datos.</Alert>;

  const today = new Date().toISOString().split("T")[0];
  const overdue = goal.deadline < today;

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <GoalDetail goal={goal} />
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
          goalId={goal.id}
          goalCreatedAt={goal.created_at}
          onSubmit={mutation.mutate}
          isLoading={mutation.isPending}
        />
      </Paper>
    </Container>
  );
}
