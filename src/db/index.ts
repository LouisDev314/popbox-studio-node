import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import getEnvConfig from '../config/env';

config({ path: '.env' });

const client = postgres(getEnvConfig().databaseUrl);
export const db = drizzle({ client });
