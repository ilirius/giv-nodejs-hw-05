/**
 * https://loftschool-node.herokuapp.com/
 */

import dotenv from 'dotenv';
import express from 'express';

import registers from './server/app/registers';
import routes from './server/app/route';


dotenv.config();
export const app = {
  'express': express,
  'http': null,
  'instanceExpress': express(),
  /** @type {SocketIO} */
  'io': null,
  'sequelize': null
};


registers(app).then(() => {
  try {
    routes(app);
  } catch (error) {
    console.log(error);
  }
  // app.instanceExpress.use((err, req, res, next) => {
  //   console.log(err.stack);
  //   // res.status(500).json({
  //   //   err: '500',
  //   //   message: err.message
  //   // });
  //   // next();
  // });

  app.http.listen(process.env.PORT || 3000, () => {
    console.log('Server start to port ', process.env.PORT || 3000);
    console.log(`http://localhost:${process.env.PORT || 3000}`);
  });
});
