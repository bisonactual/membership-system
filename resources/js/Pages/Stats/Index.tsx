import React from 'react';
import { Card, CardContent, Container, Grid2, Stack, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Props = {
  expectedIncome: number; otherIncome: number; rent: number; electric: number;
  otherOutgoings: number; totalIncome: number; totalOutgoings: number;
  averageMonthlyAmount: number; numMembers: number; recommendedPayment: number;
  payingRecommendedOrAbove: number;
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <Card><CardContent sx={{ textAlign: 'center' }}><Typography variant="body2" color="text.secondary">{label}</Typography><Typography variant="h4">{value}</Typography></CardContent></Card>
);

const Index = (props: Props) => (
  <>
    <PageTitle title="Stats" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Stack spacing={3}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, md: 3 }}><Stat label="Active Members" value={props.numMembers} /></Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}><Stat label="Avg Monthly" value={`£${props.averageMonthlyAmount}`} /></Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}><Stat label="Expected Income" value={`£${props.expectedIncome}`} /></Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}><Stat label="Paying ≥£{props.recommendedPayment}" value={props.payingRecommendedOrAbove} /></Grid2>
        </Grid2>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Income vs Outgoings</Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2">Income</Typography>
                <Typography>Subscriptions: £{props.expectedIncome}</Typography>
                <Typography>Other: £{props.otherIncome}</Typography>
                <Typography variant="h6">Total: £{props.totalIncome}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2">Outgoings</Typography>
                <Typography>Rent: £{props.rent}</Typography>
                <Typography>Electric: £{props.electric}</Typography>
                <Typography>Other: £{props.otherOutgoings}</Typography>
                <Typography variant="h6">Total: £{props.totalOutgoings}</Typography>
              </Grid2>
            </Grid2>
            <Typography variant="h5" sx={{ mt: 2 }} color={props.totalIncome >= props.totalOutgoings ? 'success.main' : 'error.main'}>
              Net: £{props.totalIncome - props.totalOutgoings}/month
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
