import React from 'react';
import { Chip, Container, Paper, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Maintainer = { id: number; name: string };
type Group = { id: number; name: string; description: string; maintainers: Maintainer[] };
type Props = { maintainerGroup: Group };

const Show = ({ maintainerGroup }: Props) => (
  <>
    <PageTitle title={maintainerGroup.name} />
    <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography gutterBottom>{maintainerGroup.description}</Typography>
        <Typography variant="h6" gutterBottom>Maintainers</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {maintainerGroup.maintainers.map((m) => <Chip key={m.id} label={m.name} />)}
        </Stack>
      </Paper>
    </Container>
  </>
);

Show.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Show;
