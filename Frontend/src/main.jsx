import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import App from './App'
import Headbar from './assets/Components/Headbar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Headbar />
    <App />
  </StrictMode>,
)
  