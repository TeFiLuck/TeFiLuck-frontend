import { UiLink } from '@/components/ui';
import { useNetwork } from '@/hooks';
import { shortenStr } from '@/utils/format';
import { getTerraTransactionLink } from '@/utils/networks';
import { FC } from 'react';

export interface UiTxHashDisplayProps {
  txHash?: string;
}

export const UiTxHashDisplay: FC<UiTxHashDisplayProps> = ({ txHash }) => {
  const { networkKey } = useNetwork();
  const hash = txHash || '';
  const txLink = getTerraTransactionLink(hash, networkKey);

  return (
    <div>
      TX hash:&nbsp;
      <UiLink mode="html" to={txLink} openHtmlLinkSeparately underlined>
        {shortenStr(hash, 8, 8)}
      </UiLink>
    </div>
  );
};
