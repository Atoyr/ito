import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { getRoom, joinRoom, updateUserName, updateRoomStatus } from '@/lib/ito';
import { Room, User } from '@/lib/ito/types';

import { UserTile } from '../components';
import { useFetchUsers } from '../hooks/useFetchUsers';

export const Ito = () => {

  const { roomId } = useParams<"roomId">();
  const [room, setRoom] = useState<Room | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const users = useFetchUsers(roomId);

  useEffect(() => {
    if (roomId) {
      getRoom(roomId).then((room) => {
        setRoom(room);
        joinRoom(roomId).then((user) => { setUser(user ?? null);});
      });
    }
  }, [roomId]);

  const gameStart = () => {
    if (room) {
      updateRoomStatus(roomId ?? "", "playing");
    }
  };

  const panel = (status) => {
    switch (status) {
      case "waiting":
        return (<Typography>Waiting</Typography>);
      case "playing":
        return (<Typography>Playing</Typography>);
      default:
        return (<Typography>Unknown</Typography>);
    }

  }

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
      {users.map((u) => {
        return (
          <UserTile key={u.id} user={u} myId={user?.id} onNameChange={(name) => { updateUserName(roomId ?? "", u.id, name)}} />
        );

      })}

      {user?.isOwner && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={gameStart}>
          Start Game
        </Button>)
      }
      {panel(room?.status)}
    </Grid>
  </Container>
  );
}

