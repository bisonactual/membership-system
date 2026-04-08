import React from 'react';
import { useForm } from '@inertiajs/react';
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Link,
} from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Address = {
  line_1: string;
  line_2: string;
  line_3: string;
  line_4: string;
  postcode: string;
};

type User = {
  id: number;
  given_name: string;
  family_name: string;
  display_name: string;
  pronouns: string;
  announce_name: string;
  suppress_real_name: boolean;
  email: string;
  secondary_email: string;
  phone: string;
  emergency_contact: string;
  profile_private: boolean;
  newsletter: boolean;
  online_only: boolean;
  address: Address;
  can_change_username: boolean;
};

type Props = {
  user: User;
};

const Edit = ({ user }: Props) => {
  const { data, setData, put, processing, errors } = useForm({
    given_name: user.given_name || '',
    family_name: user.family_name || '',
    display_name: user.display_name || '',
    pronouns: user.pronouns || '',
    announce_name: user.announce_name || '',
    suppress_real_name: user.suppress_real_name ? '1' : '0',
    email: user.email || '',
    secondary_email: user.secondary_email || '',
    password: '',
    phone: user.phone || '',
    emergency_contact: user.emergency_contact || '',
    'address.line_1': user.address?.line_1 || '',
    'address.line_2': user.address?.line_2 || '',
    'address.line_3': user.address?.line_3 || '',
    'address.line_4': user.address?.line_4 || '',
    'address.postcode': user.address?.postcode || '',
    profile_private: user.profile_private,
    newsletter: user.newsletter ? '1' : '0',
    online_only: user.online_only ? '1' : '0',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/account/${user.id}`);
  };

  return (
    <>
      <PageTitle title="Edit your details" />
      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Typography variant="h6">Basic information</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField label="First Name" value={data.given_name} onChange={(e) => setData('given_name', e.target.value)} error={!!errors.given_name} helperText={errors.given_name} fullWidth />
                <TextField label="Family Name" value={data.family_name} onChange={(e) => setData('family_name', e.target.value)} error={!!errors.family_name} helperText={errors.family_name} fullWidth />
              </Stack>
              <TextField label="Username" value={data.display_name} onChange={(e) => setData('display_name', e.target.value)} error={!!errors.display_name} helperText={errors.display_name || 'Cannot be changed once set without contacting the board'} disabled={!user.can_change_username} fullWidth />
              <TextField label="Pronouns (optional)" value={data.pronouns} onChange={(e) => setData('pronouns', e.target.value)} fullWidth />
              <TextField label="Entry Announcement Name (optional)" value={data.announce_name} onChange={(e) => setData('announce_name', e.target.value)} helperText="Each time you visit, your arrival will be announced on a screen and Telegram" fullWidth />

              <FormControl>
                <FormLabel>Real name privacy</FormLabel>
                <RadioGroup value={data.suppress_real_name} onChange={(e) => setData('suppress_real_name', e.target.value)}>
                  <FormControlLabel value="0" control={<Radio />} label="Yes, my real name may be shared" />
                  <FormControlLabel value="1" control={<Radio />} label="No, keep my real name private" />
                </RadioGroup>
              </FormControl>

              <Typography variant="h6">Account information</Typography>
              <TextField label="Email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={!!errors.email} helperText={errors.email} fullWidth />
              <TextField label="Password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={!!errors.password} helperText={errors.password || 'Leave blank to keep current'} fullWidth />

              <Typography variant="h6">Contact Details</Typography>
              <TextField label="Alternate Email" value={data.secondary_email} onChange={(e) => setData('secondary_email', e.target.value)} fullWidth />
              <TextField label="Phone" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} error={!!errors.phone} helperText={errors.phone} fullWidth />
              <TextField label="Emergency Contact" value={data.emergency_contact} onChange={(e) => setData('emergency_contact', e.target.value)} helperText="Name and contact details of someone we can contact if needed" fullWidth />

              <Typography variant="h6">Your address</Typography>
              <TextField label="Address Line 1" value={data['address.line_1']} onChange={(e) => setData('address.line_1', e.target.value)} fullWidth />
              <TextField label="Address Line 2" value={data['address.line_2']} onChange={(e) => setData('address.line_2', e.target.value)} fullWidth />
              <TextField label="Address Line 3" value={data['address.line_3']} onChange={(e) => setData('address.line_3', e.target.value)} fullWidth />
              <TextField label="Address Line 4" value={data['address.line_4']} onChange={(e) => setData('address.line_4', e.target.value)} fullWidth />
              <TextField label="Post Code" value={data['address.postcode']} onChange={(e) => setData('address.postcode', e.target.value)} fullWidth />

              <FormControlLabel control={<Checkbox checked={data.profile_private} onChange={(e) => setData('profile_private', e.target.checked)} />} label="Hide my Profile" />

              <FormControl>
                <FormLabel>Newsletter</FormLabel>
                <RadioGroup value={data.newsletter} onChange={(e) => setData('newsletter', e.target.value)}>
                  <FormControlLabel value="1" control={<Radio />} label="Yes, send me newsletters" />
                  <FormControlLabel value="0" control={<Radio />} label="No newsletters please" />
                </RadioGroup>
              </FormControl>

              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" disabled={processing}>Update</Button>
                <Link href={`/account/${user.id}`} underline="none">
                  <Button variant="outlined">Cancel</Button>
                </Link>
              </Stack>
            </Stack>
          </form>
        </Paper>

        <Paper sx={{ p: 4, mt: 3 }}>
          <Typography variant="h6">Access methods</Typography>
          <Typography sx={{ mt: 1 }}>
            This section has moved to a new page:{' '}
            <Link href={`/account/${user.id}/keyfobs`}>Manage your access methods</Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

Edit.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Edit;
