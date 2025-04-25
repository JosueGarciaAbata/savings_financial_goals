import React from "react"
import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate("/")
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Página no encontrada
      </Typography>
      <Button variant="contained" onClick={handleRedirect} sx={{ mt: 2 }}>
        Volver al inicio
      </Button>
    </Box>
  )
}

export default NotFoundPage
