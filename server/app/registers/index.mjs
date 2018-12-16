import cookieParser from 'cookie-parser';
import httpServer from 'http';
import path from 'path';
import Sequelize from 'sequelize';
import socket from 'socket.io';

import socketChat from '../services/socket.chat';

export default async (app) => {
  await app.instanceExpress.use(app.express.static(path.join(process.cwd(), 'server', './public')));
  app.instanceExpress.use(cookieParser());

  app.http = httpServer.Server(app.instanceExpress);

  app.io = socket(app.http);

  app.sequelize = new Sequelize(process.env.DATABASE_URL, {
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  });

  await app.sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  const sequelizeModelNames = [
    'Chat',
    'News',
    'NewsMessage',
    'Setting',
    'User',
    'Permission',
  ];

  try {
    for (const modelName of sequelizeModelNames) {
      app.sequelize.import(
        modelName.toLowerCase(),
        await import(`../sequelizeModel/${modelName}`)
      );
    }
  } catch (error) {
    // console.log(error);
  }

  for (const modelName of Object.keys(app.sequelize.models)) {
    if ('associate' in app.sequelize.models[modelName]) {
      app.sequelize.models[modelName].associate(app.sequelize.models);
    }
  }

  socketChat(app);
  sequelize.sync();
  // sequelize.sync({ force: true });
};
