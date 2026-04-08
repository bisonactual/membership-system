import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import {
  Button,
  Chip,
  Container,
  Link,
  Paper,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type User = {
  id: number;
  name: string;
  email: string;
  status: string;
  key_holder: boolean;
  trusted: boolean;
  created_at: string;
  seen_at: string | null;
  profile_photo: string | null;
};

type Props = {
  users: { data: User[]; total: number; current_page: number; last_page: number };
};

const Index = ({ users }: Props) => {
  const params = new URLSearchParams(window.location.search);
  const [filter, setFilter] = useState(params.get('filter') || '');
  const showLeft = params.get('showLeft') === '1';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/account', { filter, showLeft: showLeft ? '1' : '0' }, { preserveState: true });
  };

  const actionButtons = (
    <Link href="/notification-email/create" underline="none">
      <Button variant="outlined">Email Members</Button>
    </Link>
  );

  return (
    <>
      <PageTitle title="Members" actionButtons={actionButtons} />
      <Container sx={{ mt: 3, pb: 4 }}>
        <Stack spacing={3}>
          <Tabs value={showLeft ? 1 : 0}>
            <Tab label="Active Members" onClick={() => router.get('/account', { showLeft: '0' })} />
            <Tab label="Old Members" onClick={() => router.get('/account', { showLeft: '1' })} />
          </Tabs>

          <Paper sx={{ p: 2 }}>
            <form onSubmit={handleSearch}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  size="small"
                  placeholder="Filter by name, email, username, or keyfob"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  fullWidth
                />
                <Button type="submit" variant="contained">Search</Button>
              </Stack>
            </form>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {users.total} records
            </Typography>
          </Paper>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Key Holder</TableCell>
                  <TableCell>Trusted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.data.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Link href={`/account/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell><Chip label={user.status} size="small" /></TableCell>
                    <TableCell>{user.key_holder ? '✓' : ''}</TableCell>
                    <TableCell>{user.trusted ? '✓' : ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </>
  );
};

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
