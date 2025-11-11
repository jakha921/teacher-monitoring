
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardCard from '../components/DashboardCard';

const conferenceData = [
  { year: '2020', count: 5 },
  { year: '2021', count: 8 },
  { year: '2022', count: 12 },
  { year: '2023', count: 15 },
  { year: '2024', count: 22 },
];

const thesisData = [
  { type: 'Bakalavr', count: 45 },
  { type: 'Magistr', count: 20 },
  { type: 'PhD', count: 8 },
];

const IlmiyFaoliyatPage: React.FC = () => {
  const totalPublications = 34;
  const grantsTotal = 900000000;
  const commercializedProgress = 65;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Илмий фаолият</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Umumiy Ilmiy Ishlar" 
          value={totalPublications}
          className="lg:col-span-2"
          valueClassName="text-5xl"
        >
          <div className="grid grid-cols-3 gap-4 mt-4">
             <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xs text-blue-800 font-semibold">OAK ro‘yxatidagi maqolalar</p>
                <p className="text-xl font-bold text-blue-900 mt-1">12</p>
             </div>
             <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-xs text-green-800 font-semibold">DGU Guvohnomalari</p>
                <p className="text-xl font-bold text-green-900 mt-1">2</p>
             </div>
             <div className="bg-indigo-50 p-3 rounded-lg text-center">
                <p className="text-xs text-indigo-800 font-semibold">Web of Science / Scopus</p>
                <p className="text-xl font-bold text-indigo-900 mt-1">5</p>
             </div>
          </div>
        </DashboardCard>
        
        <DashboardCard 
            title="Grantlar va Loyihalar" 
            value={new Intl.NumberFormat('uz-UZ').format(grantsTotal) + ' soʻm'}
            valueClassName="text-2xl"
        >
            <p className="text-xs text-gray-500 mt-3">Tijoratlashtirilgan shartnomalar</p>
             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${commercializedProgress}%` }}></div>
            </div>
            <p className="text-right text-sm font-semibold text-green-600 mt-1">{commercializedProgress}%</p>
        </DashboardCard>

        <DashboardCard title="Akademik Status">
            <div className="space-y-3 mt-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">PhD/DSc himoyasi</span>
                    <span className="font-bold text-lg text-blue-900 bg-blue-100 rounded-full px-3 py-1">3</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dotsent/Professor unvonlari</span>
                    <span className="font-bold text-lg text-blue-900 bg-blue-100 rounded-full px-3 py-1">2</span>
                </div>
            </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Konferensiyalarda Ishtirok</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conferenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" name="Ishtiroklar soni" stroke="#0D47A1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tezislar Statistikasi</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={thesisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Tezislar soni" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IlmiyFaoliyatPage;
