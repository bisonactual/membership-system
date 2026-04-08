import React from 'react';
import { Button, Container, Link, Paper, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Box = { id: number; location: string; user: { id: number; name: string; active: boolean } | null };
type Props = { box: Box; QRcodeURL: string };

const Show = ({ box, QRcodeURL }: Props) => (
  <>
    <PageTitle title={`Storage Location ${box.location}`} />
    <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h5">📦 {box.location} <Typography component="span" color="text.secondary">(#{box.id})</Typography></Typography>
            <Typography variant="h6">
              {box.user ? (box.user.active ? '🟡 Claimed' : '⚠️ Member left') : '🟢 Available'}
            </Typography>
            {box.user && (
              <Link href={`/members/${box.user.id}`}>
                <Typography>🙂 {box.user.name} (#{box.user.id})</Typography>
              </Link>
            )}
          </Stack>
          <Stack spacing={1} alignItems="center">
            <Typography variant="body2">Scan to verify</Typography>
            <img src={QRcodeURL} alt="QR Code" width={200} />
          </Stack>
        </Stack>
      </Paper>
    </Container>
  </>
);

Show.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Show;
