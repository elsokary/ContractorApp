require.config({
    paths: {
        'text': '../Scripts/text',
        //'resources': 'resources',
        //'permissions': 'permissions',
        'config': 'config',
        'durandal': '../Scripts/durandal',
        //'knockout': '../Scripts/knockout-3.1.0',
       // 'jquery': '../Scripts/jquery-1.9.1',
        'bootstrap': '../Scripts/bootstrap',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions' 
    } 
});

define('jquery', function () { return jQuery; });
define('knockout', ko);

define('main', ['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/router', 'services/dataservice', 'services/authInterceptor', 'services/tokenstore', 'config', 'plugins/durandal-exception-catch-all'], function (system, app, viewLocator, router, dataservice, authInterceptor, tokenStore, config, exceptionCatchAll) {
    //exceptionCatchAll.onException(function () {
    //    var ticketInformation = {};

    //    ticketInformation.subject = 'Client Side Error - ' + arguments[0].mode;

    //    var response = '';

    //    if (arguments[0].response) {
    //        if (arguments[0].status !== 404) {
    //            response += '<br /> <strong><i>Response Message</strong></i>: ' + JSON.parse(arguments[0].response).message + '<br /> <strong><i>Response Message Details</strong></i>: ' + JSON.parse(arguments[0].response).messageDetail;
    //        } else {
    //            response += '<br /> <strong><i>Response Message</strong></i>: ' + arguments[0].message + '<br /> <strong><i>Response Message Details</strong></i>: ' + arguments[0].message;
    //        }
    //    }

    //    ticketInformation.description = '<strong><i>Message</strong></i>: ' + arguments[0].message + response;

    //    ticketInformation.date = moment(arguments[0].timestamp).format();

    //    ticketInformation.currentUrl = arguments[0].document.currentUrl;

    //    ticketInformation.domain = arguments[0].document.domain;

    //    if (tokenStore.isAuthenticated()) {
 
    //    }
    //});


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
     
    router.makeRelative({ moduleId: 'viewmodels' });

    viewLocator.useConvention();

    app.setRoot('viewmodels/shell');

    system.log('Main Module started');

    //var startApp = function () {
    //    app.start().then(function () {

    //        router.makeRelative({ moduleId: 'viewmodels' });

    //        viewLocator.useConvention();

    //        app.setRoot('viewmodels/shell');

    //        system.log('Main Module started');
    //    });
    //};

   // var appStarted = ko.observable(false);

});