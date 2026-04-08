import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Container, Paper, Stack, TextField, Typography, Link } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';

const PasswordForgotten = () => {
  const { data, setData, post, processing, errors } = useForm({ email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/password/forgotten');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography variant="h4">Password Reset</Typography>
            <Typography>
              Forgotten your password or is it just not working? Enter your email address here and
              watch out for the reset email.
            </Typography>

            <TextField
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              autoFocus
            />

            <Button type="submit" variant="contained" size="large" disabled={processing} fullWidth>
              Send Reset Link
            </Button>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Link href="/login">Login</Link>
              <Typography>|</Typography>
              <Link href="/register">Become a member</Link>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

PasswordForgotten.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default PasswordForgotten;
