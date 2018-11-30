'use strict';
module.exports = function(app) {
    const ctrl = require('../controllers/CTRLr');
    const auth = require('../controllers/auth');

    app.use(auth.validateToken);

    app.route('/users')
        .post(ctrl.create_user);

    app.route('/users/:userId')
        .get(auth.loginRequired, ctrl.get_user);

    app.route('/auth/sign_in')
        .post(ctrl.login);

    app.route('/users/:userId/colors')
        .post(auth.loginRequired, ctrl.set_colors)
        .get(auth.loginRequired, ctrl.get_user_colors)

    app.route('/nodes/')
        .get(ctrl.get_nodes)
        .post(ctrl.create_node);

    app.route('/stream')
        .get(ctrl.stream_events);

    app.route('/testevent')
        .get(ctrl.test_event);

    app.route('/capture')
        .get(ctrl.test_capture);

};