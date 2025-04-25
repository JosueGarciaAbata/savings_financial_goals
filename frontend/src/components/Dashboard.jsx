// src/layouts/DashboardLayout.jsx
import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Paper,
  Box,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { Outlet, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import EmptyState from "./EmptyState";
import { getUserData, logout } from "../api/authApi";
import UserMenu from "./UserMenu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableChartIcon from "@mui/icons-material/TableChart";

const drawerWidth = 240;

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setuserData(JSON.parse(storedUser));
    } else {
      const fetchUser = async () => {
        try {
          const userData = await getUserData();
          setuserData(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      };

      fetchUser();
    }
  }, []);

  const [openReports, setOpenReports] = useState(false);

  const handleToggleReports = () => {
    setOpenReports(!openReports);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar superior */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h6">
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Bienvenido 👋
              </Link>
            </Typography>

            <UserMenu
              userData={userData}
              onLogout={() => {
                logout();
                navigate("/login");
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {/* Metas */}
        <ListItemButton
          component={Link}
          to="/dashboard/goals"
          selected={location.pathname === "/dashboard/goals"}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Metas" />
        </ListItemButton>

        {/* Reportes - botón principal */}
        <ListItemButton onClick={handleToggleReports}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reportes" />
          {openReports ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* Subítems de reportes */}
        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/dashboard/reports/graficos"
              selected={location.pathname === "/dashboard/reports/graficos"}
            >
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary="Gráficos" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/dashboard/reports/tablas"
              selected={location.pathname === "/dashboard/reports/tablas"}
            >
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="Tablas" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
