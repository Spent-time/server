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
    host: 'beta.spent-time.com',
    port: 2355,
    db: 'spent_time',
    tables: {
        session: 'id',
        users: 'id'
    },
    secret: 'Sp3nt-t1m3K1cks@ss|Sp3nt-t1m3K1cks@ss|Sp3nt-t1m3K1cks@ss|Sp3nt-t1m3K1cks@ss',
    github: {
        clientID: '47fa8e3f77fea144bcc8',
        clientSecret: '23811ae995f6b811834b766979a0a7479013e3c6',
        callbackURL: 'https://beta.spent-time.com/auth/github/callback'
    },
    bitbucket: {
        clientID: 'tfuDw33ymQHzQHVuB2',
        clientSecret: 'nR72znADuAVDshvJ2ganD5xnJX84AwA4',
        callbackURL: 'https://beta.spent-time.com/auth/bitbucket/callback'
    },
    slack: {
        clientID: '65290978645.102496545170',
        clientSecret: '2ced06152658fe7559165701755605b6',
        callbackURL: 'https://beta.spent-time.com/auth/slack/callback'
    },
    trello: {
        consumerKey: 'd1dcfd3d33d98ba534b6618bf4fd6706',
        consumerSecret: '461186f3f693fd64407349fe66bdad40715e920f9ba3351cec16932f30f1aa0b',
        callbackURL: 'https://beta.spent-time.com/auth/trello/callback'
    },
    facebook: {
        clientID: '1046738938713306',
        clientSecret: 'f1aa7034ae837cc4864addabb378872b',
        callbackURL: 'https://beta.spent-time.com/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email']
    },
    google: {
        clientID: '48597978027-ekljmlma9ti57oah3au0nhvp6k9u93i0.apps.googleusercontent.com',
        clientSecret: 'yFB6OSHXOFcQHDAQTGTBK_hb',
        callbackURL: 'https://beta.spent-time.com/auth/google/callback'
    },
    linkedin: {
        consumerKey: '77c0hv1d8b3cct',
        consumerSecret: '0ZcbVyLG9RoUYbeK',
        callbackURL: 'https://beta.spent-time.com/auth/linkedin/callback'
    },
    podio: {
        clientID: 'spent-time-beta',
        clientSecret: 'kxBUOxAL3A0BxKjIfTzGWsKy6ceHvIY3T28YlCJeA0FDIHQZcd6dEHnjQ2Zt777g',
        callbackURL: 'https://beta.spent-time.com/auth/podio/callback'
    },
    gmail: {
        "installed": {
            "client_id": "48597978027-rif3m6kbj1e201739ul2u6ersl52mtcp.apps.googleusercontent.com",
            "project_id": "spent-time-140421",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://accounts.google.com/o/oauth2/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": "fnQOdNzHP9NN7Ym7j-ddCL24",
            "redirect_uris": [
                "urn:ietf:wg:oauth:2.0:oob",
                "https://beta.spent-time.com"
            ]
        },
        auth: {
            "access_token": "ya29.Ci-KA3yqbThW4ByEORGvf_ECDenrzGB1diwI4AyTu-07GLDijfBWJSPuBv8dK_ntaA",
            "refresh_token": "1/YXWgb79V9brx_TZuB27vGicD3Zoy-IaJIGbjKQMZtUs",
            "token_type": "Bearer",
            "expiry_date": 1477854942269
        }
    }
};
