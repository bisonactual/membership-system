import React from 'react';
import { Chip, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Charge = { id: number; charge_date: string; user: { id: number; name: string }; payment_date: string | null; status: string; amount: number; payment_method: string };
type Props = { charges: { data: Charge[] } };

const SubCharges = ({ charges }: Props) => (
  <>
    <PageTitle title="Subscription Charges" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Charge Date</TableCell>
              <TableCell>Member</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charges.data.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.charge_date}</TableCell>
                <TableCell>{c.user?.name}</TableCell>
                <TableCell>{c.payment_date || '-'}</TableCell>
                <TableCell><Chip label={c.status} size="small" /></TableCell>
                <TableCell>£{Number(c.amount).toFixed(2)}</TableCell>
                <TableCell>{c.payment_method}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </>
);

SubCharges.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default SubCharges;
