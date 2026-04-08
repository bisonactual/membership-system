import React, { useState } from 'react';
import { Chip, Container, Link, Paper, Stack, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type UserBalance = { id: number; name: string; status: string; cash_balance: number; formatted_balance: string };

type Props = {
  activeUsersInCreditQty: number; activeUsersInCreditSum: number;
  activeUsersInDebtQty: number; activeUsersInDebtSum: number;
  inactiveUsersInCreditQty: number; inactiveUsersInCreditSum: number;
  inactiveUsersInDebtQty: number; inactiveUsersInDebtSum: number;
  activeUsers: UserBalance[]; inactiveUsers: UserBalance[];
};

const Balances = (props: Props) => {
  const [tab, setTab] = useState(0);
  const users = tab === 0 ? props.activeUsers : props.inactiveUsers;

  return (
    <>
      <PageTitle title="Balances Overview" />
      <Container sx={{ mt: 3, pb: 4 }}>
        <Stack spacing={3}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow><TableCell /><TableCell colSpan={2}>In Credit</TableCell><TableCell colSpan={2}>In Debt</TableCell></TableRow>
                <TableRow><TableCell /><TableCell>Users</TableCell><TableCell>Sum</TableCell><TableCell>Users</TableCell><TableCell>Sum</TableCell></TableRow>
              </TableHead>
              <TableBody>
                <TableRow><TableCell>Active</TableCell><TableCell>{props.activeUsersInCreditQty}</TableCell><TableCell>£{props.activeUsersInCreditSum.toFixed(2)}</TableCell><TableCell>{props.activeUsersInDebtQty}</TableCell><TableCell>£{props.activeUsersInDebtSum.toFixed(2)}</TableCell></TableRow>
                <TableRow><TableCell>Left</TableCell><TableCell>{props.inactiveUsersInCreditQty}</TableCell><TableCell>£{props.inactiveUsersInCreditSum.toFixed(2)}</TableCell><TableCell>{props.inactiveUsersInDebtQty}</TableCell><TableCell>£{props.inactiveUsersInDebtSum.toFixed(2)}</TableCell></TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Active Users" /><Tab label="Inactive Users" />
          </Tabs>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Status</TableCell><TableCell>Balance</TableCell></TableRow></TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell><Link href={`/account/${u.id}`}>{u.name}</Link></TableCell>
                    <TableCell><Chip label={u.status} size="small" /></TableCell>
                    <TableCell><Chip label={`£${(u.cash_balance / 100).toFixed(2)}`} color={u.cash_balance < 0 ? 'error' : 'info'} size="small" /></TableCell>
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

Balances.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Balances;
