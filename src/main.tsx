import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { preload } from 'react-dom'
import geist400Woff2 from '@fontsource/geist/files/geist-latin-400-normal.woff2?url'
import geist700Woff2 from '@fontsource/geist/files/geist-latin-700-normal.woff2?url'
import '@fontsource/geist/latin-400.css'
import '@fontsource/geist/latin-500.css'
import '@fontsource/geist/latin-600.css'
import '@fontsource/geist/latin-700.css'
import './styles/globals.css'
import App from './App.tsx'

preload(geist400Woff2, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })
preload(geist700Woff2, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
