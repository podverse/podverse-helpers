export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  userAgent: process.env.USER_AGENT || '',
  logLevel: process.env.LOG_LEVEL || 'info',
  logging: {
    logDir: process.env.LOG_DIR || 'logs',
  },
  shouldLogTimer: process.env.LOG_TIMER === 'true'
};
