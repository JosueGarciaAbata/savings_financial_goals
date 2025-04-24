import { Outlet } from "react-router-dom";
import { Container, Box, Typography, Paper } from "@mui/material";

export default function AuthLayout() {
  return (
    <Container maxWidth="sm" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ padding: 4, width: "100%", borderRadius: 2 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bienvenido
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ingresa o regístrate para continuar
          </Typography>
        </Box>
        <Outlet />
      </Paper>
    </Container>
  );
}
