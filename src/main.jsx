import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MainProvider } from './context/MainContex.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </StrictMode>
)
