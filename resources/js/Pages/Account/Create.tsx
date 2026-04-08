import React from 'react';
import { useForm } from '@inertiajs/react';
import {
  Button, Card, CardContent, Checkbox, Container, FormControl, FormControlLabel,
  FormLabel, Link, Paper, Radio, RadioGroup, Stack, TextField, Typography, Alert,
} from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';

type PriceOption = { title: string; description: string; value_in_pence: number };
type GiftDetails = { from: string; to: string; months: number; credit: number };

type Props = {
  minAmount: number;
  recommendedAmount: number;
  priceOptions: PriceOption[];
  gift: boolean;
  gift_code: string;
  gift_valid: boolean;
  gift_details: GiftDetails;
};

const Create = ({ minAmount, recommendedAmount, priceOptions, gift, gift_code, gift_valid, gift_details }: Props) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '', password: '', given_name: '', family_name: '', display_name: '',
    pronouns: '', suppress_real_name: '0', phone: '', emergency_contact: '',
    'address.line_1': '', 'address.line_2': '', 'address.line_3': '', 'address.line_4': '', 'address.postcode': '',
    monthly_subscription: String(recommendedAmount / 100), online_only: '0',
    rules_agreed: false, gift_code: gift_code || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/account');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" gutterBottom>Join Hackspace Manchester</Typography>
      <Typography gutterBottom>Welcome! Hackspace Manchester is a fantastic space and community of like minded people.</Typography>

      {gift && (
        <Alert severity={gift_valid ? 'success' : 'error'} sx={{ mb: 3 }}>
          {gift_valid ? (
            <>🎁 Hey {gift_details.to}, your gift from {gift_details.from} has been applied!
              {gift_details.months > 0 && ` ${gift_details.months} months free.`}
              {gift_details.credit > 0 && ` £${gift_details.credit} credit.`}
            </>
          ) : "We couldn't find that gift code. You can try again or register without it."}
        </Alert>
      )}

      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography variant="h6">Login details</Typography>
            <TextField label="Email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={!!errors.email} helperText={errors.email} required fullWidth />
            <TextField label="Password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={!!errors.password} helperText={errors.password} required fullWidth />

            <Typography variant="h6">Profile</Typography>
            <TextField label="Username" value={data.display_name} onChange={(e) => setData('display_name', e.target.value)} error={!!errors.display_name} helperText={errors.display_name} required fullWidth />
            <TextField label="Pronouns (optional)" value={data.pronouns} onChange={(e) => setData('pronouns', e.target.value)} fullWidth />

            <Typography variant="h6">Membership Payment</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {priceOptions.map((opt) => (
                <Card key={opt.value_in_pence} variant="outlined" sx={{ flex: '1 1 200px', cursor: 'pointer', border: data.monthly_subscription === String(opt.value_in_pence / 100) ? '2px solid' : undefined, borderColor: 'primary.main' }}
                  onClick={() => setData('monthly_subscription', String(opt.value_in_pence / 100))}>
                  <CardContent>
                    <Typography variant="subtitle1">{opt.title}: £{(opt.value_in_pence / 100).toFixed(2)}</Typography>
                    <Typography variant="body2" color="text.secondary">{opt.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
            <TextField label="Monthly amount (£)" type="number" value={data.monthly_subscription} onChange={(e) => setData('monthly_subscription', e.target.value)} inputProps={{ min: minAmount / 100, step: 1 }} error={!!errors.monthly_subscription} helperText={errors.monthly_subscription} fullWidth />

            <Typography variant="h6">Contact details</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField label="First Name" value={data.given_name} onChange={(e) => setData('given_name', e.target.value)} error={!!errors.given_name} helperText={errors.given_name} required fullWidth />
              <TextField label="Surname" value={data.family_name} onChange={(e) => setData('family_name', e.target.value)} error={!!errors.family_name} helperText={errors.family_name} required fullWidth />
            </Stack>

            <FormControl>
              <FormLabel>Real name privacy</FormLabel>
              <RadioGroup value={data.suppress_real_name} onChange={(e) => setData('suppress_real_name', e.target.value)}>
                <FormControlLabel value="0" control={<Radio />} label="Yes, my real name may be shared" />
                <FormControlLabel value="1" control={<Radio />} label="No, keep my real name private" />
              </RadioGroup>
            </FormControl>

            <TextField label="Address Line 1" value={data['address.line_1']} onChange={(e) => setData('address.line_1', e.target.value)} required fullWidth />
            <TextField label="Address Line 2" value={data['address.line_2']} onChange={(e) => setData('address.line_2', e.target.value)} fullWidth />
            <TextField label="Address Line 3" value={data['address.line_3']} onChange={(e) => setData('address.line_3', e.target.value)} fullWidth />
            <TextField label="Address Line 4" value={data['address.line_4']} onChange={(e) => setData('address.line_4', e.target.value)} fullWidth />
            <TextField label="Post Code" value={data['address.postcode']} onChange={(e) => setData('address.postcode', e.target.value)} required fullWidth />
            <TextField label="Phone" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} error={!!errors.phone} helperText={errors.phone} required fullWidth />
            <TextField label="Emergency Contact" value={data.emergency_contact} onChange={(e) => setData('emergency_contact', e.target.value)} helperText="Name and contact details of someone we can contact if needed" required fullWidth />

            <Alert severity="warning">
              Some tools may pose a risk to those with pacemakers. Please consult your doctor about risks of using machinery.
            </Alert>

            <Typography>
              Please read the <Link href="https://hacman.org.uk/rules" target="_blank">rules and code of conduct</Link>.
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={data.rules_agreed} onChange={(e) => setData('rules_agreed', e.target.checked)} />}
              label="I agree to the Hackspace Manchester rules and code of conduct"
            />
            {errors.rules_agreed && <Typography color="error" variant="body2">{errors.rules_agreed}</Typography>}

            <Button type="submit" variant="contained" size="large" disabled={processing}>Join Hackspace Manchester</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

Create.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Create;
