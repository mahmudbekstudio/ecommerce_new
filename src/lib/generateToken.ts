import UserType from "../type/UserType";
import tokenConfig from "../config/token";
import jwt from "jsonwebtoken";
import _ from 'lodash';

export default (userItem: UserType, additional: object = {}): {
    token: {
        accessToken: string,
        refreshToken: string,
        tokenExpireTime: number,
        refreshTokenExpireTime: number
    },
    user: object
} => {
    const jwtSecret = tokenConfig.jwtAccessSecret;

    const accessToken = jwt.sign({
        id: userItem._id,
        type: 'access',
        role: userItem.role,
        email: userItem.email,
    }, jwtSecret, {expiresIn: tokenConfig.jwtAccessExpiresIn});

    const refreshToken = jwt.sign({
        id: userItem._id,
        type: 'refresh',
    }, jwtSecret, {expiresIn: tokenConfig.jwtRefreshExpiresIn});

    const tokenExpireTime = (jwt.decode(accessToken) as { exp: number }).exp * 1000;
    const refreshTokenExpireTime = (jwt.decode(refreshToken) as { exp: number }).exp * 1000;

    const user = {...userItem.data};

    for (const key in additional) {
        user[key] = _.get(userItem, additional[key]);
    }

    return {token: {accessToken, refreshToken, tokenExpireTime, refreshTokenExpireTime}, user};
}