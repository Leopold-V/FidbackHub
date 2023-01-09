import { randomBytes } from 'crypto';

export const generateKey = (size = 64, format = 'base64') => {
  const buffer = randomBytes(size);
  //@ts-ignore
  return buffer.toString(format);
};
