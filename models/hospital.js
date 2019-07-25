
module.exports = function (sequelize, Types) {
    let Hospital = sequelize.define('Hospital', {
        name: { type: Types.STRING},
        phone: { type: Types.INTEGER},
        reg_no: { type: Types.STRING, primaryKey: true},
        active_status: { type: Types.INTEGER}
    }, {
        modelName: 'Hospital',
        singular: true,
        tableName: 'Hospital',
        hooks: {
            beforeCreate: async function (data, option) {
                // add your logic for calculated fields before create
                data.active_status = 1
            }
        }
    })

    return Hospital;
}