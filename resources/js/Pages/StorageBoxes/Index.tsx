import React from 'react';
import { Alert, Button, Chip, Container, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Box = { id: number; location: string; user: { id: number; name: string; active: boolean } | null };
type Props = { storageBoxes: Box[]; memberBoxes: Box[]; can?: { create: boolean; viewOld: boolean } };

const Index = ({ storageBoxes, memberBoxes, can }: Props) => (
  <>
    <PageTitle title="Member Storage" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Stack spacing={3}>
        <Alert severity="info">
          <Typography variant="subtitle1">Storage is changing: Add stickers to your items by 1st July 2025</Typography>
          <Typography variant="body2">Items left without stickers after 1st July 2025 will be disposed of.</Typography>
        </Alert>

        <Paper sx={{ p: 3 }}>
          {memberBoxes.length > 0 ? (
            <>
              <Typography variant="h6">Your storage locations</Typography>
              {memberBoxes.map((box) => (
                <Stack key={box.id} direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                  <Typography>📦 Location {box.location} (#{box.id})</Typography>
                </Stack>
              ))}
            </>
          ) : (
            <Typography>You have not claimed a storage location.</Typography>
          )}
        </Paper>

        {can?.viewOld && (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Member</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storageBoxes.map((box) => (
                  <TableRow key={box.id}>
                    <TableCell><Link href={`/storage_boxes/${box.id}`}>{box.id}</Link></TableCell>
                    <TableCell>{box.location}</TableCell>
                    <TableCell>{box.user ? <Link href={`/members/${box.user.id}`}>{box.user.name}</Link> : 'Available'}</TableCell>
                    <TableCell>
                      {box.user ? (
                        box.user.active ? <Chip label="Claimed" size="small" color="warning" /> : <Chip label="Member left" size="small" color="error" />
                      ) : (
                        <Chip label="Available" size="small" color="success" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
