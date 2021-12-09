import { Sha256 } from '@aws-crypto/sha256-browser';

export async function sha256(input: string): Promise<string> {
  const message = new Sha256();
  message.update(input);

  const uint8Hash = await message.digest();
  const hashString = Array.from(uint8Hash)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hashString;
}
