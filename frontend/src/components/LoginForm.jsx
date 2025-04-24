import { TextField, Button, Stack, Box } from "@mui/material";
import { useState } from "react";

export default function LoginForm({ onSubmit, isLoading, buttonLabel }) {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      style={{ width: "100%" }}
    >
      <Stack spacing={3}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          size="medium"
          variant="outlined"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          size="medium"
          variant="outlined"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <Box textAlign="center">
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
            size="large"
            sx={{ minWidth: 180, borderRadius: 2, fontWeight: "bold" }}
          >
            {buttonLabel}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
