import z from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getSubscribeInviteClicks } from '../functions/get-subscribe-invite-clicks';

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscriber invite count',
          params: z.object({
            subscriberId: z.string(),
          }),
          //  Serialização das Informações [ Status: 201]
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },

      async request => {
        const { subscriberId } = request.params;
        const { count } = await getSubscribeInviteClicks({ subscriberId });

        // 301 - Redirect Permanente ( Cria cache )
        // 302 - Redirect Temporário

        return { count };
      }
    );
  };
