import { CoinSide, GameOutcome } from '@/constants/coinflip';
import { TokenSymbol } from '@/constants/tokens';

export interface CreateGameResponse {
  bet_id: string;
  action: string;
  contract_address: string;
  sender: string;
}

export interface ResolveGameResponse {
  action: string;
  denom: TokenSymbol;
  amount: string;
  bet_id: string;
  completed_at: number;
  created_at: number;
  contract_address: string;
  outcome: GameOutcome;
  owner: string;
  responder: string;
  responder_side: CoinSide;
  winner: string;
}
