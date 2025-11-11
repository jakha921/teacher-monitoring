import React from 'react';

interface DashboardCardProps {
  title: string;
  // FIX: Made the `value` prop optional to allow for cards that only contain children.
  value?: string | number;
  children?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  titleClassName?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, children, className = '', valueClassName = 'text-3xl', titleClassName = 'text-sm' }) => {
  return (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${className}`}>
      <h3 className={`font-medium text-gray-500 ${titleClassName}`}>{title}</h3>
      {/* FIX: Conditionally render the value element only if a value is provided. */}
      {value !== undefined && value !== '' && (
        <div className={`mt-2 font-bold text-blue-900 ${valueClassName}`}>{value}</div>
      )}
      {/* FIX: Adjust the margin-top for children based on whether a value is present for consistent spacing. */}
      {children && <div className={value !== undefined && value !== '' ? "mt-4" : "mt-2"}>{children}</div>}
    </div>
  );
};

export default DashboardCard;
