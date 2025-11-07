import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import In from './in.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <In/>
  </StrictMode>,
)
