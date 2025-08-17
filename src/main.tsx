import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from "@tonconnect/ui-react";

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl="https://rom6n.github.io/mc1f/tonconnect-manifest.json">
    <StrictMode>
      <App />
    </StrictMode>
  </TonConnectUIProvider>
)
