import { TextField, Button, Stack, MenuItem, Box, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/goalsApi";

export default function GoalForm({ onSubmit, isLoading, goal, onCancel }) {
  const initialForm = {
    goalId: "",
    name: "",
    category_id: "",
    target_amount: "",
    deadline: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (goal) {
      setForm({
        goalId: goal.id,
        name: goal.name,
        category_id: goal.category_id,
        target_amount: goal.target_amount,
        deadline: goal.deadline,
      });
    }
  }, [goal]);

  const [error, setError] = useState(null);

  const { data: categories, isLoading: categoriasLoading } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategories,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.category_id ||
      !form.target_amount ||
      !form.deadline
    ) {
      return setError("Todos los campos son obligatorios.");
    }

    if (isNaN(form.target_amount) || parseFloat(form.target_amount) <= 0) {
      return setError("El monto debe ser un número positivo.");
    }

    const curDate = new Date().toISOString().split("T")[0];
    if (form.deadline < curDate) {
      return setError("La fecha límite debe ser posterior a hoy.");
    }

    setError(null);
    onSubmit(form);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Nombre de la meta"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Categoría"
          name="category_id"
          select
          value={form.category_id}
          onChange={handleChange}
          required
          disabled={categoriasLoading}
        >
          {categoriasLoading ? (
            <MenuItem disabled>Cargando categorías...</MenuItem>
          ) : categories?.length > 0 ? (
            categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No hay categorías</MenuItem>
          )}
        </TextField>

        <TextField
          label="Monto objetivo"
          name="target_amount"
          type="number"
          value={form.target_amount}
          onChange={handleChange}
          required
        />

        <TextField
          label="Fecha límite"
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          inputProps={{
            min: new Date().toISOString().split("T")[0], // 🔒 solo hoy o fechas futuras
          }}
        />

        <Box textAlign="center">
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : !goal ? "Crear Meta" : "Guardar Meta"}
          </Button>
          {goal && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setForm(initialForm);
                onCancel();
              }}
            >
              Cancelar edición
            </Button>
          )}
        </Box>
      </Stack>
    </form>
  );
}
