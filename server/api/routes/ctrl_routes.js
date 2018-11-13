'use strict';
module.exports = function(app) {
    var ctrl = require('../controllers/CTRLr');

    app.route('/users')
        .post(ctrl.create_user);

    app.route('/users/:userId')
        .get(ctrl.get_user);
/*
    app.route('/session/')
        .post(ctrl.auth_user)
        .delete(ctrl.destroy_session); */

};