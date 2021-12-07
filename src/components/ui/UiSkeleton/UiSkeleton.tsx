import { APP_ALTERNATIVE_COLOR, APP_DARK_COLOR_3, APP_GRAY_COLOR_2, APP_PRIMARY_COLOR } from '@/assets/styles/design';
import * as CSS from 'csstype';
import { FC } from 'react';
import Skeleton, { SkeletonProps, SkeletonTheme } from 'react-loading-skeleton';

type Theme = 'default' | 'primary';
type ThemesMap = {
  [key in Theme]: {
    baseColor: CSS.Property.Color;
    highlightColor: CSS.Property.Color;
  };
};

export interface UiSkeletonProps extends SkeletonProps {
  theme?: Theme;
}

export const UiSkeleton: FC<UiSkeletonProps> = ({ theme = 'default', ...restProps }) => {
  const themesMap: ThemesMap = {
    default: {
      baseColor: APP_DARK_COLOR_3,
      highlightColor: APP_GRAY_COLOR_2,
    },
    primary: {
      baseColor: APP_ALTERNATIVE_COLOR,
      highlightColor: APP_PRIMARY_COLOR,
    },
  };

  const baseColor = restProps.baseColor || themesMap[theme].baseColor;
  const highlightColor = restProps.highlightColor || themesMap[theme].highlightColor;

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <Skeleton {...restProps} />
    </SkeletonTheme>
  );
};
