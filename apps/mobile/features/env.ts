import { z } from 'zod';


const envValidator = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

const result = envValidator.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
});

const env = result.success
  ? result.data as Readonly<z.output<typeof envValidator>>
  : ((): never => {
    throw new Error(`❌ ERROR: Invalid environment variables in @acme/mobile:\n${result.error.format()}`);
  })();

export default env;
