import React from 'react';
import { Card, CardContent, Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Entry = { trainerUser: { id: number; given_name: string; display_name: string }; total: number };
type Props = { threeMonths: Entry[]; thisYear: Entry[]; lastYear: Entry[]; allTime: Entry[] };

const Board = ({ title, data }: { title: string; data: Entry[] }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead><TableRow><TableCell>Rank</TableCell><TableCell>Trainer</TableCell><TableCell>Inductions</TableCell></TableRow></TableHead>
          <TableBody>
            {data.map((e, i) => (
              <TableRow key={e.trainerUser.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell><Link href={`/members/${e.trainerUser.id}`}>{e.trainerUser.given_name} ({e.trainerUser.display_name})</Link></TableCell>
                <TableCell>{e.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

const Index = ({ threeMonths, thisYear, lastYear, allTime }: Props) => (
  <>
    <PageTitle title="Leaderboard" />
    <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
      <Typography gutterBottom>Celebrating members who have volunteered and trained new members on equipment.</Typography>
      <Stack spacing={3}>
        <Board title="Last 3 months" data={threeMonths} />
        <Board title="Year to date" data={thisYear} />
        <Board title="Last year" data={lastYear} />
        <Board title="All time" data={allTime} />
      </Stack>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
