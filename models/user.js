
const crypto = require('crypto');

module.exports = function (Sequelize, Types) {
    const User = Sequelize.define('User', {
        email: { type: Types.STRING },
        password: { type: Types.STRING, defaultValue: null },
        password_hash: { type: Types.STRING },
        password_salt: { type: Types.STRING },
        userType: { type: Types.STRING }
    }, {
            tableName: 'User',
            modelName: 'User',
            freeseTableName: true,
            timestamps: true,

            // Do not delete record instead make deleted at timestamp when deleted
            paranoid: true,

            hooks: {
                // eslint-disable-next-line
                beforeCreate: function (user, options) {
                    let password = user.password;
                    let salt = User.genRandomString(16);
                    let { passwordHash } = User.sha512(password, salt);
                    user.password = null;
                    user.password_hash = passwordHash;
                    user.password_salt = salt;
                }
            }
        });
    /**
    * generates random string of characters i.e salt
    * @function
    * @param {number} length - Length of the random string.
    */
    User.genRandomString = function (length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length);   /** return required number of characters */
    }
    /**
     * hash password with sha512.
     * @function
     * @param {string} password - List of required fields.
     * @param {string} salt - Data to be validated.
    */
    User.sha512 = function (password, salt) {
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt,
            passwordHash: value
        };
    };
    return User;
}