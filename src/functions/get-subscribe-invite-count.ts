import { redis } from '../redis/client';

interface getSubscribeInviteClicksParams {
  subscriberId: string;
}

export async function getSubscribeInviteClicks({
  subscriberId,
}: getSubscribeInviteClicksParams) {
  const count = await redis.hget('referral:access-count', subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}
