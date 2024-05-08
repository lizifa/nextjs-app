import crypto from 'crypto';
import env from '@/env'
export function verifyPaddlePayload(payload: any, signature: any) {
  const publicKey = env.PADDLE_APPKEY as string;
  const hmac = crypto.createHmac('sha1', publicKey);
  const digest = hmac.update(JSON.stringify(payload)).digest('hex');
  return crypto.createHash('sha1').update(`${digest}${publicKey}`).digest('hex') === signature;
}