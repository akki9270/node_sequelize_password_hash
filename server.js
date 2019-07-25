const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const models = require('./models');

// parse request as Json object
app.use(bodyParser.json());

models.sequelize.sync({ force: true })
    .then(async () => {
        try {
            // Add dummy data to hospital and patient Table
            let Hospital_1 = await models.Hospital.create({ name: 'atos', phone: 123456789, reg_no: '123' });
            await models.Hospital.create({ name: 'apple', phone: 123456789, reg_no: '124' });
            await models.Patient.create({ fk_reg_no: Hospital_1.reg_no, name: 'Jhone' })
            await models.User.create({ email: 'admin@admin.com', password: '123456' });
            start_server();
        } catch (err) {
            console.log(' Data Insert Err ', err);
        }
    })

// login
app.post('/login', async function(req, res) {
    let { email, password } = req.body; 
    let user = await models.User.findOne({ where: { email } });
    if (!user) {
        console.log('!user')
        return res.status(401).json({ msg: 'No such user found' });
    }
    let hash = models.User.sha512(password, user.password_salt);
    if (hash.passwordHash === user.password_hash) {
        res.status(200).json({ msg: 'ok'});
    } else {
        console.log('else');
        return res.status(401).json({ msg: 'Password is incorrect' });
    }
})    
// get list of hospitals using models.
app.get('/hospitals', async function (req, res) {
    let hospitals = await models.Hospital.findAll({});

    // to get selected fields only. uncomment it and check.
    /* let hospitals = await models.Hospital.findAll({
        attributes: ['name', 'reg_no']
    }); */

    res.send(hospitals);
});

function start_server() {
    app.listen(8000, function () {
        console.log('Magic happens on port 8000')
    })
}
