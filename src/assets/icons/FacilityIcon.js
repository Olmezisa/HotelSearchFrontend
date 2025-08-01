import React from 'react';
import { Sun, Moon, Wind, Hotel, Info, CreditCard } from 'lucide-react';

export const FacilityIcon = ({ name }) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('pool')) return <Moon className="h-4 w-4 mr-2 text-blue-500" />;
  if (lowerName.includes('bar')) return <CreditCard className="h-4 w-4 mr-2 text-green-500" />;
  if (lowerName.includes('restaurant')) return <Hotel className="h-4 w-4 mr-2 text-purple-500" />;
  if (lowerName.includes('beach')) return <Sun className="h-4 w-4 mr-2 text-yellow-500" />;
  if (lowerName.includes('air condition')) return <Wind className="h-4 w-4 mr-2 text-cyan-500" />;
  return <Info className="h-4 w-4 mr-2 text-gray-400" />;
};