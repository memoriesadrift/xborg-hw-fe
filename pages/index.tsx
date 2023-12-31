import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '../src/NavBar';
import WalletInfo from '../src/WalletInfo';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NavBar/>
        <Typography variant="h4" component="h1" gutterBottom>
          X-Borg Homework FE
        </Typography>
        <WalletInfo/>
      </Box>
    </Container>
  );
}
