function Facebook ($, FB) {
    this.$ = $;
    this._FB = FB;
    this._eventEmitter = this.$({});
}

Facebook.prototype.events = [ 'login', 'cancel', 'logout' ];

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
    this._eventEmitter.trigger(event);
};

Facebook.prototype.checkLogin = function (callback) {
    var self = this;
    self._FB.Event.subscribe('auth.statusChange', function (response) {
        self.isLoggedIn = response.status === 'connected';
        if (self.isLoggedIn) {
            self.emit('login');
        } else {
            self.emit('logout');
        }
    });
};

Facebook.prototype.login = function () {
    var self = this;
    self._FB.login(function (response) {
        self.isLoggedIn = Boolean(response.authResponse);
        // Login event is handled by `checkLogin()`
        if (!self.isLoggedIn) {
            self.emit('cancel');
        }
    });
};

define([ 'jquery', 'facebook' ], function ($) {
    return new Facebook($, FB);
});