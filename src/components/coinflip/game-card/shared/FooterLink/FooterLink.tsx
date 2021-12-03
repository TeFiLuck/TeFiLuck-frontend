import { APP_GRAY_COLOR_3 } from '@/assets/styles/design';
import { UiLink } from '@/components/ui';
import { FC } from 'react';

export interface FooterLinkProps {
  url: string;
  text?: string;
}

export const FooterLink: FC<FooterLinkProps> = ({ url, text = 'View transaction' }) => {
  return (
    <UiLink
      to={url}
      mode="html"
      openHtmlLinkSeparately
      underlined
      fontSize="10px"
      color={APP_GRAY_COLOR_3}
      hoverColor="#ffffff"
    >
      {text}
    </UiLink>
  );
};
