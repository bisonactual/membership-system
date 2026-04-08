import React from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Props = { historyData: (string | number)[][] };

const History = ({ historyData }: Props) => {
  const headers = historyData[0] as string[];
  const rows = historyData.slice(1);

  return (
    <>
      <PageTitle title="Member History" />
      <Container sx={{ mt: 3, pb: 4 }}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead><TableRow>{headers.map((h) => <TableCell key={h}>{h}</TableCell>)}</TableRow></TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>{row.map((cell, j) => <TableCell key={j}>{cell}</TableCell>)}</TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

History.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default History;
