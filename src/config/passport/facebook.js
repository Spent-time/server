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
 *   Facebook passport authentication
 * </p>
 *
 * @module config/passport/facebook
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies.
 */
var r = require('../rethink').r;
var FacebookStrategy = require('../modules/passport-facebook').Strategy;
var config = require('../');
var gmail = require('../../config/gmail');

/**
 * Expose Facebook Strategy
 */
module.exports = new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: config.facebook.profileFields
    },
    function (accessToken, refreshToken, profile, done) {

        /**
         * Find the Facebook user.
         * At this point in the strategy
         * the user is authenticated
         * trough facebook
         */
        r.table('users').filter({

            'facebookId': profile.id

        }).run().then(function (result) {

            var user = result[0];

            if (!user) {

                /**
                 * User not found. New user, create and send welcome mail
                 * @type {{name: *, username: *, provider: string, facebook: (*|json)}}
                 */
                user = {
                    active: true,
                    facebookId: profile.id,
                    email: profile.email,
                    provider: 'facebook',
                    profile: profile._json,
                    trackers: ['spent-time']
                };

                /**
                 * Insert and return
                 */
                r.table('users').insert(user, {returnChanges: true}).run().then(function (u) {

                    var user = u.changes[0].new_val;

                    gmail.sendWelcome(user);

                    return done(null, user);
                });

            } else {

                /**
                 * User found, return
                 */
                return done(null, user);
            }
        });
    }
);
