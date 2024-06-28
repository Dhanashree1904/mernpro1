import { Link } from "react-router-dom";
import { makeStyles } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExitToApp from "@mui/icons-material/ExitToApp";
import "./Navbar.css";

import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(3),
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
  },
  logout: {
    color: "#ff2450",
  },
}));

function NotLoggedIn() {
  const classes = useStyles();

  return [
    <Link key="login" className={classes.link} to="/login">
      <Button className={classes.button} color="inherit">
        Login
      </Button>
    </Link>,

    <Link key="register" className={classes.link} to="/register">
      <Button className={classes.button} color="inherit">
        Register
      </Button>
    </Link>,
  ];
}

function LoggedIn() {
  const classes = useStyles();
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return [
    <Link key="documents" className={classes.link} to="/documents">
      <Button className={classes.button} color="inherit">
        Documents
      </Button>
    </Link>,
    <IconButton key="logout" onClick={logout} aria-label="logout" className={classes.logout}>
      <ExitToApp fontSize="medium" />
    </IconButton>,
  ];
}

function Navbar() {
  const classes = useStyles();
  const loggedIn = Boolean(localStorage.getItem("id_token"));

  return (
    <ThemeProvider theme={outerTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DocMan
          </Typography>
          <Link className={classes.link} to="/">
            <Button className={classes.button} color="inherit">
              Home
            </Button>
          </Link>
          {!loggedIn && <NotLoggedIn />}
          {loggedIn && <LoggedIn />}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
