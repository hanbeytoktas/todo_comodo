import PropTypes from 'prop-types';
import {Box, Card, CardContent, Divider, Grid, Typography} from '@mui/material';
import CustomMenuButton from "../../../components/CustomMenuButton";
import {DeleteOutline, EditOutlined, LockClock} from "@mui/icons-material";
import {useState} from "react";
import {useConfirm} from "../../../components/confirm";
import {useTranslation} from "react-i18next";
import {deleteGroup} from "../../../services/GroupService";

const GroupCard = ({group,setRefreshGroupList,openUpdateModal, ...rest}) => {

    const { t } = useTranslation();
    const confirm = useConfirm();
    const [buttonList,setButtonList] = useState([
        {name: 'Delete',data:{...group}, clickAction: ()=>confirmDeleteGroup, icon: <DeleteOutline/>},
        {name: 'Update',data:{...group}, clickAction: ()=>openUpdateModalBtn, icon: <EditOutlined/>}
    ])

    const confirmDeleteGroup = () => {
        confirm({
            title: t('group.removeGroup'),
            description: t('group.removeGroupDescription')
        })
            .then(async() => {
                await deleteGroupFunc(group.id)
            })
            .catch(() => {});
    }

    const deleteGroupFunc =async(group_id)=>{
        let resp= await deleteGroup(group_id);
        if(resp.success){
            setRefreshGroupList(true);
        }
    }

    const openUpdateModalBtn = () => {
        openUpdateModal(group);
    }

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
            {...rest}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 3
                    }}
                >
                </Box>
                <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {group.name}
                </Typography>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                >
                    Length of TODO : {group.todoLength}
                </Typography>
            </CardContent>
            <Box sx={{flexGrow: 1}}/>
            <Divider/>
            <Box sx={{p: 2}}>
                <Grid
                    container
                    spacing={2}
                    sx={{justifyContent: 'space-between'}}
                >
                    <Grid
                        item
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <LockClock color="action"/>
                        <Typography
                            color="textSecondary"
                            display="inline"
                            sx={{pl: 1}}
                            variant="body2"
                        >
                            Updated 2hr ago
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Box sx={{m: 1}}>
                            <CustomMenuButton mainBtnName="Options" data={{...group}} buttonList={buttonList}/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}
export default GroupCard;

GroupCard.propTypes = {
    group: PropTypes.object.isRequired,
    setRefreshGroupList: PropTypes.func.isRequired,
    openUpdateModal:PropTypes.func.isRequired
};