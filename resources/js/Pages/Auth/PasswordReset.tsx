import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Container, Paper, Stack, TextField, Typography, Link } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';

type Props = {
  email: string;
  token: string;
};

const PasswordReset = ({ email, token }: Props) => {
  const { data, setData, post, processing, errors } = useForm({
    email,
    password: '',
    token,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/password/reset');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography variant="h4">Set a New Password</Typography>
            <Typography>Enter your email address and choose a new password.</Typography>

            <TextField
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />

            <TextField
              label="New Password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />

            <Button type="submit" variant="contained" size="large" disabled={processing} fullWidth>
              Reset Password
            </Button>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Link href="/password/forgotten">Reset your password</Link>
              <Typography>|</Typography>
              <Link href="/register">Become a member</Link>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

PasswordReset.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default PasswordReset;
