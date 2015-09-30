define(['services/tokenstore', 'config', 'plugins/router', 'durandal/app'], function (tokenStore, config, router, app) {
    return {
        setupHttpCalls: function () {
            $.ajaxSetup({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Lang", config.currentLanguage());

                    var token = tokenStore.getToken();
                    if (token) {
                        xhr.setRequestHeader("withCredentials", true);
                        xhr.setRequestHeader("Authorization", token);
                        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    }
                },
                statusCode: {
                    401: function () {
                        window.localStorage.setItem('permissions', JSON.stringify([]));
                        tokenStore.removeToken();
                        router.navigate('#');
                    }
                }
            });
        }
    };
});