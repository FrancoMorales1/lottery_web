// Smart Contract Configuration
export const LOTTERY_CONTRACT = {
  // Replace with your deployed contract address
  address: "0x...", // TODO: Add your contract address here
  
  // Contract ABI - only the functions we need
  abi: [
    "function ticketAmount() view returns (uint256)",
    "function winDenominator() view returns (uint256)", 
    "function payoutPercentOnWin() view returns (uint256)",
    "function feePercent() view returns (uint256)",
    "function contractBalance() view returns (uint256)",
    "function play() payable",
    "function deposit() payable",
    "event Played(address indexed player, bool won, uint256 reward, uint256 contractBalanceAfter)",
    "event Deposited(address indexed from, uint256 amount)",
    "event FeeSent(address indexed recipient, uint256 amount)"
  ]
} as const;

// Network Configuration
export const NETWORK_CONFIG = {
  chainId: 1, // Ethereum Mainnet - change as needed
  name: "Ethereum",
  rpcUrl: "https://eth.llamarpc.com", // Public RPC - consider using your own
};