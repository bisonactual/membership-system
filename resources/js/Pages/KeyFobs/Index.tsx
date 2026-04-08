import React from 'react';
import { useForm } from '@inertiajs/react';
import {
  Alert, Button, Chip, Container, Paper, Stack, TextField, Typography,
} from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Fob = { id: number; key_id: string; created_at: string };
type User = {
  id: number; online_only: boolean; induction_completed: boolean;
  key_fobs: Fob[]; is_admin: boolean;
};
type Props = { user: User };

const Index = ({ user }: Props) => {
  const fobForm = useForm({ key_id: '', type: 'keyfob' });
  const codeForm = useForm({ type: 'access_code' });
  const canAdd = (user.key_fobs.length < 2 && user.induction_completed) || user.is_admin;

  const handleAddFob = (e: React.FormEvent) => {
    e.preventDefault();
    fobForm.post(`/account/${user.id}/keyfobs`);
  };

  const handleAddCode = (e: React.FormEvent) => {
    e.preventDefault();
    codeForm.post(`/account/${user.id}/keyfobs`);
  };

  if (user.online_only) {
    return (
      <>
        <PageTitle title="Manage your access methods" />
        <Container sx={{ mt: 3 }}><Alert severity="error">Online only accounts cannot have access methods configured.</Alert></Container>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Manage your access methods" />
      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Stack spacing={3}>
          {!user.induction_completed && user.key_fobs.length === 0 && !user.is_admin && (
            <Alert severity="warning">You need to complete the general induction before adding access methods.</Alert>
          )}

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Your access methods</Typography>
            {user.key_fobs.length === 0 ? (
              <Alert severity="warning">You have no entry methods and won't be able to access the space outside of open evenings.</Alert>
            ) : (
              <Stack spacing={2}>
                {user.key_fobs.map((fob) => {
                  const isCode = fob.key_id.startsWith('ff');
                  return (
                    <Stack key={fob.id} direction="row" spacing={2} alignItems="center" sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Chip label={isCode ? '🔢 Access Code' : '🔑 Fob'} color={isCode ? 'error' : 'success'} />
                      <Typography>{isCode ? `Code: ${fob.key_id.replace(/f/g, '')} #` : `Fob ID: ${fob.key_id}`}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>Added {fob.created_at}</Typography>
                    </Stack>
                  );
                })}
              </Stack>
            )}
          </Paper>

          {canAdd && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Add a new entry method</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Stack spacing={2} flex={1}>
                  <Typography variant="subtitle1">Add a keyfob</Typography>
                  <form onSubmit={handleAddFob}>
                    <Stack direction="row" spacing={1}>
                      <TextField size="small" label="Fob ID" value={fobForm.data.key_id} onChange={(e) => fobForm.setData('key_id', e.target.value)} error={!!fobForm.errors.key_id} helperText={fobForm.errors.key_id || 'A-F and 0-9 only'} />
                      <Button type="submit" variant="contained" disabled={fobForm.processing}>Add fob</Button>
                    </Stack>
                  </form>
                </Stack>
                <Stack spacing={2} flex={1}>
                  <Typography variant="subtitle1">Request access code</Typography>
                  <form onSubmit={handleAddCode}>
                    <Button type="submit" variant="outlined" disabled={codeForm.processing}>Request access code</Button>
                  </form>
                </Stack>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    </>
  );
};

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
