import "./App.css"
import { Routes, Route } from "react-router-dom"
import GoalItem from "./features/progress-panel/components/GoalItem"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GoalItem />} />
      </Routes>
    </>
  )
}

export default App
