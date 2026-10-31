import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './vendor/apk-contracts/apk-tokens.css'
import './index.css'
import App from './App.tsx'
import { UnitProvider } from './context/UnitContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UnitProvider>
      <App />
    </UnitProvider>
  </StrictMode>,
)
