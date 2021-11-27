import { v4 as uuidv4 } from 'uuid';

const UUID_LENGTH = 36;

function dec2hex(dec: number): string {
  return dec.toString(16).padStart(2, '0');
}

export function generateRandomString(len?: number): string {
  if (!window?.crypto) {
    if (!len) return uuidv4();

    const uuids: string[] = [];
    const steps = Math.ceil(len / UUID_LENGTH);

    for (let i = 0; i < steps; i++) {
      uuids.push(uuidv4());
    }

    const randomString = uuids.join('');
    return randomString.substring(0, len);
  }

  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}
