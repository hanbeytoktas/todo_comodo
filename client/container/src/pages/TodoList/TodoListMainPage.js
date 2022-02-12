import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent, Checkbox,
    Container, Dialog, DialogContent, DialogTitle, Fab, FormControl, FormControlLabel, Grid,
    InputAdornment, InputLabel, MenuItem, Paper, Select, Slide,
    SvgIcon, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
    TextField,
    Typography
} from "@mui/material";
import {CheckCircle, Delete, EditOff, Search, SettingsBackupRestore} from "@mui/icons-material";

import TodoListTableToolbar from "./components/TodoListTableToolbar";
import TodoListTableHeader from "./components/TodoListTableHeader";
import {useTodoStateValue} from "./TodoContext";
import TodoListSaveModal from "./components/TodoListSaveModal";
import {
    changePriority,
    completeTodo,
    deleteTodo,
    doneTodo,
    getPriorities,
    getTodos,
    saveTodo, unDoneTodo
} from "../../services/TodoService";
import {deleteGroup, getGroups} from "../../services/GroupService";
import {Edit2} from "react-feather";
import {initialTodoState} from "./TodoReducer";
import DialogContentText from "@mui/material/DialogContentText";
import {useTranslation} from "react-i18next";
import {useConfirm} from "../../components/confirm";

