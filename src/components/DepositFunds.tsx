"use client";

import { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

interface DepositFundsProps {
  isLoading: boolean;
  onDeposit: (amount: string) => Promise<boolean>;
}

export function DepositFunds({ isLoading, onDeposit }: DepositFundsProps) {
  const [amount, setAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsDepositing(true);
    const success = await onDeposit(amount);
    if (success) {
      setAmount('');
    }
    setIsDepositing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Deposit Funds</h2>
      
      <form onSubmit={handleDeposit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.001"
            min="0"
            placeholder="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading || isDepositing}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || isDepositing || !amount || parseFloat(amount) <= 0}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isDepositing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Depositing...
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              Deposit Funds
            </>
          )}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-3">
        Deposit funds to increase the prize pool for all players.
      </p>
    </div>
  );
}