import z from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getSubscribeInviteClicks } from '../functions/get-subscribe-invite-clicks';
import { getSubscribeInviteCount } from '../functions/get-subscribe-invite-count';

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscriber invites count',
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
        const { count } = await getSubscribeInviteCount({ subscriberId });

        // 301 - Redirect Permanente ( Cria cache )
        // 302 - Redirect Temporário

        return { count };
      }
    );
  };
