import { redis } from '../redis/client';

interface getSubscribeInviteClicksParams {
  subscriberId: string;
}

export async function getSubscribeInviteClicks({
  subscriberId,
}: getSubscribeInviteClicksParams) {
  const acessCount = await redis.hget('referral:access-count', subscriberId);

  return { count: acessCount ? Number.parseInt(acessCount) : 0 };
}
