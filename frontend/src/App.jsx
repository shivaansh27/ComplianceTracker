import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientList from './pages/ClientList';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientList />} />
        <Route path="/client/:clientId" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;