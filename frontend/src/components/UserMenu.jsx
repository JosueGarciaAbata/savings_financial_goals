import { Avatar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserMenu({ userData, onLogout }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        src={`/${userData?.profile_picture}`}
        alt={userData?.first_name}
        sx={{ width: 32, height: 32 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onLogout}
        sx={{ color: "#fff", textTransform: "none" }}
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
}
