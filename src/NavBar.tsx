import { Container, Stack, Toolbar, Typography } from '@mui/material'
import Link from './Link'
import { signIn } from './utils/siwe'

const NavBar = () => {
  const isLoggedIn = localStorage.getItem('token') != null

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
            <Link href='#' type='link' color="secondary" underline='hover' onClick={signIn}>
              Sign In
            </Link>
          </Typography>
          )}
        </Stack>
      </Toolbar>
    </Container>
  )
}

export default NavBar
