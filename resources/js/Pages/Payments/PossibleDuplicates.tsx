import React from 'react';
import { Container, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Duplicate = { user: { id: number; name: string }; reason: string; amount: number; count: number };
type Props = { possibleDuplicates: Duplicate[] };

const PossibleDuplicates = ({ possibleDuplicates }: Props) => (
  <>
    <PageTitle title="Possible Duplicate Payments" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow><TableCell>Member</TableCell><TableCell>Reason</TableCell><TableCell>Amount</TableCell><TableCell>Count</TableCell><TableCell /></TableRow>
          </TableHead>
          <TableBody>
            {possibleDuplicates.map((d, i) => (
              <TableRow key={i}>
                <TableCell><Link href={`/account/${d.user.id}`}>{d.user.name}</Link></TableCell>
                <TableCell>{d.reason}</TableCell>
                <TableCell>£{Number(d.amount).toFixed(2)}</TableCell>
                <TableCell>{d.count}</TableCell>
                <TableCell><Link href={`/payments?member_filter=${d.user.id}`}><Button size="small">View payments</Button></Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </>
);

PossibleDuplicates.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default PossibleDuplicates;
