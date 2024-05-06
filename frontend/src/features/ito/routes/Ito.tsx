import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { getRoom, getUsers, joinRoom } from '@/lib/ito';
import { Room, User } from '@/lib/ito/types';

export const Ito = () => {

  const { roomId } = useParams<"roomId">();
  const [room, setRoom] = useState<Room | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (roomId) {
      getRoom(roomId).then((room) => {
        setRoom(room);
        joinRoom(roomId);
        getUsers(roomId).then((users) => {
          setUsers(users);
        });
      });
    }
  }, [roomId]);


  return (
  <Container>
    <Grid>
      <Grid xs={9} md={12}>
        <Typography variant="h1" component="div" gutterBottom
          sx={{ textAlign: "center", mt: 10, mb: 2, }}>
          {room?.status === "waiting" ? "Waiting" : "Playing"}
        </Typography>
        <Typography variant="h2" component="div" gutterBottom
          sx={{
            textAlign: "center",
            my: 2,
          }}>
          Welcome to ito
        </Typography>
      </Grid>
      {users.map((user) => (
        <Grid xs={9} md={12}>
          <Typography variant="h3" component="div" gutterBottom
            sx={{
              textAlign: "center",
              my: 2,
            }}>
            {user.name}
          </Typography>
        </Grid>
      ))}

    </Grid>
  </Container>
  );
}


