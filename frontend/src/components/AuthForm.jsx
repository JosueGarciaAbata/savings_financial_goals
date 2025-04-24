import { TextField, Button, Stack } from "@mui/material";
import { useState } from "react";

export default function AuthForm({ onSubmit, isLoading, buttonLabel }) {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(form);
    }}>
      <Stack spacing={2} width={300}>
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <Button variant="contained" type="submit" disabled={isLoading}>
          {buttonLabel}
        </Button>
      </Stack>
    </form>
  );
}
