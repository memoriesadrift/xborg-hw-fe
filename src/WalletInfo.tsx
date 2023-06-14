import { Stack, Typography } from '@mui/material'
import ConnectWalletButton from './ConnectWalletButton';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected'

const WalletInfo = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const disconnectAndRemoveJWT = () => {
    localStorage.set('token', null)
    disconnect()
  }

  return (
    <Stack>
      <Typography variant='body1' component="p" gutterBottom>
        {`Your wallet address: ${address || 'Wallet not connected'}`}
      </Typography>
      <ConnectWalletButton {...{connect, disconnect: disconnectAndRemoveJWT, isConnected}} />
    </Stack>
  )
}

export default WalletInfo
