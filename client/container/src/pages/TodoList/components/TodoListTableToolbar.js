import {IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {alpha} from "@mui/material/styles";
import {Delete, FilterList} from "@mui/icons-material";
import PropTypes from "prop-types";
import React from "react";

const TodoListTableToolbar = (props) => {
    const {numSelected} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <Delete/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterList/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

export default TodoListTableToolbar;

TodoListTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

