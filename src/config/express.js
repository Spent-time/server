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
 *   Express Server Setup
 * </p>
 *
 * @module config/express
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies.
 */
var log = require('../app/log');
var config = require('./');
var session = require('express-session');
var compression = require('compression');
var csrf = require('csurf');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * Expose
 */
module.exports = function (app, passport, sessionStore) {

    log.info('Configure Express');

    /**
     * Compression middleware (should be placed before express.static)
     */
    app.use(compression({
        threshold: 512
    }));

    log.info('Using compression - threshold 512');

    /**
     * bodyParser should be above methodOverride
     */
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    /**
     * Session store
     */
    app.use(cookieParser());
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: config.secret,
        store: sessionStore,
        cookie: {secure: false}
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Use CSRF
     * https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
     */
    app.use(csrf());

    /**
     * Set the CSRF token on each response
     */
    app.use(function (req, res, next) {
        res.setHeader('X-Csrf-Token', req.csrfToken());
        next();
    });
};
