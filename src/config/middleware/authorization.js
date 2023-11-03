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
 *   Generic require login routing middleware
 * </p>
 *
 * @module config/middleware/authorization
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */
exports.requiresLogin = function (req, res, next) {

    /**
     * Authenticated. Request can be propagated to next action
     */
    if (req.isAuthenticated()) {
        return next();
    }

    /**
     * Set the unauthorized http status code
     */
    res.status(401);

    /**
     * Add a csrf token for a possible login request
     *
     * CSRF: Cross-site request forgery, also known as one-click attack or session riding and
     * abbreviated as CSRF (sometimes pronounced sea-surf[1]) or XSRF
     *
     * https://en.wikipedia.org/wiki/Cross-site_request_forgery
     */
    res.send('{ "message" : "Authentication required"}');
};

/**
 * @todo implement
 *
 * @type {{hasAuthorization: Function}}
 */
exports.event = {
    hasAuthorization: function (req, res, next) {

        /**
         * @todo check authorization
         */
        console.info('Check event authorization');

        next();
    }
};

/**
 * @todo implement
 *
 * @type {{hasAuthorization: Function}}
 */
exports.item = {
    hasAuthorization: function (req, res, next) {

        /**
         * @todo check authorization
         */
        console.info('Check item authorization');

        next();
    }
};

/**
 * @todo implement
 *
 * @type {{hasAuthorization: Function}}
 */
exports.report = {
    hasAuthorization: function (req, res, next) {

        /**
         * @todo check authorization
         */
        console.info('Check report Authorization');

        next();
    }
};

/**
 * @todo implement
 *
 * @type {{hasAuthorization: Function}}
 */
exports.setting = {
    hasAuthorization: function (req, res, next) {

        /**
         * @todo check authorization
         */
        console.info('Check setting Authorization');

        next();
    }
};