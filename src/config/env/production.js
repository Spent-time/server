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
 *   Development envirnment configuration
 * </p>
 *
 * @module config/env/development
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */
module.exports = {
    host: 'my.spent-time.com',
    port: 2355,
    db: 'spent_time',
    tables: {
        session: 'id',
        users: 'id'
    },
    secret: '',
    github: {
        clientID: '',
        clientSecret: '',
        callbackURL: ''
    },
    bitbucket: {
        clientID: '',
        clientSecret: '',
        callbackURL: ''
    },
    slack: {
        clientID: '',
        clientSecret: '',
        callbackURL: ''
    },
    trello: {
        consumerKey: '',
        consumerSecret: '',
        callbackURL: ''
    },
    facebook: {
        clientID: '',
        clientSecret: '',
        callbackURL: '',
        profileFields: ['id', 'displayName', 'email']
    },
    google: {
        clientID: '',
        clientSecret: '',
        callbackURL: ''
    },


    gmail: {
        installed: {
            client_id: process.env.GMAIL_CLIENT_ID,
            project_id: '',
            auth_uri: '',
            token_uri: '',
            auth_provider_x509_cert_url: '',
            client_secret: '',
            redirect_uris: [
                'urn:ietf:wg:oauth:2.0:oob',
                'http://localhost'
            ]
        },
        auth: {
            access_token: '',
            token_type: 'Bearer',
            refresh_token: '',
            expiry_date: 1471310258478
        }
    }
};
