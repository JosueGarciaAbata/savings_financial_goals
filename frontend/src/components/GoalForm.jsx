import { TextField, Button, Stack, MenuItem, Box, Alert } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/goalsApi";

export default function GoalForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    nombre: "",
    categoriaId: "",
    monto: "",
    fechaLimite: "",
  });

  const [error, setError] = useState(null);

  const { data: categorias, isLoading: categoriasLoading } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategories,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.categoriaId || !form.monto || !form.fechaLimite) {
      return setError("Todos los campos son obligatorios.");
    }

    if (isNaN(form.monto) || parseFloat(form.monto) <= 0) {
      return setError("El monto debe ser un número positivo.");
    }

    const fechaActual = new Date().toISOString().split("T")[0];
    if (form.fechaLimite < fechaActual) {
      return setError("La fecha límite debe ser posterior a hoy.");
    }

    setError(null);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Nombre de la meta"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <TextField
          label="Categoría"
          name="categoriaId"
          select
          value={form.categoriaId}
          onChange={handleChange}
          required
          disabled={categoriasLoading}
        >
          {categorias?.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Monto objetivo"
          name="monto"
          type="number"
          value={form.monto}
          onChange={handleChange}
          required
        />

        <TextField
          label="Fecha límite"
          name="fechaLimite"
          type="date"
          value={form.fechaLimite}
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
            {isLoading ? "Guardando..." : "Crear Meta"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
