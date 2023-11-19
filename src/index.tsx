import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.scss'
import App from './App/App'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './App/interceptors/request.interceptor'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <React.StrictMode>
      <HashRouter>
         <App />
      </HashRouter>
   </React.StrictMode>
)
