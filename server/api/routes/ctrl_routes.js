'use strict';
module.exports = function(app) {
    var ctrl = require('../controllers/CTRLr');

    app.route('/users')
        .post(ctrl.create_user);

    app.route('/users/:userId')
        .get(ctrl.get_user);

    app.route('/nodes/')
        .get(ctrl.get_nodes)
        .post(ctrl.create_node);

    app.route('/stream')
        .get(ctrl.stream_events);

    app.route('/testevent')
        .get(ctrl.test_event);

    app.route('/capture')
        .get(ctrl.test_capture);
/*
    app.route('/session/')
        .post(ctrl.auth_user)
        .delete(ctrl.destroy_session); */

};