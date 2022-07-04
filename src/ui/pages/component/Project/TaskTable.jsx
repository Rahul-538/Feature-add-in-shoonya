// TaskTable

import MUIDataTable from "mui-datatables";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import GetTasksByProjectIdAPI from "../../../../redux/actions/api/Tasks/GetTasksByProjectId";
import CustomButton from '../common/Button';
import APITransport from '../../../../redux/actions/apitransport/apitransport';
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import DatasetStyle from "../../../styles/Dataset";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterList from "./FilterList";
import PullNewBatchAPI from "../../../../redux/actions/api/Tasks/PullNewBatch";
import GetNextTaskAPI from "../../../../redux/actions/api/Tasks/GetNextTask";
import DeallocateTasksAPI from "../../../../redux/actions/api/Tasks/DeallocateTasks";
import GetProjectDetailsAPI from "../../../../redux/actions/api/ProjectDetails/GetProjectDetails";
import CustomizedSnackbars from "../../component/common/Snackbar";
import SearchIcon from '@mui/icons-material/Search';
import SearchPopup from "./SearchPopup";
import { snakeToTitleCase } from "../../../../utils/utils";
import ColumnList from "../common/ColumnList";
import Spinner from "../../component/common/Spinner"

const excludeSearch = ["status", "actions", "output_text"];
const excludeCols = ["context", "input_language", "output_language"];

