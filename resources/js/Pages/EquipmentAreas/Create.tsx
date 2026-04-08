import React from 'react';
import { Container, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

const Create = () => (
  <>
    <PageTitle title="Create Equipment Area" />
    <Container sx={{ mt: 3 }}><Typography>Equipment area creation form — coming soon.</Typography></Container>
  </>
);

Create.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Create;
