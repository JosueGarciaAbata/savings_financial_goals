import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { BrowserRouter } from "react-router-dom"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
})

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
)
