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
 *   Trello passport authentication
 * </p>
 *
 * @module config/passport/trello
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies.
 */
var r = require('../rethink').r;
var TrelloStrategy = require('../modules/passport-trello').Strategy;
var config = require('../');
var gmail = require('../../config/gmail');

module.exports = new TrelloStrategy({
        consumerKey: config.trello.consumerKey,
        consumerSecret: config.trello.consumerSecret,
        callbackURL: config.trello.callbackURL,
        passReqToCallback: true
    },
    function (accessToken, refreshToken, secret, profile, done) {

        r.table('users').filter({

            'trelloId': profile.id

        }).run().then(function (result) {

            var user = result[0];

            if (!user) {

                user = {
                    active: true,
                    trelloId: profile.id,
                    provider: 'trello',
                    profile: profile._json,
                    email: profile.email,
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
