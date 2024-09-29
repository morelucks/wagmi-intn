import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { WagmiProvider } from 'wagmi'
import { config } from '../config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()


function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>

        <>
          <div>
            <h2>Account</h2>

            <div>
              status: {account.status}
              <br />
              addresses: {JSON.stringify(account.addresses)}
              <br />
              chainId: {account.chainId}
            </div>

            {account.status === 'connected' && (
              <button type="button" onClick={() => disconnect()}>
                Disconnect
              </button>
            )}
          </div>

          <div>
            <h2>Connect</h2>
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
              >
                {connector.name}
              </button>
            ))}
            <div>{status}</div>
            <div>{error?.message}</div>
          </div>
        </>
      </QueryClientProvider>

    </WagmiProvider>

  )
}

export default App
