import React from 'react';
import { Button, Container, Grid2, Link, Paper, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';

const Index = () => (
  <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
    <Paper sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>Hackspace Manchester</Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>Welcome to the Membership System</Typography>
      <Typography gutterBottom>Here you can sign up, manage your membership, book tool inductions, join teams, and more.</Typography>
      <Typography gutterBottom>
        For more information visit <Link href="https://www.hacman.org.uk" target="_blank">www.hacman.org.uk</Link>
      </Typography>
      <Grid2 container spacing={3} sx={{ mt: 3 }}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Ready to join?</Typography>
            <Stack spacing={1} alignItems="center">
              <Link href="/register" underline="none"><Button variant="contained">✨ Become a member</Button></Link>
              <Link href="/gift">🎁 Got a gift code?</Link>
            </Stack>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Already a member?</Typography>
            <Link href="/login" underline="none"><Button variant="outlined">🔑 Log in</Button></Link>
          </Paper>
        </Grid2>
      </Grid2>
    </Paper>
  </Container>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
