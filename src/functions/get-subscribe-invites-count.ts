import { redis } from '../redis/client';

interface getSubscribeInviteCountParams {
  subscriberId: string;
}

export async function getSubscribeInviteCount({
  subscriberId,
}: getSubscribeInviteCountParams) {
  const invites = await redis.zscore('referral:ranking', subscriberId);

  return { count: invites ? Number.parseInt(invites) : 0 };
}
