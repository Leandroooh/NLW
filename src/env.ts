import { z } from 'zod';

const envSchema = z.object({
  // Convertendo para number && Definindo valor padrão
  PORT: z.coerce.number().default(3333),
  // Validação das URL de conexão
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
