import React from 'react';
import { useForm } from '@inertiajs/react';
import { Alert, Button, Checkbox, Container, FormControlLabel, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Equipment = { name: string; slug: string };
type Props = { equipment: Equipment; statuses: Record<string, string>; status: string };

const Tool = ({ equipment, statuses, status }: Props) => {
  const { data, setData, post, processing, errors } = useForm({
    recipient: `tool/${equipment.slug}/${status}`, subject: '', message: '', send_to_all: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/notification-email');
  };

  return (
    <>
      <PageTitle title="Email members by training status" />
      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Tool trainers may email people who have a training record. All communication must be strictly tool-based and non-personal. Emails are copied to the board.
        </Alert>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="subtitle2">Equipment</Typography>
                <Typography>{equipment.name} (<Link href={`/equipment/${equipment.slug}`}>Visit tool</Link>)</Typography>
                <Typography variant="subtitle2">Training Status</Typography>
                <Typography>{statuses[status]}</Typography>
              </Stack>
              <TextField label="Subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)} error={!!errors.subject} helperText={errors.subject} fullWidth />
              <TextField label="Message" value={data.message} onChange={(e) => setData('message', e.target.value)} error={!!errors.message} helperText={errors.message} multiline rows={6} fullWidth />
              <FormControlLabel control={<Checkbox checked={data.send_to_all} onChange={(e) => setData('send_to_all', e.target.checked)} />} label="Send to everyone, not just yourself" />
              <Button type="submit" variant="contained" disabled={processing}>Send</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

Tool.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Tool;
