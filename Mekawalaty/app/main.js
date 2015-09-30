requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'knockout': '../Scripts/knockout-3.1.0',
        'jquery': '../Scripts/jquery-1.9.1',
        'bootstrap': '../Scripts/bootstrap',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions',
        'config': 'config',
        'services': 'services',
        'resources': 'resources',
        'permissions': 'permissions',
        'documentDefenition': 'documentDefenition'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});
 
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
            //if (!(arguments[0].url === 'api/ContractorApp/SendTicket')) {
            //dataservice.sendTicket(ticketInformation).success(function (data) {

            //});
            //  }
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

    var totalNotification = ko.observable(1);

    totalNotification.subscribe(function () {
        config.totalNotification(totalNotification());
    });

    var startApp = function () {
        app.start().then(function () {

            router.makeRelative({ moduleId: 'viewmodels' });

            viewLocator.useConvention();

            app.setRoot('viewmodels/shell');

            system.log('Main Module started');
        });
    };

    var appStarted = ko.observable(false);

    $.getJSON("public/IP_Configuration.json", function (data) {
        $.getJSON(data.local + (data.pmApp ? '/' : '') + data.pmApp + "/api/ContractorApp/CheckLocal", function (isLocal) {
            if (isLocal) {

                config.remoteServerName = data.local + (data.pmApp ? '/' : '') + data.pmApp + '/api/ContractorApp';

                config.ipAddress = data.local + '/';

                config.remoteHRAPI = data.hrApp + (data.hrApp ? '/' : '') + 'api/ContractorApp';

                //dataservice.getNotificationPostit().success(function (data) {
                //    var count = 0;
                //    var result = ko.utils.arrayForEach(data, function (item) {
                //        if (item.viewStatus === false) {
                //            count += 1;
                //        }
                //    });
                //    totalNotification(count);
                //});

                dataservice.checkTokenValidity().done(function (data) {
                    var primeData = data;

                    // notifyDto(new notifyDto(primeData));

                    if (primeData) {
                        if (primeData.permissions) {

                            window.localStorage.setItem('permissions', JSON.stringify(primeData.permissions));
                        }
                        if (primeData.timeSheetSettings) {
                            config.timeSheetSettings(ko.mapping.fromJS(primeData.timeSheetSettings));
                        }

                        if (primeData.AppComponants) {
                            //window.localStorage.setItem('appComponants', JSON.stringify(primeData.AppComponants));
                        }

                        if (primeData.contactName) {
                            config.contactName(primeData.contactName);
                        }

                        if (primeData.profilePath) {

                            config.profilePath(primeData.profilePath);
                        }

                        config.taskCount(primeData.taskCount);

                        config.notificationCount(primeData.notificationCount);

                        var total = ko.computed(function () {
                            return config.taskCount() + config.notificationCount();
                        });

                        config.totalNotification(total());

                        config.appComponants(primeData.AppComponants);

                        config.isCompany(primeData.isCompany);

                        //startApp();

                        appStarted(true);
                    }
                });
            }
        }).complete(function () {
            if (!appStarted()) {
                config.remoteServerName = data.static + (data.pmApp ? '/' : '') + data.pmApp + '/api/ContractorApp';
                config.ipAddress = data.static + '/';
                config.remoteHRAPI = data.hrApp + (data.hrApp ? '/' : '') + 'api/ContractorApp';
                dataservice.getNotificationPostit().success(function (data) {
                    var count = 0;
                    var result = ko.utils.arrayForEach(data, function (item) {
                        if (item.viewStatus === false) {
                            count += 1;
                        }
                    });
                    totalNotification(result);

                });

                dataservice.checkTokenValidity().done(function (data) {
                    var primeData = data;

                    if (primeData) {
                        if (primeData.permissions) {

                            window.localStorage.setItem('permissions', JSON.stringify(primeData.permissions));
                        }
                        if (primeData.timeSheetSettings) {
                            config.timeSheetSettings(ko.mapping.fromJS(primeData.timeSheetSettings));
                        }

                        if (primeData.AppComponants) {
                            //window.localStorage.setItem('appComponants', JSON.stringify(primeData.AppComponants));
                        }

                        if (primeData.contactName) {
                            config.contactName(primeData.contactName);
                        }
                        if (primeData.profilePath) {

                            config.profilePath(primeData.profilePath);
                        }
                        config.taskCount(primeData.taskCount);

                        config.notificationCount(primeData.notificationCount);

                        var total = ko.computed(function () {
                            return config.taskCount() + config.notificationCount();
                        });

                        config.totalNotification(total());


                        config.appComponants(primeData.AppComponants);

                        config.isCompany(primeData.isCompany);
                    }
                });

                startApp();

                appStarted(true);
            }
        });
    });
});