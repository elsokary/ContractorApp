require.config({
    paths: {
        'config': 'config',
        'services': 'services',
        'resources': 'resources',
        'durandal': '../JavaScript/durandal',
        'plugins': '../JavaScript/durandal/plugins',
        'transitions': '../JavaScript/durandal/transitions',
        'text': '../JavaScript/require/text' 
    } 
});

define('jquery', function () { return jQuery; });
define('knockout', ko);
 
 
define('main', ['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/router', 'services/dataservice', 'services/authInterceptor', 'services/tokenstore', 'config'], function (system, app, viewLocator, router, dataservice, authInterceptor, tokenStore, config) {

     
   system.debug(true);
     
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

        app.setRoot('viewmodels/shell');
 
        system.log('Main Module started');
    });

});