const TodoListMainPage = () => {

    const [totalCount, setTotalCount] = useState(0);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [openTodoSaveModal, setOpenTodoSaveModal] = useState(false);
    const [openDescDialog, setOpenDescDialog] = useState(false);
    const [comleteChecked, setComleteChecked] = useState(false);

    const {t} = useTranslation();
    const confirm = useConfirm();
    const {todoState, todoDispatch} = useTodoStateValue();
    const {todoList, priorityList, selectedTodo, selectedTodos} = todoState;


    useEffect(async () => {
        await loadGroupList();
        await loadPriorities();
        await loadTodoList();
    }, [])


    const loadTodoList = async (isCompleted = comleteChecked, page = page, limit = rowsPerPage) => {
        let response = await getTodos({
            limit: limit,
            page: page === undefined ? 0 : page,
            search: JSON.stringify({done: isCompleted}),
            sort: [{field: 'createdAt', direction: 'desc'}]
        })
        if (response && response.content) {
            todoDispatch({type: 'setTodoList', payload: response.content});
            setTotalCount(response.totalElements)
        }
    }

    const loadGroupList = async () => {
        let response = await getGroups()
        if (response) {
            todoDispatch({type: 'setGroupList', payload: response});
        }
    }

    const loadPriorities = async () => {
        let response = await getPriorities()
        if (response) {
            todoDispatch({type: 'setPriorityList', payload: response});
        }
    }

    const todoSaveFunc = async () => {
        let request = {}
        if (selectedTodo && selectedTodo.id) {
            request["id"] = selectedTodo.id;
        }
        request["name"] = selectedTodo.name
        request["description"] = selectedTodo.description
        request["priority"] = selectedTodo.priority;
        request["groupId"] = selectedTodo.group.id;
        request["dueDate"] = new Date(selectedTodo.dueDate)

        let resp = await saveTodo(request)
        if (resp.success) {
            await loadTodoList();
            setOpenTodoSaveModal(false)
            todoDispatch({type: 'setSelectedTodo', payload: {...initialTodoState.selectedTodo}});
        }
    }

    const confirmDeleteTodo = async (todo) => {
        confirm({
            title: t('todo.removeTodo'),
            description: t('todo.removeTodoDescription')
        })
            .then(async () => {
                await deleteTodoFunc(todo.id)
            })
            .catch(() => {
            });
    }

    const deleteTodoFunc = async (todoId) => {
        let resp = await deleteTodo(todoId);
        if (resp.success) {
            await loadTodoList();
        }
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            todoDispatch({type: 'setSelectedTodos', payload: todoList});
            return;
        }
        todoDispatch({type: 'setSelectedTodos', payload: []});
    };

    const handleClick = (event, data) => {
        const selectedIndex = selectedTodos.map(function (e) {
            return e.id;
        }).indexOf(data.id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedTodos, [data]);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedTodos.slice(1));
        } else if (selectedIndex === selectedTodos.length - 1) {
            newSelected = newSelected.concat(selectedTodos.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedTodos.slice(0, selectedIndex),
                selectedTodos.slice(selectedIndex + 1),
            );
        }
        todoDispatch({type: 'setSelectedTodos', payload: newSelected});
    };

    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        await loadTodoList(false, newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        await loadTodoList(false, 0, parseInt(event.target.value, 10))
    };

    const changeTodoPriority = async (id, priority) => {
        let request = {}
        request["id"] = id;
        request["priority"] = priority;

        let resp = await changePriority(request)
        if (resp.success) {
            await loadTodoList();

        }
    }

    const openUpdateModalClick = (data) => {
        todoDispatch({type: 'setSelectedTodo', payload: data})
        setOpenTodoSaveModal(true);
    }

    const openDescViewDialog = (data) => {
        todoDispatch({type: 'setSelectedTodo', payload: data})
        setOpenDescDialog(true);
    }

    const isSelected = (data) => selectedTodos.map(function (e) {
        return e.id;
    }).indexOf(data.id) !== -1;

    const changeCompleteState = async (data) => {
        setComleteChecked(!comleteChecked);
        await loadTodoList(!comleteChecked, page, rowsPerPage);
    }

    const doneTodoFunc = async (id) => {
        let resp = await doneTodo(id);
        if (resp.success) {
            await loadTodoList();
        }
    }

    const unDoneTodoFunc = async (id) => {
        let resp = await unDoneTodo(id);
        if (resp.success) {
            await loadTodoList();
        }
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - todoList.length) : 0;


    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <TodoListSaveModal todoSaveFunc={todoSaveFunc} setOpenTodoSaveModal={setOpenTodoSaveModal}
                               openTodoSaveModal={openTodoSaveModal}/>
            <Container maxWidth={false}>
                <Box>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1
                        }}
                    >
                        <Typography
                            sx={{m: 1}}
                            variant="h4"
                        >
                            Todos
                        </Typography>
                        <Box sx={{m: 1}}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => setOpenTodoSaveModal(true)}
                            >
                                Add Todo
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <Box sx={{maxWidth: 500}}>
                                            <TextField
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SvgIcon
                                                                fontSize="small"
                                                                color="action"
                                                            >
                                                                <Search/>
                                                            </SvgIcon>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                placeholder="Search Todo"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{maxWidth: 250, float: "right"}}>
                                            <FormControlLabel
                                                control={<Switch checked={comleteChecked} onClick={(event) => {
                                                    changeCompleteState(event.target.value)
                                                }}/>} label="Completed Todo List"/>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{width: '100%'}}>
                        <Paper sx={{width: '100%', mb: 2}}>
                            <TodoListTableToolbar numSelected={selectedTodos.length}/>
                            <TableContainer>
                                <Table
                                    sx={{minWidth: 750}}
                                    aria-labelledby="tableTitle"
                                    size={'small'}
                                >
                                    <TodoListTableHeader
                                        numSelected={selectedTodos.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={todoList.length}
                                    />
                                    <TableBody>
                                        {stableSort(todoList, getComparator(order, orderBy))
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                color="primary"
                                                                checked={isItemSelected}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}
                                                                onClick={(event) => handleClick(event, row)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>
                                                            <Fab color="inherit" size="small" aria-label="edit"
                                                                 onClick={(event) => {
                                                                     openDescViewDialog(row)
                                                                 }}>
                                                                <Search/>
                                                            </Fab>
                                                        </TableCell>
                                                        <TableCell>
                                                            <FormControl fullWidth variant="standard">
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="Priority"
                                                                    value={row.priority}
                                                                    onChange={async (event) => {
                                                                        await changeTodoPriority(row.id, event.target.value);
                                                                    }}
                                                                >
                                                                    {priorityList && priorityList.length > 0 && priorityList.map((value, index) => {
                                                                        return (
                                                                            <MenuItem value={value}>{value}</MenuItem>)
                                                                    })}
                                                                </Select>
                                                            </FormControl>
                                                        </TableCell>
                                                        <TableCell>{row.group.name}</TableCell>
                                                        <TableCell>{row.dueDate}</TableCell>
                                                        <TableCell>
                                                            <Fab color="secondary" size="small" aria-label="delete"
                                                                 onClick={(async event => {
                                                                     await confirmDeleteTodo(row);
                                                                 })}
                                                            >
                                                                <Delete/>
                                                            </Fab>
                                                            {!row.done &&
                                                            <>
                                                                <Fab color="inherit" size="small" aria-label="edit"
                                                                     onClick={(event) => {
                                                                         openUpdateModalClick(row);
                                                                     }}>
                                                                    <Edit2/>
                                                                </Fab>
                                                                <Fab color="inherit" size="small" aria-label="edit"
                                                                     onClick={async (event) => {
                                                                         await doneTodoFunc(row.id);
                                                                     }}>
                                                                    <CheckCircle/>
                                                                </Fab>
                                                            </>
                                                            }
                                                            {row.done &&
                                                            <Fab color="inherit" size="small" aria-label="edit"
                                                                 onClick={async (event) => {
                                                                     await unDoneTodoFunc(row.id);
                                                                 }}>
                                                                <SettingsBackupRestore/>
                                                            </Fab>
                                                            }


                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (33) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6}/>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={totalCount}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </Box>
                <Dialog
                    open={openDescDialog}
                    onClose={() => {
                        setOpenDescDialog(false);
                    }}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Todo Description"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {selectedTodo.description}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Container>
        </Box>
    );
};

export default TodoListMainPage;
