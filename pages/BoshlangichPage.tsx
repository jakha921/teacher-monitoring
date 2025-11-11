import React from 'react';
import DashboardCard from '../components/DashboardCard';

const BoshlangichPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Boshlang'ich sahifa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Professor-o'qituvchilar" value={150} />
        <DashboardCard title="Talabalar" value={2500} />
        <DashboardCard title="Ilmiy maqolalar" value={78} />
        <DashboardCard title="O'quv qo'llanmalar" value={45} />
      </div>
      <div className="mt-8">
        <DashboardCard title="So'nggi e'lonlar">
          <p className="text-gray-600">Yangi o'quv yili uchun qabul jarayonlari boshlandi.</p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default BoshlangichPage;
