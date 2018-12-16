import NewsModel from '../../models/NewsModel';

export default class NewsController {
  constructor(app) {
    this.news = new NewsModel(app.sequelize);
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof NewsController
   */
  async actionListAll(request, response) {
    await this.news.getAll().then(data => {
      if (!(data instanceof Array)) {
        data = data.get({
          plain: true
        });
      }
      response.status(200).json(data);
    }).catch(err => response.status(500).send(err));
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof NewsController
   */
  async actionAdd(request, response) {
    const newNews = JSON.parse(request.text);

    await this.news.add(newNews).then(data => {
      if (!(data instanceof Array)) {
        data = data.get({
          plain: true
        });
      }
      response.status(200).json(data);
    }).catch(err => response.status(500).send(err));
  }
  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof NewsController
   */
  async actionUpdateById(request, response) {
    const {
      id
    } = request.params;

    const newValues = JSON.parse(request.text);
    await this.news.updateById(id, newValues).then(data => {
      if (!(data instanceof Array)) {
        data = data.get({
          plain: true
        });
      }
      response.status(200).json(data);

    }).catch(err => response.status(500).send(err));
  }
  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof NewsController
   */
  async actionDeleteById(request, response) {
    const {
      id
    } = request.params;

    await this.news.deleteById(id).then(data => {
      if (!(data instanceof Array)) {
        data = data.get({
          plain: true
        });
      }
      response.status(200).json(data);

    }).catch(err => response.status(500).send(err));;
  }
}
