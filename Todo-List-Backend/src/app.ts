import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { schema } from './gql/schemaTodo';
import { Task } from './entity/todo';
import { resolversTodo } from './gql/resolversTodo';
dotenv.config();

const app = express().disable('etag').disable('x-powered-by');

const serverApollo = new ApolloServer({
  typeDefs: schema,
  resolvers: resolversTodo,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const IS_DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

if (IS_DEV) {
  app.use(cors());
}

serverApollo.applyMiddleware({
  app,
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

export const MyDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  // port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  entities: [Task],
  synchronize: false,
  // logging: false,
});

MyDataSource.initialize()
  .then(() => {
    console.log('connected');
  })
  .catch(error => console.log(error));

export { app };
