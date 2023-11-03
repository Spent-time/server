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
 *   Routing
 * </p>
 *
 * @module config/routes
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies.
 */
var log = require('../app/log');

var feedback = require('../app/controllers/feedback');
var user = require('../app/controllers/user');

var auth = require('./middleware/authorization');

var fail = {
    failureRedirect: '/auth/failed'
};

/**
 * Expose routes
 *
 * We have protected and open routes.
 *
 * The open routes are for authentication purposes behind the /auth/* route.
 * Anything placed in the /auth/* route is unchecked, no authentication & authorization
 *
 * The closed routes are for protected interaction and placed behind /_api/*
 * Anything placed in tje /_api/* route is check for authentication and authorization
 */
module.exports = function (app, passport) {

    /**
     * We use passport authentication
     *
     * @type {function(this:*)}
     */
    var pauth = passport.authenticate.bind(passport);

    /**===================================================================
     * Public API
     *
     * Unprotected routes for signing up, in & out and auth failures
     * path /auth/*
     ====================================================================*/

    /**
     * Send back the auth failed code & generic, not so, meaningful message
     */
    app.get('/auth/failed', function (req, res) {

        res.status(403);
        res.send({message: 'Sign in failed'});
    });

    /**
     * Signin with Github
     */
    app.get('/auth/github',
        pauth('github', {

            scope: ['user', 'user:email'],

            failureRedirect: '/auth/failed'

        }), user.signin);

    app.get('/auth/github/callback', pauth('github', fail), user.authCallback);


    /**
     * Signin with Bitbucket
     */
    app.get('/auth/bitbucket',
        pauth('bitbucket', {

            failureRedirect: '/auth/failed'

        }), user.signin);

    app.get('/auth/bitbucket/callback', pauth('bitbucket', fail), user.authCallback);

    /**
     * Signin with Slack
     */
    app.get('/auth/slack',
        pauth('slack', {

            scope: ['users:read'],

            failureRedirect: '/auth/failed'

        }), user.signin);

    app.get('/auth/slack/callback', pauth('slack', fail), user.authCallback);

    /**
     * Signin with Trello
     */
    app.get('/auth/trello',
        pauth('trello', {

            failureRedirect: '/auth/failed'

        }), user.signin);

    app.get('/auth/trello/callback', pauth('trello', fail), user.authCallback);

    /**
     * Signin with Facebook
     */
    app.get('/auth/facebook',
        pauth('facebook', {

            scope: ['email', 'public_profile', 'user_about_me'],

            failureRedirect: '/auth/failed'

        }), user.signin);

    app.get('/auth/facebook/callback', pauth('facebook', fail), user.authCallback);

    /**
     * Signin with Google
     */
    app.get('/auth/google',
        pauth('google', {

            scope: ['email'],

            failureRedirect: '/auth/failed'

        }), user.signin);

    app.get('/auth/google/callback', pauth('google', fail), user.authCallback);

    /**
     * Signin with LinkedIn
     */
    app.get('/auth/linkedin',
        pauth('linkedin', {

            failureRedirect: '/auth/failed'

        }), user.signin);

    app.get('/auth/linkedin/callback', pauth('linkedin', fail), user.authCallback);

    /**
     * Signin with Podio
     */
    app.get('/auth/podio',
        pauth('podio', {

            scope: ['email'],

            failureRedirect: '/auth/failed'

        }), user.signin);

    app.get('/auth/podio/callback', pauth('podio', fail), user.authCallback);

    /**===================================================================
     * Private API
     *
     * Protected routes for data interaction
     * path /_api/*
     ====================================================================*/

    /**
     * This will intercept any route defined in the _api path
     */
    app.get(['/_api', '/_api/*'], auth.requiresLogin, function (req, res, next) {

        
        next();
    });

    /**
     * User feedback
     * @todo move to socket
     */
    app.post('/_api/feedback', feedback.create);

    /**
     * Sign out
     */
    app.get('/_api/signout', user.logout);

    /**
     * Retrieve current authenticated User info
     */
    app.get('/_api/user', function (req, res) {

        var user = req.user[0];

        var info = {
            id: user.id,
            active: user.active,
            provider: user.provider,
            trackers: user.trackers,
            subscription: user.subscription,
            email: user.email
        };

        res.send(info);
    });

    app.post('/_api/invitation', user.invite);

    /**
     * Error handling
     */
    app.use(function (err, req, res, next) {

        log.error(err);

        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {

            return next();
        }

        if (err.stack.includes('ValidationError')) {

            res.status(422);
            res.send({error: err.stack});
            return;
        }

        // error page
        res.status(500);
        res.status({error: err.stack});
    });

    // assume 404 since no middleware responded
    app.use(function (req, res) {

        log.error('No Middleware response');

        res.status(404);
        res.send({
            url: req.originalUrl,
            error: 'Not found'
        });
    });
};
