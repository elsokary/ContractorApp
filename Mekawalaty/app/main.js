requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'knockout': '../Scripts/knockout-3.1.0',
        'jquery': '../Scripts/jquery-1.9.1',
        'bootstrap': '../Scripts/bootstrap',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions' 
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

define('main', ['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap'], function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Starter Kit';

    app.configurePlugins({
        router: true,
        dialog: true
        
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.

        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});