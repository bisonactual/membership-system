import React from 'react';
import { useForm } from '@inertiajs/react';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';

type Props = {
  sso: string | false;
  sig?: string;
  errors?: Record<string, string>;
};

const Login = ({ sso, sig, errors: serverErrors }: Props) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    sso: sso || '',
    sig: sig || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/session');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, bgcolor: sso ? '#ffc' : undefined }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {sso ? (
              <>
                <Typography variant="h4">SSO Login</Typography>
                <Typography variant="subtitle1">🔒 Single Sign On for Hackspace Manchester</Typography>
              </>
            ) : (
              <Typography variant="h4">Login</Typography>
            )}

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

            <TextField
              label="Password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />

            <Button type="submit" variant="contained" size="large" disabled={processing} fullWidth>
              Login
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

Login.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Login;
