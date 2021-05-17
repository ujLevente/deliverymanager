import { Box, Container } from '@material-ui/core';
import React from 'react';
import MainNavigation from './MainNavigation';

const Layout = ({ children }) => {
  return (
    <div>
      <MainNavigation />
      <main>
        <Container fixed>
          <Box py={8}>{children}</Box>
        </Container>
      </main>
    </div>
  );
};

export default Layout;
