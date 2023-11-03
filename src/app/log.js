"use strict";

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
 *   Logging
 * </p>
 *
 * @module app/log
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies
 */
var moment = require('moment');

module.exports = {


    init: function (args) {

    },

    info: function (message) {

        console.info(moment().format('YYYY MM DD HH:mm:ss SSS') + ' [INFO]', message);
    },

    warn: function (message) {

        console.warn(moment().format('YYYY MM DD HH:mm:ss SSS') + ' [WARN]', message);
    },

    error: function (message) {

        console.error(moment().format('YYYY MM DD HH:mm:ss SSS') + ' [ERROR]', message);

    }

};