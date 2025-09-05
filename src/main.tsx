import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './Layout.tsx'
import { ThemeProvider } from './stores/ThemeProvider.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Layout>
        <App />
        <Toaster />
      </Layout>
    </ThemeProvider>
  </StrictMode>,
);
