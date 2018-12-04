'use strict';
module.exports = function(app) {
    const ctrl = require('../controllers/CTRLr');
    const auth = require('../controllers/auth');

    app.use(auth.validateToken);

    app.route('/users')
        .post(ctrl.create_user);

    app.route('/users/:userId')
        .get(ctrl.get_user);

    app.route('/auth/sign_in')
        .post(auth.googleAuth, ctrl.login);

    app.route('/users/:userId/colors')
        .post(auth.loginRequired, ctrl.set_colors)
        .get(ctrl.get_user_colors)

    app.route('/nodes/')
        .get(ctrl.get_nodes)
        .post(auth.loginRequired, auth.adminRequired, ctrl.create_node);

    app.route('/stream')
        .get(ctrl.stream_events);

    app.route('/testevent')
        .get(ctrl.test_event);

    app.route('/capture')
        .post(ctrl.test_capture);

    app.route('/auth/sign_up')
        .post(auth.googleAuth, ctrl.create_user)

};