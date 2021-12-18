import { UiLink, UiLogo } from '@/components/ui';
import { MENU_ITEMS } from '@/constants/app';
import { CloseOutlined } from '@ant-design/icons';
import { Drawer, Space } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export interface SideMenuProps {
  visible: boolean;
  onChange: (isVisible: boolean) => void;
}

const SideMenu: FC<SideMenuProps> = ({ visible, onChange }) => {
  return (
    <Drawer
      visible={visible}
      placement="left"
      width={320}
      closeIcon={<CloseOutlined style={{ fontSize: '16px' }} />}
      onClose={() => onChange(false)}
    >
      <WrapperStyled>
        <Space direction="vertical" size={24} className="nowrap" align="center">
          {MENU_ITEMS.map((item) => (
            <UiLink
              key={`menu-item__${item.to}`}
              to={item.to}
              disabled={item.disabled}
              fontSize="14px"
              uppercase
              onClick={() => onChange(false)}
            >
              {item.label}
            </UiLink>
          ))}
        </Space>

        <div>
          <UiLink to="/" onClick={() => onChange(false)}>
            <UiLogo />
          </UiLink>
        </div>
      </WrapperStyled>
    </Drawer>
  );
};

const WrapperStyled = styled.div`
  height: 100%;
  padding-top: 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default SideMenu;
