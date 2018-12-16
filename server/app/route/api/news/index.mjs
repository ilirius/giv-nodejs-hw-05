import plainTextParser from 'plaintextparser';

import NewsController from '../../../controllers/NewsController';

export default (app) => {
  const newsCtl = new NewsController(app);
  const router = app.express.Router();

  router.get(
    '/getNews',
    [
      app.express.json()
    ],
    newsCtl.actionListAll.bind(newsCtl)
  );


  router.post(
    '/newNews',
    [
      plainTextParser,
      app.express.json()
    ],
    newsCtl.actionAdd.bind(newsCtl)
  );

  router.put(
    '/updateNews/:id',
    [
      plainTextParser,
      app.express.json()
    ],
    newsCtl.actionUpdateById.bind(newsCtl)
  );

  router.delete(
    '/deleteNews/:id',
    [
      app.express.json(),
    ],
    newsCtl.actionDeleteById.bind(newsCtl)
  );

  return router;
};
