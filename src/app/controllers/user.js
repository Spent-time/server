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
 *   User controller
 * </p>
 *
 * @module app/controllers/user
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies.
 */
var crypto = require('crypto');
var gmail = require('../../config/gmail');

/**
 * Validation is not required if using OAuth
 */
exports.skipValidation = function () {
    return ~oAuthTypes.indexOf(this.provider);
};

exports.signin = function () {
};

/**
 * Auth callback
 */

exports.authCallback = login;

exports.session = login;
/**
 * Session
 */

function login(req, res) {

    var path = req.route.path;
    var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
    delete req.session.returnTo;

    if (path === '/auth/users/session') {

        res.send(req.user);

    } else {

        res.redirect(redirectTo);
    }
}


/**
 * Logout
 */
exports.logout = function (req, res) {

    req.logout();
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.send({'TimeToSay': 'Bye! Adiós! Doei! Au revoir! Tschüss! Ciao! さようなら! пока! tchau!'});
};


exports.invite = function (req, res) {

    var emails = req.body.emails;

    for (var i = 0; i < emails.length; i++) {

        gmail.sendInvitation(emails[i]);
    }

    return res.send({
        message: 'ok'
    });
};


