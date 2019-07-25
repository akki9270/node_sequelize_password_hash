
module.exports = function (sequelize, Types) {
    const Patient = sequelize.define('Patient', {
        name: { type: Types.STRING },
        fk_reg_no: {
            type: Types.STRING,
            references: {
                model: 'Hospital',
                key: 'reg_no'
            }
        }
    }, {
            modelName: 'Patient',
            singular: true,
            tableName: 'Patient'
        });

    return Patient;
}