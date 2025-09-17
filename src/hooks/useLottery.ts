"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { LOTTERY_CONTRACT } from '@/config/contract';
import { LotteryConfig, PlayResult } from '@/types/lottery';

export function useLottery(provider: ethers.BrowserProvider | null) {
  const [config, setConfig] = useState<LotteryConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Load lottery configuration
  useEffect(() => {
    if (provider && LOTTERY_CONTRACT.address !== "0x...") {
      loadConfig();
    }
  }, [provider]);

  const loadConfig = async () => {
    if (!provider) return;

    try {
      setIsLoading(true);
      const contract = new ethers.Contract(
        LOTTERY_CONTRACT.address,
        LOTTERY_CONTRACT.abi,
        provider
      );

      const [ticketAmount, winDenominator, payoutPercent, feePercent, balance] = 
        await Promise.all([
          contract.ticketAmount(),
          contract.winDenominator(),
          contract.payoutPercentOnWin(),
          contract.feePercent(),
          contract.contractBalance()
        ]);

      setConfig({
        ticketAmount: ethers.formatEther(ticketAmount),
        winDenominator: Number(winDenominator),
        payoutPercentOnWin: Number(payoutPercent),
        feePercent: Number(feePercent),
        contractBalance: ethers.formatEther(balance)
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load lottery config');
    } finally {
      setIsLoading(false);
    }
  };

  const playLottery = async (): Promise<PlayResult | null> => {
    if (!provider || !config) return null;

    try {
      setIsLoading(true);
      setError('');

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        LOTTERY_CONTRACT.address,
        LOTTERY_CONTRACT.abi,
        signer
      );

      const ticketAmountWei = ethers.parseEther(config.ticketAmount);
      const tx = await contract.play({ value: ticketAmountWei });
      
      const receipt = await tx.wait();
      
      // Find the Played event
      const playedEvent = receipt.logs.find((log: any) => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed?.name === 'Played';
        } catch {
          return false;
        }
      });

      if (playedEvent) {
        const parsed = contract.interface.parseLog(playedEvent);
        const won = parsed?.args[1];
        const reward = parsed?.args[2];

        // Refresh config to update balance
        await loadConfig();

        return {
          won,
          reward: ethers.formatEther(reward),
          transactionHash: receipt.hash
        };
      }

      return null;
    } catch (err: any) {
      setError(err.message || 'Failed to play lottery');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const depositFunds = async (amount: string): Promise<boolean> => {
    if (!provider) return false;

    try {
      setIsLoading(true);
      setError('');

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        LOTTERY_CONTRACT.address,
        LOTTERY_CONTRACT.abi,
        signer
      );

      const amountWei = ethers.parseEther(amount);
      const tx = await contract.deposit({ value: amountWei });
      await tx.wait();

      // Refresh config to update balance
      await loadConfig();
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to deposit funds');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    config,
    isLoading,
    error,
    playLottery,
    depositFunds,
    refreshConfig: loadConfig
  };
}