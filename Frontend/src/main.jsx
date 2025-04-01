import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import App from './App'
import './index.css'
// import Headbar from './assets/Components/Headbar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Headbar /> */}
    <App />
  </StrictMode>,
)
  