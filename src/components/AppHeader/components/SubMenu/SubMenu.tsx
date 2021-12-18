import { UiLink } from '@/components/ui';
import { COMPANY_EMAIL, COMPANY_GITHUB_LINK, COMPANY_MEDIUM_LINK, COMPANY_TWITTER_LINK } from '@/constants/company';
import { GithubOutlined, MailFilled, MediumOutlined, TwitterOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FC } from 'react';

type Size = 'medium' | 'small';

export interface SubMenuProps {
  size?: Size;
}

const SubMenu: FC<SubMenuProps> = ({ size = 'medium' }) => {
  const displayLabels = size !== 'small';
  const itemsGapPx = size === 'small' ? 16 : 22;
  const itemsFontSize = size === 'small' ? '14px' : '12px;';

  return (
    <Space size={itemsGapPx}>
      <UiLink to={COMPANY_TWITTER_LINK} mode="html" openHtmlLinkSeparately fontSize={itemsFontSize}>
        <Space size={4}>
          <TwitterOutlined />
          {displayLabels && 'Twitter'}
        </Space>
      </UiLink>

      <UiLink to={COMPANY_GITHUB_LINK} mode="html" openHtmlLinkSeparately fontSize={itemsFontSize}>
        <Space size={4}>
          <GithubOutlined />
          {displayLabels && 'GitHub'}
        </Space>
      </UiLink>

      <UiLink to={COMPANY_MEDIUM_LINK} mode="html" openHtmlLinkSeparately fontSize={itemsFontSize}>
        <Space size={4}>
          <MediumOutlined />
          {displayLabels && 'Medium'}
        </Space>
      </UiLink>

      <UiLink to={`mailto:${COMPANY_EMAIL}`} mode="html" fontSize={itemsFontSize}>
        <Space size={4}>
          <MailFilled />
          {displayLabels && 'Contact Us'}
        </Space>
      </UiLink>
    </Space>
  );
};

export default SubMenu;
