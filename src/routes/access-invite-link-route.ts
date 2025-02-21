import z from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { env } from '../env';
import { accessInviteLink } from '../functions/access-invite-link';
import { redis } from '../redis/client';

export const acessInviteRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        sumarry: 'Access invite link and redirect users',
        params: z.object({
          subscriberId: z.string(),
        }),
        //  Serialização das Informações [ Status: 201]
        response: {
          301: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },

    async (request, reply) => {
      const { subscriberId } = request.params;

      await accessInviteLink({ subscriberId });
      console.log(await redis.hgetall('referral:access-count'));

      const redirectUrl = new URL(env.WEB_URL);
      redirectUrl.searchParams.set('referrer', subscriberId);

      // 301 - Redirect Permanente ( Cria cache )
      // 302 - Redirect Temporário

      return reply.redirect(redirectUrl.toString(), 302);
    }
  );
};
