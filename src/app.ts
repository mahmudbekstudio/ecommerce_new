import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import getApp from './lib/getApp';
import envConfig from './config/env';
import ajaxRouter from './app/ajax/routes';
import apiRouter from './app/api/routes';
import webRouter from './app/web/routes';
import path from "path";

dotenv.config();
const app: Application = getApp();

app.use('/public', express.static('./src/public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/ajax', ajaxRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(webRouter);

const PORT = envConfig.port;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});