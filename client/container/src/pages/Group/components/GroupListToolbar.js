import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography
} from '@mui/material';
import {Search} from "@mui/icons-material";
import PropTypes from "prop-types";


const GroupListToolbar = ({setOpenGroupSaveModal}) => {

    return (
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
                        onClick={setOpenGroupSaveModal(true)}
                    >
                        Add Group
                    </Button>
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
    );
}
export default GroupListToolbar;

GroupListToolbar.propTypes = {
    setOpenGroupSaveModal: PropTypes.func.isRequired
};

