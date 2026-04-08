import React from 'react';
import { Avatar, Box, Button, Chip, Container, Link, Paper, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type ProfileData = {
  tagline: string;
  description: string;
  github: string;
  twitter: string;
  facebook: string;
  website: string;
  irc: string;
  profile_photo: boolean;
  profile_photo_private: boolean;
  skills: string[];
};

type Skill = { name: string; icon: string };

type User = {
  id: number;
  name: string;
  hash: string;
  pronouns: string;
};

type Props = {
  user: User;
  profileData: ProfileData;
  userSkills: Record<string, Skill>;
  can?: { edit: boolean; viewAccount: boolean };
};

const Show = ({ user, profileData, userSkills, can }: Props) => {
  const skills = Object.values(userSkills || {});

  const actionButtons = (
    <Stack direction="row" spacing={1}>
      {can?.edit && (
        <Link href={`/account/${user.id}/profile/edit`} underline="none">
          <Button variant="outlined" startIcon={<EditIcon />}>Edit Profile</Button>
        </Link>
      )}
      {can?.viewAccount && (
        <Link href={`/account/${user.id}`} underline="none">
          <Button variant="outlined" startIcon={<PersonIcon />}>Member Account</Button>
        </Link>
      )}
    </Stack>
  );

  const title = user.pronouns ? `${user.name} (${user.pronouns})` : user.name;

  return (
    <>
      <PageTitle title={title} actionButtons={actionButtons} />
      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Stack spacing={3}>
          <Paper sx={{ p: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <Avatar
                src={profileData.profile_photo && !profileData.profile_photo_private ? `/storage/user-photo/${user.hash}-thumb.png` : undefined}
                sx={{ width: 200, height: 200 }}
                variant="rounded"
              />
              <Box>
                {profileData.tagline && <Typography variant="h6" gutterBottom>{profileData.tagline}</Typography>}
                {profileData.description && <Typography>{profileData.description}</Typography>}
                <Stack spacing={0.5} sx={{ mt: 2 }}>
                  {profileData.github && <Link href={`https://github.com/${profileData.github}`} target="_blank">GitHub: {profileData.github}</Link>}
                  {profileData.twitter && <Link href={`https://twitter.com/${profileData.twitter}`} target="_blank">Twitter: {profileData.twitter}</Link>}
                  {profileData.facebook && <Link href={profileData.facebook} target="_blank">Facebook</Link>}
                  {profileData.website && <Link href={profileData.website} target="_blank">Website</Link>}
                  {profileData.irc && <Typography>Telegram: {profileData.irc}</Typography>}
                </Stack>
              </Box>
            </Stack>
          </Paper>

          {skills.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Skills</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {skills.map((skill) => (
                  <Chip key={skill.name} label={skill.name} avatar={<Avatar src={`/img/skills/${skill.icon}`} />} />
                ))}
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    </>
  );
};

Show.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Show;
