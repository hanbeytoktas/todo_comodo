import {
    Button,
    FormControl,
    Grid,
    InputLabel, MenuItem,
    Select,
    TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {useTodoStateValue} from "../TodoContext";

const TodoListSaveModal = ({openTodoSaveModal,setOpenTodoSaveModal,todoSaveFunc}) => {

    const { todoState, todoDispatch } = useTodoStateValue();
    const {selectedTodo,groupList,priorityList} = todoState;

    return (
        <Dialog open={openTodoSaveModal} onClose={() => {
            setOpenTodoSaveModal(false);
        }}>
            <DialogTitle>Todo Save</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Todo Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedTodo.name}
                            onChange={(event)=>{todoDispatch({type : 'setName',payload:event.target.value});}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Todo Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedTodo.description}
                            onChange={(event)=>{todoDispatch({type : 'setDescription',payload:event.target.value});}}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-label">Group</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Group"
                                value={selectedTodo.group.id}
                                onChange={(event)=>{todoDispatch({type : 'setGroup',payload:event.target.value});}}
                            >
                                {groupList && groupList.length>0 && groupList.map((value,index)=>{
                                    return(<MenuItem value={value.id}>{value.name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Priority"
                                value={selectedTodo.priority}
                                onChange={(event)=>{todoDispatch({type : 'setPriority',payload:event.target.value});}}
                            >
                                {priorityList && priorityList.length>0 && priorityList.map((value,index)=>{
                                    return(<MenuItem value={value}>{value}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="standard">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Due Date"
                                    onChange={(newValue) => {
                                        todoDispatch({type : 'setDueDate',payload:newValue});
                                    }}
                                    value={selectedTodo.dueDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpenTodoSaveModal(false);
                }}>Cancel</Button>
                <Button onClick={() => todoSaveFunc()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TodoListSaveModal;

TodoListSaveModal.propTypes = {
    openTodoSaveModal: PropTypes.bool.isRequired,
    setOpenTodoSaveModal: PropTypes.func.isRequired,
    todoSaveFunc: PropTypes.func.isRequired,
};

