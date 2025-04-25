import React from "react"
import { Button, Typography, Box } from "@mui/material"

const DownloadReportPage = () => {
  const downloadReport = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(
      "http://127.0.0.1:8000/api/reports/generalReport",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
      }
    )

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "general_report.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      console.error("Error al generar el reporte")
    }
  }

  const downloadReportCategory = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch("http://127.0.0.1:8000/api/reports/category", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/pdf",
      },
    })

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "report_category.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      console.error("Error al generar el reporte")
    }
  }

  const downloadReportByState = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch("http://127.0.0.1:8000/api/reports/state", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/pdf",
      },
    })

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "report_category.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      console.error("Error al generar el reporte")
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Mensaje antes del botón */}
      <Typography variant="h6" gutterBottom>
        Reporte por aportes de metas.
      </Typography>

      <Button onClick={downloadReport} variant="contained" color="primary">
        Descargar Reporte
      </Button>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Reporte por categorias.
      </Typography>

      <Button
        onClick={downloadReportCategory}
        variant="contained"
        color="primary"
      >
        Descargar Reporte
      </Button>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Reporte por estados.
      </Typography>

      <Button
        onClick={downloadReportByState}
        variant="contained"
        color="primary"
      >
        Descargar Reporte
      </Button>
    </Box>
  )
}

export default DownloadReportPage
