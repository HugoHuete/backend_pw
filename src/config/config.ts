import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || '3000',
  database: process.env.DATABASE,
  dbUser: process.env.USER,
  dbPassword: process.env.PASSWORD,

};

export default config;
