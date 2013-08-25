define([ 'fb', 'header', 'jquery', 'mainify' ], function (fb, header, $, mainify) {
    return mainify(function () {
        var loc = window.location
            , channelUrl = loc.protocol + '//' + loc.host + '/channel'
            , $loginReact = $('.js-login-react')
        ;
        function redirectToNewCallout () {
            window.location = loc.protocol + '//' + loc.host + '/callout';
        }
        fb.init('504481939631364', channelUrl);
        fb.on('login', redirectToNewCallout);
        fb.on('authenticated', function activateCalloutButton () {
            $('.js-callout-button')
                .off('click')
                .on('click', function (event) {
                    event.preventDefault();
                    redirectToNewCallout();
                })
            ;
            fb.api('/me', function (me) {
                $loginReact
                    .empty()
                    .append(header.renderUser(me))
                ;
            });
        });
        fb.on('logout', function activateLoginButton () {
            $('.js-facebook-login')
                .off('click')
                .on('click', function (event) {
                    event.preventDefault();
                    fb.login();
                })
            ;
            $loginReact
                .empty()
                .append(header.renderLogin())
                .find('.js-facebook-login')
                    .on('click', function (event) {
                        event.preventDefault();
                        fb.login();
                    })
            ;
        });
        fb.checkLogin();
    });
});
