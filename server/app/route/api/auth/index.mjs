import plainTextParser from 'plaintextparser';

import AuthController from '../../../controllers/AuthController';

export default (app) => {
  const authCtl = new AuthController(app);
  const router = app.express.Router();

  router.post(
    '/login',
    [
      plainTextParser,
      app.express.json()
    ],
    authCtl.actionLogin.bind(authCtl)
  );
  router.post(
    '/authFromToken',
    [
      plainTextParser,
      app.express.json()
    ],
    authCtl.actionAuthFromToken.bind(authCtl)
  );

  return router;
};
