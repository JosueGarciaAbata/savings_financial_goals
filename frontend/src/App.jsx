import { Route, Routes } from "react-router-dom"
import "./App.css"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ContributionList from "./features/progress-panel/components/ContributionList"

function App() {
  return (
    <>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="about" element={<About />} /> */}

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/goals" element={<ContributionList />} />
        <Route path="goals">
          {/* <Route index element={<ConcertsHome />} /> */}
          {/* <Route path=":city" element={<City />} /> */}
          {/* <Route path="trending" element={<Trending />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
