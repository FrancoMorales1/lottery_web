"use client";

import { useState } from 'react';
import { Play, Loader2, Trophy, X } from 'lucide-react';
import { PlayResult } from '@/types/lottery';

interface PlayLotteryProps {
  ticketPrice: string;
  isLoading: boolean;
  onPlay: () => Promise<PlayResult | null>;
}

export function PlayLottery({ ticketPrice, isLoading, onPlay }: PlayLotteryProps) {
  const [result, setResult] = useState<PlayResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handlePlay = async () => {
    const playResult = await onPlay();
    if (playResult) {
      setResult(playResult);
      setShowResult(true);
    }
  };

  const closeResult = () => {
    setShowResult(false);
    setResult(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Play Lottery</h2>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Pay <span className="font-bold text-blue-600">{ticketPrice} ETH</span> for a chance to win!
          </p>
          
          <button
            onClick={handlePlay}
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Playing...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Play Now
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Modal */}
      {showResult && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Game Result</h3>
              <button
                onClick={closeResult}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center">
              {result.won ? (
                <div className="text-green-600">
                  <Trophy className="w-16 h-16 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-2">Congratulations!</h4>
                  <p className="text-lg">You won <span className="font-bold">{result.reward} ETH</span>!</p>
                </div>
              ) : (
                <div className="text-gray-600">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <X className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Better luck next time!</h4>
                  <p className="text-lg">You didn't win this round.</p>
                </div>
              )}

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Transaction Hash:</p>
                <p className="font-mono text-xs break-all">{result.transactionHash}</p>
              </div>

              <button
                onClick={closeResult}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}