export default class UserModel {

  constructor(sequelize) {
    this.__sequelize = sequelize;
  }

  /**
   * Получение списка всех пользователей
   *
   * @returns {Promise}
   * @memberof UserModel
   */
  async getAllUser() {
    try {
      return await this.__sequelize.models.user.findAll({
        include: [{
          model: this.__sequelize.models.permission,
          include: [{
            all: true,
            nested: true
          }],
        }]
      })
        .then(data => !(data instanceof Array) ? data.get({
          plain: true
        }) : data);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Добаление польователя в базу
   *
   * @param {*} user
   * @returns {Promise}
   * @memberof UserModel
   */
  async createNewUser(user) {
    return await this.__sequelize.models.user.create(user, {
      include: [{
        all: true,
        nested: true
      }]
    });
  }

  /**
   *
   *
   * @param {*} userId
   * @returns {object}
   * @memberof UserModel
   */
  async getById(userId) {
    try {
      return await this.__sequelize.models.user.findOne({
        where: {
          'id': userId
        }
      }).then(data =>
        data = data.get({
          plain: true
        }));
    } catch (error) {
      throw new Error(error);
    }
  }


  /**
   * Получение юзера по имени
   *
   * @param {Object} username
   * @returns {Promise}
   * @memberof UserModel
   */
  async getByUserName(username) {
    try {
      return await this.__sequelize.models.user.findOne({
        include: [{
          model: this.__sequelize.models.permission,
          where: {
            '$user.username$': username
          },
          include: [{
            all: true,
            nested: true
          }],
        }]
      }).then(data => data.get({
        plain: true
      }));
    } catch (error) {
      new Error(error);
    }
  }

  /**
   *
   *
   * @param {string} accessToken
   * @returns {Promise}
   * @memberof UserModel
   */
  async getByAccessToken(accessToken) {
    return await this.__sequelize.models.user.findOne({
      include: [{
        model: this.__sequelize.models.permission,
        where: {
          '$user.access_token$': accessToken
        },
        include: [{
          all: true,
          nested: true
        }],
      }]
    });
  }

  async deleteUserById(userId) {
    try {
      return await this.__sequelize.models.user.destroy({
        where: {
          'id': userId
        },
        include: [{
          model: this.__sequelize.models.permission,
          include: [{
            all: true,
            nested: true
          }],
        }]
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Метод обновляющий у пользователя его права доступа
   *
   * @param {number} userId 
   * @param {any} newPermissions
   * @returns {Promise<any>}
   * @memberof UserModel
   */
  async updateUserPermissionById(userId, newPermissions) {
    /**
     * TODO: Сделать обновление прав
     */
    try {
      // 
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   *
   * @param {*} data
   * @returns
   * @memberof UserModel
   */
  async updateUser(data) {
    try {
      return await this.__sequelize.models.user.findOne({
        where: {
          'id': data.id
        }
      }).then(user => user.update(data));
    } catch (error) {
      throw new Error(error);
    }
  }
}
