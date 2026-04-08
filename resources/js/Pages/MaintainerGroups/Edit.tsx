import React from 'react';
import { Container, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

const Edit = () => (
  <>
    <PageTitle title="Edit Maintainer Group" />
    <Container sx={{ mt: 3 }}><Typography>Maintainer group edit form — coming soon.</Typography></Container>
  </>
);

Edit.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Edit;
