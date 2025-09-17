export interface LotteryConfig {
  ticketAmount: string;
  winDenominator: number;
  payoutPercentOnWin: number;
  feePercent: number;
  contractBalance: string;
}

export interface PlayResult {
  won: boolean;
  reward: string;
  transactionHash: string;
}

export interface LotteryEvent {
  type: 'Played' | 'Deposited' | 'FeeSent';
  player?: string;
  won?: boolean;
  reward?: string;
  amount?: string;
  timestamp: number;
  transactionHash: string;
}