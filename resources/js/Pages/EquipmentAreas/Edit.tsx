import React from 'react';
import { Container, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

const Edit = () => (
  <>
    <PageTitle title="Edit Equipment Area" />
    <Container sx={{ mt: 3 }}><Typography>Equipment area edit form — coming soon.</Typography></Container>
  </>
);

Edit.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Edit;
