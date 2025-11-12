// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { SidebarProvider } from '../src/components/Dashbord/context/sidebarContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

  <SidebarProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </SidebarProvider>
 

)
