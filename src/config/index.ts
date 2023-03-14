import dotenv from 'dotenv';
dotenv.config();

type Config ={
  port:string,
  database:string | undefined,
  dbUser:string | undefined,
  dbPassword:string | undefined
}

const config:Config = {
  port: process.env.PORT || '3000',
  database: process.env.DATABASE,
  dbUser: process.env.USER,
  dbPassword: process.env.PASSWORD,

};

export default config;
