import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Save } from '@mui/icons-material';
import React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ProductStore from '../stores/ProductStore';

const LatestProducts = (props) => {

  /*const state = useStoreState((state) => state);
  const actions = useStoreActions((actions) => actions);*/


  return (
    <Card {...props}>
      <CardHeader title="Product Create/Update" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl variant="standard" fullWidth>
              <TextField id="standard-basic" label="Order Ref" variant="standard" />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl variant="standard" fullWidth>
              <TextField id="standard-basic" label="Amount" variant="standard" />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Customers</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl variant="standard" fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  renderInput={(params) => <TextField {...params} />}
                  fullWidth
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Button style={{ float: 'right!important', marginLeft: 'auto' }} startIcon={<Save />}>
          Save To Product
        </Button>
      </CardActions>
    </Card>
  );
};

export default LatestProducts;
