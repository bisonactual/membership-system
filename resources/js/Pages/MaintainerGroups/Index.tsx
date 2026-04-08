import React from 'react';
import { Card, CardContent, Chip, Container, Grid2, Link, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Maintainer = { id: number; name: string };
type Group = { id: number; name: string; description: string; maintainers: Maintainer[] };
type Props = { maintainerGroups: Group[] };

const Index = ({ maintainerGroups }: Props) => (
  <>
    <PageTitle title="Maintainer Groups" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Grid2 container spacing={2}>
        {maintainerGroups.map((g) => (
          <Grid2 key={g.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Link href={`/maintainer_groups/${g.id}`} underline="none">
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{g.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{g.description}</Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                    {g.maintainers.map((m) => <Chip key={m.id} label={m.name} size="small" />)}
                  </Stack>
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
