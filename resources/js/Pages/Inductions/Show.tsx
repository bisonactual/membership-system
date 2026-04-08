import React from 'react';
import { useForm } from '@inertiajs/react';
import { Alert, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type User = { id: number; induction_completed: boolean };
type Props = { user: User; general_induction_code: string; prefill_induction_code: string };

const Show = ({ user, general_induction_code }: Props) => {
  const { data, setData, put, processing, errors } = useForm({ induction_code: '', key_id: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put('/general-induction');
  };

  return (
    <>
      <PageTitle title="General Induction and Tour" />
      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Stack spacing={3}>
          <Paper sx={{ p: 3 }}>
            <Typography gutterBottom>We make sure all members are introduced to Hackspace Manchester when they join through our General Induction — an in-person tour covering workshops, rules, health & safety, and how the Hackspace works.</Typography>
            <Typography>At the end you'll get a code to enter below to set up your 24/7 access.</Typography>
          </Paper>

          {!user.induction_completed ? (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Complete your General Induction</Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField label="Induction Code" value={data.induction_code} onChange={(e) => setData('induction_code', e.target.value)} error={!!errors.induction_code} helperText={errors.induction_code} required fullWidth />
                  <TextField label="Fob ID (optional)" value={data.key_id} onChange={(e) => setData('key_id', e.target.value)} error={!!errors.key_id} helperText={errors.key_id || 'If you have a key fob, enter its ID to pre-register it'} fullWidth />
                  <Button type="submit" variant="contained" disabled={processing}>Complete General Induction</Button>
                </Stack>
              </form>
            </Paper>
          ) : (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>How to give a General Induction</Typography>
              <Typography gutterBottom>As an inducted member, you can now introduce and induct new members.</Typography>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="subtitle2">General Induction Code</Typography>
                <Typography variant="h4" sx={{ my: 1, textAlign: 'center' }}>{general_induction_code}</Typography>
                <Typography variant="body2" textAlign="center">Only share this code after the general induction.</Typography>
              </Alert>
            </Paper>
          )}
        </Stack>
      </Container>
    </>
  );
};

Show.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Show;
