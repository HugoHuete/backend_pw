import express, { Application } from 'express';
import cors from 'cors';
import routerApi from './routes';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    this.middlewares();
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // Body reading
    this.app.use(express.json());

    // public folder
    this.app.use(express.static('public'));
  }

  routes() {
    routerApi(this.app);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ' + this.port);
    });
  }
}

export default Server;
