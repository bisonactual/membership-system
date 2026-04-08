import React from 'react';
import { useForm } from '@inertiajs/react';
import {
  Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel,
  Link, Paper, Radio, RadioGroup, Stack, TextField, Typography,
} from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';

const CreateOnlineOnly = () => {
  const { data, setData, post, processing, errors } = useForm({
    given_name: '', family_name: '', display_name: '', pronouns: '',
    suppress_real_name: '0', email: '', password: '',
    online_only: '1', phone: '00000000000', emergency_contact: '00000000000',
    rules_agreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/account');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" gutterBottom>Hackspace Manchester — Online Only Access</Typography>
      <Typography gutterBottom>
        This gives you online access only — you won't be able to visit the physical space.
        To become a member, <Link href="/register">register here</Link>.
      </Typography>

      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField label="First Name" value={data.given_name} onChange={(e) => setData('given_name', e.target.value)} error={!!errors.given_name} helperText={errors.given_name} required fullWidth />
              <TextField label="Surname" value={data.family_name} onChange={(e) => setData('family_name', e.target.value)} error={!!errors.family_name} helperText={errors.family_name} required fullWidth />
            </Stack>
            <TextField label="Username" value={data.display_name} onChange={(e) => setData('display_name', e.target.value)} error={!!errors.display_name} helperText={errors.display_name} required fullWidth />
            <TextField label="Pronouns (optional)" value={data.pronouns} onChange={(e) => setData('pronouns', e.target.value)} fullWidth />

            <FormControl>
              <FormLabel>Real name privacy</FormLabel>
              <RadioGroup value={data.suppress_real_name} onChange={(e) => setData('suppress_real_name', e.target.value)}>
                <FormControlLabel value="0" control={<Radio />} label="Yes, my real name may be shared" />
                <FormControlLabel value="1" control={<Radio />} label="No, keep my real name private" />
              </RadioGroup>
            </FormControl>

            <TextField label="Email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={!!errors.email} helperText={errors.email} required fullWidth />
            <TextField label="Password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={!!errors.password} helperText={errors.password} required fullWidth />

            <Typography>
              Please read the <Link href="https://hacman.org.uk/rules" target="_blank">rules</Link>.
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={data.rules_agreed} onChange={(e) => setData('rules_agreed', e.target.checked)} />}
              label="I agree to the Hackspace Manchester rules"
            />
            {errors.rules_agreed && <Typography color="error" variant="body2">{errors.rules_agreed}</Typography>}

            <Button type="submit" variant="contained" size="large" disabled={processing}>Get Online Access</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

CreateOnlineOnly.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateOnlineOnly;
