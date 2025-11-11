import React from 'react';
import DateFilter from './DateFilter';
import { Bell, UserCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Bosh sahifa</h2>
      </div>
      <div className="flex items-center space-x-4">
        <DateFilter />
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Bell size={22} />
        </button>
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <UserCircle size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
