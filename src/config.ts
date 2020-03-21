export default Object.freeze({
  server: {
    hostname: process.env.SERVER_HOSTNAME,
    port: +process.env.SERVER_PORT,
    env: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
  },
});