import { Route, Routes } from "react-router-dom"
import "./App.css"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import GoalsPage from "./pages/Goals"
import GoalPage from "./pages/GoalPage"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import NotFoundPage from "./components/NotFoundPage"

function App() {
  return (
    <>
      <Routes>
        {/* Rutas publicas */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="goals">
              <Route index element={<GoalsPage />} />
              <Route path=":id" element={<GoalPage />} />
            </Route>
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
