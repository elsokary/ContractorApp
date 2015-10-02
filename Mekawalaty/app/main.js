require.config({
    paths: {
        'config': 'config',
        'services': 'services',
        'resources': 'resources',
        'durandal': '../JavaScript/durandal',
        'plugins': '../JavaScript/durandal/plugins',
        'transitions': '../JavaScript/durandal/transitions',
        'text': '../JavaScript/require/text',
        'gapi': '../JavaScript/googleApi/client'
    }, shim: {
        'gapi': {
            exports: 'gapi'
        }
    }
});

define('jquery', function () { return jQuery; });
define('knockout', ko);
 
 
define('main', ['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/router', 'services/dataservice', 'services/authInterceptor', 'services/tokenstore', 'config', 'plugins/durandal-exception-catch-all'], function (system, app, viewLocator, router, dataservice, authInterceptor, tokenStore, config, exceptionCatchAll) {

    exceptionCatchAll.onException(function () {
        var ticketInformation = {};

        ticketInformation.subject = 'Client Side Error - ' + arguments[0].mode;

        var response = '';

        if (arguments[0].response) {
            if (arguments[0].status !== 404) {
                response += '<br /> <strong><i>Response Message</strong></i>: ' + JSON.parse(arguments[0].response).message + '<br /> <strong><i>Response Message Details</strong></i>: ' + JSON.parse(arguments[0].response).messageDetail;
            } else {
                response += '<br /> <strong><i>Response Message</strong></i>: ' + arguments[0].message + '<br /> <strong><i>Response Message Details</strong></i>: ' + arguments[0].message;
            }
        }

        ticketInformation.description = '<strong><i>Message</strong></i>: ' + arguments[0].message + response;

        ticketInformation.date = moment(arguments[0].timestamp).format();

        ticketInformation.currentUrl = arguments[0].document.currentUrl;

        ticketInformation.domain = arguments[0].document.domain;

        if (tokenStore.isAuthenticated()) {
 
        }
    });
     
    system.debug(true);

    exceptionCatchAll.onWindowError.subscribe();
    exceptionCatchAll.onJQueryAjaxError.subscribe();

    app.title = 'Contractor App';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    authInterceptor.setupHttpCalls();
     

    app.start().then(function () {

        router.makeRelative({ moduleId: 'viewmodels' });

        viewLocator.useConvention();

        dataservice.checkTokenValidity().done(function (data) {
            if (!tokenStore.isAuthenticated()) {
                app.setRoot('viewmodels/login');
            } else {
                app.setRoot('viewmodels/shell');
            }
        });

        system.log('Main Module started');
    });

});