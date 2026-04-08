import React from 'react';
import { Avatar, Box, Container, Grid2, Link, Paper, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Member = {
  user_id: number;
  display_name: string;
  hash: string;
  profile_photo: boolean;
  profile_photo_private: boolean;
};

type Props = { users: Member[] };

const Index = ({ users }: Props) => (
  <>
    <PageTitle title="Members" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Grid2 container spacing={2}>
        {users.map((user) => (
          <Grid2 key={user.user_id} size={{ xs: 6, md: 3, lg: 2 }}>
            <Link href={`/members/${user.user_id}`} underline="none">
              <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'black', borderRadius: 2 }}>
                <Avatar
                  src={user.profile_photo && !user.profile_photo_private ? `/storage/user-photo/${user.hash}-thumb.png` : undefined}
                  sx={{ width: '100%', height: 'auto', aspectRatio: '1', borderRadius: 2 }}
                  variant="rounded"
                />
                <Typography color="white" variant="body2" sx={{ mt: 1 }}>{user.display_name}</Typography>
              </Paper>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
