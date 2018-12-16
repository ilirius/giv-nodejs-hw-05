import plainTextParser from 'plaintextparser';

import UsersController from '../../../controllers/UsersController';

export default (app) => {
  const usersCtl = new UsersController(app);
  const router = app.express.Router();


  router.get('/getUsers', usersCtl.actionUserList.bind(usersCtl));

  router.post('/saveNewUser', [
    plainTextParser,
    app.express.json()
  ], usersCtl.actionAdd.bind(usersCtl));

  router.post('/saveUserImage/:id', [app.express.urlencoded({
    extended: false
  }), app.express.json()], usersCtl.actionUpdateAvatar.bind(usersCtl));

  router.put('/updateUser/:id', [
    plainTextParser,
    app.express.json()
  ], usersCtl.actionUpdate.bind(usersCtl));

  router.put('/updateUserPermission/:id', [
    plainTextParser,
    app.express.json()
  ], usersCtl.actionUpdatePermission.bind(usersCtl));

  router.delete('/deleteUser/:id', usersCtl.actionDelete.bind(usersCtl));

  return router;
};
