import { join } from 'path';
import config from '../webpack.config.dev';
import express from 'express';
import middleware from 'webpack-dev-middleware';
import open from 'open';
import webpack from 'webpack';
import dotenv from 'dotenv';

// Development Webserver

/* eslint-disable no-console */

const defaultPort = 8081;
const port = process.env.PORT || defaultPort;
const app = express();
const compiler = webpack(config);

dotenv.config();

app.use(middleware(compiler, {
  publicPath: config.output?.publicPath
}));

app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  open('http://localhost:' + port);
});

app.listen(port).on('error', (err) => {
  console.log(err)
})
