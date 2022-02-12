import { useState } from 'react';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar } from '@mui/material';
import {Menu,Notifications,Input }from '@mui/icons-material';
import Logo from './Logo';
import React from 'react';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('access_token');
    navigate("/");
  }

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden xlDown>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit" size="large" onClick={(e)=>logout()}>
            <Input />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
