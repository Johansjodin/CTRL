'use strict';
var multer  = require('multer');
var util = require('../util');
var upload = multer({ dest: 'uploads/', fileFilter: util.imageFilter});

module.exports = function(app) {
    const ctrl = require('../controllers/CTRLr');
    const auth = require('../controllers/auth');

    app.use(auth.validateToken);

    app.route('/users')
        .post(ctrl.create_user);

    app.route('/users/:userId')
        .get(ctrl.get_user);

    app.route('/users/:userId/colors')
        .post(auth.loginRequired, ctrl.set_colors)
        .get(ctrl.get_user_colors)

    app.route('/users/:userId/image')
        .post(auth.loginRequired, upload.single('avatar'), ctrl.set_image)

    app.route('/users/:userId/events')
        .get(ctrl.get_capture_events_by_user)

    app.route('/images/:filename')
        .get(ctrl.get_image)

    app.route('/nodes/')
        .get(ctrl.get_nodes)
        .post(auth.loginRequired, auth.adminRequired, ctrl.create_node);

    app.route('/nodes/:nodeId/events')
        .get(ctrl.get_capture_events_by_node)

    app.route('/nodes/:userId')
        .get(ctrl.get_nodes_owned_by_user)

    app.route('/stream')
        .get(ctrl.stream_events);

    app.route('/testevent')
        .get(ctrl.test_event);

    app.route('/capture')
        .post(ctrl.test_capture);

    app.route('/auth/sign_up')
        .post(auth.googleAuth, ctrl.create_user)

    app.route('/auth/sign_in')
        .post(auth.googleAuth, ctrl.login);

};