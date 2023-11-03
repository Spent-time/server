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
    host: 'localhost',
    port: 2355,
    db: 'spent_time',
    tables: {
        session: 'id',
        users: 'id'
    },
    secret: 'Sp3nt-t1m3K1cks@ss|Sp3nt-t1m3K1cks@ss|Sp3nt-t1m3K1cks@ss|Sp3nt-t1m3K1cks@ss',
    github: {
        clientID: 'a582d18314424426d746',
        clientSecret: 'df7bd8607e57e4de2e023ffb352f9ef328df8fed',
        callbackURL: 'http://localhost/auth/github/callback'
    },
    bitbucket: {
        clientID: 'AStE4BDYPNcKeVeLVe',
        clientSecret: 'ukr7HyG6a9npRD8Jca9uykWrvfM9yvZV',
        callbackURL: 'http://localhost/auth/bitbucket/callback'
    },
    slack: {
        clientID: '65290978645.102250378292',
        clientSecret: '8055694f4366964d5b7ca8b4fd649dd5',
        callbackURL: 'http://localhost/auth/slack/callback'
    },
    trello: {
        consumerKey: 'd1dcfd3d33d98ba534b6618bf4fd6706',
        consumerSecret: '461186f3f693fd64407349fe66bdad40715e920f9ba3351cec16932f30f1aa0b',
        callbackURL: 'http://localhost/auth/trello/callback'
    },
    facebook: {
        clientID: '287968634937372',
        clientSecret: '8537e14f734fbd3a6df64ea76a9d8d2e',
        callbackURL: 'http://localhost/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email']
    },
    google: {
        clientID: '48597978027-1qnt58lqb6i94uc8gnjokeibnqg14lq6.apps.googleusercontent.com',
        clientSecret: 'X1EdDM5U7nUmqqCEr-wC8uvP',
        callbackURL: 'http://localhost/auth/google/callback'
    },
    linkedin: {
        consumerKey: '77qk0e7vg6jj1t',
        consumerSecret: 'lYPqk60d0yVR8w6y',
        callbackURL: 'http://localhost/auth/linkedin/callback'
    },
    podio: {
        clientID: 'spent-time-development',
        clientSecret: '4NjCVFqoPcYOm7QWf8rKgp1hvkoz2UVBmI51wh0BFRKY9yITIzHncxcYjOvC3Wh9',
        callbackURL: 'http://localhost/auth/podio/callback'
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
                "http://localhost"
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
