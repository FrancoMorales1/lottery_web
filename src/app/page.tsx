"use client";

import { useWallet } from '@/hooks/useWallet';
import { useLottery } from '@/hooks/useLottery';
import { WalletConnection } from '@/components/WalletConnection';
import { LotteryStats } from '@/components/LotteryStats';
import { PlayLottery } from '@/components/PlayLottery';
import { DepositFunds } from '@/components/DepositFunds';
import { LOTTERY_CONTRACT } from '@/config/contract';
import { AlertCircle, Dice6 } from 'lucide-react';

export default function Home() {
  const { 
    account, 
    provider, 
    isConnecting, 
    error: walletError, 
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  const { 
    config, 
    isLoading, 
    error: lotteryError, 
    playLottery, 
    depositFunds 
  } = useLottery(provider);

  // Check if contract address is configured
  const isContractConfigured = LOTTERY_CONTRACT.address !== "0x...";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dice6 className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Smart Contract Lottery</h1>
          </div>
          <p className="text-gray-600 text-lg">
            A decentralized lottery powered by Ethereum smart contracts
          </p>
        </div>

        {/* Contract Configuration Warning */}
        {!isContractConfigured && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-yellow-800 font-medium">Contract Not Configured</p>
              <p className="text-yellow-700 text-sm">
                Please update the contract address in <code>src/config/contract.ts</code>
              </p>
            </div>
          </div>
        )}

        {/* Wallet Connection */}
        <WalletConnection
          account={account}
          isConnecting={isConnecting}
          error={walletError}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        {/* Main Content */}
        {account && isContractConfigured && (
          <>
            {/* Loading State */}
            {isLoading && !config && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading lottery information...</p>
              </div>
            )}

            {/* Error State */}
            {lotteryError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700">{lotteryError}</p>
              </div>
            )}

            {/* Lottery Interface */}
            {config && (
              <>
                <LotteryStats config={config} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PlayLottery
                    ticketPrice={config.ticketAmount}
                    isLoading={isLoading}
                    onPlay={playLottery}
                  />
                  
                  <DepositFunds
                    isLoading={isLoading}
                    onDeposit={depositFunds}
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with Next.js and ethers.js</p>
          <p className="mt-1">
            Make sure you're connected to the correct network before playing
          </p>
        </div>
      </div>
    </div>
  );
}