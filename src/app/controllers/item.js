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
 *   Item controller
 * </p>
 *
 * @module app/controllers/item
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies.
 */
let log = require('../../app/log');
let r = require('../../config/rethink').r;
let {wrap: async} = require('co');

let socket = require('../../config/socket');

let _COLLECTION = 'item';

function getUser(client) {

    return client.request.user[0].id;
}

/**
 *
 */
exports.get = async(function*(client, args) {

    args.filter['user'] = getUser(client);

    let result =
        yield r.table(_COLLECTION).filter(args.filter);

    client.emit(args.token, result);
});

/**
 *
 */
exports.post = async(function*(client, args) {

    let user = getUser(client);

    if (Array.isArray(args.data)) {

        for (let i = 0; i < args.data.length; i++) {

            args.data[i]['user'] = user;
        }

    } else {

        args.data['user'] = user;
    }

    let result =
        yield r.table(_COLLECTION).insert(args.data, {returnChanges: true});

    let docs = [];

    for (let i = 0; i < result.changes.length; i++) {

        docs.push(result.changes[i].new_val);
    }

    if (args.token) {

        client.emit(args.token, docs);
    }

    client.emit('item:created', docs);
});

/**
 *
 */
exports.put = async(function*(client, args) {

    let result =
        yield r.table(_COLLECTION).filter({id: args.data.id, user: getUser(client)}).replace(args.data);

    if (args.token) {

        client.emit(args.token, result);
    }

    client.emit('item:updated', result);
});

/**
 *
 */
exports.del = async(function*(client, args) {

    let result =
        yield r.table(_COLLECTION).filter({id: args.data, user: getUser(client)}).delete();

    if (args.token) {

        client.emit(args.token, result);
    }

    client.emit('item:deleted', result);
});