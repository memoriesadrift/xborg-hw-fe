import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '../src/NavBar';
import { Button, Stack, TextField } from '@mui/material';
import WalletInfo from '../src/WalletInfo';
import { useState } from 'react';
import { prepareSiweObject } from '../src/utils/siwe';

export default function SignUp() {
  const [response, setResponse] = useState('')
  const [formData, setFormData] = useState({
      name: '',
      animal: '',
  })

  const handleInputChange = (e: any) => {
    const {name, value} = e.target

    setFormData({
        ...formData,
        [name]: value
    })
    console.log(formData)
  }

  const postSignUp = async () => {
    console.log('starting sign up')

    let siweObject
    try {
      siweObject = await prepareSiweObject()
    } catch (error) {
      setResponse('Signing Error')
      return
    }

    if (siweObject == null) {
      return
    }
    
    const res = await fetch(`${process.env.BE_URL}/sign-up`, {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        siwe: siweObject,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })

    setResponse(await res.text())
  }

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
        <Typography variant="h6" component="h6" gutterBottom sx={{mt: 4}}>
          Sign Up
        </Typography>
        <Stack>
          <TextField fullWidth label="Name" name='name' id="name" margin={'normal'} onChange={handleInputChange} value={formData.name}/>
          <TextField fullWidth label="Your Favourite Animal" name='animal' id="animal" margin={'normal'}onChange={handleInputChange} value={formData.animal} />
          <Button variant='contained' onClick={(e) => {
              e.preventDefault()
              postSignUp()
          }}>
            Sign Up
          </Button>
        </Stack>
        <Typography variant="body1" component="p" gutterBottom sx={{mt: 4}}>
          {response}
        </Typography>
      </Box>
    </Container>
  );
}
