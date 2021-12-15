import { CoinSide, ENCRYPTION_PASSWORD_SEPARATOR } from '@/constants/coinflip';
import { sha256 } from '../common';

export function encryptChosenSide(chosenSide: CoinSide, password: string) {
  return sha256(`${chosenSide}${ENCRYPTION_PASSWORD_SEPARATOR}${password}`);
}
