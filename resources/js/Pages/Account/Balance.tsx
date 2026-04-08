import React from 'react';
import { Card, CardContent, Chip, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Payment = { reason: string; method: string; date: string; amount: string; status: string; balanceRowClass: string };
type User = { id: number; name: string };
type Props = { user: User; userBalance: string; userBalanceSign: string; payments: { data: Payment[] } };

const Balance = ({ user, userBalance, userBalanceSign, payments }: Props) => (
  <>
    <PageTitle title="Hackspace Manchester Balance" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Card sx={{ minWidth: 200 }}>
            <CardContent>
              <Typography variant="subtitle2">Your Balance</Typography>
              <Typography variant="h3" color={userBalanceSign === 'positive' ? 'success.main' : 'error.main'}>{userBalance}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Balances have been removed</Typography>
              <Typography sx={{ mt: 1 }}>Now that we can take card payments at the Hackspace, online balance features have been removed. Contact the board if you need to make a remote payment.</Typography>
            </CardContent>
          </Card>
        </Stack>

        <Typography variant="h6">Balance History</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead><TableRow><TableCell>Reason</TableCell><TableCell>Method</TableCell><TableCell>Date</TableCell><TableCell>Amount</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
            <TableBody>
              {payments.data.map((p, i) => (
                <TableRow key={i}><TableCell>{p.reason}</TableCell><TableCell>{p.method}</TableCell><TableCell>{p.date}</TableCell><TableCell>{p.amount}</TableCell><TableCell>{p.status}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  </>
);

Balance.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Balance;
