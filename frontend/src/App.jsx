import { Route, Routes } from "react-router-dom"
import "./App.css"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import GoalsPage from "./pages/Goals"
import GoalPage from "./pages/GoalPage"
import Panel from "./features/progress-panel/components/Panel"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="about" element={<About />} /> */}

        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {/* Dashboard principal */}
        <Route path="dashboard" element={<Dashboard />}>
          {/* Rutas dentro del dashboard */}
          <Route path="goals">
            <Route index element={<GoalsPage />} /> {/* /dashboard/goals */}
            <Route path=":id" element={<GoalPage />} />{" "}
            {/* /dashboard/goals/3 */}
            <Route path="progress" element={<Panel />} />{" "}
            {/* /dashboard/goals/progress */}
          </Route>
        </Route>

        {/* <Route index element={<ConcertsHome />} /> */}
        {/* <Route path=":city" element={<City />} /> */}
        {/* <Route path="trending" element={<Trending />} /> */}
      </Routes>
    </>
  )
}

export default App
