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
    secret: 'Sp3nt-t1m3K1cks@ss|Sp3nt-t1m3K1cks@ss|Sp3nt-t1m3K1cks@ss|Sp3nt-t1m3K1cks@ss',
    github: {
        clientID: '5b3033b1ed139129cba4',
        clientSecret: '920e1d4359fe7faaf796be4a993150a4c80c6700',
        callbackURL: 'https://my.spent-time.com/auth/github/callback'
    },
    bitbucket: {
        clientID: 'jC77dH5BheFabHUj7Y',
        clientSecret: 'Kq9WF8CxxV7NNvgtpNSn3AV6hq7yNvEg',
        callbackURL: 'https://my.spent-time.com/auth/bitbucket/callback'
    },
    slack: {
        clientID: '65290978645.102423060323',
        clientSecret: '4c43f9e1ced5b40ecf15cdb5a727935d',
        callbackURL: 'https://my.spent-time.com/auth/slack/callback'
    },
    trello: {
        consumerKey: 'd1dcfd3d33d98ba534b6618bf4fd6706',
        consumerSecret: '461186f3f693fd64407349fe66bdad40715e920f9ba3351cec16932f30f1aa0b',
        callbackURL: 'https://my.spent-time.com/auth/trello/callback'
    },
    facebook: {
        clientID: '1795433374033122',
        clientSecret: '7fa08974a7a6830ae1df45d3cb17a1b7',
        callbackURL: 'https://my.spent-time.com/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email']
    },
    google: {
        clientID: '48597978027-mj4bclkbt8ttp0o6mcq9cmjjj8chn03a.apps.googleusercontent.com',
        clientSecret: '--zhdXiHOxim4QWvzU4wO-s2',
        callbackURL: 'https://my.spent-time.com/auth/google/callback'
    },


    gmail: {
        installed: {
            client_id: process.env.GMAIL_CLIENT_ID,
            project_id: 'spent-time-140421',
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://accounts.google.com/o/oauth2/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_secret: 'yiKD8YIaPcoNucfPuYiN-Twl',
            redirect_uris: [
                'urn:ietf:wg:oauth:2.0:oob',
                'http://localhost'
            ]
        },
        auth: {
            access_token: 'ya29.Ci9BAxxe6n2EIiCG_T35bjXus1Z-uhxnzVZah5zkfCy85PgrGa2UrCbDGldI93zuAQ',
            token_type: 'Bearer',
            refresh_token: '1/EFUEG4q_ciHfyXKOBUVu5NCzLBpuqRWIqnQB81SNWv8',
            expiry_date: 1471310258478
        }
    }
};
