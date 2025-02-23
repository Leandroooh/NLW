import { redis } from '../redis/client';

interface getSubscribeRankingPositionParams {
  subscriberId: string;
}

export async function getSubscribeRankingPosition({
  subscriberId,
}: getSubscribeRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId);

  if (rank === null) {
    return { position: null };
  }

  return { position: rank + 1 };
}
