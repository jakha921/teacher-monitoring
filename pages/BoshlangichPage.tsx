
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend, PolarAngleAxis } from 'recharts';
import DashboardCard from '../components/DashboardCard';

const departmentData = [
  { name: 'Билим', progress: 65, color: '#3b82f6' },
  { name: 'Texnologiya', progress: 75, color: '#22c55e' },
  { name: 'Iqtisod', progress: 60, color: '#f97316' },
  { name: 'Muhandis', progress: 50, color: '#ef4444' },
];

const potentialData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 14 },
  { name: 'Apr', value: 18 },
  { name: 'May', value: 21 },
  { name: 'Jun', value: 25 },
];

const mainProgressData = [{ name: 'Progress', value: 64, fill: '#0D47A1' }];

const BoshlangichPage: React.FC = () => {
  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Бошланғич Дашборд</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Progress */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
                 <h3 className="text-lg font-semibold text-gray-700 mb-4">Umumiy Bajarilish Foizi</h3>
                 <ResponsiveContainer width="100%" height={250}>
                    <RadialBarChart 
                        innerRadius="70%" 
                        outerRadius="100%" 
                        data={mainProgressData} 
                        startAngle={90} 
                        endAngle={-270}
                        barSize={30}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar 
                            background 
                            dataKey="value"
                            angleAxisId={0}
                        />
                         <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-current text-blue-900 text-4xl font-bold"
                        >
                            {`${mainProgressData[0].value}%`}
                        </text>
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
            
            {/* Department Performance */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">KAFEDRA KO‘RSATKICHLARI</h3>
                <div className="space-y-5">
                    {departmentData.map((dept) => (
                        <div key={dept.name}>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-600">{dept.name}</span>
                                <span className="text-sm font-medium" style={{ color: dept.color }}>{dept.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="h-2.5 rounded-full" style={{ width: `${dept.progress}%`, backgroundColor: dept.color }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* University Potential */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="text-lg font-semibold text-gray-700 mb-4">Universitet Potensiali Trendi</h3>
             <ResponsiveContainer width="100%" height={300}>
                <LineChart data={potentialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#0D47A1" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
             </ResponsiveContainer>
        </div>
    </div>
  );
};

export default BoshlangichPage;
