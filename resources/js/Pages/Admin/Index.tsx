import React from 'react';
import { Card, CardContent, Container, Grid2, Link, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

const sections = [
  { title: 'Manage Members', links: [{ label: 'Search, find, view accounts', href: '/account' }, { label: 'Recent Members', href: '/account?sortBy=seen_at&direction=desc&limit=20' }] },
  { title: 'View Logs', links: [{ label: "See what's been going on", href: '/logs' }] },
  { title: 'Manage Roles & Teams', links: [{ label: 'Move people in and out of roles', href: '/roles' }] },
  { title: 'Inductions', links: [{ label: 'Who has completed general induction', href: '/member_inductions' }] },
  { title: 'Payments', links: [{ label: 'All payments', href: '/payments' }, { label: 'Subscription Charges', href: '/payments/sub-charges' }] },
];

const Index = () => (
  <>
    <PageTitle title="Admin Area" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Grid2 container spacing={3}>
        {sections.map((s) => (
          <Grid2 key={s.title} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{s.title}</Typography>
                <List dense>
                  {s.links.map((l) => (
                    <ListItemButton key={l.href} href={l.href} component={Link}>
                      <ListItemText primary={l.label} />
                    </ListItemButton>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
