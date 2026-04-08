import React from 'react';
import { Button, Card, CardContent, Chip, Container, Link, Paper, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';
import MarkdownRenderer from '../../Components/MarkdownRenderer';

type Equipment = {
  id: number; name: string; slug: string; description: string; room: string;
  requires_induction: boolean; docs: string; photo_url: string | null;
  managing_role_id: number | null;
};

type Trainer = { id: number; name: string };
type UserInduction = { is_trained: boolean } | null;

type Props = {
  equipment: Equipment;
  trainers: Trainer[];
  userInduction: UserInduction;
  trainedUsers: { id: number; name: string }[];
  docs: string;
  can?: { edit: boolean };
};

const Show = ({ equipment, trainers, userInduction, trainedUsers, docs, can }: Props) => {
  const actionButtons = can?.edit ? (
    <Link href={`/equipment/${equipment.slug}/edit`} underline="none">
      <Button variant="outlined" startIcon={<EditIcon />}>Edit</Button>
    </Link>
  ) : null;

  return (
    <>
      <PageTitle title={equipment.name} actionButtons={actionButtons} />
      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Stack spacing={3}>
          <Paper sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography>{equipment.description}</Typography>
              {equipment.room && <Chip label={equipment.room} size="small" />}
              {equipment.requires_induction && (
                <Chip label={userInduction?.is_trained ? 'You are a trainer' : userInduction ? 'You are inducted' : 'Induction required'}
                  color={userInduction ? 'success' : 'warning'} />
              )}
            </Stack>
          </Paper>

          {docs && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Documentation</Typography>
                <MarkdownRenderer content={docs} />
              </CardContent>
            </Card>
          )}

          {trainers.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Trainers</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {trainers.map((t) => <Chip key={t.id} label={t.name} />)}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Container>
    </>
  );
};

Show.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Show;
