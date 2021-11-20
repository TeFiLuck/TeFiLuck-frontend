export type BaseSize = 'small' | 'medium' | 'large';

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
