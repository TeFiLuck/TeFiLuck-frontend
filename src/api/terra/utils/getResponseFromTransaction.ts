import { Transaction } from '../types';

export function getResponseFromTransaction<T extends Record<string, any>>(transaction: Transaction): T {
  const result: Record<string, any> = {};

  if (Array.isArray(transaction.logs) && transaction.logs[0] && Array.isArray(transaction.logs[0]?.events)) {
    const events = transaction.logs[0].events;

    const wasmEvent = events.find((item: any) => item.type === 'wasm');

    if (wasmEvent && wasmEvent.attributes) {
      wasmEvent.attributes.forEach((attribute: { key: string; value: any }) => {
        result[attribute.key] = attribute.value;
      });
    }
  }

  return result as T;
}
