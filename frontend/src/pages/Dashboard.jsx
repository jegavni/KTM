import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import Members from "./Members";
import Events from "./Events";
import Transactions from "./Transactions";
import Minutes from "./Minutes";
import Profile from "../components/Profile";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";



import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 260;

function Dashboard({ auth, setAuth }) {
  const [activeTab, setActiveTab] = useState("Profile");
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setAuth(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    {
      text: "Profile",
      icon: <PersonIcon />,
    },
    {
      text: "Members",
      icon: <PeopleIcon />,
    },
    {
      text: "Events",
      icon: <EventIcon />,
    },
    {
      text: "Transactions",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      text: "Minutes",
      icon: <DescriptionIcon />,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Members":
        return <Members />;

      case "Events":
        return <Events />;

      case "Transactions":
        return <Transactions />;

      case "Minutes":
        return <Minutes />;

      case "Profile":
      default:
        return <Profile />;
    }
  };

  const drawerContent = (
    <>
      <Toolbar>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#42a5f5",
          }}
        >
          KETM
        </Typography>
      </Toolbar>

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={activeTab === item.text}
            onClick={() => {
              setActiveTab(item.text);
              setMobileOpen(false);
            }}
            sx={{
              mb: 1,
              borderRadius: 2,

              "&.Mui-selected": {
                bgcolor: "#1976d2",
                color: "#fff",
              },

              "&.Mui-selected:hover": {
                bgcolor: "#1565c0",
              },

              "&:hover": {
                bgcolor: "#0d1b2a",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  activeTab === item.text
                    ? "#fff"
                    : "#42a5f5",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#000",
      }}
    >
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            md: `${drawerWidth}px`,
          },
          bgcolor: "#0a0a0a",
          borderBottom: "1px solid #1976d2",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              color: "#42a5f5",
              fontWeight: "bold",
            }}
          >
            {activeTab}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#050505",
            color: "#42a5f5",
            borderRight: "1px solid #1976d2",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#050505",
            color: "#42a5f5",
            borderRight: "1px solid #1976d2",
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#000",
          color: "#42a5f5",
          p: { xs: 2, sm: 3, md: 4 },
          width: {
            xs: "100%",
            md: `calc(100% - ${drawerWidth}px)`,
          },
          minWidth: 0, // prevents flex item from overflowing horizontally
        }}
      >
        <Toolbar />

        <Box
          sx={{
            minHeight: "85vh",
            bgcolor: "#0a0a0a",
            borderRadius: 3,
            border: "1px solid #1976d2",
            p: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;