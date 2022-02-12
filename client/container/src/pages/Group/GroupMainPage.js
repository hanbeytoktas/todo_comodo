import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    InputAdornment,
    SvgIcon,
    TextField,
    Typography
} from "@mui/material";
import {Pagination} from "@mui/lab";
import {getGroups, getGroupsWithQuery, saveGroup} from "../../services/GroupService";
import GroupCard from "./components/GroupCard";
import {Search} from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";


const GroupMainPage = () => {

    const [groupList, setGroupList] = useState([]);
    const [totalPage,setTotalPage] = useState(0);
    const [openGroupSaveModal,setOpenGroupSaveModal]=useState(false);
    const [selectedGroup,setSelectedGroup]=useState({});
    const [name, setName] = useState("");
    const [refreshGroupList,setRefreshGroupList]=useState(false)

    useLayoutEffect(()=>{
        loadGroupListLazy();
    },[]);

    useEffect(()=>{
        if(refreshGroupList){
            loadGroupListLazy();
            setRefreshGroupList(false);
        }
    },[refreshGroupList])

    const changeGroupListPage = (page) =>{
        loadGroupListLazy(page-1,6);
    }

    const loadGroupListLazy = async (page = 0, limit = 6) => {
        let response = await getGroupsWithQuery({
            limit: limit,
            page: page,
            search: "",
            sort: [{field: 'createdAt', direction: 'desc'}]
        })
        if(response && response.content){
            setGroupList(response.content);
            setTotalPage(response.totalPages)
        }
    }


    const groupSaveFunc = async () => {
        const successSaveCallback = ()=>{
            setName("");
            setOpenGroupSaveModal(false);
            loadGroupListLazy();
        }

        let resp = await saveGroup({name: name,id:selectedGroup!=null&&selectedGroup.id!=null?selectedGroup.id:null});
        if (resp.success) {
            successSaveCallback(false);
        }
    }

    const openUpdateModal=(data)=>{
        setSelectedGroup(data);
        setName(data.name);
        setOpenGroupSaveModal(true);
    }

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
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
                            Groups
                        </Typography>
                        <Box sx={{m: 1}}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={()=>setOpenGroupSaveModal(true)}
                            >
                                Add Group
                            </Button>
                            <Dialog open={openGroupSaveModal} onClose={()=>{setOpenGroupSaveModal(false);setName("");}}>
                                <DialogTitle>Group Save</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Group Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={()=>{setOpenGroupSaveModal(false);setName("");}}>Cancel</Button>
                                    <Button onClick={()=>groupSaveFunc()}>Save</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <Card>
                            <CardContent>
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
                                        placeholder="Search Group"
                                        variant="outlined"
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
                <Box sx={{pt: 3}}>
                    <Grid
                        container
                        spacing={3}
                    >
                        {groupList.map((group) => (
                            <Grid
                                item
                                key={group.id}
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <GroupCard group={group} setRefreshGroupList={setRefreshGroupList} openUpdateModal={openUpdateModal}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 3
                    }}
                >
                    <Pagination
                        color="primary"
                        count={totalPage}
                        size="small"
                        onChange={(event, page) =>changeGroupListPage(page)}
                    />
                </Box>
            </Container>
        </Box>
    );

};

export default GroupMainPage;
