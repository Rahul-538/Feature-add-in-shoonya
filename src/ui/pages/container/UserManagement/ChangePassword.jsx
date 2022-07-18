import {
  Card,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import themeDefault from "../../../theme/theme";
import { translate } from "../../../../config/localisation";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../component/common/Button";
import OutlinedTextField from "../../component/common/OutlinedTextField";
import DatasetStyle from "../../../styles/Dataset";
import { useDispatch, useSelector } from "react-redux";
import APITransport from "../../../../redux/actions/apitransport/apitransport";
import ChangePasswordAPI from "../../../../redux/actions/api/UserManagement/ChangePassword"
import Spinner from "../../component/common/Spinner";
import CustomizedSnackbars from "../../component/common/Snackbar"

const ChangePassword = (props) => {
  const navigate = useNavigate();
  const classes = DatasetStyle();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [snackbar, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
});

  const apiLoading = useSelector(state => state.apiStatus.loading);
  const apiMessage = useSelector(state => state.apiStatus.message);
  const apiError = useSelector(state => state.apiStatus.error);
  useEffect(() => {
    setSnackbarInfo({
        open: apiMessage ? true : false,
        variant: apiError ? "error" : "success",
        message: apiMessage ,
    });
}, [apiMessage, apiError])

  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading])

 
  const handleChangePassword = () => {
    setNewPassword("")
    setCurrentPassword("")
    const ChangePassword = {
      new_password: newPassword,
      current_password: currentPassword,

    }
    const projectObj = new ChangePasswordAPI(ChangePassword);
    dispatch(APITransport(projectObj));
  }


  const renderSnackBar = () => {
    return (
        <CustomizedSnackbars
            open={snackbar.open}
            handleClose={() =>
                setSnackbarInfo({ open: false, message: "", variant: "" })
            }
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            variant={snackbar.variant}
            message={[snackbar.message]}
        />
    );
};


  return (
    <ThemeProvider theme={themeDefault}>
      {loading && <Spinner />}
      {renderSnackBar()}
      <Grid container direction="row"  >
        <Card className={classes.workspaceCard}>
          <Grid item xs={2} sm={2} md={2} lg={2} xl={2}></Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} sx={{ pb: "6rem" }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="h2" gutterBottom component="div">
                Change Password
              </Typography>
            </Grid>

            <Grid container direction="row">
              <Grid
                items
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                className={classes.projectsettingGrid}
              >
                <Typography gutterBottom component="div" label="Required">
                  New Password:
                </Typography>
              </Grid>
              <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
                <OutlinedTextField
                  fullWidth
                  placeholder={translate("newPassword")}
                  type={values.showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                
                />
              </Grid>
            </Grid>

            <Grid
              className={classes.projectsettingGrid}
              items
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Typography gutterBottom component="div">
                Current Password:
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12} sm={12}>
              <OutlinedTextField
                fullWidth
                // placeholder={"Enter Current Password"}
                placeholder={translate("currentPassword")}
                type={values.showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Grid>
            <Grid
              className={classes.projectsettingGrid}
              item
              xs={12}
              md={12}
              lg={12}
              xl={12}
              sm={12}
              sx={{ mt: 2 }}
            >
              <Button
                label={"Submit"}
                onClick={handleChangePassword}
                disabled={ ( newPassword && currentPassword ) ? false : true}
              />
              <Button
                sx={{ ml: 2 }}
                label={"Cancel"}
                onClick={() => navigate(`/projects`)}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </ThemeProvider>
  );
};

export default ChangePassword;
