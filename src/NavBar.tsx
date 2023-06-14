import { Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import Link from './Link'
import { signIn } from './utils/siwe'
import { useEffect, useState } from 'react'

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false) 
  
  useEffect(() => {
    setIsLoggedIn(
      window.localStorage.getItem('token') != null
    )
  }, [])

  return (
    <Container>
      <Toolbar sx={{justifyContent: 'center', minHeight: '48px', alignItems: 'center', mb: 4}}>
        <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center'}} >
          <Typography sx={{ mx: 6 }} color="text.secondary">
            <Link href="/" color="secondary" underline='hover'>
              Home
            </Link>
          </Typography>
          <Typography sx={{ mx: 6 }} color="text.secondary">
            <Link href="/sign-up" color="secondary" underline='hover'>
              Sign Up
            </Link>
          </Typography>
          {isLoggedIn ? (
            <Typography sx={{ mx: 6 }} color="text.secondary">
              <Link href="/profile" color="secondary" underline='hover'>
                Profile
              </Link>
            </Typography>
          ) : (
          <Typography sx={{ mx: 6 }} color="text.secondary">
            <Button variant='text' color="secondary" onClick={signIn}>
              Sign In
            </Button>
          </Typography>
          )}
        </Stack>
      </Toolbar>
    </Container>
  )
}

export default NavBar
