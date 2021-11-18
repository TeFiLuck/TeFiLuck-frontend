import { FC } from 'react';
import DesktopHeader from './components/DesktopHeader/DesktopHeader';
import MobileHeader from './components/MobileHeader/MobileHeader';
import { AppHeaderProps } from './types';

const AppHeader: FC<AppHeaderProps> = (props) => {
  // eslint-disable-next-line no-constant-condition
  return true ? <DesktopHeader {...props} /> : <MobileHeader {...props} />;
};

export default AppHeader;
