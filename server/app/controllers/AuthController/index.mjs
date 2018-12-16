import UserModel from '../../models/UserModel';
import Password from '../../helpers/password';

export default class AuthController {

  constructor(app) {
    this.users = new UserModel(app.sequelize);
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof AuthController
   */
  async actionLogin(request, response) {
    const {
      password,
      remembered = false,
      username
    } = JSON.parse(request.text);

    await this.users.getByUserName(username).then(data => {

      remembered && response.cookie('access_token', `${data.access_token}`, {
        maxAge: 60 * 1000 * 15,
        httpOnly: false,
        domain: '.' + request.get('host').split(':')[0]
      });

      if (Password.verify(password, data.password)) {
        response.status(200).json(data);
      } else {
        response.status(400).type('text').send('Not valid password');
      }
    }).catch(err => response.status(500).json(err));
  }

  /**
   * 
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof AuthController
   */
  async actionAuthFromToken(request, response) {
    const {
      access_token
    } = JSON.parse(request.text);


    await this.users.getByAccessToken(access_token).then(data => {
      data = data.get({
        plain: true
      });
      response.status(200).json(data);

      response.cookie('access_token', `${data.access_token}`, {
        maxAge: 60 * 1000 * 15,
        httpOnly: false
      });

    }).catch(err => response.status(500).json(err));
  }
}
