import { useMutation } from "@tanstack/react-query";
import { createGoal } from "../api/goalsApi";
import GoalForm from "../components/GoalForm";
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GoalsPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => setError("No se pudo crear la meta."),
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mb={2}>
          Crear nueva meta
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <GoalForm
          onSubmit={(data) => mutation.mutate(data)}
          isLoading={mutation.isPending}
        />
      </Box>
    </Container>
  );
}
