import React from 'react';
import { useForm, router } from '@inertiajs/react';
import {
  Button, Card, CardContent, Chip, Container, Divider, FormControl, InputLabel,
  MenuItem, Select, Stack, TextField, Typography,
} from '@mui/material';
import MainLayout from '../../Layouts/MainLayout';
import PageTitle from '../../Components/PageTitle';

type RoleUser = { id: number; name: string };
type Role = {
  id: number; name: string; title: string; description: string;
  email_public: string; email_private: string; slack_channel: string;
  users: RoleUser[];
};
type Props = { roles: Role[]; memberList: Record<string, string> };

const RoleCard = ({ role, memberList }: { role: Role; memberList: Record<string, string> }) => {
  const { data, setData, put, processing } = useForm({
    title: role.title, description: role.description || '',
    email_public: role.email_public || '', email_private: role.email_private || '',
    slack_channel: role.slack_channel || '',
  });

  return (
    <Card>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); put(`/roles/${role.id}`); }}>
          <Stack spacing={2}>
            <TextField label="Title" value={data.title} onChange={(e) => setData('title', e.target.value)} size="small" fullWidth />
            <TextField label="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} size="small" multiline rows={2} fullWidth />
            <TextField label="Public Email" value={data.email_public} onChange={(e) => setData('email_public', e.target.value)} size="small" fullWidth />
            <TextField label="Private Email" value={data.email_private} onChange={(e) => setData('email_private', e.target.value)} size="small" fullWidth />
            <TextField label="Telegram Channel" value={data.slack_channel} onChange={(e) => setData('slack_channel', e.target.value)} size="small" fullWidth />
            <Button type="submit" variant="contained" size="small" disabled={processing}>Save</Button>
          </Stack>
        </form>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" gutterBottom>Members</Typography>
        <Stack spacing={1}>
          {role.users.map((u) => (
            <Stack key={u.id} direction="row" spacing={1} alignItems="center">
              <Typography>{u.name}</Typography>
              <Button size="small" onClick={() => router.delete(`/roles/${role.id}/users/${u.id}`)}>Remove</Button>
            </Stack>
          ))}
          <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); router.post(`/roles/${role.id}/users`, { user_id: fd.get('user_id') }); }}>
            <Stack direction="row" spacing={1}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Add member</InputLabel>
                <Select name="user_id" label="Add member" defaultValue="">
                  {Object.entries(memberList).map(([id, name]) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
                </Select>
              </FormControl>
              <Button type="submit" size="small" variant="outlined">Add</Button>
            </Stack>
          </form>
        </Stack>
        <Typography variant="caption" color="text.secondary">{role.name}</Typography>
      </CardContent>
    </Card>
  );
};

const Index = ({ roles, memberList }: Props) => (
  <>
    <PageTitle title="Member Roles and Groups" />
    <Container sx={{ mt: 3, pb: 4 }}>
      <Typography gutterBottom>Update group names and descriptions. Assign members to specific roles.</Typography>
      <Stack spacing={3}>
        {roles.map((role) => <RoleCard key={role.id} role={role} memberList={memberList} />)}
      </Stack>
    </Container>
  </>
);

Index.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Index;
