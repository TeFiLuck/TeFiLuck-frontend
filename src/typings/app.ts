export type BaseSize = 'small' | 'medium' | 'large';
export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export enum AppMessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export type AppMessage = {
  type: AppMessageType;
  title: string;
  description: string;
  placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
};
