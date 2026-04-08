import React, { useState } from 'react';
import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';

const Index = () => {
  const [code, setCode] = useState('');

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Hackspace Manchester</Typography>
        <Typography variant="h6" color="success.main" gutterBottom>A gift for you awaits!</Typography>
        <Typography gutterBottom>Enter your gift code below to register your account.</Typography>
        <form action="/register" method="GET">
          <input type="hidden" name="gift_certificate" value="1" />
          <Stack spacing={2}>
            <TextField name="gift_code" label="Gift Code" placeholder="XXX-YYY-ZZZ" value={code} onChange={(e) => setCode(e.target.value)} required fullWidth />
            <Button type="submit" variant="contained">Claim your gift!</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
