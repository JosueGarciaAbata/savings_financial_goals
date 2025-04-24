// src/layouts/DashboardLayout.jsx
import React from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
} from "@mui/material"
import { Outlet, Link, useLocation } from "react-router-dom"
import AssignmentIcon from "@mui/icons-material/Assignment"
import BarChartIcon from "@mui/icons-material/BarChart"
import { getAllDashboard } from "./service/getAllDashboard"
import EmptyState from "./EmptyState"

const drawerWidth = 240

const DashboardLayout = () => {
  const location = useLocation()

  const data = getAllDashboard()

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
          <ListItem
            button
            component={Link}
            to="/dashboard/goals"
            selected={location.pathname === "/dashboard/goals"}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Metas" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/dashboard/reports"
            selected={location.pathname === "/reports"}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reportes" />
          </ListItem>
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />

        {data.length > 0 ? data.map() : <EmptyState />}
      </Box>
    </Box>
  )
}

export default DashboardLayout
