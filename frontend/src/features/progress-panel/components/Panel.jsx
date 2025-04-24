// src/features/progress-panel/components/Panel.jsx
import React from "react"
import GoalItem from "./GoalItem"
import ProgressBar from "./ProgressBar"
import SuggestionMessage from "./SuggestionMessage"

const goals = [
  {
    id: 1,
    name: "Viaje a Cusco",
    status: "en progreso",
    target_amount: 500,
    contributions: [
      { id: 1, contribution_date: "2025-04-05", amount: 50 },
      { id: 2, contribution_date: "2025-04-12", amount: 75 },
      { id: 3, contribution_date: "2025-04-19", amount: 100 },
    ],
    suggestions: [
      {
        id: 1,
        message:
          "Vas un poco retrasado. Para cumplir tu meta, intenta ahorrar $62.50 por semana.",
        calculated_at: "2025-04-21T10:00:00Z",
      },
    ],
  },
  {
    id: 2,
    name: "Laptop nueva",
    status: "en progreso",
    target_amount: 1000,
    contributions: [
      { id: 1, contribution_date: "2025-04-10", amount: 150 },
      { id: 2, contribution_date: "2025-04-20", amount: 200 },
    ],
    suggestions: [
      {
        id: 1,
        message:
          "Buen avance, pero podrías aumentar tu ritmo para cumplir en el tiempo estimado.",
        calculated_at: "2025-04-21T10:00:00Z",
      },
    ],
  },
]

const Panel = () => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Panel de Progreso</h2>

      {goals.map((goal) => (
        <div key={goal.id} className="border p-4 rounded-md shadow-sm">
          <GoalItem goal={goal} />
          <ProgressBar goal={goal} />
          <SuggestionMessage messages={goal.suggestions} />
        </div>
      ))}
    </div>
  )
}

export default Panel
