import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppProvider } from './component/Context';
import { Topbar } from './component/Topbar/Topbar';
import { TheSidebar } from './component/TheSidebar/TheSidebar';
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap your whole app */}
      <AppProvider>
        <div className="flex h-screen">
          <TheSidebar />
          <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
            <Topbar />
            <App />
          </div>
        </div>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
