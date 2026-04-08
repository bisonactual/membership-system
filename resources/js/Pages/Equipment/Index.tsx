import React from 'react';
import { Card, CardContent, Chip, Container, Grid2, Link, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type EquipmentItem = {
  equipment: { id: number; name: string; slug: string; description: string; room: string; requires_induction: boolean; photo_url: string | null };
  trained: boolean;
};

type Props = { equipmentByRoom: Record<string, EquipmentItem[]> };

const Index = ({ equipmentByRoom }: Props) => (
  <>
    <PageTitle title="Equipment" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Stack spacing={4}>
        {Object.entries(equipmentByRoom).map(([room, items]) => (
          <Stack key={room} spacing={2}>
            <Typography variant="h5">{room || 'Uncategorised'}</Typography>
            <Grid2 container spacing={2}>
              {items.map(({ equipment, trained }) => (
                <Grid2 key={equipment.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Link href={`/equipment/${equipment.slug}`} underline="none">
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6">{equipment.name}</Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>{equipment.description}</Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          {equipment.requires_induction && (
                            <Chip label={trained ? 'Inducted' : 'Induction required'} color={trained ? 'success' : 'warning'} size="small" />
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid2>
              ))}
            </Grid2>
          </Stack>
        ))}
      </Stack>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
