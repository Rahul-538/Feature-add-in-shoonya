import CustomCard from "../../component/common/Card";
import { Grid ,Typography, Link,ThemeProvider,} from "@mui/material";
import Button from "../../component/common/Button";
import OutlinedTextField from "../../component/common/OutlinedTextField";
import { translate } from "../../../../config/localisation";
import LoginStyle from "../../../styles/loginStyle";
import themeDefault from '../../../theme/theme'
import { useNavigate } from "react-router-dom";
import AppInfo from "./AppInfo";

const forgotPassword = () => {
  const classes = LoginStyle();

 
  const TextFields = () => {
    return (
      <Grid container spacing={2}  style={{ marginTop: "2px",width:"70%" }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="body2"  className={classes.subTypo} >
          Enter you email address and we will send a link to reset your password.
        </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <OutlinedTextField
            fullWidth
            placeholder={translate("enterEmailId")}
          />
        </Grid>
      </Grid>
    );
  };

  const renderCardContent = () => (
    <CustomCard title={"Forgot password? "} cardContent={<TextFields />}>  
      <Grid container spacing={1} style={{width:"70%" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  textAlign={"right"}>
      <Typography >
            <Link  href="/" style={{fontSize:"14px" }} >
              {" "}
              Back to Login
            </Link>
          </Typography>
          </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
          <Button fullWidth label={"Send link"} />
        </Grid>
      </Grid>
    </CustomCard>
  );

  return (
    <ThemeProvider theme={themeDefault}>
    
   <Grid container  className={classes.loginGrid} >
     
  <Grid item xs={12} sm={3} md={3} lg={3} color = {"primary"} className={classes.appInfo}>
  
        <AppInfo/>
      </Grid>
   <Grid item xs={12} sm={9} md={9} lg={9} className={classes.parent} >
   {renderCardContent()}
   </Grid>
 </Grid>
 </ThemeProvider>
    
  );
};

export default forgotPassword;