import React from 'react';
import { Container, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

const Index = () => (
  <>
    <PageTitle title="Notifications" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Typography color="text.secondary">Notifications will appear here.</Typography>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
