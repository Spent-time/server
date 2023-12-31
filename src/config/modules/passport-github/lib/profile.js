/**
 * Parse profile.
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function (json) {

    if ('string' == typeof json) {

        json = JSON.parse(json);
    }

    var profile = {};

    profile.id = String(json.id);
    profile.email = json.email;

    return profile;
};
