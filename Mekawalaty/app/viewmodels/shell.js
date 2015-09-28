define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        attached: function () {
            var x = ko.observable(5);
            alert(x());
            $('body').css('background', 'green');
        },
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});