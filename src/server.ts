import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import { z } from 'zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';
import { env } from './env';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:3333',
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW-Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
});

// Ao acessar docs, será acessada a documentação
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

// subscribe-to-event-rote.ts
app.register(subscribeToEventRoute);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Porta dinãmica com o .env ( env.ts )
app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running...');
});
