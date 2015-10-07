define(['durandal/system', 'config'], function (system, config) {

    //#region Security 

    var login = function (userName, userPassword) {
        var user = {
            userName: userName,
            userPassword: userPassword
        };
        return config.postJson(config.remoteServerName + "/Login", user);
    };

    var checkTokenValidity = function () {
        $.ajaxSetup({ cache: false });

        return $.getJSON(config.remoteServerName + "/CheckTokenValidity").done(function (data) {
            var primeData = data;

            if (primeData) {
                if (primeData.profilePath) {

                    config.profilePath(primeData.profilePath);
                }
            }
        });
    };

    //#endregion Security

    var addCompanies = function (newAccount) {
        return $.post(config.remoteServerName + "/AddCompanies", newAccount);
    };

    var editProjectCompanies = function (editAccountObservable) {
        return $.post(config.remoteServerName + "/EditProjectCompanies", editAccountObservable);
    };

    var getCompanies = function (editAccountObservable) {
        return $.getJSON(config.remoteServerName + "/GetCompanies");
    };

    var getCompaniesForEdit = function (id) {
        return $.getJSON(config.remoteServerName + "/GetCompaniesForEdit?id=" + id);
    };

    var deleteCompany = function (id) {
        return $.post(config.remoteServerName + "/DeleteCompany?id=" + id);
    };

    var dataservice = {
        login: login,
        checkTokenValidity: checkTokenValidity,
        addCompanies: addCompanies,
        editProjectCompanies: editProjectCompanies,
        getCompanies: getCompanies,
        getCompaniesForEdit: getCompaniesForEdit,
        deleteCompany: deleteCompany
    };


    return dataservice;

});