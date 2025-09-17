"use client";

import { TrendingUp, Percent, Coins, DollarSign } from 'lucide-react';
import { LotteryConfig } from '@/types/lottery';

interface LotteryStatsProps {
  config: LotteryConfig;
}

export function LotteryStats({ config }: LotteryStatsProps) {
  const winProbability = (1 / config.winDenominator * 100).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Lottery Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Ticket Price</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{config.ticketAmount} ETH</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Win Probability</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{winProbability}%</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Payout Rate</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{config.payoutPercentOnWin}%</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Prize Pool</span>
          </div>
          <p className="text-2xl font-bold text-orange-900">{parseFloat(config.contractBalance).toFixed(4)} ETH</p>
        </div>
      </div>
    </div>
  );
}