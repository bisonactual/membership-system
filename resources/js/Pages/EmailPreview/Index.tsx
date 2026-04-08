import React from 'react';
import { Alert, Card, CardContent, Container, Link, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Props = { emails: Record<string, string>; notifications: Record<string, string> };

const Index = ({ emails, notifications }: Props) => (
  <>
    <PageTitle title="Email & Notification Previews" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Typography gutterBottom>Preview all email templates and notifications. These use dummy data.</Typography>
      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Email Templates</Typography>
            <List dense>
              {Object.entries(emails).map(([name, url]) => (
                <ListItemButton key={name} href={url} target="_blank" component={Link}>
                  <ListItemText primary={name} secondary="Click to preview" />
                </ListItemButton>
              ))}
            </List>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Notification Templates</Typography>
            <List dense>
              {Object.entries(notifications).map(([name, url]) => (
                <ListItemButton key={name} href={url} target="_blank" component={Link}>
                  <ListItemText primary={name} secondary="Click to preview" />
                </ListItemButton>
              ))}
            </List>
          </CardContent>
        </Card>
        <Alert severity="info">These previews open in a new tab and show actual content that would be sent.</Alert>
      </Stack>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
