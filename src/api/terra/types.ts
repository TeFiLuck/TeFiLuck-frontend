import { Fee } from '@terra-money/terra.js';

export interface Transaction {
  code?: number;
  gas_used: string;
  gas_wanted: string;
  height: string;
  raw_log: string;
  logs: any;
  timestamp: string;
  tx: {
    type: string;
    value: {
      fee: Fee;
      memo: string;
    };
  };
  txhash: string;
}
