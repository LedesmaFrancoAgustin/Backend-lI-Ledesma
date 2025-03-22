import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Función que realiza el encriptado de contraseña a través de bcrypt con el método hashSync.
 * Recibe password sin encriptar y retorna password encriptada.
 * @param {string} password
 * @returns {string} password encriptada
 */
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * Verifica si la contraseña es válida comparando la contraseña sin encriptar con el hash guardado.
 * @param {string} password Contraseña sin encriptar proporcionada por el usuario
 * @param {object} user Usuario encontrado en la base de datos
 * @returns {boolean}
 */
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);