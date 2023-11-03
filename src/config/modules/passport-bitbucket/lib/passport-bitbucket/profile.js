/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
exports.parse = function (json) {

    if ('string' == typeof json) {
        json = JSON.parse(json);
    }

    var profile = {};
    profile.id = json.uuid;

    //Add emails to profile
    if (json.emails) {

        json.emails.forEach(function (entry) {

            if (entry.is_confirmed
                && entry.is_primary) {

                profile.email = entry.email;
            }
        });
    }

    return profile;
};