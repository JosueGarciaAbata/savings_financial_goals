import { useMutation } from "@tanstack/react-query";
import { register } from "../api/authApi";
import AuthForm from "../components/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/login"); // Redirigir al login
    },
    onError: () => {
      setError("Error al registrarse");
    },
  });

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography component="h1" variant="h5" mb={2}>
          Crear cuenta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <RegisterForm
          onSubmit={(data) => mutation.mutate(data)}
          isLoading={mutation.isPending}
          buttonLabel={
            mutation.isPending ? <CircularProgress size={24} /> : "Registrarse"
          }
        />
        <Typography variant="body2" mt={2}>
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Inicia sesión
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
