import { UiLink } from '@/components/ui';
import { MENU_ITEMS } from '@/constants/app';
import { Space } from 'antd';
import { FC } from 'react';

const MainMenu: FC = () => {
  return (
    <Space size={24} className="nowrap">
      {MENU_ITEMS.map((item) => (
        <UiLink key={`menu-item__${item.to}`} to={item.to} disabled={item.disabled} uppercase>
          {item.label}
        </UiLink>
      ))}
    </Space>
  );
};

export default MainMenu;
