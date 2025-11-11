import React from 'react';
import { BookOpen, BarChart2, FileText, Users, Settings, CheckSquare } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/boshlangich', label: 'Boshlang\'ich', icon: <BarChart2 size={20} /> },
  { href: '/ilmiy-faoliyat', label: 'Ilmiy faoliyat', icon: <BookOpen size={20} /> },
  { href: '/uquv-uslubiy-faoliyat', label: 'O\'quv-uslubiy faoliyat', icon: <FileText size={20} /> },
  { href: '/manaviy-marifiy-faoliyat', label: 'Ma\'naviy-ma\'rifiy faoliyat', icon: <Users size={20} /> },
  { href: '/tashkiliy-faoliyat', label: 'Tashkiliy faoliyat', icon: <Settings size={20} /> },
  { href: '/verification', label: 'Verification', icon: <CheckSquare size={20} /> },
];
