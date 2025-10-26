import env from './env';

export default {
    jwtAccessSecret: env.jwtAccessSecret,
    jwtRefreshSecret: env.jwtRefreshSecret,
    jwtAccessExpiresIn: '1h',
    jwtRefreshExpiresIn: '30d',
}