import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Checkbox, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Props = { recipients: Record<string, string> };

const Create = ({ recipients }: Props) => {
  const { data, setData, post, processing, errors } = useForm({
    recipient: 'all', subject: '', message: '', send_to_all: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/notification-email');
  };

  return (
    <>
      <PageTitle title="Email Members" />
      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Typography gutterBottom>Send an email to active members or specific groups.</Typography>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Recipient</InputLabel>
                <Select value={data.recipient} onChange={(e) => setData('recipient', e.target.value)} label="Recipient">
                  {Object.entries(recipients).map(([v, l]) => <MenuItem key={v} value={v}>{l}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)} error={!!errors.subject} helperText={errors.subject} fullWidth />
              <TextField label="Message" value={data.message} onChange={(e) => setData('message', e.target.value)} error={!!errors.message} helperText={errors.message || 'The email will be addressed to the user with the standard signature'} multiline rows={6} fullWidth />
              <FormControlLabel control={<Checkbox checked={data.send_to_all} onChange={(e) => setData('send_to_all', e.target.checked)} />} label="Send to everyone, not just yourself" />
              <Button type="submit" variant="contained" disabled={processing}>Send</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

Create.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Create;
