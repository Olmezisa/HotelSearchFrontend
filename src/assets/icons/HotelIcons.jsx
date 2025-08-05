import React from 'react';
import { Wifi, Wind, Tv2, UtensilsCrossed, Droplets, ParkingCircle, Sparkles, Lock, Building2, Scissors, Accessibility } from 'lucide-react';

const ICONS = {
    'default': <Sparkles className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'wifi': <Wifi className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'internet': <Wifi className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'air conditioning': <Wind className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'klima': <Wind className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'tv': <Tv2 className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'restaurant': <UtensilsCrossed className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'havuz': <Droplets className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'otopark': <ParkingCircle className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'safe': <Lock className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'balcony': <Building2 className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'hair drier': <Scissors className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'handicapped': <Accessibility className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
};

export const FacilityIcon = ({ name }) => {
    const normalizedName = name ? name.toLowerCase() : '';
    for (const key in ICONS) {
        if (normalizedName.includes(key)) return ICONS[key];
    }
    return ICONS['default'];
};