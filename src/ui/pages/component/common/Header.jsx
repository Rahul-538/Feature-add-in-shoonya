import {
  AppBar,
  Avatar,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import headerStyle from "../../../styles/header";
import Logo from "../../../../assets/logo.svg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useDispatch, useSelector } from "react-redux";
import APITransport from "../../../../redux/actions/apitransport/apitransport";
import FetchLoggedInUserDataAPI from "../../../../redux/actions/api/UserManagement/FetchLoggedInUserData";
import { useNavigate } from "react-router-dom";
import CustomButton from "../common/Button";
import MobileNavbar from "./MobileNavbar";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@material-ui/core";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [activeproject, setActiveproject] = useState("activeButtonproject");
  const [activeworkspace, setActiveworkspace] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const classes = headerStyle();

  const loggedInUserData = useSelector(
    (state) => state.fetchLoggedInUserData.data
  );

  const getLoggedInUserData = () => {
    const loggedInUserObj = new FetchLoggedInUserDataAPI("me");
    dispatch(APITransport(loggedInUserObj));
  };

  useEffect(() => {
    getLoggedInUserData();
    console.log("loggedInUserData", loggedInUserData);
  }, []);

  // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const onLogoutClick = () => {
    handleCloseUserMenu();
    // ExpireSession();
    localStorage.clear();
    navigate("/");
  };

  // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenSettingsMenu = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };

  const handleRTLChange = (event) => {
    let style;
    if (event.target.checked) {
      localStorage.setItem("rtl", true);
      style = document.createElement("style");
      style.innerHTML = "input, textarea { direction: RTL; }";
      document.head.appendChild(style);
    } else {
      localStorage.setItem("rtl", false);
      style = document.createElement("style");
      style.innerHTML = "input, textarea { direction: unset; }";
      document.head.appendChild(style);
    }
  };

  const tabs = [
    <Typography variant="body1">
      <NavLink
        hidden={loggedInUserData.role === 1}
        to={
          loggedInUserData && loggedInUserData.organization
            ? `/my-organization/${loggedInUserData.organization.id}`
            : `/my-organization/1`
        }
        className={({ isActive }) =>
          isActive ? classes.highlightedMenu : classes.headerMenu
        }
        activeClassName={classes.highlightedMenu}
      >
        Organization
      </NavLink>
    </Typography>,
    <Typography variant="body1">
      <NavLink
        hidden={loggedInUserData.role === 1}
        to="/workspaces"
        className={({ isActive }) =>
          isActive ? classes.highlightedMenu : classes.headerMenu
        }
        activeClassName={classes.highlightedMenu}
      >
        Workspaces
      </NavLink>
    </Typography>,
    <Typography variant="body1">
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive ? classes.highlightedMenu : classes.headerMenu
        }
        activeClassName={classes.highlightedMenu}
      >
        Projects
      </NavLink>
    </Typography>,
    <Typography variant="body1">
      <NavLink
        to="/datasets"
        className={({ isActive }) =>
          isActive ? classes.highlightedMenu : classes.headerMenu
        }
        activeClassName={classes.highlightedMenu}
      >
        Datasets
      </NavLink>
    </Typography>,
  ];

  const userSettings = [
    {
      name: "My Profile",
      onclick: () => {
        handleCloseUserMenu();
        navigate("/profile");
      },
    },
    { name: "Logout", onclick: () => onLogoutClick() },
  ];

  const appSettings = [
    {
      name: "Transliteration",
      onclick: () => {
        navigate("/transliteration");
      },
    },
    {
      name: "Enable RTL-typing",
      control: (
        <Checkbox
          onChange={handleRTLChange}
          defaultChecked={localStorage.getItem("rtl") === "true"}
        />
      ),
    },
    {
      name: "Help",
      onclick: () => {},
    },
  ];

  return (
    <Grid container direction="row">
      <Box className={classes.parentContainer}>
        {isMobile ? (
          <MobileNavbar
            tabs={tabs}
            userSettings={userSettings}
            appSettings={appSettings}
            loggedInUserData={loggedInUserData}
          />
        ) : (
          <AppBar style={{ backgroundColor: "#ffffff" }}>
            <Toolbar className={classes.toolbar}>
              <Grid
                sx={{ flexGrow: 0, display: "inline-grid" }}
                xs={12}
                sm={12}
                md={3}
              >
                <Link to="/projects">
                  <img src={Logo} alt="logo" className={classes.headerLogo} />
                </Link>
              </Grid>
              <Grid
                container
                direction="row"
                // justifyContent="space-evenly"
                // spacing={0}
                columnGap={2}
                rowGap={2}
                xs={12}
                sm={12}
                md={8}
              >
                {tabs.map((tab) => tab)}
              </Grid>

              <Box sx={{ flexGrow: 0 }} xs={12} sm={12} md={2}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  sx={{ textAlign: "center", alignItems: "center" }}
                >
                  <Grid item xs={6} sm={6} md={3}>
                    <Tooltip title="Settings">
                      <IconButton onClick={handleOpenSettingsMenu}>
                        <SettingsOutlinedIcon
                          color="primary.dark"
                          fontSize="large"
                        />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6} sm={6} md={9}>
                    <Tooltip title="User Options">
                      <IconButton onClick={handleOpenUserMenu}>
                        <Avatar
                          alt="user_profile_pic"
                          variant="contained"
                          className={classes.avatar}
                        >
                          {loggedInUserData &&
                            loggedInUserData.username &&
                            loggedInUserData.username.split("")[0]}
                        </Avatar>
                        <Typography
                          variant="body1"
                          color="primary.dark"
                          sx={{ p: 0, ml: 1 }}
                        >
                          {loggedInUserData.username}
                        </Typography>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElSettings}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorElSettings)}
                  onClose={handleCloseSettingsMenu}
                >
                  {appSettings.map((setting) => (
                    <MenuItem key={setting} onClick={setting.onclick}>
                      {setting.control ? (
                        <FormControlLabel
                          control={setting.control}
                          label={setting.name}
                        />
                      ) : (
                        <Typography variant="body2" textAlign="center">
                          {setting.name}
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Typography variant="body2" sx={{ pl: "1rem", mt: 1 }}>
                    Signed in as <b>{loggedInUserData.last_name}</b>
                  </Typography>
                  <Divider sx={{ mb: 2, mt: 1 }} />
                  {userSettings.map((setting) => (
                    <MenuItem key={setting} onClick={setting.onclick}>
                      <Typography variant="body2" textAlign="center">
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
        )}
      </Box>
    </Grid>
  );
};

export default Header;