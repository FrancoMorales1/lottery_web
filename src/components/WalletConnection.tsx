"use client";

import { Wallet, AlertCircle } from 'lucide-react';

interface WalletConnectionProps {
  account: string;
  isConnecting: boolean;
  error: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletConnection({ 
  account, 
  isConnecting, 
  error, 
  onConnect, 
  onDisconnect 
}: WalletConnectionProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Wallet Connection</h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {account ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Connected Account</p>
            <p className="font-mono text-lg text-gray-800">{formatAddress(account)}</p>
          </div>
          <button
            onClick={onDisconnect}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>
      )}
    </div>
  );
}