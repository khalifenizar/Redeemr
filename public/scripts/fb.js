function Facebook ($, FB) {
    this.$ = $;
    this._FB = FB;
    this._eventEmitter = this.$({});
}

Facebook.prototype.events = [ 'login', 'cancel', 'authenticated', 'logout' ];

Facebook.prototype.init = function (appId, channeUrl) {
    var self = this;
    self._FB.init({
        appId: appId
        , channeUrl: channeUrl
        , status: true
        , xfbml: true
    });
};

Facebook.prototype.on = function (event, callback) {
    if (this.$.inArray(event, this.events) !== -1) {
        this._eventEmitter.on(event, callback);
    }
};

Facebook.prototype.emit = function (event) {
    var argv = Array.prototype.slice.call(arguments, 1);
    this._eventEmitter.trigger(event, argv);
};

Facebook.prototype.checkLogin = function (callback) {
    var self = this;
    self._FB.Event.subscribe('auth.statusChange', function (response) {
        self.isLoggedIn = response.status === 'connected';
        if (self.isLoggedIn) {
            self.emit('authenticated', response.authResponse.userID);
        } else {
            self.emit('logout');
        }
    });
};

Facebook.prototype.login = function (permissions) {
    var self = this;
    self._FB.login(function (response) {
        self.isLoggedIn = Boolean(response.authResponse);
        // Login event is handled by `checkLogin()`
        if (self.isLoggedIn) {
            self.emit('login', response.authResponse.userID);
        } else {
            self.emit('cancel');
        }
    });
};

Facebook.prototype.logout = function() {
    this._FB.logout();
};

Facebook.prototype.selectFriends = function (options, callback) {
    options.method = 'apprequests';
    this._FB.ui(options, function (response) {
        var request = !response
            ? null
            : {
                id: response.request
                , recipients: response.to
            }
        ;
        callback(request);
    });
};

Facebook.prototype.share = function (options, callback) {
    options.method = 'feed';
    this._FB.ui(options, function (response) {
        var post = !response
            ? null
            : response.post_id
        ;
        callback(post);
    });
};

Facebook.prototype.api = function (endpoint, callback) {
    this._FB.api(endpoint, callback);
};

define([ 'jquery', 'facebook' ], function ($) {
    return new Facebook($, FB);
});
