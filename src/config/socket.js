'use strict';

//
//  CLOUD CODERS CONFIDENTIAL
//  _________________________
//
//
//   [2016] Cloud Coders Intl. BV
//   All Rights Reserved.
//
//  NOTICE:  All information contained herein is, and remains
//  the property of Cloud Coders Intl. BV and its suppliers,
//  if any.  The intellectual and technical concepts contained
//  herein are proprietary to Cloud Coders Intl. BV
//  and its suppliers and may be covered by Dutch and Foreign Patents,
//  patents in process, and are protected by trade secret or copyright law.
//
//  Dissemination of this information or reproduction of this material
//  is strictly forbidden unless prior written permission is obtained
//  from Cloud Coders Intl. BV.
//

/**
 * <p>
 *   Socket.io
 * </p>
 *
 * @module socket
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies
 */
var log = require('../app/log');
var config = require('../config');
var io = require('socket.io');
var cookieParser = require('cookie-parser');
var passportSocketIo = require('passport.socketio');

var event = require('../app/controllers/event');
var item = require('../app/controllers/item');
var setting = require('../app/controllers/setting');


var _socket;

var TOPIC = {
    item: {
        get: 'item:get',
        post: 'item:post',
        put: 'item:put',
        del: 'item:delete'
    },
    event: {
        get: 'event:get',
        post: 'event:post',
        put: 'event:put',
        del: 'event:delete',
        between: 'event:between',
        hasTracker: 'event:hasTracker',
        created: 'event:created',
        updated: 'event:updated',
        report: 'event:report'
    },
    setting: {
        get: 'setting:get',
        post: 'setting:post',
        put: 'setting:put',
        del: 'setting:delete'
    }
};

module.exports = function (server, sessionStore) {

    log.info('Initialize Socket.io');

    _socket = io.listen(server, {});

    /**
     * Add passport authentication middleware for socket.io
     */
    _socket.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key: 'connect.sid',
        secret: config.secret,
        store: sessionStore,
        success: onAuthorizeSuccess,
        fail: onAuthorizeFail
    }));

    /**
     * Authenticated client connects
     */
    _socket.on('connection', function (client) {

        log.info('[' + client.request.user[0].id + '] ' +
            'Connect, provider : ' + client.request.user[0].provider +
            ', logged in : ' + client.request.user.logged_in);

        /**
         * Query event
         */
        client.on(TOPIC.event.get, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.event.get + ' - ' + JSON.stringify(args));

            event.get(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * event hasTracker
         */
        client.on(TOPIC.event.hasTracker, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.event.hasTracker + ' - ' + JSON.stringify(args));

            event.hasTracker(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * Get event between
         */
        client.on(TOPIC.event.between, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.event.between + ' - ' + JSON.stringify(args));

            event.getEventsBetween(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }

        });

        /**
         * Get event report
         */
        client.on(TOPIC.event.report, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.event.report + ' - ' + JSON.stringify(args));

            event.getReport(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * Query item
         */
        client.on(TOPIC.item.get, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.item.get + ' - ' + JSON.stringify(args));

            item.get(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * Query setting
         */
        client.on(TOPIC.setting.get, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.setting.get + ' - ' + JSON.stringify(args));

            setting.get(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * Update event
         */
        client.on(TOPIC.event.put, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.event.put + ' - ' + args.data.id);

            event.put(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * Update item
         */
        client.on(TOPIC.item.put, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.item.put + ' - ' + args.data.id);

            item.put(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * Update setting
         */
        client.on(TOPIC.setting.put, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.setting.put + ' - ' + args.data.id);

            setting.put(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * Create event
         */
        client.on(TOPIC.event.post, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.event.post);

            event.post(client, args);

            // Direct callback on message receipt if requested
            if (callback
                && typeof callback === 'function') {
                callback(args);
            }
        });

        /**
         * Create item
         */
        client.on(TOPIC.item.post, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.item.post);

            item.post(client, args);

            // Direct callback on message receipt if requested
            if (callback
                && typeof callback === 'function') {
                callback(args);
            }
        });

        /**
         * Create setting
         */
        client.on(TOPIC.setting.post, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.setting.post);

            setting.post(client, args);

            // Direct callback on message receipt if requested
            if (callback
                && typeof callback === 'function') {
                callback(args);
            }
        });

        /**
         * Delete event
         */
        client.on(TOPIC.event.del, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.event.del + ' - ' + args.data);

            event.del(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * Delete item
         */
        client.on(TOPIC.item.del, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.item.del + ' - ' + args.data);

            item.del(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        /**
         * Delete setting
         */
        client.on(TOPIC.setting.del, function (args, callback) {

            log.info('[' + client.request.user[0].id + '] ' + TOPIC.setting.del + ' - ' + args.data);

            setting.del(client, args);

            // Direct callback if requested
            if (callback
                && typeof callback === 'function') {

                callback(args);
            }
        });

        client.on('disconnect', function () {

            log.info('[' + client.request.user[0].id + '] ' +
                'Disconnect , provider : ' + client.request.user[0].provider +
                ', logged in : ' + client.request.user.logged_in);
        });
    });

    //noinspection JSUnusedLocalSymbols
    /**
     * When successful authenticated we accept the socket.io request.
     *
     * @param data
     * @param accept
     */
    function onAuthorizeSuccess(data, accept) {

        accept();
    }

    //noinspection JSUnusedLocalSymbols
    /**
     * When authentication failed we deny the socket.io request
     *
     * @param data
     * @param message
     * @param error
     * @param accept
     */
    function onAuthorizeFail(data, message, error, accept) {

        accept(new Error(message));
    }
};
