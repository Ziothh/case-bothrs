import type { DottedRecord } from '@acme/shared';
import { Topic, Config } from '@prisma/client';
import { db } from './db';
import { z } from 'zod';


namespace AppConfig {
  /** App config type */
  export type Schema = DottedRecord.fromRecord<{
    tip: {
      tipOfTheDay: Topic['id'] | null
    }
  }>

  export async function set<T extends keyof AppConfig.Schema>(key: T, value: AppConfig.Schema[T]) {
    return db.config.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }

  export async function getUnchecked<T extends keyof AppConfig.Schema>(key: T) {
    return db.config.findFirst({
      where: { key }
    });
  }

  export async function getValidated<
    T extends keyof AppConfig.Schema,
    V extends z.ZodType<AppConfig.Schema[T], _D, Config['value']>,
    _D extends z.ZodTypeDef
  >(key: T, validator: V) {
    try {
      const data = await db.config.findFirst({
        where: { key }
      });

      if (data === null) return {
        ok: false,
        errorKind: 'NOT_FOUND',
        error: null,
      } as const;

      const res = validator.safeParse(data.value);

      return res.success
        ? {
          ok: true,
          value: res.data,
        } as const
        : {
          ok: false,
          errorKind: 'ZOD_ERROR',
          error: res.error,
        } as const;
    } catch (error) {
      return {
        ok: false,
        errorKind: 'DB_ERROR',
        error,
      } as const;
    }
  }
}
export default AppConfig;
