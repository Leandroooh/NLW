import z from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getSubscribeInviteClicks } from '../functions/get-subscribe-invite-clicks';
import { getSubscribeRankingPosition } from '../functions/get-subscriber-ranking-position';

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscriber invite count',
          params: z.object({
            subscriberId: z.string(),
          }),
          //  Serialização das Informações [ Status: 201]
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },

      async request => {
        const { subscriberId } = request.params;
        const { position } = await getSubscribeRankingPosition({
          subscriberId,
        });

        // 301 - Redirect Permanente ( Cria cache )
        // 302 - Redirect Temporário

        return { position };
      }
    );
  };
