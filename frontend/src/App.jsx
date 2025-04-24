import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import GoalsPage from "./pages/Goals";

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

        <Route path="concerts">
          {/* <Route index element={<ConcertsHome />} /> */}
          {/* <Route path=":city" element={<City />} /> */}
          {/* <Route path="trending" element={<Trending />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
