import { getAccount, getWalletClient } from '@wagmi/core'
import { SiweMessage } from 'siwe';

const createSiweMessage = async (address: string, statement: string) => {
    const res = await fetch(`${process.env.BE_URL}/nonce`, {
        credentials: 'include',
    });

    const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement,
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce: await res.text()
    });

    return message.prepareMessage();
}

export const prepareSiweObject = async () => {
  const { address } = getAccount()
  if (address == null) {
    return undefined
  }

  const walletClient = await getWalletClient()

  const message = await createSiweMessage(address, 'Sign Up with Ethereum')

  let signature: string | undefined
  try {
    signature = await walletClient?.signMessage({
      message
    })
  } catch (err) {
    console.error(err)
  }

  return {message, signature}
}

export const signIn = async () => {
  const siweObject = await prepareSiweObject()

  if (siweObject == null) {
    return
  }
  
  const response = await (await fetch(`${process.env.BE_URL}/sign-in`, {
    method: 'POST',
    body: JSON.stringify({
      siweObject
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })).json()

  // TODO: Check JWT works
  localStorage.setItem('token', response.token);
}
