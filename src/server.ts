import express, { Application } from 'express';
import cors from 'cors';
import routerApi from './routes';
import db from './db/connection';
import config  from './config/config';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = config.port;

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  private async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database connected');
    } catch (error) {
      throw new Error(String(error));
    }
  }

  private middlewares() {
    // cors
    this.app.use(cors());

    // db connection
    this.dbConnection();

    // Body reading
    this.app.use(express.json());

    // public folder
    this.app.use(express.static('public'));
  }

  private routes() {
    routerApi(this.app);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ' + this.port);
    });
  }
}

export default Server;
