export default class NewsModel {
  constructor(sequelize) {
    this.__sequelize = sequelize;
  }

  /**
   * Получение всего списка новостей
   *
   * @returns
   * @memberof NewsModel
   */
  async getAll() {
    try {
      return await this.__sequelize.models.newsmessage.findAll({
        where: {
          userId: {
            [this.__sequelize.Op.ne]: null
          }
        },
        include: [{
          model: this.__sequelize.models.user
        }],
        order: [
          ['date', 'DESC']
        ]
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Добавление новой новости
   *
   * @param {*} newNews
   * @returns
   * @memberof NewsModel
   */
  async add(newNews) {
    try {
      return await this.__sequelize.models.newsmessage.create(newNews);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Обновление новости
   *
   * @param {number} id
   * @param {any} newValues
   * @returns
   * @memberof NewsModel
   */
  async updateById(id, newValues) {
    try {
      return await this.__sequelize.models.newsmessage.findById(id)
        .then(news => news.update(newValues))
        .then(() => this.getAll());
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      return await this.__sequelize.models.newsmessage.findById(id)
        .then(news => news.destroy())
        .then(() => this.getAll());
    } catch (error) {
      throw new Error(error);
    }
  }
}
