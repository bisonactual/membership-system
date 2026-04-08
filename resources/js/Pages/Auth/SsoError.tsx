import React from 'react';
import { Alert, Container, Link, Paper, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';

type Props = { code: string };

const SsoError = ({ code }: Props) => (
  <Container maxWidth="sm" sx={{ mt: 8 }}>
    <Paper sx={{ p: 4, borderTop: '4px solid red' }}>
      <Stack spacing={2}>
        <Typography variant="h3">⛔</Typography>
        <Typography variant="h5">There has been an error.</Typography>
        <Typography color="text.secondary">Error code {code}</Typography>
        {code === '2' && (
          <Alert severity="warning">
            <Typography>You cannot continue as your email address is not verified.</Typography>
            <Typography sx={{ mt: 1 }}>
              <Link href="/account/confirm-email/send">Click here to re-send the verification email</Link>, then try logging in again.
            </Typography>
          </Alert>
        )}
      </Stack>
    </Paper>
  </Container>
);

SsoError.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default SsoError;
