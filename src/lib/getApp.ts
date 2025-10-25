import express, { Application } from 'express';

let appInstance: Application;

export default (): Application => {
    if (!appInstance) {
        appInstance = express();
    }

    return appInstance;
}