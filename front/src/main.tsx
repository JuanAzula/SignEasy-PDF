import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PDFViewer from './App.tsx'
import AppRoutes from './router/AppRoutes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)
