import { redis } from '../redis/client';

interface getSubscribeInviteCountParams {
  subscriberId: string;
}

export async function getSubscribeInviteCount({
  subscriberId,
}: getSubscribeInviteCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}
