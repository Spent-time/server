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
 *   Google Oauth Authentication
 * </p>
 *
 * @module config/passport/google
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies.
 */
var r = require('../rethink').r;
var GoogleStrategy = require('../modules/passport-google-oauth').OAuth2Strategy;
var config = require('../');
var gmail = require('../../config/gmail');

/**
 * Expose Google Strategy
 */
module.exports = new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {

        r.table('users').filter({

            'googleId': profile.id

        }).run().then(function (result) {

            var user = result[0];

            if (!user) {

                user = {
                    active: true,
                    googleId: profile.id,
                    provider: 'google',
                    profile: profile._json,
                    email: profile.emails[0].value,
                    trackers: ['spent-time']
                };

                r.table('users').insert(user, {returnChanges: true}).run().then(function (u) {

                    var user = u.changes[0].new_val;

                    gmail.sendWelcome(user);

                    return done(null, user);
                });

            } else {

                return done(null, user);
            }
        });
    }
);
