import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="about" element={<About />} /> */}

        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="goals" element={<GoalsPage/>} />
        <Route path="goal/:id" element={<GoalPage/>} />

        <Route path="/goals-progress" element={<Panel />} />
        <Route path="goals">
          {/* <Route index element={<ConcertsHome />} /> */}
          {/* <Route path=":city" element={<City />} /> */}
          {/* <Route path="trending" element={<Trending />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
