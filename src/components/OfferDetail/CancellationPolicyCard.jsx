import React from 'react';
import { formatDate } from './formatDate';

export const CancellationPolicyCard = ({ policies }) => {
    if (!policies || policies.length === 0) {
        return null;
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-md border border-[#88B8D2]/20">
            <h3 className="text-xl font-bold text-[#093B5A] mb-3">İptal Politikası</h3>
            <div className="bg-[#F9F7F3] p-4 rounded-lg">
                <ul className="space-y-2">
                    {policies.map((policy, index) => (
                        <li key={index} className="flex items-start text-sm">
                            <div className="w-2 h-2 bg-[#D48A61] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-[#093B5A]">
                                <strong className="text-[#2781B9]">{formatDate(policy.dueDate)}</strong> tarihine kadar
                                {policy.price?.amount
                                    ? ` ${policy.price.amount} ${policy.price.currency} ceza uygulanır.`
                                    : ` ceza uygulanır.`
                                }
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};