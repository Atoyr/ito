import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const Home = () => {
  return (
  <Container>
    <Grid>
      <Grid xs={9} md={12}>
        <Typography variant="h1" component="div" gutterBottom
          sx={{ textAlign: "center", mt: 10, mb: 2, }}>
          ito
        </Typography>
        <Typography variant="h2" component="div" gutterBottom
          sx={{
            textAlign: "center",
            my: 2,
          }}>
          Welcome to ito
        </Typography>
      </Grid>
      <Grid xs={12} style={{textAlign: "center"}}>
        <Button variant="outlined" href="/" size="large">START</Button>
      </Grid>
      <Grid xs={12} style={{textAlign: "center"}}>
        <Button variant="outlined" href="/" size="large">JOIN</Button>
      </Grid>
    </Grid>
  </Container>
  );
}

