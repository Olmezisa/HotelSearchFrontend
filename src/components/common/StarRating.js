import React from 'react';
import { Star } from 'lucide-react';

/**
 * Bir otelin yıldız derecelendirmesini görsel olarak gösteren bileşen.
 * @param {number} rating - Otelin yıldız derecesi (0-5 arası).
 */
const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < Math.round(rating)
            ? 'text-amber-400 fill-current'
            : 'text-gray-300'
            }`}
        />
      ))}
    </div>
  );
};

export default StarRating;