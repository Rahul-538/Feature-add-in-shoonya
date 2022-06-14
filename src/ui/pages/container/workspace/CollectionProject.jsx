import { Box, Card, Grid, Tab, Tabs, ThemeProvider, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../../component/common/Header";
import themeDefault from '../../../theme/theme'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from "../../component/common/Button"
import OutlinedTextField from "../../component/common/OutlinedTextField";
import DatasetStyle from "../../../styles/Dataset";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StandardTextField from "../../component/common/StandardTextField";
import NativeSelect from '@mui/material/NativeSelect';
import MenuItems from "../../component/common/MenuItems";

let data1 = [ { name: "Monolingual", value: "Monolingual" }]
let data2 = [ { name: "ContextualTranslationEditing", value: "ContextualTranslationEditing" }]

const AnnotationProject = (props) => {

    const classes = DatasetStyle();
    const [selectmenu, setselectmenu] = React.useState('');
    const [selectvalue, setselectvalue] = useState(false)
    const [domain, setDomain] = useState("")
    const [projecttype, setProjecttype] = useState("")
    const [sources, setSources] = useState("")
    const [samplingtype, setSamplingtype] = useState("")
    const [confirmselections, setConfirmselections] = useState(false)

    const handleChange = (event) => {
        setselectmenu(event.target.value);
    };

    const onSelectProjectType = (e) => {
        setProjecttype(e)
    }
    const onSelectsources = (e) => {
        setSources(e)
    }
    const onSelectSamplingType = (e) => {
        setSamplingtype(e)
    }
    

    const onSelectDemain = (e) => {
        console.log(e, "e")
        setDomain(e)
    }
    const onConfirmSelections =()=>{
        setConfirmselections(true)
    }
  
    return (
        <ThemeProvider theme={themeDefault}>

            {/* <Header /> */}
            {/* <Grid
                container
                direction='row'
                justifyContent='left'
                alignItems='left'


            >
                <Grid
                    item
                    xs={5}
                    sm={5}
                    md={5}
                    lg={5}
                    xl={5}
                > */}
                    <Grid
                        container
                        direction='row'
                       
                    >
                        <Grid
                            item
                            xs={2}
                            sm={2}
                            md={2}
                            lg={2}
                            xl={2}
                        ></Grid>
                        <Grid
                            item
                            xs={8}
                            sm={8}
                            md={8}
                            lg={8}
                            xl={8}
                        >

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                            >
                                <Typography variant="h2" gutterBottom component="div">

                                    Create a Project
                                </Typography>
                            </Grid>

                            <Grid
                                container
                                direction='row'
                               
                            >
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
                                        Title:
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <OutlinedTextField
                                        fullWidth


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
                                        Description:
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    sm={12}
                                >
                                    <OutlinedTextField
                                        fullWidth


                                    />
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
                                        Select a domain to work in:
                                    </Typography>
                                </Grid>
                                <Grid
                                
                                    item
                                    xs={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    sm={12}
                                >

                                    <MenuItems
                                        menuOptions={data1}
                                        handleChange={onSelectDemain}
                                        value={domain}
                                    />
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
                                {domain !== "" && (
                                    <Typography gutterBottom component="div">
                                       Select a Project Type:
                                    </Typography>)}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                lg={12}
                                xl={12}
                                sm={12}
                            >
                                {domain !== "" && (<MenuItems
                                    menuOptions={data2}
                                    handleChange={onSelectProjectType}
                                    value={projecttype}

                                />)}

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
                                {projecttype !== "" && (  <Typography gutterBottom component="div">
                                    Finalize Project
                                </Typography>)}
                              

                               
                                
                            </Grid>


                            <Grid
                                 className={classes.projectsettingGrid}
                                style={{ }}
                                item
                                xs={12}
                                md={12}
                                lg={12}
                                xl={12}
                                sm={12}
                            >
                                {projecttype !== "" && (<Button style={{ margin: "0px 20px 0px 0px", }} label={"Create Project"} />)}
                                {projecttype !== "" && (<Button label={"Cancel"} />)}
                                
                            </Grid>




                        </Grid>
                    </Grid>
                {/* </Grid>
            </Grid> */}
        </ThemeProvider>

    )
}

export default  AnnotationProject;