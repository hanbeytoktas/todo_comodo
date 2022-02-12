import {useEffect, useState, use, useLayoutEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Avatar, Box, Divider, Drawer, Hidden, List, Typography} from '@mui/material';
import NavItem from './NavItem';
import jwt_decode from "jwt-decode";
import items from '../../navbar'



const DashboardSidebar = ({onMobileClose, openMobile}) => {
    const location = useLocation();
    const [userDetail, setUserDetail] = useState({'name':'','email':''});

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    useEffect(()=>{
        if (localStorage.getItem("access_token")) {
            var decoded = jwt_decode(localStorage.getItem("access_token"));
            setUserDetail(decoded.userDetails);
        }
    },[]);


    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2
                }}
            >
                <Avatar
                    src="/static/images/avatars/avatar_6.png"
                    sx={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64
                    }}
                />
                <Typography color="textPrimary" variant="h5">
                    {userDetail.name}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {userDetail.email}
                </Typography>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <List>
                    {items.map((item) => (
                        <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon}/>
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{
                        sx: {
                            width: 256
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden xlDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: 256,
                            top: 64,
                            height: 'calc(100% - 64px)'
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
    onMobileClose: () => {
    },
    openMobile: false
};

export default DashboardSidebar;
