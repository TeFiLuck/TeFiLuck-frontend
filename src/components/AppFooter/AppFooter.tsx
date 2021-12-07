import { UiLink, UiLogo } from '@/components/ui';
import { COMPANY_EMAIL, COMPANY_GITHUB_LINK, COMPANY_MEDIUM_LINK, COMPANY_TWITTER_LINK } from '@/constants/company';
import { GithubOutlined, MailFilled, MediumOutlined, TwitterOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const AppFooter: FC = () => {
  return (
    <WrapperStyled>
      <Space direction="vertical" align="center" size={12}>
        <UiLogo />

        <SloganStyled>
          By LUNAtics for LUNAtics&nbsp;
          <span className="text-color-primary">#WEB3ISNOTAJOKE</span>
        </SloganStyled>

        <Space size={12}>
          <UiLink to={COMPANY_TWITTER_LINK} mode="html" openHtmlLinkSeparately fontSize="18px">
            <TwitterOutlined />
          </UiLink>

          <UiLink to={COMPANY_GITHUB_LINK} mode="html" openHtmlLinkSeparately fontSize="18px">
            <GithubOutlined />
          </UiLink>

          <UiLink to={COMPANY_MEDIUM_LINK} mode="html" openHtmlLinkSeparately fontSize="18px">
            <MediumOutlined />
          </UiLink>

          <UiLink to={`mailto:${COMPANY_EMAIL}`} mode="html" fontSize="18px">
            <MailFilled />
          </UiLink>
        </Space>
      </Space>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  background: var(--dark-color-4);
  padding: 24px var(--global-standard-horizontal-offset);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SloganStyled = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--light-color-1);
`;

export default AppFooter;
