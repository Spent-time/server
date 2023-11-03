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
 *   Gmail OAuth2 Authenticated service
 * </p>
 *
 * @module config/gmail
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */
var log = require('../app/log');
var fs = require('fs');
var ejs = require('ejs');
var btoa = require('btoa');
var config = require('../config');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

/**
 * If modifying these scopes, delete your previously saved credentials
 * at .credentials/gmail-nodejs-quickstart.json
 */
var SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'];

/**
 * The Authenticated client
 */
var _oauth2Client;

var confirmation;
var welcome;
var newsletter;
var feedback;
var invitation;

module.exports = {

    /**
     *
     */
    init: function () {

        /**
         * prepare the templates
         */
        confirmation = ejs.compile(fs.readFileSync(__dirname + '/templates/confirmation.html', 'utf-8'), {});
        welcome = ejs.compile(fs.readFileSync(__dirname + '/templates/welcome.html', 'utf-8'), {});
        invitation = ejs.compile(fs.readFileSync(__dirname + '/templates/invitation.html', 'utf-8'), {});
        newsletter = ejs.compile(fs.readFileSync(__dirname + '/templates/newsletter.html', 'utf-8'), {});
        feedback = ejs.compile(fs.readFileSync(__dirname + '/templates/feedback.html', 'utf-8'), {});

        /**
         * get the install secrets from the config and create the client
         */
        var clientSecret = config.gmail.installed.client_secret;
        var clientId = config.gmail.installed.client_id;
        var redirectUrl = config.gmail.installed.redirect_uris[0];

        log.info('Gmail token expires : ' + new Date(config.gmail.auth.expiry_date));

        var auth = new googleAuth();

        _oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);


        /**
         * check if the token is installed
         */

        if (config.gmail.auth.access_token
            && config.gmail.auth.access_token !== '') {

            _oauth2Client.credentials = config.gmail.auth;

        } else {

            // get a new token
            this.getToken();
        }


        log.info('Gmail Service Authenticated');
    },
    getToken: function () {

        var authUrl = _oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });

        log.info('Authorize this app by visiting this url: ');
        log.info(authUrl);

        log.info('Enter the received code in the env config');
    },

    sendInvitation: function (user) {

        var gmail = google.gmail('v1');

        log.info('invitation to : ');
        log.info(user);

        var name = user.name;
        var email = user.email;

        var data = {
            email: email,
            name: name
        };

        var raw = btoa(
            'subject: Invitation - Spent time Beta \r\n' +
            'from: Spent time <support@spent-time.com>\r\n' +
            'to: ' + email + '\r\n' +
            'Content-Type: multipart/alternative; boundary=\"foo_bar\"\r\n\r\n' +
            '--foo_bar\r\n' +
            'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
            'HTML not supported' + '\r\n\r\n' +
            '--foo_bar\r\n' +
            'Content-Type: text/html; charset=UTF-8\r\n\r\n' +
            invitation(data) + '\r\n\r\n' +
            '--foo_bar--'
        ).replace(/\+/g, '-').replace(/\//g, '_');

        gmail.users.messages.send({
            auth: _oauth2Client,
            userId: 'support@spent-time.com',
            resource: {
                raw: raw
            }
        }, function (err, response) {

            if (err) {
                log.info(err);
                log.info(response);
            }

        });
    },

    sendWelcome: function (user) {

        var gmail = google.gmail('v1');

        var email = user.email;

        var data = {
            host: config.host,
            email: email
        };

        var raw = btoa(
            'subject: Spent time - Welcome! \r\n' +
            'from: Spent time <support@spent-time.com>\r\n' +
            'to: ' + email + '\r\n' +
            'Content-Type: multipart/alternative; boundary=\"foo_bar\"\r\n\r\n' +
            '--foo_bar\r\n' +
            'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
            'HTML not supported' + '\r\n\r\n' +
            '--foo_bar\r\n' +
            'Content-Type: text/html; charset=UTF-8\r\n\r\n' +
            welcome(data) + '\r\n\r\n' +
            '--foo_bar--'
        ).replace(/\+/g, '-').replace(/\//g, '_');

        gmail.users.messages.send({
            auth: _oauth2Client,
            userId: 'me',
            resource: {
                raw: raw
            }
        }, function (err, response) {

            if (err) {
                log.info(err);
                log.info(response);
            }

        });


    },
    sendFeedback: function (data) {

        var gmail = google.gmail('v1');

        var attachment = '';

        if (data.image
            && data.image !== '') {

            var pngData = data.image.split('base64,')[1];

            attachment =
                '--foo_bar\r\n' +
                'Content-Type: image/png\n' +
                'MIME-Version: 1.0\n' +
                'Content-Transfer-Encoding: base64\n' +
                'Content-Disposition: attachment; filename="example.png"\n\n' +
                pngData + '\n\n';
        }

        data.host = config.host;

        var raw = btoa(
            'subject: [spent-time.com] - User Feedback \r\n' +
            'from: Spent time <support@spent-time.com>\r\n' +
            'to: support@spent-time.com \r\n' +
            'Content-Type: multipart/mixed; boundary=\"foo_bar\"\r\n\r\n' +
            '--foo_bar\r\n' +
            'Content-Type: text/html; charset=UTF-8\r\n\r\n' +
            feedback(data) + '\r\n\r\n' +
            attachment +
            '--foo_bar--'
        ).replace(/\+/g, '-').replace(/\//g, '_');

        gmail.users.messages.send({
            auth: _oauth2Client,
            userId: 'me',
            resource: {
                raw: raw
            }
        }, function (err, response) {

            if (err) {
                log.info(err);
                log.info(response);
            }
        });
    }
};