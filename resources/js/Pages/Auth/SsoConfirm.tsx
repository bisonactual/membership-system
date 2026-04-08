import React from 'react';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';

type Props = { sso: string; sig: string; user: { email: string }; return_sso_url: string };

const SsoConfirm = ({ sso, sig, user, return_sso_url }: Props) => {
  const host = (() => { try { return new URL(return_sso_url).hostname; } catch { return return_sso_url; } })();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderTop: '4px solid orange' }}>
        <form action={return_sso_url} method="GET">
          <input type="hidden" name="sso" value={sso} />
          <input type="hidden" name="sig" value={sig} />
          <Stack spacing={2}>
            <Typography variant="h5">Confirm you're happy to log into another service</Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
              <Typography>🔒 Part of Hackspace Manchester</Typography>
              <Typography>↪️ {host}</Typography>
              <Typography>✉️ {user.email}</Typography>
            </Paper>
            <Typography variant="body2" color="text.secondary">
              Not the same email? You may continue and this can later be harmonised by reaching out to an admin or board member on Telegram.
            </Typography>
            <Button type="submit" variant="contained">Continue</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

SsoConfirm.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default SsoConfirm;
