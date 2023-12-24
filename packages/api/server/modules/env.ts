import { z } from 'zod';

const envValidator = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

const result = envValidator.safeParse(process.env);

const env = result.success
  ? result.data as Readonly<z.output<typeof envValidator>>
  : ((): never => {
    console.error(`❌ ERROR: Invalid environment variables in @acme/api:\n${result.error.format()
      }`);
    process.exit(1);
  })();

export default env;
