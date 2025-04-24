import {
    TextField,
    Button,
    Stack,
    Box,
    IconButton,
    Avatar,
    MenuItem,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
  
  export default function RegisterForm({ onSubmit, isLoading, buttonLabel }) {
    const [form, setForm] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      gender: "",
      brith_date: "",
      profile_picture: null,
    });
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setForm({
        ...form,
        [name]: files ? files[0] : value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(form);
    };
  
    return (
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack spacing={3}>
          {/* FOTO PERFIL */}
          <Box display="flex" justifyContent="center" position="relative">
            <Avatar
              src={form.profile_picture ? URL.createObjectURL(form.profile_picture) : ""}
              sx={{ width: 80, height: 80 }}
            />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: "calc(50% - 40px)",
                backgroundColor: "white",
                border: "1px solid #ccc",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <AddAPhotoIcon fontSize="small" />
              <input
                type="file"
                hidden
                name="profile_picture"
                accept="image/*"
                onChange={handleChange}
              />
            </IconButton>
          </Box>
  
          <TextField
            label="Nombre"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Apellido"
            name="last_name"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Género"
            name="gender"
            select
            value={form.gender}
            onChange={handleChange}
            required
          >
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="femenino">Femenino</MenuItem>
            {/* <MenuItem value="otro">Otro</MenuItem> */}
          </TextField>
          <TextField
            label="Fecha de nacimiento"
            name="brith_date"
            type="date"
            value={form.brith_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
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
  