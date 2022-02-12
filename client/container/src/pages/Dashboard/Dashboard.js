import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@mui/material';
import Budget from './components/Budget';
import LatestOrders from './components/LatestOrders';
import LatestProducts from './components/LatestProducts';
import Sales from './components/Sales';
import TasksProgress from './components/TasksProgress';
import TotalCustomers from './components/TotalCustomers';
import TotalProfit from './components/TotalProfit';
import TrafficByDevice from './components/TrafficByDevice';
import React from 'react';
import ProductStore from './stores/ProductStore'
import { StoreProvider } from 'easy-peasy';
const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <StoreProvider store={ProductStore}>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </StoreProvider>
         
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
