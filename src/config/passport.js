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
 *   Passport Authentication
 * </p>
 *
 * @module config/passport
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies.
 */
var log = require('../app/log');
var r = require('../config/rethink').r;

var github = require('./passport/github');
var bitbucket = require('./passport/bitbucket');
var slack = require('./passport/slack');
var trello = require('./passport/trello');
var facebook = require('./passport/facebook');
var google = require('./passport/google');
var linkedin = require('./passport/linkedin');
var podio = require('./passport/podio');

module.exports = function (passport) {

    log.info('Configure Passport');

    // serialize sessions
    passport.serializeUser(function (user, done) {

        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {

        r.table('users').filter({id: id}).run().then(function (user) {

            done(null, user);

        }).error(function (error) {

            log.error(error);
        });
    });

    // use these strategies
    passport.use(github);
    passport.use(bitbucket);
    passport.use(slack);
    passport.use(trello);
    passport.use(facebook);
    passport.use(google);
    passport.use(linkedin);
    passport.use(podio);

    log.info('Using Strategies: github, bitbucket, slack, trello, facebook, google, linkedin, podio');
};
