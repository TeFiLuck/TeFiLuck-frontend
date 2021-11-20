import { UiLink } from '@/components/ui';
import { COMPANY_EMAIL, COMPANY_GITHUB_LINK, COMPANY_TWITTER_LINK } from '@/constants/general';
import { GithubOutlined, MailOutlined, TwitterOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FC } from 'react';

const SubMenu: FC = () => {
  return (
    <Space size={22}>
      <UiLink to={COMPANY_TWITTER_LINK} mode="html" openHtmlLinkSeparately>
        <Space size={4}>
          <TwitterOutlined />
          Twitter
        </Space>
      </UiLink>

      <UiLink to={COMPANY_GITHUB_LINK} mode="html" openHtmlLinkSeparately>
        <Space size={4}>
          <GithubOutlined />
          GitHub
        </Space>
      </UiLink>

      <UiLink to={`mailto:${COMPANY_EMAIL}`} mode="html">
        <Space size={4}>
          <MailOutlined />
          Contact Us
        </Space>
      </UiLink>
    </Space>
  );
};

export default SubMenu;
