import React from 'react';
import { Card, CardContent, Chip, Container, Grid2, Link, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type AreaCoordinator = { id: number; name: string };
type Area = { id: number; name: string; description: string; area_coordinators: AreaCoordinator[] };

type Props = { areas: Area[] };

const Index = ({ areas }: Props) => (
  <>
    <PageTitle title="Equipment Areas" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Grid2 container spacing={2}>
        {areas.map((area) => (
          <Grid2 key={area.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Link href={`/equipment-area/${area.id}`} underline="none">
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{area.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{area.description}</Typography>
                  {area.area_coordinators.length > 0 && (
                    <Stack direction="row" spacing={0.5} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                      {area.area_coordinators.map((c) => <Chip key={c.id} label={c.name} size="small" />)}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
