import { Button } from '@mui/material'
import React from 'react'

type ConnectWalletButtonProps = {
    connect: () => void,
    disconnect: () => void,
    isConnected: boolean
}

const ConnectWalletButton = ({connect, disconnect, isConnected}: ConnectWalletButtonProps) => {
  return (
    <Button
      variant='outlined'
      onClick={() => {
          isConnected ? disconnect() : connect()
      }}
    >
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
    </Button>
  )
}

export default ConnectWalletButton
