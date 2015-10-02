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

    //#region Permissions 

    var getGroupsPermissions = function (permissionsObservable, documentPermissions, groupId) {
        return $.getJSON(config.remoteServerName + "/GetGroupsPermissions?groupId=" + groupId, { documentPermissions: documentPermissions }).success(function (data) {
            permissionsObservable(data);
        });
    };

    var addGroupsPermissions = function (documentPermissions) {
        return $.post(config.remoteServerName + "/AddGroupsPermissions", { '': documentPermissions });
    };

    var editGroupsPermissions = function (documentPermissions) {
        return $.post(config.remoteServerName + "/EditGroupsPermissions", { '': documentPermissions });
    };

    //#endregion Permissions
      
    var dataservice = {
        login: login,
        checkTokenValidity: checkTokenValidity
    };


    return dataservice;

});