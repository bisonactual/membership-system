import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Checkbox, Container, FormControlLabel, Paper, Stack, TextField, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type ProfileData = {
  tagline: string; description: string; twitter: string; facebook: string;
  github: string; website: string; irc: string; profile_photo_private: boolean;
  skills: string[];
};

type Props = { profileData: ProfileData; userId: number; skills: Record<string, string>; user: { hash: string } };

const ProfileEdit = ({ profileData, userId, user }: Props) => {
  const { data, setData, post, processing, errors } = useForm({
    tagline: profileData.tagline || '',
    description: profileData.description || '',
    twitter: profileData.twitter || '',
    facebook: profileData.facebook || '',
    github: profileData.github || '',
    website: profileData.website || '',
    irc: profileData.irc || '',
    profile_photo_private: profileData.profile_photo_private || false,
    new_profile_photo: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/account/${userId}/profile`);
  };

  return (
    <>
      <PageTitle title="Edit Profile" />
      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Stack spacing={3}>
              <TextField label="Tagline" value={data.tagline} onChange={(e) => setData('tagline', e.target.value)} fullWidth />
              <TextField label="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} multiline rows={4} fullWidth />
              <TextField label="GitHub username" value={data.github} onChange={(e) => setData('github', e.target.value)} fullWidth />
              <TextField label="Twitter username" value={data.twitter} onChange={(e) => setData('twitter', e.target.value)} fullWidth />
              <TextField label="Facebook URL" value={data.facebook} onChange={(e) => setData('facebook', e.target.value)} fullWidth />
              <TextField label="Website" value={data.website} onChange={(e) => setData('website', e.target.value)} fullWidth />
              <TextField label="Telegram handle" value={data.irc} onChange={(e) => setData('irc', e.target.value)} fullWidth />

              <Typography variant="subtitle1">Profile Photo</Typography>
              <input type="file" accept="image/*" onChange={(e) => setData('new_profile_photo', e.target.files?.[0] || null)} />
              <FormControlLabel control={<Checkbox checked={data.profile_photo_private} onChange={(e) => setData('profile_photo_private', e.target.checked)} />} label="Keep my photo private" />

              <Button type="submit" variant="contained" disabled={processing}>Update Profile</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

ProfileEdit.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ProfileEdit;
