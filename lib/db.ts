// lib/db.ts
import { sql } from '@vercel/postgres';

// A conexão é automática via process.env.POSTGRES_URL
export { sql };