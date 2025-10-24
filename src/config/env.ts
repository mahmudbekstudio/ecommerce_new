export const env = Object.freeze({
    mode: process.env.MODE ?? 'dev',
    port: process.env.PORT ?? '3000',
    mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/ecommerce',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'access_dev_secret',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh_dev_secret',
});