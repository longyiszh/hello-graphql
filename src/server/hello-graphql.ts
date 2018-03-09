import { join, resolve } from 'path';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as send from 'koa-send';
import * as serve from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import * as cors from "@koa/cors";

import { api } from './router/api';

export class Server {

  app = new Koa();
  router = new Router();

  clientPath = join(__dirname, "../client");

  constructor() {
    this.app.use(logger());
    this.app.use(bodyParser());
    this.app.use(cors());

    this.router.use('/api', api.routes(), api.allowedMethods())
    // this.router.get('/*', async (ctx) => {
    //   await send(ctx, join(this.clientPath, 'index.html'), { root: '/' });
    // });

    this.app.use(this.router.routes())
    .use(this.router.allowedMethods());

    // listen
    this.app.listen(3000, () => {
      console.log("** koa started on port 3000. **");
    });

  }

}

new Server();