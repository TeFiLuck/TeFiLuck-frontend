export interface EventsDistributor {
  handle: (payload: any) => void;
}
