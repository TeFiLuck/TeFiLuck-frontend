import { UiSkeleton } from '@/components/ui';
import { FC } from 'react';
import { BaseGameCard } from '../../../shared';
import { LoadingGameCardProps } from '../../types';

const LoadingGameCard: FC<LoadingGameCardProps> = () => {
  return (
    <BaseGameCard
      title={<UiSkeleton theme="default" width="180px" height="24px" />}
      subtitle={<UiSkeleton theme="default" width="90px" height="16px" />}
      leftContent={<UiSkeleton theme="default" width="100px" height="100px" borderRadius="50%" />}
      centerContent={<UiSkeleton theme="default" width="120px" height="48px" />}
      rightContent={<UiSkeleton theme="default" width="100px" height="100px" borderRadius="50%" />}
      footer={<UiSkeleton theme="default" width="90px" height="16px" />}
    />
  );
};

export default LoadingGameCard;
