import { randomBytes, BinaryToTextEncoding } from 'crypto';

/**Generate a secret key with the node.js crypto module, default base64 */
export const generateKey = (size: number = 64, format: BinaryToTextEncoding = 'base64'): string => {
  const buffer = randomBytes(size);
  return buffer.toString(format);
};
