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
 *   Server
 * </p>
 *
 * @module server
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies
 */
var log = require('./app/log');
var config = require('./config');
var express = require('express');
var http = require('http');
var session = require('express-session');
var RethinkDBStore = require('express-session-rethinkdb')(session);
var passport = require('passport');


log.info("==================================================================================");
log.info("     _________                     __    ___________.__                           ");
log.info("    /   _____/_____   ____   _____/  |_  \\__    ___/|__| _____   ____            ");
log.info("    \\_____  \\\\____ \\_/ __ \\ /    \\   __\\   |    |   |  |/     \\_/ __ \\   ");
log.info("    /        \\  |_> >  ___/|   |  \\  |     |    |   |  |  Y Y  \\  ___/         ");
log.info("   /_______  /   __/ \\___  >___|  /__|     |____|   |__|__|_|  /\\___  >         ");
log.info("           \\/|__|        \\/     \\/                           \\/     \\/       ");
log.info("                                                                                  ");
log.info(" Created by : Cloud Coders                                                        ");
log.info("  Copyright : (c) 2016 - Cloud Coders intl B.V.                                   ");
log.info("    Package : server                                                              ");
log.info("    Product : spent-time.com                                                      ");
log.info("                                                                                  ");
log.info("==================================================================================");
log.info("");
log.info(" Starting....   Time for the awesome ;0)                                          ");
log.info("");
log.info("==================================================================================");

/**
 * Shared session store for express & socket.io
 */
var sessionStore = new RethinkDBStore({
    connectOptions: {
        db: config.db
    }
});

log.info('RethinkDB session store created');

/**
 * Setup server
 */
log.info('Initialize Express');
var app = express();

log.info('Create HTTP Server');
var server = http.Server(app);

/**
 * Expose express app
 */
module.exports = app;

/**
 * Bootstrap
 *
 * - Passport
 * - Express
 * - Routing
 * - Socket.io
 * - RethinkDB
 * - GMail
 */
require('./config/passport')(passport);
require('./config/express')(app, passport, sessionStore);
require('./config/routes')(app, passport);
require('./config/socket')(server, sessionStore);
require('./config/rethink');
require('./config/gmail').init();

/**
 * Server listen
 */
server.listen(config.port);

/**
 * All done.
 */
log.info('Express app started on port ' + config.port);
log.info("==================================================================================");




