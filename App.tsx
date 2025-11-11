import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import BoshlangichPage from './pages/BoshlangichPage';
import IlmiyFaoliyatPage from './pages/IlmiyFaoliyatPage';
import UquvUslubiyFaoliyatPage from './pages/UquvUslubiyFaoliyatPage';
import ManaviyMarifiyFaoliyatPage from './pages/ManaviyMarifiyFaoliyatPage';
import TashkiliyFaoliyatPage from './pages/TashkiliyFaoliyatPage';
import VerificationPage from './pages/VerificationPage';
import PlaceholderPage from './pages/PlaceholderPage';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/boshlangich" />} />
          <Route path="/boshlangich" element={<BoshlangichPage />} />
          <Route path="/ilmiy-faoliyat" element={<IlmiyFaoliyatPage />} />
          <Route path="/uquv-uslubiy-faoliyat" element={<UquvUslubiyFaoliyatPage />} />
          <Route path="/manaviy-marifiy-faoliyat" element={<ManaviyMarifiyFaoliyatPage />} />
          <Route path="/tashkiliy-faoliyat" element={<TashkiliyFaoliyatPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Routes>
      </AppLayout>
      <Chatbot />
    </Router>
  );
};

export default App;
