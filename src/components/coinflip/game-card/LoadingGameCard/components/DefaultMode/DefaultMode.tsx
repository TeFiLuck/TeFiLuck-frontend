import { UiSkeleton } from '@/components/ui';
import { FC } from 'react';
import { BaseGameCard } from '../../../shared';
import { LoadingGameCardProps } from '../../types';

const LoadingGameCard: FC<LoadingGameCardProps> = () => {
  return (
    <BaseGameCard
      title={<UiSkeleton width="180px" height="24px" />}
      subtitle={<UiSkeleton width="90px" height="16px" />}
      leftContent={<UiSkeleton width="100px" height="100px" borderRadius="50%" />}
      centerContent={<UiSkeleton width="120px" height="48px" />}
      rightContent={<UiSkeleton width="100px" height="100px" borderRadius="50%" />}
      footer={<UiSkeleton width="90px" height="16px" />}
    />
  );
};

export default LoadingGameCard;
