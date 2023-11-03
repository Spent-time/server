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
 *   Event controller
 * </p>
 *
 * @module app/controllers/event
 * @since 1.0
 *
 * @author martijn <martijn@spent-time.com>
 * @copyright Cloud Coders Intl BV
 */

/**
 * Module dependencies.
 */
let r = require('../../config/rethink').r;
let {wrap: async} = require('co');
let socket = require('../../config/socket');

let _COLLECTION = 'event';

function getUser(client) {

    return client.request.user[0].id;
}


exports.hasTracker = async(function*(client, args) {

    let result =
        yield r.table('event').filter({user: getUser(client)}).filter(function (event) {
            return r.expr(args.data).contains(event('tracker'))
        });

    client.emit(args.token, result);
});


exports.getEventsBetween = async(function*(client, args) {

    let result =
        yield r.table(_COLLECTION).between([getUser(client), args.data.start], [getUser(client), args.data.end], {index: 'userStartTime'});

    client.emit(args.token, result);
});


exports.getReport = async(function*(client, args) {

    let result =
        yield r.table(_COLLECTION).between([getUser(client), args.data.start], [getUser(client), args.data.end], {index: 'userStartTime'}).outerJoin(r.table('item'), function (eventRow, itemRow) {
            return eventRow('tracker').eq(itemRow('id'))
        }).zip().pluck('startTime', 'endTime', 'label', 'tags');

    client.emit(args.token, result);
});

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

    args.data['user'] = getUser(client);

    let result =
        yield r.table(_COLLECTION).insert(args.data, {returnChanges: true});

    let docs = [];

    for (let i = 0; i < result.changes.length; i++) {

        docs.push(result.changes[i].new_val);
    }

    if (args.token) {

        client.emit(args.token, docs);
    }

    client.emit('event:created', docs);
});

/**
 *
 */
exports.put = async(function*(client, args) {

    let result =
        yield r.table(_COLLECTION).filter({id: args.data.id, user: getUser(client)}).update(args.data);

    if (args.token) {

        client.emit(args.token, result);
    }

    client.emit('event:updated', result);
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

    client.emit('event:deleted', result);
});


