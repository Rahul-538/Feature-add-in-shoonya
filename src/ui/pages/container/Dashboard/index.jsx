import { Box, Button, Card, Divider, Grid, Link, Paper, styled, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { translate } from "../../../../config/localisation";
import themeDefault from "../../../theme/theme";
import Header from "../../component/common/Header";
import ProjectCard from "../../component/common/ProjectCard";
import UserCard from "../../component/common/UserCard";
import WorkspaceTable from "../../component/common/WorkspaceTable";
import dashboardStyle from "../../../styles/dashboard";
import { projectCardData } from "../../../../constants/projectCardData/projectCardData";

const Dashboard = () => {
    const classes = dashboardStyle();
    return (
        <React.Fragment>
            <Header />
            <Box sx={{ width: window.innerWidth*0.8, margin : "0 auto", pb : 5 }}>
                <Typography variant="h5" sx={{mt : 2, mb : 2}}>Projects</Typography>
                <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        projectCardData.map((el,i)=>{
                            return(
                                <Grid item xs={1} sm={2} md={3}
                                >
                                    <ProjectCard 
                                        classAssigned = {i % 2 === 0 ? classes.projectCardContainer2 : classes.projectCardContainer1}
                                        projectObj = {el}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Divider sx={{mt : 3, mb : 3}} />
                <Typography variant="h5" sx={{mt : 2, mb : 2}}>Visit Workspaces</Typography>
                <WorkspaceTable />
            </Box>
        </React.Fragment>
    )
}

export default Dashboard;