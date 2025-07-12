export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  userAgent: process.env.USER_AGENT || '',
  logLevel: process.env.LOG_LEVEL || 'info',
  logging: {
    logDir: process.env.LOG_DIR || 'logs',
  },
  shouldLogTimer: process.env.LOG_TIMER === 'true',
  api: {
    protocol: process.env.API_PROTOCOL || 'https',
    host: process.env.API_HOST || 'localhost',
    port: process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : null, 
    prefix: process.env.API_PREFIX || '/api',
    version: process.env.API_VERSION || '/v2'
  }
};
