import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type Address = {
  line_1: string;
  line_2: string;
  line_3: string;
  line_4: string;
  postcode: string;
};

type Induction = {
  key: string;
  name: string;
  userInduction: { is_trained: boolean } | false;
};

type SubscriptionCharge = {
  id: number;
  charge_date: string;
  amount: number;
  status: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  status: string;
  active: boolean;
  trusted: boolean;
  key_holder: boolean;
  online_only: boolean;
  monthly_subscription: number;
  payment_method: string;
  payment_day: number;
  subscription_expires: string | null;
  profile_photo: string | null;
  induction_completed: boolean;
  has_payment_warning: boolean;
};

type Props = {
  user: User;
  doorCode: string | null;
  inductions: Induction[];
  newAddress: Address | null;
  subscriptionCharges: { data: SubscriptionCharge[] };
  memberBalance: string;
  hasSubscriptionPaymentsInProgress: boolean;
  can?: Record<string, boolean>;
  urls?: Record<string, string>;
};

const statusColor = (status: string) => {
  switch (status) {
    case 'active': return 'success';
    case 'setting-up': return 'info';
    case 'leaving': case 'left': return 'default';
    case 'suspended': return 'error';
    default: return 'warning';
  }
};

const Show = ({ user, doorCode, inductions, subscriptionCharges, memberBalance }: Props) => {
  const actionButtons = (
    <Stack direction="row" spacing={1}>
      <Link href={`/account/${user.id}/edit`} underline="none">
        <Button variant="outlined" startIcon={<EditIcon />}>Edit</Button>
      </Link>
      <Link href={`/members/${user.id}`} underline="none">
        <Button variant="outlined" startIcon={<PersonIcon />}>View Profile</Button>
      </Link>
    </Stack>
  );

  return (
    <>
      <PageTitle title={user.name} subtitle={user.email} actionButtons={actionButtons} />
      <Container sx={{ mt: 3, pb: 4 }}>
        <Stack spacing={3}>
          {/* Status bar */}
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Chip label={user.status} color={statusColor(user.status)} />
              {user.trusted && <Chip label="Trusted" color="primary" variant="outlined" />}
              {user.key_holder && <Chip label="Key Holder" color="secondary" variant="outlined" />}
              <Typography variant="body2" color="text.secondary">
                £{user.monthly_subscription}/month via {user.payment_method || 'not set'}
              </Typography>
              {user.subscription_expires && (
                <Typography variant="body2" color="text.secondary">
                  Expires: {user.subscription_expires}
                </Typography>
              )}
            </Stack>
          </Paper>

          {/* Balance */}
          <Card>
            <CardContent>
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h4">{memberBalance}</Typography>
            </CardContent>
          </Card>

          {/* Inductions */}
          {inductions.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Inductions</Typography>
                <Stack spacing={1}>
                  {inductions.map((induction, i) => (
                    <Stack key={i} direction="row" spacing={1} alignItems="center">
                      <Typography>{induction.name}</Typography>
                      {induction.userInduction ? (
                        <Chip label={induction.userInduction.is_trained ? 'Trainer' : 'Inducted'} color="success" size="small" />
                      ) : (
                        <Chip label="Not inducted" size="small" />
                      )}
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Subscription charges */}
          {subscriptionCharges.data.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Subscription Payments</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subscriptionCharges.data.map((charge) => (
                        <TableRow key={charge.id}>
                          <TableCell>{charge.charge_date}</TableCell>
                          <TableCell>£{charge.amount}</TableCell>
                          <TableCell>
                            <Chip label={charge.status} size="small" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Container>
    </>
  );
};

Show.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Show;
