// src/layouts/DashboardLayout.jsx
import React from "react";
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
} from "@mui/material";
import { Outlet, Link, useLocation } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import EmptyState from "./EmptyState";

const drawerWidth = 240;

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar superior */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to="/dashboard">Bienvenido, Josué 👋</Link>
          </Typography>
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

          <ListItemButton
            component={Link}
            to="/dashboard/reports"
            selected={location.pathname === "/dashboard/reports"} // 🔧 esto también lo corregí
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reportes" />
          </ListItemButton>
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