const TaskTable = () => {
    const classes = DatasetStyle();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const taskList = useSelector(state => state.getTasksByProjectId.data.results);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [currentRowPerPage, setCurrentRowPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);
    const filterId = popoverOpen ? "simple-popover" : undefined;
    const getProjectUsers = useSelector(state=>state.getProjectDetails.data.users)
    const [selectedFilters, setsSelectedFilters] = useState({task_status: "unlabeled", user_filter: -1});
    const ProjectDetails = useSelector(state => state.getProjectDetails.data);
    const userDetails = useSelector((state) => state.fetchLoggedInUserData.data);
    const NextTask = useSelector(state => state.getNextTask.data);
    const [tasks, setTasks] = useState([]);
    const [pullSize, setPullSize] = useState();
    const [pullDisabled, setPullDisabled] = useState("");
    const [deallocateDisabled, setDeallocateDisabled] = useState("");
    const apiLoading = useSelector(state => state.apiStatus.loading);
    const [searchAnchor, setSearchAnchor] = useState(null);
    const searchOpen = Boolean(searchAnchor);
    const [searchedCol, setSearchedCol] = useState();
    const [snackbar, setSnackbarInfo] = useState({
        open: false,
        message: "",
        variant: "success",
      });
    const [deallocateDialog, setDeallocateDialog] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [columns, setColumns] = useState([]);
    const [labellingStarted, setLabellingStarted] = useState(false);
    const [loading, setLoading] = useState(false);

    const filterData = {
        Status : ["unlabeled", "skipped", "accepted", "draft"],
        Annotators : getProjectUsers?.length > 0 ? getProjectUsers.filter((member) => member.role === 1).map((el,i)=>{
            return {
                label: el.username,
                value: el.id
            }
        }) : []
    }

    const getTaskListData = () => {
        const taskObj = new GetTasksByProjectIdAPI(id, currentPageNumber, currentRowPerPage, selectedFilters);
        dispatch(APITransport(taskObj));
    }

    const fetchNewTasks = async() => {
        const batchObj = new PullNewBatchAPI(id, pullSize);
        const res = await fetch(batchObj.apiEndPoint(), {
            method: "POST",
            body: JSON.stringify(batchObj.getBody()),
            headers: batchObj.getHeaders().headers,
          });
        const resp = await res.json();
        if (res.ok) {
            setSnackbarInfo({
                open: true,
                message: resp?.message,
                variant: "success",
            })
            if (selectedFilters.task_status === "unlabeled" && currentPageNumber === 1) {
                getTaskListData();
            } else {
                setsSelectedFilters({...selectedFilters, task_status: "unlabeled"});
                setCurrentPageNumber(1);
            }
            const projectObj = new GetProjectDetailsAPI(id);
            dispatch(APITransport(projectObj));
        } else {
            setSnackbarInfo({
                open: true,
                message: resp?.message,
                variant: "error",
            })
        }
    }

    const unassignTasks = async () => {
        setDeallocateDialog(false);
        const deallocateObj = new DeallocateTasksAPI(id);
        const res = await fetch(deallocateObj.apiEndPoint(), {
            method: "GET",
            body: JSON.stringify(deallocateObj.getBody()),
            headers: deallocateObj.getHeaders().headers,
          });
        const resp = await res.json();
        if (res.ok) {
            setSnackbarInfo({
                open: true,
                message: resp?.message,
                variant: "success",
            })
            if (selectedFilters.task_status === "unlabeled" && currentPageNumber === 1) {
                getTaskListData();
            } else {
                setsSelectedFilters({...selectedFilters, task_status: "unlabeled"});
                setCurrentPageNumber(1);
            }
            const projectObj = new GetProjectDetailsAPI(id);
            dispatch(APITransport(projectObj));
        } else {
            setSnackbarInfo({
                open: true,
                message: resp?.message,
                variant: "error",
            })
        }
    }

    const labelAllTasks = () => {
        let search_filters = Object.keys(selectedFilters).filter(key => key.startsWith("search_")).reduce((acc, curr) => {
            acc[curr] = selectedFilters[curr];
            return acc;
        }, {});
        localStorage.setItem("labellingMode", selectedFilters.task_status);
        localStorage.setItem("searchFilters", JSON.stringify(search_filters));
        localStorage.setItem("labelAll", true);
        const getNextTaskObj = new GetNextTaskAPI(id);
        dispatch(APITransport(getNextTaskObj));
        setLabellingStarted(true);
    };

    const totalTaskCount = useSelector(state => state.getTasksByProjectId.data.count);

    const handleShowSearch = (col, event) => {
        setSearchAnchor(event.currentTarget);
        setSearchedCol(col);
    }

    const customColumnHead = (col) => {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    columnGap: "10px",
                    flexGrow: "1",
                    alignItems: "center",
                }}
            >
                {col.label}
                {!excludeSearch.includes(col.name) && <IconButton sx={{borderRadius: "100%"}} onClick={(e) => handleShowSearch(col.name, e)}>
                    <SearchIcon id={col.name + "_btn"}/>
                </IconButton>}
            </Box>
        );
    }

    useEffect(() => {
        setLoading(apiLoading);
    }, [apiLoading]);

    useEffect(() => {
        getTaskListData();
    }, [currentPageNumber, currentRowPerPage]);

    useEffect(() => {
        if (currentPageNumber !== 1) {
            setCurrentPageNumber(1);
        } else {
            getTaskListData();
        }
    }, [selectedFilters]);

    useEffect(() => {
        if (taskList?.length > 0 && taskList[0]?.data) {
            const data = taskList.map((el) => {
                let row = [
                    el.id
                ]
                row.push(...Object.keys(el.data).filter((key) => !excludeCols.includes(key)).map((key) => el.data[key]));
                taskList[0].task_status && row.push(el.task_status);
                row.push(<Link to={`task/${el.id}`} className={classes.link}>
                            <CustomButton
                                onClick={() => {console.log("task id === ", el.id); localStorage.removeItem("labelAll")}}
                                sx={{ p: 1, borderRadius: 2 }}
                                label={<Typography sx={{color : "#FFFFFF"}} variant="body2">
                                    {ProjectDetails.project_mode === "Annotation" ? "Annotate" : "Edit"}
                                </Typography>} />
                        </Link>);
                return row;
            })
            let colList = ["id"];
            colList.push(...Object.keys(taskList[0].data).filter(el => !excludeCols.includes(el)));
            taskList[0].task_status && colList.push("status");
            colList.push("actions");
            const cols = colList.map((col) => {
                return {
                    name: col,
                    label: snakeToTitleCase(col),
                    options: {
                        filter: false,
                        sort: false,
                        align: "center",
                        customHeadLabelRender: customColumnHead,
                    }
                }
            });
            setColumns(cols);
            setSelectedColumns(colList);
            setTasks(data);
        } else {
            setTasks([]);
        }
    }, [taskList, ProjectDetails.project_mode]);


    useEffect(() => {
        const newCols = columns.map(col => {
            col.options.display = selectedColumns.includes(col.name) ? "true" : "false";
            return col;
        });
        setColumns(newCols);
        console.log("columns", newCols)
    }, [selectedColumns]);

    useEffect(() => {
        if (ProjectDetails) {
            if (ProjectDetails.unassigned_task_count === 0)
                setPullDisabled("No more unassigned tasks in this project")
            else if (pullDisabled === "No more unassigned tasks in this project")
                setPullDisabled("")
            ProjectDetails.frozen_users?.forEach((user) => {
                if (user.id === userDetails?.id) 
                    setPullDisabled("You're no more a part of this project");
                else if (pullDisabled === "You're no more a part of this project")
                    setPullDisabled("");
            })
            setPullSize(ProjectDetails.tasks_pull_count_per_batch*0.5);
        }
    }, [ProjectDetails.unassigned_task_count, ProjectDetails.frozen_users, userDetails])

    useEffect(() => {
        if (totalTaskCount && selectedFilters.task_status === "unlabeled" && totalTaskCount >=ProjectDetails?.max_pending_tasks_per_user && Object.keys(selectedFilters).filter(key => key.startsWith("search_")) === []) {
            setPullDisabled("You have too many unlabeled tasks")
        } else if (pullDisabled === "You have too many unlabeled tasks") {
            setPullDisabled("")
        }
    }, [totalTaskCount, ProjectDetails.max_pending_tasks_per_user, selectedFilters])

    useEffect(() => {
        if (selectedFilters.task_status === "unlabeled" && totalTaskCount === 0) {
            setDeallocateDisabled("No more tasks to deallocate")
        } else if (deallocateDisabled === "No more tasks to deallocate") {
            setDeallocateDisabled("")
        }
    }, [totalTaskCount, selectedFilters.task_status])

    useEffect(() => {
        if(labellingStarted && Object.keys(NextTask).length > 0) {
          navigate(`/projects/${id}/task/${NextTask.id}`);
        }
        //TODO: display no more tasks message
      }, [NextTask]);

    const handleShowFilter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearchClose = () => {
        setSearchAnchor(null);
    }

    const renderToolBar = () => {
        const buttonSXStyle = { borderRadius: 2, margin: 2 }
        return (
            <Box className={classes.filterToolbarContainer}>
                {userDetails?.role!==1 && <FormControl size="small" sx={{width: "30%", minWidth: "100px"}}>
                    <InputLabel id="annotator-filter-label" sx={{fontSize: "16px"}}>Filter by Annotator</InputLabel>
                    <Select
                    labelId="annotator-filter-label"
                    id="annotator-filter"
                    value={selectedFilters.user_filter}
                    label="Filter by Annotator"
                    onChange={(e) => setsSelectedFilters({...selectedFilters, user_filter: e.target.value})}
                    sx={{fontSize: "16px"}}
                    >
                    <MenuItem value={-1}>All</MenuItem>
                    {filterData.Annotators.map((el, i) => (
                        <MenuItem value={el.value}>{el.label}</MenuItem>
                    ))}
                    </Select>
                </FormControl>}
                <ColumnList
                    columns={columns}
                    setColumns={setSelectedColumns}
                    selectedColumns={selectedColumns}
                />
                <Tooltip title="Filter Table">
                    <Button onClick={handleShowFilter}>
                        <FilterListIcon />
                    </Button>
                </Tooltip>
            </Box>
        )
    }

    const renderSnackBar = () => {
        return (
          <CustomizedSnackbars
            open={snackbar.open}
            handleClose={() =>
              setSnackbarInfo({ open: false, message: "", variant: "" })
            }
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={snackbar.variant}
            message={snackbar.message}
            autoHideDuration={2000}
          />
        );
      };

    const options = {
        count: totalTaskCount,
        rowsPerPage: currentRowPerPage,
        page: currentPageNumber - 1,
        rowsPerPageOptions: [10, 25, 50, 100],
        textLabels: {
            pagination: {
                next: "Next >",
                previous: "< Previous",
                rowsPerPage: "currentRowPerPage",
                displayRows: "OF"
            }
        },
        onChangePage: (currentPage) => { 
            currentPage + 1 > currentPageNumber && setCurrentPageNumber(currentPage + 1);
        },
        onChangeRowsPerPage: (rowPerPageCount) => { 
            setCurrentPageNumber(1); 
            setCurrentRowPerPage(rowPerPageCount); 
            console.log("rowPerPageCount", rowPerPageCount) 
        },
        filterType: 'checkbox',
        selectableRows: "none",
        download: false,
        filter: false,
        print: false,
        search: false,
        viewColumns: false,
        textLabels: {
            body: {
                noMatch: "No records ",
            },
            toolbar: {
                search: "Search",
                viewColumns: "View Column",
            },
            pagination: {
                rowsPerPage: "Rows per page",
            },
            options: { sortDirection: "desc" },
        },
        customToolbar: renderToolBar,
    };

    return (
        <Fragment>
        {userDetails?.role === 1 && (ProjectDetails.project_mode === "Annotation" ? (
            ProjectDetails.is_published ? (
                <Box
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    marginBottom: "1%",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                }}
                >
                <Tooltip title={deallocateDisabled}>
                    <Box sx={{width: '24%', mr:"1%", mb: 3}}>
                        <CustomButton 
                            sx={{ p: 1, width: '100%', borderRadius: 2, margin: "auto" }} 
                            label={"De-allocate Tasks"}
                            onClick={() => setDeallocateDialog(true)}
                            disabled={deallocateDisabled}
                            color={"warning"}
                        />
                    </Box>
                </Tooltip>
                <Dialog
                    open={deallocateDialog}
                    onClose={() => setDeallocateDialog(false)}
                    aria-labelledby="deallocate-dialog-title"
                    aria-describedby="deallocate-dialog-description"
                >
                    <DialogTitle id="deallocate-dialog-title">
                    {"De-allocate Tasks?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        All unlabeled tasks will be de-allocated from this project.
                        Please be careful as this action cannot be undone.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setDeallocateDialog(false)} variant="outlined" color="error">Cancel</Button>
                    <Button onClick={unassignTasks} variant="contained" color="error" autoFocus>
                        Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
                <FormControl size="small" sx={{width: "18%", ml: "1%", mr:"1%", mb: 3}}>
                    <InputLabel id="pull-select-label" sx={{fontSize: "16px"}}>Pull Size</InputLabel>
                    <Select
                    labelId="pull-select-label"
                    id="pull-select"
                    value={pullSize}
                    label="Pull Size"
                    onChange={(e) => setPullSize(e.target.value)}
                    disabled={pullDisabled}
                    sx={{fontSize: "16px"}}
                    >
                    <MenuItem value={ProjectDetails?.tasks_pull_count_per_batch*0.5}>{ProjectDetails?.tasks_pull_count_per_batch*0.5}</MenuItem>
                    <MenuItem value={ProjectDetails?.tasks_pull_count_per_batch}>{ProjectDetails?.tasks_pull_count_per_batch}</MenuItem>
                    <MenuItem value={ProjectDetails?.tasks_pull_count_per_batch*1.5}>{ProjectDetails?.tasks_pull_count_per_batch*1.5}</MenuItem>
                    </Select>
                </FormControl>
                <Tooltip title={pullDisabled}>
                    <Box sx={{width: '26%', ml: "1%", mr:"1%", mb: 3}}>
                        <CustomButton 
                            sx={{ p: 1, width: '100%', borderRadius: 2, margin: "auto" }} 
                            label={"Pull New Batch"} 
                            disabled={pullDisabled} 
                            onClick={fetchNewTasks} 
                        />
                    </Box>
                </Tooltip>
                <CustomButton 
                    sx={{ p: 1, width: '26%', borderRadius: 2, mb: 3, ml: "1%" }} 
                    label={"Start Labelling Now"}
                    onClick={labelAllTasks}
                />
                </Box>
            ) : (
                <Button
                type="primary"
                style={{
                    width: "100%",
                    marginBottom: "1%",
                    marginRight: "1%",
                }}
                >
                Disabled
                </Button>
            )
            ) : ( 
                <CustomButton sx={{ p: 1, width: '98%', borderRadius: 2, mb: 3, ml: "1%", mr:"1%" }} label={"Add New Item"} />
            ))}
            <MUIDataTable
                title={""}
                data={tasks}
                columns={columns}
                options={options}
            // filter={false}
            />
            {searchOpen && <SearchPopup 
                open={searchOpen}
                anchorEl={searchAnchor}
                handleClose={handleSearchClose}
                updateFilters={setsSelectedFilters}
                currentFilters={selectedFilters}
                searchedCol={searchedCol}
            />}
            {popoverOpen && (
                <FilterList
                    id={filterId}
                    open={popoverOpen}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    filterStatusData={filterData}
                    updateFilters={setsSelectedFilters}
                    currentFilters={selectedFilters}
                />
            )}
            {renderSnackBar()}
            {loading && <Spinner /> }
        </Fragment>
    )
}

export default TaskTable;