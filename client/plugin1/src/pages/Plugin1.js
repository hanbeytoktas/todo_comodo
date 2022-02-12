import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Plugin1 = () => (
  <>   
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          PLUGIN 1 404 Not Found Page         
        </Typography>        
      </Container>
    </Box>
  </>
);

export default Plugin1;
