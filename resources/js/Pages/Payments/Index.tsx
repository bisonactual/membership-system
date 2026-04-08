import React from 'react';
import {
  Button, Chip, Container, FormControl, InputLabel, MenuItem, Paper, Select,
  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Payment = {
  id: number; created_at: string; user: { id: number; name: string };
  reason: string; source: string; amount: number; reference: string; status: string;
};

type Props = {
  payments: { data: Payment[] };
  dateRange: Record<string, string>;
  memberList: Record<string, string>;
  reasonList: Record<string, string>;
  paymentTotal: number;
};

const Index = ({ payments, dateRange, memberList, reasonList, paymentTotal }: Props) => {
  const params = new URLSearchParams(window.location.search);

  return (
    <>
      <PageTitle title="Payments" />
      <Container sx={{ mt: 3, pb: 4 }}>
        <Stack spacing={3}>
          <Paper sx={{ p: 2 }}>
            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const q: Record<string, string> = {}; fd.forEach((v, k) => { if (v) q[k] = v as string; }); router.get('/payments', q); }}>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Date</InputLabel>
                  <Select name="date_filter" defaultValue={params.get('date_filter') || ''} label="Date">
                    <MenuItem value="">All Time</MenuItem>
                    {Object.entries(dateRange).map(([v, l]) => <MenuItem key={v} value={v}>{l}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Member</InputLabel>
                  <Select name="member_filter" defaultValue={params.get('member_filter') || ''} label="Member">
                    <MenuItem value="">All Members</MenuItem>
                    {Object.entries(memberList).map(([id, name]) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Reason</InputLabel>
                  <Select name="reason_filter" defaultValue={params.get('reason_filter') || ''} label="Reason">
                    <MenuItem value="">All Reasons</MenuItem>
                    {Object.entries(reasonList).map(([id, name]) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained" size="small">Filter</Button>
              </Stack>
            </form>
          </Paper>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Member</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Reference</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.data.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.created_at}</TableCell>
                    <TableCell>{p.user?.name}</TableCell>
                    <TableCell>{p.reason}</TableCell>
                    <TableCell>{p.source}</TableCell>
                    <TableCell>£{Number(p.amount).toFixed(2)}</TableCell>
                    <TableCell>{p.reference}</TableCell>
                    <TableCell><Chip label={p.status} size="small" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2">Total: £{Number(paymentTotal).toFixed(2)}</Typography>
        </Stack>
      </Container>
    </>
  );
};

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
