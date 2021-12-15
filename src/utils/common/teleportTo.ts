import { PortalLocation as PortalLocationEnum } from '@/constants/portals';

export const PortalLocation = PortalLocationEnum;

export function teleportTo(location: PortalLocationEnum) {
  return document && document.querySelector(`[data-portal-id='${location}']`);
}
