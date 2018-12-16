import authRoute from './api/auth';
import userRoute from './api/user';
import newsRoute from './api/news';

/**
 * @param {SocketIO} app.io
 */
export default (app) => {
  app.instanceExpress.use('/api', authRoute(app));
  app.instanceExpress.use('/api', userRoute(app));
  app.instanceExpress.use('/api', newsRoute(app));
  // app.use('/api', loginRoute(express));

  app.instanceExpress.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
};
