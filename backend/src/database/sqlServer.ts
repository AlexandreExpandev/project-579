import sql from 'mssql';
import { config } from '@/config';
import { logger } from '@/utils/logger';

const sqlConfig: sql.config = {
  user: config.db.user,
  password: config.db.password,
  server: config.db.server,
  database: config.db.database,
  port: config.db.port,
  options: {
    encrypt: config.db.options.encrypt,
    trustServerCertificate: config.db.options.trustServerCertificate,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool;

export const connectDB = async (): Promise<void> => {
  try {
    pool = await new sql.ConnectionPool(sqlConfig).connect();
    logger.info('SQL Server connected successfully.');
  } catch (err) {
    logger.error('Failed to connect to SQL Server:', err);
    process.exit(1);
  }
};

export const getPool = (): sql.ConnectionPool => {
  if (!pool) {
    throw new Error('Database not connected. Call connectDB first.');
  }
  return pool;
};

// Example of a dbRequest utility function structure
export const dbRequest = async (procedureName: string, params: Record<string, any>): Promise<any> => {
  const pool = getPool();
  const request = pool.request();

  for (const key in params) {
    // This is a simplified input setup. You should map JS types to SQL types properly.
    request.input(key, params[key]);
  }

  const result = await request.execute(procedureName);
  return result.recordset;
};
