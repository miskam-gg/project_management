import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box mt={5} py={3} bgcolor="primary.main" color="white">
      <Container>
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Project Management System
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;