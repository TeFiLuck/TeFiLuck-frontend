import { UiLink } from '@/components/ui';
import { Space } from 'antd';
import { FC } from 'react';

const MainMenu: FC = () => {
  return (
    <Space size={24} className="nowrap">
      <UiLink to="/" uppercase fontSize="12px">
        Coinflip
      </UiLink>
      <UiLink to="/fortune-wheel" uppercase disabled>
        Fortune Wheel
      </UiLink>
      <UiLink to="/roulette" uppercase disabled>
        Roulette
      </UiLink>
      <UiLink to="/dex" uppercase disabled>
        Roll the dice
      </UiLink>
    </Space>
  );
};

export default MainMenu;
