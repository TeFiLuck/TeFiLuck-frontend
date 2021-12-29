import { UiSkeleton } from '@/components/ui';
import { Space } from 'antd';
import { FC } from 'react';
import { BaseGameCard } from '../../../shared';
import { LoadingGameCardProps } from '../../types';

const LoadingGameCard: FC<LoadingGameCardProps> = () => {
  return (
    <BaseGameCard
      mode="compact"
      hideLeftContent
      hideRightContent
      title={<UiSkeleton width="120px" height="12px" />}
      subtitle={<UiSkeleton width="80px" height="16px" />}
      centerContent={
        <Space direction="vertical" align="center">
          <UiSkeleton width="75px" height="24px" />
          <UiSkeleton width="120px" height="48px" />
          <UiSkeleton width="100px" height="30px" borderRadius="32px" />
        </Space>
      }
      footer={<UiSkeleton width="90px" height="10px" />}
    />
  );
};

export default LoadingGameCard;
