import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const secret = process.env.PASSWD_SECRET;

/**
 * Создает хеш пароля
 *
 * @param {*} password
 * @param {*} secret
 * @returns
 */
const generation = (password) => {
  return crypto
    .pbkdf2Sync(password.toString(), secret, 1000, 32, 'sha256')
    .toString('hex');
};

/**
 * 
 * @param password 
 * @param secret 
 * @param passwordHash 
 */
const verify = (password, passwordHash) => {
  const hash = crypto
    .pbkdf2Sync(password, secret, 1000, 32, 'sha256')
    .toString('hex');
  return hash === passwordHash;
};

export default {
  generation,
  verify
};
