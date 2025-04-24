import { Box, Button, Stack, TextField, Alert, Paper } from "@mui/material";
import { useState } from "react";

export default function ContributionForm({ goalId, goalCreatedAt,onSubmit, isLoading }) {
  const [form, setForm] = useState({
    contribution_date: new Date().toISOString().split("T")[0],
    amount: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || parseFloat(form.amount) <= 0) {
      setError("El monto debe ser un número positivo.");
      return;
    }

    setError(null);
    onSubmit({ ...form, goal_id: goalId });
  };

  return (
    <Paper sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: 2 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            name="contribution_date"
            label="Fecha del aporte"
            type="date"
            value={form.contribution_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            inputProps={{
              min: goalCreatedAt.slice(0, 10), // yyyy-mm-dd desde la BD
              max: new Date().toISOString().split("T")[0], // hoy
            }}
          />
          <TextField
            name="amount"
            label="Monto"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ fontWeight: "bold", mt: 1 }}
          >
            {isLoading ? "Guardando..." : "Registrar aporte"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
