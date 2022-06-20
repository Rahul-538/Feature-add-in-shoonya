import React, { useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Typography,
  Popover,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import { translate } from "../../../../config/localisation";
import DatasetStyle from "../../../styles/Dataset";
// import { translate } from "../../../../assets/localisation";

const FilterList = (props) => {
  const classes = DatasetStyle();
  const { filterStatusData } = props;
  const [selectedStatus, setSelectedStatus] = useState(props.currentFilters.task_status);
  const [selectAnnotator, setSelectAnnotator] = useState("All");

  // const [selectedType, setSelectedType] = useState(selectedFilter.Annotators);
  // const [selectedStatus, setSelectedStatus] = useState(selectedFilter.status);
  // const handleDatasetChange = (e) => {
  //   if (e.target.checked) setSelectedType([...selectedType, e.target.name]);
  //   else {
  //     const selected = Object.assign([], selectedType);
  //     const index = selected.indexOf(e.target.name);

  //     if (index > -1) {
  //       selected.splice(index, 1);
  //       setSelectedType(selected);
  //     }
  //   }
  // };
  const handleStatusChange = (e) => {
    props.updateFilters({
      task_status: selectedStatus,
    })
    props.handleClose();
  };
  // const handleClearAll = () => {
  //   setSelectedStatus([]);
  //   setSelectedType([]);
  //   clearAll({ datasetType: [], status: [] });
  // };
  // const isChecked = (type, param) => {
  //   const index =
  //     param === "status"
  //       ? selectedStatus.indexOf(type)
  //       : selectedType.indexOf(type);
  //   if (index > -1) return true;
  //   return false;
  // };

  return (
    <div>
      <Popover
        id={props.id}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Grid container direction="column" className={classes.filterContainer}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{p:2}} className={classes.statusFilterContainer}>
            <Typography variant="body2" sx={{ mr: 5, fontWeight: "700" }} className={classes.filterTypo}>
              {translate("label.filter.status")} :
            </Typography>
            <FormGroup sx={{ display: "inline" }}>
              {filterStatusData.Status.map((type) => {
                return (
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedStatus === type ? true : false}
                        name={type}
                        color="primary"
                      />
                    }
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    value={type}
                    label={type}
                  />
                );
              })}
            </FormGroup>
          </Grid>
          <Divider />
          {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{p:2}} className={classes.statusFilterContainer}>
            <Typography variant="body2" sx={{ mr: 5, fontWeight: "700" }} className={classes.filterTypo}>
              {translate("label.filter.byAnnotator")} :
            </Typography>
                  
          </Grid>
          <Divider /> */}
          <Grid container direction="row" justifyContent={"flex-end"} spacing={2} sx={{p:2}}>
            <Grid item>
              <Button
                onClick={props.handleClose}
                variant="outlined"
                color="primary"
                size="small"
                className={classes.clearAllBtn}
              >
                {" "}
                {translate("button.cancel")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleStatusChange}
                variant="contained"
                color="primary"
                size="small"
                className={classes.clearAllBtn}
              >
                {" "}
                {translate("button.Apply")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};
export default FilterList;
