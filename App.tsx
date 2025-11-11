
import React, { useState } from 'react';
import AppLayout from './components/AppLayout';
import BoshlangichPage from './pages/BoshlangichPage';
import IlmiyFaoliyatPage from './pages/IlmiyFaoliyatPage';
import PlaceholderPage from './pages/PlaceholderPage';
import { Page } from './types';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Boshlangich');

  const renderPage = () => {
    switch (activePage) {
      case 'Boshlangich':
        return <BoshlangichPage />;
      case 'Ilmiy faoliyat':
        return <IlmiyFaoliyatPage />;
      case 'Uquv-uslubiy faoliyat':
        return <PlaceholderPage title="Ўқув-услубий фаолият" />;
      case 'Manaviy-marifiy faoliyat':
        return <PlaceholderPage title="Маънавий-маърифий фаолият" />;
      case 'Tashkiliy va boshqaruv faoliyati':
        return <PlaceholderPage title="Ташкилий ва бошқарув фаолияти" />;
      default:
        return <BoshlangichPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <AppLayout activePage={activePage} setActivePage={setActivePage}>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderPage()}
        </div>
      </AppLayout>
      <Chatbot />
    </div>
  );
};

export default App;
