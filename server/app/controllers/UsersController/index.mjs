import UUIDv4 from 'uuid/v4';
import formidable from 'formidable';

import UserModel from '../../models/UserModel';
import Password from '../../helpers/password';
import FlUpLoader from '../../classes/FileUploader';

export default class UsersController {

  constructor(app) {
    this.users = new UserModel(app.sequelize);
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof UsersController
   */
  async actionUpdate(request, response) {
    /** @type {Object} user */
    let user = JSON.parse(request.text);


    if (user.hasOwnProperty('oldPassword') && user.hasOwnProperty('password')) {
      await this.users.getById(user.id).then(_user => {
        if (Password.verify(user.oldPassword, _user.password)) {
          user.password = Password.generation(user.password);
        } else {
          response.status(400).type('text').send('Not valid password');
        }
      }).catch(err => response.status(500).json(err));
    }

    await this.users.updateUser(user).then(data => {
      data = data.get({
        plain: true
      });
      response.status(201).json(data);
    }).catch((err) => {
      response.status(500).json(err);
    });
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof UsersController
   */
  async actionAdd(request, response) {
    let user = JSON.parse(request.text);

    user.access_token = UUIDv4();
    user.password = Password.generation(user.password, user.username);

    await this.users.createNewUser(user).then(data => {
      data = data.get({
        plain: true
      });
      response.status(201).json(data);
    }).catch((err) => {
      response.status(500).json(err);
    });
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof UsersController
   */
  async actionDelete(request, response) {
    const {
      id
    } = request.params;

    await this.users.deleteUserById(id).then(() => {
      response.status(200).json({
        status: true,
        message: 'User is deleted'
      });
    }).catch((err) => {
      response.status(500).json(err);
    });
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof UsersController
   */
  async actionUpdatePermission(request, response) {
    const {
      id
    } = request.params;
    const newPermissions = JSON.parse(request.text);

    await this.users.updateUserPermissionById(id, newPermissions).then(() => {
      response.status(200).json({
        status: true,
        message: 'User permission updated'
      });
    }).catch((err) => {
      response.status(500).json(err);
    });
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof UsersController
   */
  async actionUpdateAvatar(request, response, next) {
    // console.log(request.body, request.params);

    let form = new formidable.IncomingForm();

    await form.parse(request, async (err, fields, FormData) => {
      if (err) {
        return next(err);
      }
      let valid = false;
      let photoPath = '';
      const FileUpLoader = new FlUpLoader(FormData[1]);

      if (FileUpLoader.validate()) {
        photoPath = await FileUpLoader.save();
        valid = true;
      }

      if (valid) {
        response.status(200).json({
          'path': photoPath
        });
      } else {
        response.status(400).type('text').send('Not valid photo');
      }
    });
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof UsersController
   */
  async actionUserList(request, response) {
    await this.users.getAllUser().then(data => {
      response.status(200).json(data);
    }).catch((err) => {
      response.status(500).json(err);
    });
  }
}
