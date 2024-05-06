import { Button, Typography } from '@mui/material';

import { User } from '@/lib/ito/types';


interface UserProps {
  user: User;
  myId: string | null;
  onNameChange: (name: string) => void;
}

export const UserTile = (props: UserProps) => {
  const { user, myId } = props;
  const me = user.id === myId;

  const handleUpdateName = () => {
    const name = prompt("新しい名前を入力してください", user.name);
    if (name) {
      props.onNameChange(name);
    }
  }

  return(
    <Typography variant="h3" component="div" gutterBottom
    sx={{
      textAlign: "center",
      my: 2,
      color: me ? "red" : "black",
    }}>
    {user.name}
    {me && ( <Button variant="contained" color="primary" sx={{ mx: 2 }} onClick={handleUpdateName} > 名前の変更 </Button>)}
    </Typography>
  );
};
