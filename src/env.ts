import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    AWS_APPCONFIG_NAME: z.string(),
    AWS_SESSION_TOKEN: z.string().nullable(),
    AWS_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    APP_CONFIG_APP_ID: z.string(),
    APP_CONFIG_ENVIRONMENT_ID: z.string(),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },

  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    AWS_APPCONFIG_NAME: process.env.AWS_APPCONFIG_NAME,
    AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    APP_CONFIG_APP_ID: process.env.APP_CONFIG_APP_ID,
    APP_CONFIG_ENVIRONMENT_ID: process.env.APP_CONFIG_ENVIRONMENT_ID,
  },
})
