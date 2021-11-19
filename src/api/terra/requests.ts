import { LUNA_DENOM, UST_DENOM } from '@/config/coins';
import { TERRA_DECIMALS } from '@/config/networks';
import { LCDClient } from '@terra-money/terra.js';

export async function fetchNativeTokensBalancesFromAddress(client: LCDClient, address: string) {
  const [coins] = await client.bank.balance(address);
  const result = {
    luna: 0,
    ust: 0,
  };

  coins.map((coin) => {
    const amount = Number(
      coin
        .toDecCoin()
        .div(10 ** TERRA_DECIMALS)
        .toData().amount,
    );
    if (coin.denom === LUNA_DENOM) result.luna = amount;
    if (coin.denom === UST_DENOM) result.ust = amount;
  });

  return result;
}
