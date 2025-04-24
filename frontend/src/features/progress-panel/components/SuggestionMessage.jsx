// components/SuggestionMessage.jsx
import React from "react"
import { Alert, Box } from "@mui/material"

const SuggestionMessage = ({ messages }) => {
  if (!messages) return null

  return (
    <Box sx={{ mt: 2 }}>
      {messages.map((message) => (
        <Alert key={message.id} severity="info" sx={{ mb: 1 }}>
          {message.message}
        </Alert>
      ))}
    </Box>
  )
}

export default SuggestionMessage
