import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '../src/NavBar';
import WalletInfo from '../src/WalletInfo';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const profile = () => {
  const { address } = useAccount()
  const [profile, setProfile] = useState({
      name: '',
      animal: ''
  })
  
  useEffect(() => {
    const fetchProfileData = async () => {
      const profileData = await (await fetch(`${process.env.BE_URL}/profile`, {
        credentials: 'include'
      })).json()
      
      setProfile({
        name: profileData.name,
        animal: profileData.animal,
      })
    }

    fetchProfileData()
  }, [address])

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
        <Typography variant="body1" component="p" gutterBottom>
          {`Eth Address: ${address}`}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {`Name: ${profile.name}`}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {`Favourite Animal: ${profile.animal}`}
        </Typography>
        <WalletInfo/>
      </Box>
    </Container>
  )
}

export default profile
