import {
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function appBarLabel(label) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

export const Navbar = () => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          {appBarLabel("Pizza Store")}
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
};
