import { redis } from '../redis/client';

interface accessInviteLinkParams {
  subscriberId: string;
}

export async function accessInviteLink({
  subscriberId,
}: accessInviteLinkParams) {
  try {
    // Incrementa o contador de acessos para o subscriberId
    await redis.hincrby('referral:access-count', subscriberId, 1);
  } catch (error) {
    console.error('Erro ao acessar o link do convite:', error);
  }
}
