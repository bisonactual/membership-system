import React from 'react';
import { Card, CardContent, Chip, Container, Paper, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type AreaCoordinator = { id: number; name: string };
type Area = { id: number; name: string; description: string; area_coordinators: AreaCoordinator[] };

type Props = { equipmentArea: Area };

const Show = ({ equipmentArea }: Props) => (
  <>
    <PageTitle title={equipmentArea.name} />
    <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography>{equipmentArea.description}</Typography>
        {equipmentArea.area_coordinators.length > 0 && (
          <Stack spacing={1} sx={{ mt: 2 }}>
            <Typography variant="h6">Area Coordinators</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {equipmentArea.area_coordinators.map((c) => <Chip key={c.id} label={c.name} />)}
            </Stack>
          </Stack>
        )}
      </Paper>
    </Container>
  </>
);

Show.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Show;
