import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ stars }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ))}
  </div>
);