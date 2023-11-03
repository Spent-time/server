/**
 * Module dependencies.
 */
var util = require('util');
var OAuthStrategy = require('passport-oauth1');


function Strategy(options, verify) {
    options = options || {};
    options.requestTokenURL = options.requestTokenURL || "https://trello.com/1/OAuthGetRequestToken";
    options.accessTokenURL = options.accessTokenURL || "https://trello.com/1/OAuthGetAccessToken";
    options.userAuthorizationURL = options.userAuthorizationURL || "https://trello.com/1/OAuthAuthorizeToken";
    options.sessionKey = options.sessionKey || 'oauth:trello';

    OAuthStrategy.call(this, options, verify);
    this.name = 'trello';
    this.trelloParams = options.trelloParams || {};
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);

Strategy.prototype.userProfile = function (token, tokenSecret, params, done) {

    this._oauth.get('https://trello.com/1/members/me', token, tokenSecret, function (err, body, res) {

        if (err) {

            return done(new InternalOAuthError('failed to fetch user profile', err));
        }

        try {

            var json = JSON.parse(body);

            var profile = {};
            profile.id = json.id;
            profile.email = json.email;
            profile._raw = body;
            profile._json = json;

            console.info(profile);

            return done(null, profile);

        } catch (e) {

            return done(e);
        }
    });
};

Strategy.prototype.userAuthorizationParams = function (options) {

    var params = {};

    params.scope = 'read,account';
    params.name = 'Spent time';
    params.expiration = 'never';

    return params;
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
