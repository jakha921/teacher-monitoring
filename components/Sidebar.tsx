
import React from 'react';
import { Page } from '../types';
import { HomeIcon, ScienceIcon, BookIcon, CommunityIcon, OrgIcon } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  activePage: Page;
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
}

const navItems = [
  { name: 'Boshlangich' as Page, label: 'Бошланғич', icon: HomeIcon },
  { name: 'Ilmiy faoliyat' as Page, label: 'Илмий фаолият', icon: ScienceIcon },
  { name: 'Uquv-uslubiy faoliyat' as Page, label: 'Ўқув-услубий фаолият', icon: BookIcon },
  { name: 'Manaviy-marifiy faoliyat' as Page, label: 'Маънавий-маърифий', icon: CommunityIcon },
  { name: 'Tashkiliy va boshqaruv faoliyati' as Page, label: 'Ташкилий фаолият', icon: OrgIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activePage, setActivePage }) => {
  return (
    <aside className={`flex-shrink-0 bg-blue-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} lg:w-64 overflow-hidden`}>
      <div className="flex items-center justify-center h-20 border-b border-blue-800">
        <h2 className="text-xl font-bold">NIU Portal</h2>
      </div>
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="px-4 py-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(item.name);
                }}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  activePage === item.name
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="ml-4 font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
