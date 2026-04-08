import React from 'react';
import { Card, CardContent, Container, Grid2, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Props = {
  balancePaidIn: number; balancePaidOut: number; balanceLiability: number;
  storageBoxLiability: number; doorKeyLiability: number;
  laserCutterInvestment: number; laserCutterMoneySpent: number;
};

const Stat = ({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) => (
  <Card>
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h3">{value}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
    </CardContent>
  </Card>
);

const Overview = (props: Props) => (
  <>
    <PageTitle title="Payment Stats" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 4 }}><Stat title="Storage Box Liability" value={`£${props.storageBoxLiability}`} /></Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}><Stat title="Door Key Liability" value={`£${props.doorKeyLiability}`} /></Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}><Stat title="Balance Liability" value={`£${props.balanceLiability}`} subtitle={`Paid In: £${props.balancePaidIn} / Spent: £${props.balancePaidOut}`} /></Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}><Stat title="Laser Cutter" value={`£${props.laserCutterInvestment}`} subtitle={`Fees Collected: £${props.laserCutterMoneySpent}`} /></Grid2>
      </Grid2>
    </Container>
  </>
);

Overview.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Overview;
