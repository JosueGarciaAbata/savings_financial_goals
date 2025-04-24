import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import AuthForm from "../components/AuthForm";
import {
  Box,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // Hook que te permite ejecutar funciones asíncronas (como peticiones POST) y manejar su estado (loading, success, error).
  const mutation = useMutation({
    mutationFn: login, // función que hace la peticion
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/dashboard"); // Redirigir después del login
    },
    onError: () => {
      setError("Error al iniciar sesión");
    },
  });

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography component="h1" variant="h5" mb={2}>
          Iniciar sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <AuthForm
          onSubmit={(data) => mutation.mutate(data)}
          isLoading={mutation.isPending}
          buttonLabel={
            mutation.isPending ? <CircularProgress size={24} /> : "Iniciar"
          }
        />
        <Typography variant="body2" mt={2}>
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Regístrate
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
