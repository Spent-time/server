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
 *   Feedback controller
 * </p>
 *
 * @module app/controllers/feedback
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

var gmail = require('../../config/gmail');

module.exports = {


    create: function (req, res) {

        /**
         * @todo store received data
         *       store the base64 data uri 'as-is'.
         */
        var data = {
            email: req.user[0].email,
            message: req.body.message,
            date: req.body.date,
            timezoneOffset: req.body.timezoneOffset,
            provider: req.user[0].provider,
            image: req.body.image,
            navigator: JSON.stringify(req.body.navigator || {}),
            screen: JSON.stringify(req.body.screen || {}),
            performance: JSON.stringify(req.body.performance || {})

        };

        gmail.sendFeedback(data);

        return res.send({
            message: 'ok'
        });
    }
};
