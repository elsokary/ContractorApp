define(['durandal/system', 'config'], function (system, config) {

    //#region shared_Methods

    var getTasksByProjectIdList = function (tasksObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetTasksByProjectId", { projectId: projectId }).done(function (data) {
            tasksObservable(data);
        });
    };

    var getTasksByProjectId = function (tasksObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetTasksByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (tasksObservable) {
                tasksObservable.data(data);
            }
        });
    };

    var checkReferanceCode = function (code) {
        return $.getJSON(config.remoteServerName + "/CheckReferanceCode?code=" + code);
    };

    var checkRefCodeEmployee = function (code) {
        return $.getJSON(config.remoteServerName + "/CheckRefCodeEmployee?code=" + code);
    };

    var checkUserNameAccount = function (userName) {
        return $.getJSON(config.remoteServerName + "/CheckUserNameAccount?userName=" + userName);
    };

    var checkRefCodeEmployeeEdit = function (code, accountId) {
        return $.getJSON(config.remoteServerName + "/CheckRefCodeEmployeeEdit?code=" + code + "&accountId=" + accountId);
    };

    var checkUserNameAccountEdit = function (userName, accountId) {
        return $.getJSON(config.remoteServerName + "/CheckUserNameAccountEdit?userName=" + userName + "&accountId=" + accountId);
    };

    var getWorkFlowItemsByWorkFlowIdLevelList = function (workFlowId, workFlowItemObservables) {
        return $.getJSON(config.remoteServerName + "/GetWorkFlowItemsByWorkFlowIdLevel", { workFlow: workFlowId }).done(function (result) {
            workFlowItemObservables(result);
        });
    };

    var getDefaultListForList = function (listType, observableData) {
        return $.getJSON(config.remoteServerName + "/GetDefaultListForList", { listType: listType }).done(function (result) {
            observableData(result);
        });
    };
    var getWorkFlowItemsByWorkFlowIdLevelType = function (workFlowItemObservables, docApprovalId, approvalStatus) {
        return $.getJSON(config.remoteServerName + "/GetWorkFlowItemsByWorkFlowIdLevelType?docApprovalId=" + docApprovalId + "&approvalStatus=" + approvalStatus).done(function (result) {
            if (workFlowItemObservables) {
                workFlowItemObservables(result);
            }
        });
    };

    var accountsPermissionsGroupsGetList = function (accountsPermissionsGroupsObservable) {
        $.getJSON(config.remoteServerName + "/AccountsPermissionsGroupsGet").done(function (data) {
            accountsPermissionsGroupsObservable(data);
        });
    };

    var useBoqPermissions = function (accountsPermissionsGroupsObservable) {
        $.getJSON(config.remoteServerName + "/UseBoqPermissions").done(function (data) {
            accountsPermissionsGroupsObservable(data);
        });
    };

    var getAccountsPermissionsGroups = function (accountsPermissionsGroupsObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountsPermissionsGroups").done(function (data) {
            accountsPermissionsGroupsObservable(data);
        });
    };

    var getAccountGroupId = function (accountsPermissionsGroupsObservable) {
        $.getJSON(config.remoteServerName + "/GetAccountGroupId").done(function (data) {
            accountsPermissionsGroupsObservable(data);
        });
    };


    //#endregion

    //#region Ibrahim El-Torbany - Senior Developer

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

    //#region Salary Categories

    var getSalaryCategories = function (salaryCategoriesObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetSalaryCategories?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (salaryCategoriesObservable) {
                $("#salaryCategories").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(salaryCategoriesObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                salaryCategoriesObservable.data(tempArray);
                $('#salaryCategories').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getSalaryCategoryForEdit = function (salaryCategoryObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetSalaryCategoryForEdit", { id: id }).success(function (data) {
            salaryCategoryObservable(data[0]);
        });
    };

    var editSalaryCategory = function (salaryCategory) {
        return $.post(config.remoteServerName + "/EditSalaryCategory", salaryCategory);
    };

    var addSalaryCategory = function (salaryCategory) {
        return $.post(config.remoteServerName + "/AddSalaryCategory", salaryCategory);
    };

    var deleteSalaryCategory = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteSalaryCategory", { id: id });
    };

    //#endregion Salary Categories

    //#region Project Menue

    var getProjectsForMenue = function (projectsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectsForMenue", { id: 2 }).done(function (data) {
            projectsObservable(data);
        });
    };

    //#endregion 

    //#region Form Templates

    var getFormTemplates = function (formTemplatesObservable, documentType) {
        $.getJSON(config.remoteServerName + "/GetFormTemplates", { documentType: documentType }).done(function (data) {
            formTemplatesObservable(data);
        });
    };

    var saveFormTemplate = function (formTemplate, documentType) {
        config.postJson(config.remoteServerName + "/SaveFormTemplate?documentType=" + documentType, formTemplate);
    };

    //#endregion Form Templates

    //#region Download File
    var getFileByFullPath = function (filePath) {
        $.get(config.remoteServerName + "/GetFileByFullPath?filePath=" + filePath, function (data, status, response) {
            var octetStreamMime = 'application/octet-stream';

            var fileName = response.getResponseHeader('x-filename') || 'download.bin';

            var contentType = undefined || octetStreamMime;

            var blob = new Blob([data], { type: contentType });

            var saveBlob = window.navigator.msSaveBlob || window.navigator.webkitSaveBlob || window.navigator.mozSaveBlob || window.navigator.saveBlob;

            if (saveBlob) {
                saveBlob(blob, fileName);
            } else {
                var a = document.createElement("a");

                document.body.appendChild(a);

                a.style = "display: none";

                var url = window.URL.createObjectURL(blob);

                a.href = url;

                a.download = fileName;

                a.click();

                window.URL.revokeObjectURL(url);

                document.body.removeChild(a);

                a = undefined;
            }
        });
    };
    //#endregion Download File

    //#region Upload Single File
    var uploadSingleFile = function (fileElement, docType) {
        var files = fileElement.files;

        if (files.length > 0) {
            var data = new FormData();

            for (var i = 0; i < files.length; i++) {
                data.append("file" + i, files[i]);
            }

            return $.ajax({
                type: "POST",
                url: "/api/Procoor/UploadSingleFile",
                contentType: false,
                processData: false,
                data: data,
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', config.getAuthenticationHeader()); xhr.setRequestHeader("docType", docType); },
                error: function () {
                    alert("Error while invoking the Web API - Upload Failed");
                }
            });
        }
    }
    //#endregion Upload Single File

    //#region TimeSheet
    var getTimeSheetByDate = function (timeSheetObservable, date) {
        $.getJSON(config.remoteServerName + "/GetTimeSheetByDate", { date: date }).done(function (data) {
            var observableResult = ko.mapping.fromJS(data);

            timeSheetObservable(observableResult());
        });
    };

    var getTimeSheetByDateByContactId = function (timeSheetObservable, date, contactId) {
        $.getJSON(config.remoteServerName + "/GetTimeSheetByDateByContactId", { date: date, contactId: contactId }).done(function (data) {
            var observableResult = ko.mapping.fromJS(data);

            timeSheetObservable(observableResult());
        });
    };


    var getExpensesByDateByContactId = function (timeSheetObservable, DtoExpenses) {
        $.getJSON(config.remoteServerName + "/GetExpensesByDateByContactId", DtoExpenses).done(function (data) {
            var observableResult = ko.mapping.fromJS(data);
            timeSheetObservable(observableResult());
        });
    };


    var getTimeSheetSettings = function (timeSheetSettingsObservable) {
        $.getJSON(config.remoteServerName + "/GetTimeSheetSettings").done(function (data) {
            var observableResult = ko.mapping.fromJS(data);

            timeSheetSettingsObservable(observableResult());
        });
    };
    //#endregion TimeSheet

    //#region Imap Emails
    var synchronizeImapEmails = function (configurationSetId) {
        return $.get(config.remoteServerName + "/SynchronizeEmails?configurationSetId=" + configurationSetId);
    };

    var getImapConfiguration = function (projectId) {
        return $.getJSON(config.remoteServerName + "/GetImapConfiguration");
    };

    var getImapConfigurationForEdit = function (id) {
        return $.getJSON(config.remoteServerName + "/GetImapConfigurationForEdit?id=" + id);
    };

    var setImapConfiguration = function (projectId, imapConfiguration) {
        return $.post(config.remoteServerName + "/SetImapConfiguration?projectId=" + projectId, imapConfiguration);
    };

    var setTaskActualProgress = function (taskId, actualProgress) {
        return $.post(config.remoteServerName + "/SetTaskActualProgress?taskId=" + taskId + "&actualProgress=" + actualProgress);
    };

    var editImapConfiguration = function (imapConfiguration) {
        return $.post(config.remoteServerName + "/EditImapConfiguration", imapConfiguration);
    };

    var getEmails = function (configurationId) {
        return $.getJSON(config.remoteServerName + "/GetEmails?configurationId=" + configurationId);
    };

    var getEmailHtmlContent = function (id) {
        return $.getJSON(config.remoteServerName + "/GetEmailHtmlContent?id=" + id);
    };

    var deleteImapEmails = function (idList) {
        return $.post(config.remoteServerName + "/DeleteImapEmails", { '': idList }, 'json');
    };
    //#endregion Imap Emails

    //#region Ticketing
    var sendTicket = function (ticket) {
        return $.post(config.remoteServerName + "/SendTicket", ticket);
    };
    //#endregion Ticketing

    //#endregion Ibrahim El-Torbany - Senior Developer

    //#region Ramadan Sokary - Team Leader

    //#region Accounts

    var getAccounts = function (accountsObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccounts").done(function (data) {
            if (accountsObservable) {
                accountsObservable.data(data);
            }
        });
    };

    var getAccountsChunk = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsChunk", { pageNumber: pageNumber, pageSize: pageSize });
    };

    var getAccountsList = function (accountsObservable) {
        $.getJSON(config.remoteServerName + "/GetAccounts").done(function (data) {
            accountsObservable(data);
        });
    };

    var getAccountsById = function (accountsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetaccountBYId", { id: id }).success(function (data) {
            if (accountsObservable) {
                accountsObservable(data);
            }
        });
    };

    //get current account
    var getAccountInfo = function (accountsObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountInfo").success(function (data) {
            accountsObservable(ko.mapping.fromJS(data));
        });
    };

    var accountDeleteById = function (id) {
        return $.getJSON(config.remoteServerName + "/AccountDeleteById", { id: id });
    };

    var getCompanies = function (companiesObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCompanies", { accountOwnerId: id }).done(function (data) {
            companiesObservable(data);
        });
    };
    var getCompaniesForAccounts = function (companiesObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCompaniesForAccounts", { accountId: id }).done(function (data) {
            companiesObservable(data);
        });
    };
    var getProjectProjectsCompanies = function (projectCompaniesObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetProjectProjectsCompanies?projectId=" + projectId).done(function (data) {
            projectCompaniesObservable(data);
        });
    };

    var getProjectProjectsCompaniesForManageCompanies = function (projectCompaniesObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetProjectProjectsCompaniesForManageCompanies?projectId=" + projectId).done(function (data) {
            projectCompaniesObservable(data);
        });
    };

    var getProjectProjectsCompaniesByCompanyId = function (projectCompaniesObservable, companyId) {
        return $.getJSON(config.remoteServerName + "/GetProjectProjectsCompaniesByCompanyId", { companyId: companyId }).done(function (data) {
            projectCompaniesObservable(data);
        });
    };

    var getContactsByCompanyId = function (contactsObservable, companyId) {
        return $.getJSON(config.remoteServerName + "/GetContactsByCompanyId?companyId=" + companyId).done(function (data) {
            contactsObservable(data);
        });
    };

    var getContactsByCompanyIdForOnlyUsers = function (contactsObservable, companyId) {
        return $.getJSON(config.remoteServerName + "/GetContactsByCompanyIdForOnlyUsers", { companyId: companyId }).done(function (data) {
            contactsObservable(data);
        });
    };

    var getContactsHasAccountsByCompanyId = function (contactsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContactsHasAccountsByCompanyId", { companyId: id }).done(function (data) {
            contactsObservable(data);
        });
    };

    var getContactsNotUsersByCompanyId = function (contactsObservable, id) {
        $.getJSON(config.remoteServerName + "/GetContactsNotUsersByCompanyId", { companyId: id }).done(function (data) {
            contactsObservable(data);
        });
    };

    var getGroup = function (groupsObservable, id) {
        $.getJSON(config.remoteServerName + "/GetGroup", { accountOwnerId: id }).done(function (data) {
            groupsObservable(data);
        });
    };

    var addAccount = function (newAccount) {
        return $.post(config.remoteServerName + "/AddAccount", newAccount).success(function (data) { });
    };

    var editAccount = function (editAccountObservable) {
        return $.post(config.remoteServerName + "/EditAccount", editAccountObservable);
    };

    var getVacationByAccountId = function (vacationObservable, accountId) {
        return $.getJSON(config.remoteServerName + "/GetVacationByAccountId", { accountId: accountId }).success(function (data) {
            vacationObservable(data);
        });
    };
    var updateVacations = function (accountId, dayId) {
        return $.post(config.remoteServerName + "/UpdateVacations", { accountId: accountId, dayId: dayId });
    };

    var updateChangePassword = function (accountId, dayId) {
        return $.post(config.remoteServerName + "/UpdateChangePassword", { accountId: accountId });
    };
    //#endregion Accounts

    //#region EPS

    var getEps = function (projectsEpsObservable) {
        return $.getJSON(config.remoteServerName + "/GetEps").done(function (data) {
            if (projectsEpsObservable) {
                projectsEpsObservable(data);
            }
        });

    };

    var getProjectsEpsByAccountId = function (projectEpsChart, accountId) {
        $.getJSON(config.remoteServerName + "/GetProjectsEpsByAccountId", { accountId: accountId })
           .success(function (data) {
               projectEpsChart(data);
           });
    };

    var getEpsById = function (projectsEpsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetEpsById", { id: id }).done(function (data) {
            if (projectsEpsObservable) {
                projectsEpsObservable(data);
            }
        });
    };

    var deletEpsById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeletEpsById", { id: id });
    };

    var editEpsById = function (epsObservable) {
        return $.post(config.remoteServerName + "/EditEpsById", epsObservable);
    };

    var addEps = function (epsObservable) {
        return $.post(config.remoteServerName + "/AddEps", epsObservable);
    };

    var changeEpsParent = function (id, parentId) {
        return $.post(config.remoteServerName + "/ChangeEpsParent?id=" + id + "&parentId=" + parentId);
    };

    var changeProjectEpsParent = function (projectId, epsId) {
        return $.post(config.remoteServerName + "/ChangeProjectEpsParent?projectId=" + projectId + "&epsId=" + epsId);
    };

    var moveUpEps = function (id) {
        return $.post(config.remoteServerName + "/MoveUpEps?id=" + id);
    };

    var moveDownEps = function (id) {
        return $.post(config.remoteServerName + "/MoveDownEps?id=" + id);
    };

    var getAccountsEpsByAccountId = function (accountsEpsObservable, accountId) {
        $.getJSON(config.remoteServerName + "/GetAccountsEpsByAccountId", { accountId: accountId }).done(function (data) {
            accountsEpsObservable(data);
        });
    };

    var accountsEpsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/AccountsEpsDelete", { id: id }).done(function (data) {
        });
    };

    var addAccountsEps = function (accountsEpsObservable) {
        return $.post(config.remoteServerName + "/AddAccountsEps", accountsEpsObservable);
    };

    //#endregion EPS

    //#region Postit

    var getPostitSent = function (postitObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetPostitSent?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (postitObservable) {
                $("#postitSent").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(postitObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                postitObservable.data(tempArray);
                $('#postitSent').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getPostitSentById = function (postitObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetPostitSentById", { id: id }).done(function (data) {
            postitObservable(ko.mapping.fromJS(data));
        });
    };

    var getPostitRecievedById = function (postitObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetPostitRecievedById", { id: id }).done(function (data) {
            postitObservable(ko.mapping.fromJS(data));
        });
    };

    var deletePostit = function (id) {
        return $.getJSON(config.remoteServerName + "/DeletePostit", { id: id });
    };

    var editPostit = function (postitObservable) {
        return $.post(config.remoteServerName + "/EditPostit", postitObservable);
    };

    var updateStatusPostit = function (id) {
        return $.getJSON(config.remoteServerName + "/UpdateStatusPostit", { id: id });
    };

    var updateStatusInbox = function (id) {
        return $.getJSON(config.remoteServerName + "/UpdateStatusInbox", { id: id });
    };

    var getPostitRecieved = function (postitObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetPostitRecieved?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (postitObservable) {
                $("#postitRecieved").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(postitObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                postitObservable.data(tempArray);
                $('#postitRecieved').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var addPostit = function (postitObservable) {
        return $.post(config.remoteServerName + "/AddPostit", postitObservable).done(function (data) { });
    };

    //#endregion Postit

    //#region Configurations

    var getConfigurations = function (configurationObservable) {
        return $.getJSON(config.remoteServerName + "/GetConfigurations").success(function (data) {
            configurationObservable.data(data);
        });
    };

    var getConfiguration = function (configurationObservable) {
        return $.getJSON(config.remoteServerName + "/GetConfigurations").success(function (data) {
            if (configurationObservable) {
                configurationObservable(data);
            }
        });
    };

    var getAccountSetting = function (configurationObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountSetting").success(function (data) {
            configurationObservable(data);
        });
    };

    var editAccountSetting = function (dtoDocument) {
        return $.post(config.remoteServerName + "/EditAccountSetting", dtoDocument);
    };


    var editConfigurationById = function (configurationObservable) {
        return $.post(config.remoteServerName + "/EditConfigurationById", configurationObservable);
    };

    //#endregion Configurations

    //#region Projects

    var getActiveProjects = function (projectsObservable) {
        $.getJSON(config.remoteServerName + "/GetActiveProjects").done(function (data) {
            projectsObservable(data);
        });
    };

    var getProjectsNotAccountsProjects = function (projectsObservable, accountId) {
        $.getJSON(config.remoteServerName + "/GetProjectsNotAccountsProjects", { accountId: accountId }).done(function (data) {
            projectsObservable(data);
        });
    };

    var getAccountsProjects = function (projectsObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountsProjects").done(function (data) {
            if (projectsObservable) {
                projectsObservable(data);
            }
        });
    };
    var getAccountsProjectsById = function (projectsObservable, accountId) {
        return $.getJSON(config.remoteServerName + "/GetAccountsProjectsById", { accountId: accountId }).done(function (data) {
            if (projectsObservable) {
                projectsObservable(data);
            }
        });
    };


    var getAccountsProjectsByIdForList = function () {
        return $.getJSON(config.remoteServerName + "/GetAccountsProjectsByIdForList");
    };

    var updateProjectTaskAdminById = function (taskObservable, taskAdmin) {
        return $.getJSON(config.remoteServerName + "/UpdateProjectTaskAdminById", { taskAdmin: taskAdmin }).done(function (data) {
            taskObservable(data);
        });
    };
    //var getAccountsProjectsForUserId = function (projectsObservable, accountId) {
    //    return $.getJSON(config.remoteServerName + "/GetAccountsProjectsForUserId", { accountId: accountId }).done(function (data) {
    //        if (projectsObservable) {
    //            projectsObservable(data);
    //        }
    //    });
    //};


    var getAccountsProjectsByProjectId = function (projectsObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetAccountsProjectsByProjectId", { projectId: projectId }).success(function (data) {
            projectsObservable(data);
        });
    };

    var addAccountsProjects = function (listProjectsObservable) {
        return $.post(config.remoteServerName + "/UpdateAccountsProjects", listProjectsObservable);

    };

    var accountsProjectsDelete = function (id) {
        $.getJSON(config.remoteServerName + "/DeleteAccountsProjects", { id: id });
    };

    //#endregion Projects

    //#region Sheets

    var getUsersOverTime = function (overTimeObj, overTimeObjObservable) {
        return $.post(config.remoteServerName + "/GetUsersOverTime", { overTimeObj: overTimeObj }).done(function (data) {
            if (overTimeObjObservable) {
                $("#overTimeGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(overTimeObjObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                overTimeObjObservable.data(tempArray);
                $('#overTimeGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var getUsersTimeSheet = function (timeSheetObj, documnetObservable) {
        return $.post(config.remoteServerName + "/GetUsersTimeSheet", timeSheetObj).done(function (data) {
            if (documnetObservable) {
                $("#timeSheetGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#timeSheetGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var getUsersTimeSheetSummary = function (timeSheetObj, timeSheetObservable) {
        return $.post(config.remoteServerName + "/GetUsersTimeSheetSummary", timeSheetObj).success(function (result) {
            timeSheetObservable(result);
        });
    };


    var getUsersWithOutTimeSheet = function (sheetObservable, fromDate, pageNumber, pageSize) {
        return $.post(config.remoteServerName + "/GetUsersWithOutTimeSheet?fromDate=" + fromDate + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (sheetObservable) {
                $("#timeSheetGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(sheetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                sheetObservable.data(tempArray);
                $('#timeSheetGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    //var getCompanyTimeSheet = function (sheetObservable, timesheetObservable) {
    //    var obj = ko.toJS(timesheetObservable);
    //    return $.post(config.remoteServerName + "/GetCompanyTimeSheet", obj).done(function (data) {
    //        sheetObservable.data(data);
    //    });
    //};

    var getCompanyTimeSheet = function (timeSheetDto, sheetObservable) {
        var obj = ko.toJS(timeSheetDto);
        return $.post(config.remoteServerName + "/GetCompanyTimeSheet", timeSheetDto).done(function (data) {
            if (sheetObservable) {
                $("#companyTimeSheet").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(sheetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                sheetObservable.data(tempArray);
                $('#companyTimeSheet').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var getSheetsByContactandType = function (sheetObservable, contactId) {
        return $.getJSON(config.remoteServerName + "/GetSheetsByContact", { contactId: contactId }).success(function (data) {
            sheetObservable.data(data);
        });
    };


    var getUnApprovedSheetsByContactAndDate = function (sheetObservable, objObservable) {
        return $.post(config.remoteServerName + "/GetUnApprovedSheetsByContactAndDate", objObservable).success(function (data) {
            sheetObservable.data(data);
        });
    };

    var getUnApprovedExpensesByContactAndDate = function (sheetObservable, objObservable) {
        return $.post(config.remoteServerName + "/GetUnApprovedExpensesByContactAndDate", objObservable).success(function (data) {
            sheetObservable.data(data);
        });
    };



    var deleteSheet = function (sheetObservable, id) {
        return $.post(config.remoteServerName + "/DeleteSheet", { id: id }).success(function (data) {
            sheetObservable.data(data);
        });
    };

    var addApprovedSheetBySupervisor = function (id, value) {
        return $.post(config.remoteServerName + "/AddApprovedSheetBySupervisor", { id: id, value: value });
    };

    var addSheet = function (resultObservable, timeSheet) {
        return $.post(config.remoteServerName + "/AddSheet", timeSheet, "json").done(function (data) {
            if (resultObservable) {
                resultObservable.data(data);
            }
        });
    };

    var addSheetBySupervisor = function (resultObservable, sheetObservable) {
        return $.post(config.remoteServerName + "/AddSheetBySupervisor", sheetObservable).done(function (data) {
            resultObservable(data);
        });
    };

    var getMyTimeSheet = function (todate, observabletimesheet) {
        return $.ajax({
            type: "Get",
            data: JSON.stringify(observabletimesheet),
            url: config.remoteServerName + "/getMyTimeSheet?todate=" + todate,
            contentType: "application/json"
        });
    };

    //#endregion Sheets

    //#region Design Discipline

    var getDesignDiscipline = function (documnetObservable, accountOwnerId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetDesignDiscipline?accountOwnerId=" + accountOwnerId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#designDisciplinesTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#designDisciplinesTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getDesignDisciplineList = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetDesignDiscipline?accountOwnerId=" + 2 + "&pageNumber=" + 0 + "&pageSize=" + 10000).done(function (data) {
            documnetObservable(data);
        });
    };


    var addDesignDiscipline = function (designDiscipline) {
        return $.post(config.remoteServerName + "/AdddesignDiscpline", designDiscipline);
    };

    var editDesignDiscipline = function (designDiscipline) {
        return $.post(config.remoteServerName + "/EditdesigndicplineEntity", designDiscipline);
    };

    var designDisciplineDelete = function (id) {
        return $.post(config.remoteServerName + "/designdicplineEntityDelete", { id: id });
    };

    var getDesignDisciplineForEdit = function (designDisciplineObservable, id) {
        $.getJSON(config.remoteServerName + "/GetdesigndicplineForEdit", { id: id }).done(function (data) {
            designDisciplineObservable(data);
        });
    };

    var getDesignDisciplineSections = function (documnetObservable, sectionId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetDesignDicplineSections?sectionId=" + sectionId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#designDisciplineSectionsTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#designDisciplineSectionsTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var addDesignDisciplineSections = function (designDisciplineSections) {
        return $.post(config.remoteServerName + "/AddDesignDicplineSections", designDisciplineSections);
    };

    var editDesignDisciplineSections = function (designDisciplineSections) {
        return $.post(config.remoteServerName + "/EditDesignDicplineSections", designDisciplineSections);
    };

    var designDisciplineSectionsDelete = function (id) {
        return $.post(config.remoteServerName + "/DesignDicplineSectionsDelete", { id: id });
    };

    var designDisciplineSectionsForEdit = function (designDisciplineSections, id) {
        return $.getJSON(config.remoteServerName + "/GetDesignDicplineSectionsForEdit", { id: id }).done(function (data) {
            designDisciplineSections(data);
        });
    };

    //#endregion Design Discipline

    //#region User Companies

    var getUserCompanies = function (userCompaniesObservable, accountId) {
        $.getJSON(config.remoteServerName + "/GetuserCompanies", { accountId: accountId }).done(function (data) {
            userCompaniesObservable(data);
        });
    };

    var addUserCompanies = function (listProjectsObservable) {
        return $.post(config.remoteServerName + "/AdduserCompanies", listProjectsObservable);

    };

    var userCompanyDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/UserCompaniesDelete", { id: id });
    };

    //#endregion User Companies

    //#region Strating Communication Letters

    var getLetters = function (lettersObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLettersByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#letters").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#letters').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getFilesByDocTypeAndDocId = function (filesObservable, docType, docId) {
        return $.getJSON(config.remoteServerName + "/GetAttachFilesByDocId", { DocType: docType, DocId: docId }).done(function (data) {
            filesObservable(data);
        });
    };

    var getLettersAttaches = function (lettersAttachFilesObservable, letterId) {
        $.getJSON(config.remoteServerName + "/GetAttachFilesByLetterId", { letterId: letterId }).done(function (data) {
            lettersAttachFilesObservable.data(data);
        });
    };
    var getLettersReplay = function (lettersObservable, pageNumber, projectId) {
        $.getJSON(config.remoteServerName + "/GetLettersByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + config.pageSize()).done(function (data) {
            lettersObservable(data);
        });
    };

    var getLettersForEdit = function (lettersObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLettersById", { id: id }).success(function (data) {
            if (lettersObservable) {
                lettersObservable(ko.mapping.fromJS(data));
            }
        });
    };

    var editLetters = function (letterObservable) {
        return $.post(config.remoteServerName + "/EditLetterById", letterObservable);
    };

    var addLetters = function (letterObservable) {
        return $.post(config.remoteServerName + "/AddLetters", letterObservable);
    };

    var deleteLetters = function (id) {
        return $.getJSON(config.remoteServerName + "/DeletLettersById?id=" + id);
    };

    //#endregion Strating Communication Letters

    //#region Phone

    //var getPhones = function (phonesObservable, projectId) {
    //    $.getJSON(config.remoteServerName + "/GetPhoneByProjectId", { projectId: projectId }).done(function (data) {
    //        phonesObservable.data(data);
    //    });
    //};

    var getPhones = function (phonesObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetPhoneByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (phonesObservable) {
                $("#phones").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(phonesObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                phonesObservable.data(tempArray);
                $('#phones').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var getPhonesAttaches = function (phonesAttachFilesObservable, letterId) {
        $.getJSON(config.remoteServerName + "/GetAttachFilesByPhoneId", { letterId: letterId }).done(function (data) {
            phonesAttachFilesObservable.data(data);
        });
    };


    var getPhonesForEdit = function (phonesObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetPhoneById", { id: id }).success(function (data) {
            phonesObservable(ko.mapping.fromJS(data));
        });
    };

    var editPhones = function (letterObservable) {
        return $.post(config.remoteServerName + "/EditPhoneById", letterObservable);
    };

    var addPhones = function (letterObservable) {
        return $.post(config.remoteServerName + "/AddPhone", letterObservable);
    };

    var deletePhones = function (id) {
        return $.getJSON(config.remoteServerName + "/DeletPhoneById", { id: id }).done(function (data) {
        });
    };

    //#endregion Phone

    //#region Communication Request Proposal

    var getRequestProposal = function (requestProposalObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetRequestProposalByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (requestProposalObservable) {
                $("#communicationRequestProposalGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(requestProposalObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                requestProposalObservable.data(tempArray);
                $('#communicationRequestProposalGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getRequestProposalAttaches = function (requestProposalAttachFilesObservable, letterId) {
        $.getJSON(config.remoteServerName + "/GetAttachFilesByRequestProposalId", { letterId: letterId }).done(function (data) {
            requestProposalAttachFilesObservable.data(data);
        });
    };

    var getRequestProposalForEdit = function (requestProposalObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetRequestProposalById?id=" + id).success(function (data) {
            requestProposalObservable(data);
        });
    };

    var editRequestProposal = function (requestProposalObservable) {
        return $.post(config.remoteServerName + "/EditRequestProposalById", requestProposalObservable);
    };

    var addRequestProposal = function (requestProposalObservable) {
        return $.post(config.remoteServerName + "/AddRequestProposal", requestProposalObservable);
    };

    var deleteRequestProposal = function (id) {
        return $.getJSON(config.remoteServerName + "/DeletRequestProposalById", { id: id }).done(function (data) {
        });
    };

    //#endregion Communication Request Proposal

    //#region task Group

    var addTaskGroup = function (taskGroupObservable, taskGroups) {
        return $.post(config.remoteServerName + "/AddTaskGroup", taskGroupObservable).success(function (result) {
            if (taskGroups) {

                taskGroups(result);
            }
        });
    };

    var addTaskGroupItem = function (taskGroupItemObservable, taskGroupItemObservables) {
        return $.post(config.remoteServerName + "/AddTaskGroupItem", taskGroupItemObservable).success(function (result) {
            if (taskGroupItemObservables) {

                taskGroupItemObservables(result);
            }
        });
    };

    var taskGroupItemsByTaskId = function (itemsObservable, id) {
        return $.getJSON(config.remoteServerName + "/TaskGroupItemsByTaskId", { taskId: id }).done(function (data) {
            itemsObservable(data);
        });
    };

    var getProjectTaskGroupsForEdit = function (taskGroupsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectTaskGroupsForEdit", { taskId: id }).success(function (data) {
            taskGroupsObservable(data);
        });
    };

    var getProjectTaskGroupItemsByTaskId = function (projectTaskItemsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectTaskGroupItemsByTaskId", { taskId: id }).done(function (data) {
            if (projectTaskItemsObservable) {
                projectTaskItemsObservable.data(data);
            }
        });
    };


    var getProjectTaskGroups = function (projectId, lettersObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetProjectTaskGroups?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#projectTaskGroupGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#projectTaskGroupGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var editProjectTaskGroups = function (projectTaskGroupsObservable) {
        return $.post(config.remoteServerName + "/EditProjectTaskGroups ", projectTaskGroupsObservable);
    };

    var projectTaskGroupsObservableDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ProjectTaskGroupsDelete?id=" + id);
    };

    var projectTaskGroupsItemObservableDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ProjectTaskGroupsItemDelete", { id: id });
    };


    //#endregion task Group



    var projectWorkFlowGet = function (projectId, lettersObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/ProjectWorkFlowGet?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#dataRowGridWorkFlow").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#dataRowGridWorkFlow').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var projectWorkFlowGetForDp = function (projectWorkFlowObservable, projectId) {
        $.getJSON(config.remoteServerName + "/ProjectWorkFlowGetList", { projectId: projectId }).done(function (data) {
            projectWorkFlowObservable(data);
        });
    };

    var addWorkFlow = function (workFlowObservable, workFlowObservables) {
        return $.post(config.remoteServerName + "/AddWorkFlow", workFlowObservable).success(function (result) {
            workFlowObservables(ko.mapping.fromJS(result));
        });
    };

    var addWorkFlowItem = function (workFlowItemObservable, workFlowItemObservables) {
        return $.post(config.remoteServerName + "/AddWorkFlowItem", workFlowItemObservable).success(function (result) {
            if (workFlowItemObservables) {
                workFlowItemObservables(result);
            }
        });
    };

    var updateMultiApproval = function (workFlowItemsObservable) {
        var items = ko.toJS(workFlowItemsObservable);
        return config.postJson(config.remoteServerName + "/UpdateMultiApproval", items);
    };

    var addProjectProjectsCompaniesList = function (companies) {
        var items = ko.toJS(companies);
        // return config.postJson(config.remoteServerName + "/AddProjectProjectsCompaniesList?companies=" + items + "&projectId=" + projectId);
        return config.postJson(config.remoteServerName + "/AddProjectProjectsCompaniesList", items);
    };

    var addWorkFlowDocument = function (workFlowDocumentObservable, workFlowDocumentObservables) {
        return $.post(config.remoteServerName + "/AddWorkFlowDocument", workFlowDocumentObservable).success(function (result) {
            workFlowDocumentObservables(result);
        });
    };

    var editWorkFlow = function (workFlowObservable) {
        return $.post(config.remoteServerName + "/EditWorkFlow", workFlowObservable);
    };

    var getWorkFlowForEdit = function (workFlowObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetWorkFlowForEdit", { id: id }).success(function (data) {
            if (workFlowObservable) {

                workFlowObservable(data);
            }
        });
    };

    var deleteWorkFlow = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteWorkFlow?id=" + id);
    };

    var getWorkFlowItemsByWorkFlowId = function (workFlowItemsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetWorkFlowItemsByWorkFlowId", { workFlow: id }).done(function (data) {
            if (workFlowItemsObservable) {
                workFlowItemsObservable.data(data);
            }
        });
    };

    var geProjectWorkFlowContactsFirstLevel = function (workFlowItemsObservable, workFlow) {
        return $.getJSON(config.remoteServerName + "/GeProjectWorkFlowContactsFirstLevel", { workFlow: workFlow }).done(function (data) {
            workFlowItemsObservable(data);
        });
    };

    var getWorkFlowDocumentsByWorkFlowId = function (workFlowDocumentsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetWorkFlowDocumentsByWorkFlowId", { workFlow: id }).done(function (data) {
            workFlowDocumentsObservable(data);
        });
    };

    var workFlowDocumentsByWorkFlowIdObservableDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/WorkFlowDocumentsByWorkFlowIdObservableDelete", { id: id });
    };

    var workFlowItemsByWorkFlowIdObservableDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/WorkFlowItemsByWorkFlowIdObservableDelete?id=" + id);
    };

    var getWorkFlowItemsByWorkFlowIdLevel = function (workFlowId, workFlowItemObservables) {
        return $.post(config.remoteServerName + "/GetWorkFlowItemsByWorkFlowIdLevel", { workFlow: workFlowId }).done(function (result) {
            workFlowItemObservables.data(result);
        });
    };

    //#region work Flow
    //#region time coordination project task

    var getMyTasksTimeSheet = function () {
        return $.getJSON(config.remoteServerName + "/GetMyTasksTimeSheet");
    };

    var getMyNotifcations = function () {
        return $.getJSON(config.remoteServerName + "/GetMyNotifcations");
    };

    var getNotificationPostit = function () {
        return $.getJSON(config.remoteServerName + "/GetNotificationPostit");
    };

    //var getTasks = function (projectId, pageNumber, pageSize) {
    //    return $.getJSON(config.remoteServerName + "/GetTasksByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    //};

    var getTasks = function (projectId, contractsObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetTasksByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {
                if (contractsObservable) {
                    contractsObservable(data);
                }
            });
    };

    var updateStatus = function (taskId, status) {
        return $.post(config.remoteServerName + "/UpdateStatus?taskId=" + taskId + "&status=" + status);
    };

    var updateSuspended = function (taskId, status) {
        return $.post(config.remoteServerName + "/UpdateSuspended?taskId=" + taskId + "&status=" + status);
    };

    var getTasksByProjectIdReport = function (observable, taskObj) {
        return $.post(config.remoteServerName + "/GetTasksByProjectIdReport", ko.toJS(taskObj)).done(function (data) {
            if (observable) {
                $("#gridLog").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(observable.data);
                ko.utils.arrayPushAll(tempArray, data);
                observable.data(tempArray);
                $('#gridLog').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getTasksAttaches = function (tasksObservable, taskId) {
        $.getJSON(config.remoteServerName + "/GetTasksAttaches", { taskId: taskId }).done(function (data) {
            tasksObservable.data(data);
        });
    };

    var getTaskForEdit = function (tasksObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetTaskForEdit", { id: id }).success(function (data) {
            if (tasksObservable) {
                tasksObservable(ko.mapping.fromJS(data));
            }
        });
    };

    var editTask = function (tasksObservable) {
        return $.post(config.remoteServerName + "/EditTask", tasksObservable);
    };

    var addTask = function (tasksObservable) {
        return $.post(config.remoteServerName + "/addTask", tasksObservable);
    };

    var deleteTask = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteTaskById?id=" + id);
    };

    var getTaskDetail = function (id) {
        return $.getJSON(config.remoteServerName + "/GetTaskDetail?taskId=" + id);
    };

    var getTasksByContactId = function (tasksObservable, projectId) {

        return $.getJSON(config.remoteServerName + "/GetTasksByContactId", { projectId: projectId }).done(function (data) {

            tasksObservable(data);
        });
    };
    var getTasksAsignUsers = function (tasksObservable, projectId) {

        return $.getJSON(config.remoteServerName + "/GetTasksAsignUsers", { projectId: projectId }).done(function (data) {

            tasksObservable(data);
        });
    };

    var getTasksAsignUsersByAccountId = function (tasksObservable, projectId, accountId) {

        return $.getJSON(config.remoteServerName + "/GetTasksAsignUsersByAccountId", { projectId: projectId, accountId: accountId }).done(function (data) {

            tasksObservable(data);
        });
    };

    //#endregion  time coordination project task

    //#endregion



    //#region Strating contracts module
    var addInurance = function (insuranceObservable, listInsuranceObservable) {
        return $.post(config.remoteServerName + "/AddInurance", insuranceObservable).success(function (result) {
            listInsuranceObservable(result);
        });
    };
    var addScheduleItem = function (scheduleItemObservable, listScheduleItemObservable) {
        return $.post(config.remoteServerName + "/AddScheduleItem", scheduleItemObservable).success(function (result) {
            listScheduleItemObservable(result);
        });
    };
    var getScheduleItemsByContractId = function (scheduleItemsObservable, contractId) {
        $.getJSON(config.remoteServerName + "/GetScheduleItemsByContractId", { contractId: contractId }).done(function (data) {
            scheduleItemsObservable(data);
        });
    };
    var projectScheduleGetByProjectId = function (projectId, projectScheduleObservable, pageNumber, pageSize) {
        $.getJSON(config.remoteServerName + "/ProjectScheduleGet?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            projectScheduleObservable(data);
        });
    };

    var getInsuranceItemsByContractId = function (insuranceItemsObservable, contractId) {
        $.getJSON(config.remoteServerName + "/GetInsuranceItemsByContractId", { contractId: contractId }).done(function (data) {
            insuranceItemsObservable(data);
        });
    };

    var getContracts = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {
                if (contractsObservable) {
                    $("#contracts").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(contractsObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    contractsObservable.data(tempArray);
                    $('#contracts').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };

    var getContractsList = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            contractsObservable(data);
        });
    };

    var getContractsForDp = function (contractsObservable, projectId, pageNumber, pageSize) {
        $.getJSON(config.remoteServerName + "/GetContractsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            contractsObservable(data);
        });
    };

    var getContractsAttaches = function (contractsAttachFilesObservable, contractId) {
        $.getJSON(config.remoteServerName + "/GetAttachFilesByContractId", { contractId: contractId }).done(function (data) {
            contractsAttachFilesObservable.data(data);
        });
    };

    var getContractsForEdit = function (contractsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsForEdit", { id: id }).success(function (data) {
            contractsObservable(ko.mapping.fromJS(data));
        });
    };

    var editContracts = function (contractObservable) {
        return $.post(config.remoteServerName + "/EditContractById", contractObservable);
    };

    var addContracts = function (contractObservable, contractsObservable) {
        return $.post(config.remoteServerName + "/AddContracts", contractObservable).success(function (result) {
            contractsObservable(result);
        });
    };

    var deleteContracts = function (id) {
        return $.getJSON(config.remoteServerName + "/DeletContractsById", { id: id }).done(function (data) {
        });
    };

    var deleteContractGroup = function (contractIdObservable) {
        return $.getJSON(config.remoteServerName + "/DeleteContractGroup", { id: contractIdObservable }).done(function (data) {
        });
    };

    var getGroupsOutContract = function (contractsGroupsObservable, contractId) {
        $.getJSON(config.remoteServerName + "/GetGroupsOutContract", { contractId: contractId }).done(function (data) {
            contractsGroupsObservable(data);
        });
    };

    var getContractGroupsByContractId = function (contractsGroupObservable, contractId) {
        $.getJSON(config.remoteServerName + "/GetContractGroupsByContractId", { contractId: contractId }).done(function (data) {
            contractsGroupObservable(data);
        });
    };

    var addContractGroup = function (contractGroupObservable, contractGroupsObservable) {
        return $.post(config.remoteServerName + "/AddContractGroup", contractGroupObservable).done(function (data) {
            contractGroupsObservable(data);
        });
    };

    //#region contract Order 

    var getContractOrdersByContractId = function (contractOrdersObservable, contractId) {
        $.getJSON(config.remoteServerName + "/GetContractOrderByContractId", { contractId: contractId }).done(function (data) {
            contractOrdersObservable(data);
        });
    };

    var getContractsOrderForEdit = function (contractsOrderObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsOrderForEdit", { id: id }).success(function (data) {
            contractsOrderObservable(data);
        });
    };

    var getContractsOrderTotal = function (contractsOrderObservable, docId, orderType) {
        return $.getJSON(config.remoteServerName + "/GetContractsOrderTotal", { docId: docId, orderType: orderType }).success(function (data) {
            contractsOrderObservable(data);
        });
    };

    var getContractsOrderTotalExecuted = function (contractsOrderObservable, contractId, executed) {
        return $.getJSON(config.remoteServerName + "/GetContractsOrderTotalExecuted", { contractId: contractId, executed: executed }).success(function (data) {
            contractsOrderObservable(data);
        });
    };

    var editContracOrdertById = function (contractOrderObservable, contractOrdersObservable) {
        return $.post(config.remoteServerName + "/EditContracOrdertById", contractOrderObservable).done(function (data) {
            contractOrdersObservable(data);
        });
    };

    var addContractsOrder = function (contractOrder, contractOrderObservable) {
        return $.post(config.remoteServerName + "/AddContractsOrder", contractOrder).done(function (data) {
            contractOrderObservable(data);

        });
    };

    var deletContractOrderById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeletContractOrderById", { id: id }).done(function (data) {
        });
    };

    //#endregion



    //#region contract conditions 

    var getContractGeneralConditions = function (contractOrdersObservable, contractId) {
        $.getJSON(config.remoteServerName + "/GetContractGeneralConditions", { contractId: contractId }).done(function (data) {
            contractOrdersObservable(data);
        });
    };

    var getContractParticularConditions = function (contractOrdersObservable, contractId) {
        $.getJSON(config.remoteServerName + "/GetContractParticularConditions", { contractId: contractId }).done(function (data) {
            contractOrdersObservable(data);
        });
    };


    var addContractCondition = function (contractOrderObservable) {
        return $.post(config.remoteServerName + "/AddContractCondition", contractOrderObservable);
    };



    //#endregion conditions

    //#region payemnt


    var getPaymentRequisitionQuantities = function (contractId, documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetPaymentRequisitionQuantities?contractId=" + contractId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#paymentRequisitionQuantitiesRpt").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#paymentRequisitionQuantitiesRpt').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getRequestPaymentsByContractId = function (contractId, paymentsObservable) {
        $.getJSON(config.remoteServerName + "/GetRequestPaymentsByContractId", { contractId: contractId }).success(function (data) {
            paymentsObservable(data);
        });
    };

    var getRequestPaymentsTopContractId = function (contractId, paymentsObservable) {
        $.getJSON(config.remoteServerName + "/GetRequestPaymentsTopContractId", { contractId: contractId })
           .success(function (data) {
               paymentsObservable(data);
           });
    };
    var getRequestItemsOrderByContractId = function (contractId, paymentsObservable) {
        return $.getJSON(config.remoteServerName + "/GetRequestItemsOrderByContractId", { contractId: contractId })
                 .success(function (data) {
                     paymentsObservable.data(data);
                 });
    };
    var getContractsChangeOrderForDrop = function (projectId, changeOrdeObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsChangeOrderWithoutContractId", { projectId: projectId })
           .success(function (data) {
               changeOrdeObservable(data);
           });
    };


    var addContractsChangeOrderByContractId = function (changeOrdeObservable, contractChangeOrdersObservable) {
        return $.post(config.remoteServerName + "/AddContractsChangeOrderByContractId", changeOrdeObservable).done(function (data) {
            contractChangeOrdersObservable(data);
        });
    };

    var getContractsChangeOrderByContractId = function (contractId, changeOrdeObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsChangeOrderByContractId", { contractId: contractId })
           .success(function (data) {
               changeOrdeObservable(data);
           });
    };
    //GetCollectedInvoicesIntervalRep
    //var projectBackLogRpt = function (objObservable) {
    //    return $.post(config.remoteServerName + "/ProjectBackLogRpt", objObservable);
    //};
    var projectBackLogRpt = function (documnetObservable, objObservable) {
        return $.post(config.remoteServerName + "/ProjectBackLogRpt", { objObservable: objObservable }).done(function (data) {
            if (documnetObservable) {
                $("#gridBackLog").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#gridBackLog').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    //var projectsAchievementsRpt = function (objObservable) {
    //    return $.getJSON(config.remoteServerName + "/ProjectsAchievementsRpt", { year: objObservable });

    //};

    var projectsAchievementsRpt = function (year, documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/ProjectsAchievementsRpt?year=" + year + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#gridProjectsAchievementsLog").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#gridProjectsAchievementsLog').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };
    //var getProjectsInvoicedCollectedAndInvoiced = function () {
    //    return $.getJSON(config.remoteServerName + "/GetProjectsInvoicedCollectedAndInvoiced");

    //};

    var getProjectsInvoicedCollectedAndInvoiced = function (documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetProjectsInvoicedCollectedAndInvoiced?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#gridInvoicedCollectedLog").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#gridInvoicedCollectedLog').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };
    var getCollectedInvoicesIntervalRep = function (projectId, startDate, endDate) {
        return $.getJSON(config.remoteServerName + "/GetCollectedInvoicesIntervalRep", { projectId: projectId, start: startDate, end: endDate });

    };

    var mergeTwoProjects = function (oldProjectId, newProjectId) {
        return $.getJSON(config.remoteServerName + "/MergeTwoProjects?oldProjectId=" + oldProjectId + "&newProjectId=" + newProjectId);
    };

    //#endregion end of payment


    //#endregion end Contracts

    //#endregion Ramadan Sokary - Team Leader

    //#region Rami Nasr - Senior Developer Mwala3ha Errors

    //#region AccountsDefaultList

    var getAccountsDefaultList = function (documnetObservable, listType, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDefaultList?listType=" + listType + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#accountsDefaultList").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#accountsDefaultList').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getAccountsDefaultListLists = function (accountsDefaultListObservable, listType) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDefaultList?listType=" + listType + "&pageNumber=" + 0 + "&pageSize=" + 10000).done(function (data) {
            accountsDefaultListObservable(data);
        });
    };
    var getAccountsDefaultListListsWithAction = function (accountsDefaultListObservable, listType) {
        $.getJSON(config.remoteServerName + "/GetaccountsDefaultListWithAction", { listType: listType }).done(function (data) {
            accountsDefaultListObservable(data);
        });
    };
    var getAccountsDefaultListListsNotAction = function (accountsDefaultListObservable, listType, action) {
        $.getJSON(config.remoteServerName + "/GetaccountsDefaultlistTypesNotAction", { listType: listType, action: action }).done(function (data) {
            accountsDefaultListObservable(data);
        });
    };

    var addAccountsDefaultList = function (accountsDefaultList) {
        return $.post(config.remoteServerName + "/AddAccountsDefaultList", accountsDefaultList);
    };

    var getAccountsDefaultListTypes = function (accountsDefaultListTypesObservable) {
        $.getJSON(config.remoteServerName + "/GetAccountsDefaultListTypes").done(function (data) {
            accountsDefaultListTypesObservable(data);
        });
    };

    var getListTypesOnly = function (defaultListTypesObservable) {
        return $.getJSON(config.remoteServerName + "/GetListTypesOnly").done(function (data) {
            defaultListTypesObservable(data);
        });
    };
    var checkUserEmail = function (defaultListTypesObservable) {
        return $.getJSON(config.remoteServerName + "/CheckUserEmail");
    };
    var getAccountsDefaultListTypesLog = function (documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDefaultListTypes?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#accountsDefaultList").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#accountsDefaultList').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var accountsDefaultListDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/AccountsDefaultListDelete", { id: id })
            .done(function (data) {
            });
    };

    var editAccountsDefaultList = function (accountDefaultList) {
        return $.post(config.remoteServerName + "/EditAccountsDefaultList", accountDefaultList);
    };

    var getAccountsDefaultListForEdit = function (accountsDefalutListObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDefaultListForEdit", { id: id })
             .success(function (data) {
                 accountsDefalutListObservable(data);
             });
    };

    //#endregion


    //#region ProjectCompanies

    var getProjectCompanies = function (projectCompaniesObservable, accountOwnerId) {
        $.getJSON(config.remoteServerName + "/GetProjectCompanies", { accountOwnerId: accountOwnerId }).done(function (data) {
            projectCompaniesObservable.data(data);
        });
    };

    var getProjectCompaniesGrid = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetProjectCompaniesGrid?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getProjectCompanyNotProjectProjectCompany = function (projectsObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetProjectCompanyNotProjectProjectCompany?projectId=" + projectId).done(function (data) {
            projectsObservable(data);
        });
    };

    var getProjectCompaniesList = function (projectCompaniesObservable, accountOwnerId) {
        $.getJSON(config.remoteServerName + "/GetProjectCompanies", { accountOwnerId: accountOwnerId }).done(function (data) {
            projectCompaniesObservable(data);
        });
    };

    var projectCompaniesDelete = function (id) {
        return $.post(config.remoteServerName + "/ProjectCompaniesDelete?id=" + id)
    };

    var addProjectCompanies = function (contactId, projectCompanies) {
        return config.postJson(config.remoteServerName + "/AddProjectCompanies?contactId=" + contactId, projectCompanies);
    };

    var getProjectCompaniesForEdit = function (projectCompaniesObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectCompaniesForEdit?id=" + id).success(function (data) {
            projectCompaniesObservable(data);
        });
    };

    var editProjectCompanies = function (projectCompaniesObservable) {
        return $.post(config.remoteServerName + "/EditProjectCompanies", projectCompaniesObservable);
    };


    //#endregion


    //#region CompanyContact

    var getCompanyContact = function (CompanyContactObservable, companyId) {
        return $.getJSON(config.remoteServerName + "/GetCompanyContacts", { companyId: companyId }).done(function (data) {
            if (CompanyContactObservable) {

                CompanyContactObservable.data(data);
            }
        });
    };

    var addCompanyContact = function (companyConatct) {
        return $.post(config.remoteServerName + "/AddCompanyContact", companyConatct);
    };

    var addCompanyContactOnly = function (companyConatct) {
        return $.post(config.remoteServerName + "/AddCompanyContactOnly", companyConatct);
    };

    var editCompanyContact = function (CompanyContactObservable) {
        return $.post(config.remoteServerName + "/EditCompanyContact", CompanyContactObservable);
    };
    

    var companyContactDelete = function (id) {
        return $.post(config.remoteServerName + "/CompanyContactDelete?id="+ id)
            
    };

    var getCompanyContactForEdit = function (CompanyContactObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCompanyContactForEdit?id=" + id).done(function (data) {
            CompanyContactObservable(data);
        });
    };

    var transferCompanyContact = function (CompanyContactObservable) {
        return $.post(config.remoteServerName + "/TransferCompanyContact", CompanyContactObservable);
    };

    //#endregion

    //#region SupplierAnalysisSections

    var getSupplierAnalysisSections = function (supplierAnalysisSectionsObservable, accountOwnerId) {
        return $.getJSON(config.remoteServerName + "/GetSupplierAnalysisSections", { accountOwnerId: accountOwnerId }).done(function (data) {
            if (supplierAnalysisSectionsObservable) {
                $("#supplierAnalysisSectionsTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(supplierAnalysisSectionsObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                supplierAnalysisSectionsObservable.data(tempArray);
                $('#supplierAnalysisSectionsTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getSupplierAnalysisSectionsList = function (supplierAnalysisSectionsListObservable, accountOwnerId) {
        $.getJSON(config.remoteServerName + "/GetSupplierAnalysisSections", { accountOwnerId: accountOwnerId }).done(function (data) {
            supplierAnalysisSectionsListObservable(data);
        });
    };

    var addSupplierAnalysisSections = function (supplierAnalysisSections) {
        return $.post(config.remoteServerName + "/AddSupplierAnalysisSections", supplierAnalysisSections);
    };

    var editSupplierAnalysisSections = function (supplierAnalysisSections) {
        return $.post(config.remoteServerName + "/EditSupplierAnalysisSections", supplierAnalysisSections);
    };

    var supplierAnalysisSectionsDelete = function (id) {
        return $.post(config.remoteServerName + "/SupplierAnalysisSectionsDelete", { id: id });
    };

    var getSupplierAnalysisSectionsForEdit = function (supplierAnalysisSectionsObservable, id) {
        $.getJSON(config.remoteServerName + "/GetSupplierAnalysisSectionsForEdit", { id: id })
            .done(function (data) {
                supplierAnalysisSectionsObservable(data[0]);
            });
    };
    //#endregion

    //#region SupplierAnalysisSectionsItems

    var getSupplierAnalysisSectionsItems = function (supplierAnalysisSectionsItemsObservable, sectionId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetSupplierAnalysisSectionsItems?sectionId=" + sectionId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (supplierAnalysisSectionsItemsObservable) {
                $("#supplierAnalysisSectionsItemsTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(supplierAnalysisSectionsItemsObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                supplierAnalysisSectionsItemsObservable.data(tempArray);
                $('#supplierAnalysisSectionsItemsTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var addSupplierAnalysisSectionsItems = function (supplierAnalysisSectionsItems) {
        return $.post(config.remoteServerName + "/AddSupplierAnalysisSectionsItems", supplierAnalysisSectionsItems);
    };

    var editSupplierAnalysisSectionsItems = function (supplierAnalysisSectionsItems) {
        return $.post(config.remoteServerName + "/EditSupplierAnalysisSectionsItems", supplierAnalysisSectionsItems);
    };

    var supplierAnalysisSectionsItemsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/SupplierAnalysisSectionsItemsDelete", { id: id })
            .done(function (data) {
            });
    };

    var getSupplierAnalysisSectionsItemsForEdit = function (supplierAnalysisSectionsItemsObservable, id) {
        $.getJSON(config.remoteServerName + "/GetSupplierAnalysisSectionsItemsForEdit", { id: id })
            .done(function (data) {
                supplierAnalysisSectionsItemsObservable(data[0]);
            });
    };
    //#endregion

    //#region AccountsContractsConditionsCategories

    var getAccountsContractsConditionsCategories = function (accountOwnerId, documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsContractsConditionsCategories?accountOwnerId=" + accountOwnerId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#contractCategory").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#contractCategory').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getAccountsContractsConditionsCategoriesList = function (accountsContractsConditionsCategoriesObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountsContractsConditionsCategories?accountOwnerId=" + 2 + "&pageNumber=" + 0 + "&pageSize=" + 10000).done(function (data) {
            accountsContractsConditionsCategoriesObservable(data);
        });
    };

    var addAccountsContractsConditionsCategories = function (accountsContractsConditionsCategoriesObservable) {
        return $.post(config.remoteServerName + "/AddAccountsContractsConditionsCategories", accountsContractsConditionsCategoriesObservable);
    };

    var editAccountsContractsConditionsCategories = function (accountsContractsConditionsCategoriesObservable) {
        return $.post(config.remoteServerName + "/EditAccountsContractsConditionsCategories", accountsContractsConditionsCategoriesObservable);
    };

    var accountsContractsConditionsCategoriesDelete = function (id) {
        return $.post(config.remoteServerName + "/AccountsContractsConditionsCategoriesDelete?id=" + id);
    };

    var getAccountsContractsConditionsCategoriesForEdit = function (accountsContractsConditionsCategoriesObservable, id) {
        $.getJSON(config.remoteServerName + "/GetAccountsContractsConditionsCategoriesForEdit", { id: id })
            .done(function (data) {
                accountsContractsConditionsCategoriesObservable(data[0]);
            });
    };

    //#endregion

    //#region AccountsContractsParticularConditions

    var getAccountsContractsParticularConditions = function (accountsGroupdObservable, categoryId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsContractsParticularConditions?categoryId=" + categoryId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (accountsGroupdObservable) {
                $("#accountsContractsGeneralConditionsTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(accountsGroupdObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                accountsGroupdObservable.data(tempArray);
                $('#accountsContractsGeneralConditionsTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });

    };

    var addAccountsContractsParticularConditions = function (accountsContractsParticularConditionsObservable) {
        return $.post(config.remoteServerName + "/AddAccountsContractsParticularConditions", accountsContractsParticularConditionsObservable);
    };

    var editAccountsContractsParticularConditions = function (accountsContractsParticularConditionsObservable) {
        return $.post(config.remoteServerName + "/EditAccountsContractsParticularConditions", accountsContractsParticularConditionsObservable);
    };

    var accountsContractsParticularConditionsDelete = function (id) {
        return $.post(config.remoteServerName + "/AccountsContractsParticularConditionsDelete?id=" + id);
    };


    var getAccountsContractsParticularConditionsForEdit = function (accountsContractsParticularConditionsObservable, id) {
        $.getJSON(config.remoteServerName + "/GetAccountsContractsParticularConditionsForEdit", { id: id })
                    .done(function (data) {
                        accountsContractsParticularConditionsObservable(data[0]);
                    });
    };

    var getAccountsContractsParticularConditionsArrange = function (accountsContractsGeneralConditionsObservable, categoryId) {
        $.getJSON(config.remoteServerName + "/GetAccountsContractsParticularConditionsArrange", { categoryId: categoryId }).done(function (data) {
            accountsContractsGeneralConditionsObservable(data);
        });
    };

    //#endregion

    //#region AccountsContractsGeneralConditions

    var getAccountsContractsGeneralConditions = function (documnetObservable, categoryId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsContractsGeneralConditions?categoryId=" + categoryId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#accountsContractsGeneralConditionsTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#accountsContractsGeneralConditionsTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var addAccountsContractsGeneralConditions = function (accountsContractsGeneralConditionsObservable) {
        return $.post(config.remoteServerName + "/AddAccountsContractsGeneralConditions", accountsContractsGeneralConditionsObservable);
    };

    var editAccountsContractsGeneralConditions = function (accountsContractsGeneralConditionsObservable) {
        return $.post(config.remoteServerName + "/EditAccountsContractsGeneralConditions", accountsContractsGeneralConditionsObservable);
    };

    var accountsContractsGeneralConditionsDelete = function (id) {
        return $.post(config.remoteServerName + "/AccountsContractsGeneralConditionsDelete?id=" + id);
    };

    var getAccountsContractsGeneralConditionsForEdit = function (accountsContractsGeneralConditionsObservable, id) {
        $.getJSON(config.remoteServerName + "/GetAccountsContractsGeneralConditionsForEdit", { id: id })
                   .done(function (data) {
                       accountsContractsGeneralConditionsObservable(data[0]);
                   });
    };

    var getAccountsContractsGeneralConditionsArrange = function (accountsContractsGeneralConditionsObservable, categoryId) {
        $.getJSON(config.remoteServerName + "/GetAccountsContractsGeneralConditionsArrange", { categoryId: categoryId }).done(function (data) {
            accountsContractsGeneralConditionsObservable(data);
        });
    };

    //#endregion

    //#region AccountsTenderAnalysisSections

    var getAccountsTenderAnalysisSections = function (accountsGroupdObservable, accountOwnerId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsTenderAnalysisSections?accountOwnerId=" + accountOwnerId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (accountsGroupdObservable) {
                $("#tenderAnalysisSectionsTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(accountsGroupdObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                accountsGroupdObservable.data(tempArray);
                $('#tenderAnalysisSectionsTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getAccountsTenderAnalysisSectionsList = function (accountsTenderAnalysisSectionsObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountsTenderAnalysisSections?accountOwnerId=" + 2 + "&pageNumber=" + 0 + "&pageSize=" + 100000).done(function (data) {
            accountsTenderAnalysisSectionsObservable(data);
        });
    };

    var addAccountsTenderAnalysisSections = function (accountsTenderAnalysisSectionsObservable) {
        return $.post(config.remoteServerName + "/AddAccountsTenderAnalysisSections", accountsTenderAnalysisSectionsObservable);
    };

    var editAccountsTenderAnalysisSections = function (accountsTenderAnalysisSectionsObservable) {
        return $.post(config.remoteServerName + "/EditAccountsTenderAnalysisSections", accountsTenderAnalysisSectionsObservable);
    };

    var accountsTenderAnalysisSectionsDelete = function (id) {
        return $.post(config.remoteServerName + "/AccountsTenderAnalysisSectionsDelete?id=" + id)

    };

    var getAccountsTenderAnalysisSectionsForEdit = function (accountsTenderAnalysisSectionsObservable, id) {
        $.getJSON(config.remoteServerName + "/GetAccountsTenderAnalysisSectionsForEdit", { id: id })
                   .done(function (data) {
                       accountsTenderAnalysisSectionsObservable(data[0]);
                   });
    };

    //#endregion

    //#region ccountsTenderAnalysisSectionsItems

    var getAccountsTenderAnalysisSectionsItems = function (accountsGroupdObservable, sectionId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsTenderAnalysisSectionsItems?sectionId=" + sectionId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (accountsGroupdObservable) {
                $("#supplierAnalysisSectionsItemsTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(accountsGroupdObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                accountsGroupdObservable.data(tempArray);
                $('#supplierAnalysisSectionsItemsTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var addAccountsTenderAnalysisSectionsItems = function (accountsTenderAnalysisSectionsItemsObservable) {
        return $.post(config.remoteServerName + "/AddAccountsTenderAnalysisSectionsItems", accountsTenderAnalysisSectionsItemsObservable);
    };

    var editAccountsTenderAnalysisSectionsItems = function (accountsTenderAnalysisSectionsItemsObservable) {
        return $.post(config.remoteServerName + "/EditAccountsTenderAnalysisSectionsItems", accountsTenderAnalysisSectionsItemsObservable);
    };

    var accountsTenderAnalysisSectionsItemsDelete = function (id) {
        return $.post(config.remoteServerName + "/AccountsTenderAnalysisSectionsItemsDelete?id=" + id)


    };

    var getAccountsTenderAnalysisSectionsItemsForEdit = function (accountsTenderAnalysisSectionsItemsObservable, id) {
        $.getJSON(config.remoteServerName + "/GetAccountsTenderAnalysisSectionsItemsForEdit", { id: id })
                   .done(function (data) {
                       accountsTenderAnalysisSectionsItemsObservable(data[0]);
                   });
    };

    //#endregion

    //#region ExpensesUser
    var getPassWordEncrypt = function (password) {
        return $.getJSON(config.remoteServerName + "/GetPassWordEncrypt", { password: password });
    };

    var getExpensesUser = function (contactId, typeId, expensesUserObservable) {
        $.getJSON(config.remoteServerName + "/GetExpensesUser", { contactId: contactId, typeId: typeId })
                   .done(function (data) {
                       expensesUserObservable.data(data);
                   });
    };

    var getExpensesUserByContactIdType = function (expensesUserObservable, requestFromUserId, type) {
        return $.getJSON(config.remoteServerName + "/GetExpensesUserByContactIdType", { requestFromUserId: requestFromUserId, type: type })
                    .done(function (data) {
                        if (expensesUserObservable) {
                            expensesUserObservable.data(data);
                        }
                    }).fail(function (error) {
                        alert(error);
                    });
    };

    var getExpensesUserByRange = function (fromDate, toDate, contactId, projectId, expensesUserObservable) {
        $.getJSON(config.remoteServerName + "/GetExpensesUserByRange", { fromDate: fromDate, toDate: toDate, contactId: contactId, projectId: projectId })
                   .done(function (data) {
                       expensesUserObservable.data(data);
                   });
    };


    var getTimeSheetByRangeProjectId = function (obj, communicationEmailsObservable) {
        return $.post(config.remoteServerName + "/GetTimeSheetByRangeProjectId", obj).done(function (data) {
            if (communicationEmailsObservable) {
                $("#emailGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationEmailsObservable.data(tempArray);
                $('#emailGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getTodayExpensesUser = function (date, expensesUserObservable) {
        return $.getJSON(config.remoteServerName + "/GetTodayExpensesUser", { date: date })
            .done(function (data) {
                if (expensesUserObservable) {
                    expensesUserObservable.data(data);
                }
            });
    };

    var deleteTodayExpensesUser = function (id) {
        return $.post(config.remoteServerName + "/DeleteTodayExpensesUser", { id: id });
    };

    var addExpensesUser = function (expensesUserObservable) {
        return $.post(config.remoteServerName + "/AddExpensesUser", expensesUserObservable);

    };

    var editExpensesUser = function (expensesUserObservable) {
        return $.post(config.remoteServerName + "/EditExpensesUser", expensesUserObservable);
    };

    var storeSummaryInAccount = function (htmlSummaries) {
        return $.post(config.remoteServerName + "/StoreSummaryInAccount?htmlSummaries=" + htmlSummaries);
    };

    var getStoreSummaryInAccount = function () {
        return $.getJSON(config.remoteServerName + "/GetStoreSummaryInAccount");
    };

    var editExpensesUserApprovalStatus = function (id, comment, type) {
        return $.post(config.remoteServerName + "/EditExpensesUserApprovalStatus?id=" + id + "&comment=" + comment() + "&type=" + type());
    };
    var expensesUserDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ExpensesUserDelete", { id: id })
            .done(function (data) {
            });
    };

    var getExpensesUserForEdit = function (expensesUserObservable, id) {
        $.getJSON(config.remoteServerName + "/GetExpensesUserForEdit", { id: id })
                   .done(function (data) {
                       expensesUserObservable(data[0]);
                   });
    };

    //#endregion

    //#region CommunicationRfi

    var getCommunicationRfi = function (communicationRfiObservable, projectId, pageNumber, pageSize) {
        //$.getJSON(config.remoteServerName + "/GetCommunicationRfi", { projectId: projectId })
        //   .success(function (data) {
        //       communicationRfiObservable.data(data);
        //   });
        return $.getJSON(config.remoteServerName + "/GetCommunicationRfi?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + config.pageSize()).done(function (data) {
            if (communicationRfiObservable) {
                $("#rfiGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(communicationRfiObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationRfiObservable.data(tempArray);
                $('#rfiGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getCommunicationRfiByParentId = function (communicationRfiObservable, parentId) {
        $.getJSON(config.remoteServerName + "/GetCommunicationRfiByParentId", { parentId: parentId })
           .success(function (data) {
               communicationRfiObservable.data(data);
           });
    };

    var addCommunicationRfi = function (communicationRfiObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationRfi", communicationRfiObservable);
    };

    var editCommunicationRfi = function (communicationRfiObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationRfi", communicationRfiObservable);
    };

    var communicationRfiDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationRfiDelete?id=" + id);
    };

    var getCommunicationRfiForEdit = function (communicationRfiObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationRfiForEdit", { id: id })
                    .success(function (data) {
                        communicationRfiObservable(ko.mapping.fromJS(data));
                    });
    };

    //#endregion

    //#region CommunicationEmails


    //var getCommunicationEmails = function (projectId, communicationEmailsObservable, pageNumber, pageSize) {
    //    $.getJSON(config.remoteServerName + "/GetCommunicationEmails?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
    //       .success(function (data) {
    //           communicationEmailsObservable(data);
    //       });
    //};

    var getCommunicationEmails = function (communicationEmailsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationEmails?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationEmailsObservable) {
                $("#emailGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(communicationEmailsObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationEmailsObservable.data(tempArray);
                $('#emailGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };





    var addCommunicationEmails = function (communicationEmailsObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationEmails", communicationEmailsObservable);
    };

    var addToEmailRecord = function (communicationEmailsObservable) {
        return $.post(config.remoteServerName + "/AddToEmailRecord", communicationEmailsObservable);
    };

    var editCommunicationEmails = function (communicationEmailsObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationEmails", communicationEmailsObservable);
    };

    var communicationEmailsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationEmailsDelete?id=" + id);
    };

    var getCommunicationEmailsForEdit = function (communicationEmailsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationEmailsForEdit", { id: id })
                   .success(function (data) {
                       communicationEmailsObservable(ko.mapping.fromJS(data));
                   });
    };

    //#endregion

    //#region communicationCorrespondenceSent

    //var getCommunicationCorrespondenceSent = function (projectId, communicationCorrespondenceSent, pageNumber, pageSize) {
    //    $.getJSON(config.remoteServerName + "/GetCommunicationCorrespondenceSent?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
    //       .success(function (data) {
    //           communicationCorrespondenceSent(data);
    //       });
    //};

    var getCommunicationCorrespondenceSent = function (communicationCorrespondenceSent, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationCorrespondenceSent?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationCorrespondenceSent) {
                $("#correspondenceSentGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationCorrespondenceSent.data(tempArray);
                $('#correspondenceSentGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var addCommunicationCorrespondenceSent = function (communicationCorrespondenceSent) {
        return $.post(config.remoteServerName + "/AddCommunicationCorrespondenceSent", communicationCorrespondenceSent);
    };

    var editCommunicationCorrespondenceSent = function (communicationCorrespondenceSent) {
        return $.post(config.remoteServerName + "/EditCommunicationCorrespondenceSent", communicationCorrespondenceSent);
    };

    var communicationCorrespondenceSentDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationCorrespondenceSentDelete?id=" + id);
    };

    var getCommunicationCorrespondenceSentForEdit = function (communicationCorrespondenceSent, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationCorrespondenceSentForEdit", { id: id })
                   .success(function (data) {
                       communicationCorrespondenceSent(ko.mapping.fromJS(data));
                   });
    };

    //#endregion

    //#region accounts_doc_type
    var getAccountsDocType = function (accountsDocTypeSent) {
        $.getJSON(config.remoteServerName + "/GetAccountsDocType").success(function (data) {
            accountsDocTypeSent(data);
        });
    };

    var getAccountsDocTypeWithModules = function (accountsDocTypeSent) {
        $.getJSON(config.remoteServerName + "/GetAccountsDocTypeWithModules")
           .success(function (data) {
               accountsDocTypeSent(data);
           });
    };

    //#endregion

    //#region accounts_Alerts
    var getAccountsAlerts = function (projectId, accountsAlerts, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsAlerts?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (accountsAlerts) {
                $("#accountAlertLog").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(accountsAlerts.data);
                ko.utils.arrayPushAll(tempArray, data);
                accountsAlerts.data(tempArray);
                $('#accountAlertLog').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var addAccountsAlerts = function (accountsAlerts) {
        return $.post(config.remoteServerName + "/AddAccountsAlerts", accountsAlerts);
    };

    var editAccountsAlerts = function (accountsAlerts) {
        return $.post(config.remoteServerName + "/EditAccountsAlerts", accountsAlerts);
    };

    var accountsAlertsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/AccountsAlertsDelete", { id: id })
            .done(function (data) {
            });
    };

    var getAccountsAlertsForEdit = function (accountsAlerts, id) {
        return $.getJSON(config.remoteServerName + "/GetAccountsAlertsForEdit", { id: id })
                   .done(function (data) {
                       accountsAlerts(data);
                   });
    };
    //#endregion

    //#region Accounts_Bic---------
    var getAccountsBic = function (projectId, accountsBic, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsBic?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (accountsBic) {
                $("#accountBic").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(accountsBic.data);
                ko.utils.arrayPushAll(tempArray, data);
                accountsBic.data(tempArray);
                $('#accountBic').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var addAccountsBic = function (accountsBic) {
        return $.post(config.remoteServerName + "/AddAccountsBic", accountsBic);
    };

    var editAccountsBic = function (accountsBic) {
        return $.post(config.remoteServerName + "/EditAccountsBic", accountsBic);
    };

    var accountsBicDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/AccountsBicDelete", { id: id })
            .done(function (data) {
            });
    };

    var getAccountsBicForEdit = function (accountsBic, id) {
        return $.getJSON(config.remoteServerName + "/GetAccountsBicForEdit", { id: id }).done(function (data) {
            accountsBic(data);
        });
    };

    //#endregion

    //#region Projects_Forms

    var getProjectsForms = function (projectId, lettersObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetProjectsForms?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#projectFormGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#projectFormGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var addProjectsForms = function (projectsForms) {
        return $.post(config.remoteServerName + "/AddProjectsForms", projectsForms);
    };

    var editProjectsForms = function (projectsForms, observable) {
        return $.post(config.remoteServerName + "/EditProjectsForms", projectsForms).done(function (data) {
            observable(data);
        });
    };

    var projectsFormsDelete = function (id) {
        return $.post(config.remoteServerName + "/ProjectsFormsDelete?id=" + id);
    };

    var getProjectsFormsForEdit = function (projectsForms, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectsFormsForEdit?id=" + id).success(function (data) {
            projectsForms(data);
        });
    };

    //#endregion

    //#region Communication_Meeting_Agenda
    var getCommunicationMeetingAgenda = function (meetingAgenda, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingAgenda?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (meetingAgenda) {
                $("#meetingAgendaGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                meetingAgenda.data(tempArray);
                $('#meetingAgendaGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var addCommunicationMeetingAgenda = function (meetingAgenda) {
        return $.post(config.remoteServerName + "/AddCommunicationMeetingAgenda", meetingAgenda);
    };

    var addMeetingAgendaWithMeetingMinutes = function (meetingAgenda) {
        return $.post(config.remoteServerName + "/AddMeetingAgendaWithMeetingMinutes", meetingAgenda);
    };

    var editCommunicationMeetingAgenda = function (meetingAgenda) {
        return $.post(config.remoteServerName + "/EditCommunicationMeetingAgenda", meetingAgenda);
    };

    var communicationMeetingAgendaDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationMeetingAgendaDelete?id=" + id);
    };

    var getCommunicationMeetingAgendaForEdit = function (meetingAgenda, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingAgendaForEdit?id=" + id).success(function (data) {
            meetingAgenda(ko.mapping.fromJS(data));
        });
    };

    //#endregion

    //#region Communication_Meeting_Agenda_Topics

    var getCommunicationMeetingAgendaTopics = function (agendaId, meetingAgendaTopics) {
        $.getJSON(config.remoteServerName + "/GetCommunicationMeetingAgendaTopics?agendaId=" + agendaId).success(function (data) {
            meetingAgendaTopics.data(data);
        });
    };

    var addCommunicationMeetingAgendaTopics = function (meetingAgendaTopics, agendaTopicObs) {
        return $.post(config.remoteServerName + "/AddCommunicationMeetingAgendaTopics", meetingAgendaTopics).success(function (data) {
            agendaTopicObs(data);
        });
    };

    var editCommunicationMeetingAgendaTopics = function (meetingAgendaTopics, agendaTopicObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationMeetingAgendaTopics", meetingAgendaTopics).success(function (data) {
            agendaTopicObservable(data);
        });
    };

    var communicationMeetingAgendaTopicsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationMeetingAgendaTopicsDelete?id=" + id);
    };

    var getCommunicationMeetingAgendaTopicsForEdit = function (meetingAgendaTopics, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingAgendaTopicsForEdit?id=" + id).success(function (data) {
            meetingAgendaTopics(ko.mapping.fromJS(data));
        });
    };

    //#endregion

    //#region Communication_Meeting_Agenda_Attendees

    var getCommunicationMeetingAgendaAttendees = function (agendaId, meetingAgendaAttendees) {
        $.getJSON(config.remoteServerName + "/GetCommunicationMeetingAgendaAttendees?agendaId=" + agendaId).success(function (data) {
            meetingAgendaAttendees.data(data);
        });
    };

    var addCommunicationMeetingAgendaAttendees = function (meetingAgendaAttendees, agendaAttendeesObs) {
        return $.post(config.remoteServerName + "/AddCommunicationMeetingAgendaAttendees", meetingAgendaAttendees).success(function (data) {
            agendaAttendeesObs(data);
        });
    };

    var editCommunicationMeetingAgendaAttendees = function (meetingAgendaAttendees) {
        return $.post(config.remoteServerName + "/EditCommunicationMeetingAgendaAttendees", meetingAgendaAttendees);
    };

    var communicationMeetingAgendaAttendeesDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationMeetingAgendaAttendeesDelete?id=" + id);
    };

    var getCommunicationMeetingAgendaAttendeesForEdit = function (meetingAgendaAttendees, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingAgendaAttendeesForEdit", { id: id })
                   .done(function (data) {
                       meetingAgendaAttendees(ko.mapping.fromJS(data));
                   });
    };

    //#endregion

    //#region Communication_Meeting_Minutes
    var getCommunicationMeetingMinutesInternal = function (meetingMinutes, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingMinutes?projectId=" + projectId + "&locationId=" + 0 + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .success(function (data) {
                if (meetingMinutes) {
                    $("#meetingMeetingGrid").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(meetingMinutes.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    meetingMinutes.data(tempArray);
                    $('#meetingMeetingGrid').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };

    var getCommunicationMeetingMinutesExternal = function (meetingMinutes, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingMinutes?projectId=" + projectId + "&locationId=" + 1 + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .success(function (data) {
                if (meetingMinutes) {
                    $("#meetingMeetingGrid").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(meetingMinutes.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    meetingMinutes.data(tempArray);
                    $('#meetingMeetingGrid').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };

    //#region Communication_Meeting_Minutes
    var getCommunicationMeetingMinutesForAgenda = function (meetingMinutes, projectId) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingMinutesForAgenda?projectId=" + projectId).success(function (data) {
            meetingMinutes(data);
        });
    };

    var addCommunicationMeetingMinutes = function (meetingMinutes) {
        return $.post(config.remoteServerName + "/AddCommunicationMeetingMinutes", meetingMinutes);
    };

    var editCommunicationMeetingMinutes = function (meetingMinutes) {
        return $.post(config.remoteServerName + "/EditCommunicationMeetingMinutes", meetingMinutes);
    };

    var communicationMeetingMinutesDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationMeetingMinutesDelete?id=" + id);
    };

    var getCommunicationMeetingMinutesForEdit = function (meetingMinutes, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingMinutesForEdit", { id: id })
                   .done(function (data) {
                       meetingMinutes(ko.mapping.fromJS(data));
                   });
    };

    //#endregion

    //#region Communication_Meeting_Minutes_Topics
    var getCommunicationMeetingMinutesTopics = function (meetingId, meetingAgendaTopics) {
        $.getJSON(config.remoteServerName + "/GetCommunicationMeetingMinutesTopics", { meetingId: meetingId })
           .success(function (data) {
               meetingAgendaTopics(data);
           });
    };

    var addCommunicationMeetingMinutesTopics = function (meetingAgendaTopics) {
        return $.post(config.remoteServerName + "/AddCommunicationMeetingMinutesTopics", meetingAgendaTopics);
    };

    var editCommunicationMeetingMinutesTopics = function (meetingAgendaTopics) {
        return $.post(config.remoteServerName + "/EditCommunicationMeetingMinutesTopics", meetingAgendaTopics);
    };

    var communicationMeetingMinutesTopicsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationMeetingMinutesTopicsDelete", { id: id })
            .done(function (data) {
            });
    };

    var getCommunicationMeetingMinutesTopicsForEdit = function (meetingAgendaTopics, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingMinutesTopicsForEdit", { id: id })
                   .done(function (data) {
                       meetingAgendaTopics(ko.mapping.fromJS(data));
                   });
    };

    //#endregion

    //#region Communication_Meeting_Minutes_Attendees
    var getCommunicationMeetingMinutesAttendees = function (meetingId, meetingAgendaAttendees) {
        $.getJSON(config.remoteServerName + "/GetCommunicationMeetingMinutesAttendees", { meetingId: meetingId })
           .success(function (data) {
               meetingAgendaAttendees(data);
           });
    };

    var addCommunicationMeetingMinutesAttendees = function (meetingAgendaAttendees) {
        return $.post(config.remoteServerName + "/AddCommunicationMeetingMinutesAttendees", meetingAgendaAttendees);
    };

    var editCommunicationMeetingMinutesAttendees = function (meetingAgendaAttendees) {
        return $.post(config.remoteServerName + "/EditCommunicationMeetingMinutesAttendees", meetingAgendaAttendees);
    };

    var communicationMeetingMinutesAttendeesDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationMeetingMinutesAttendeesDelete", { id: id })
            .done(function (data) {
            });
    };

    var getCommunicationMeetingMinutesAttendeesForEdit = function (meetingAgendaAttendees, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMeetingMinutesAttendeesForEdit", { id: id }).done(function (data) {
            meetingAgendaAttendees(ko.mapping.fromJS(data));
        });
    };

    //#endregion

    //#region Project_Projects_Companies
    var getProjectProjectsCompaniesLog = function (projectId, projectProjectsCompanies) {
        return $.getJSON(config.remoteServerName + "/GetProjectProjectsCompanies", { projectId: projectId })
            .done(function (data) {
                if (projectProjectsCompanies) {

                    projectProjectsCompanies.data(data);
                }
            });
    };

    var projectProjectsCompaniesDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ProjectProjectsCompaniesDelete", { id: id })
            .done(function (data) {
            });
    };

    var deleteProjectProjectCompaniesForManageCompanies = function (id, projectId) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectProjectCompaniesForManageCompanies?id=" + id + "&projectId=" + projectId);
    };

    var addProjectProjectsCompanies = function (projectProjectsCompanies) {
        return $.post(config.remoteServerName + "/AddProjectProjectsCompanies", projectProjectsCompanies);
    };

    var addProjectProjectsCompaniesForManageCompanies = function (companyId, projectId, projectCompanies) {
        return $.post(config.remoteServerName + "/AddProjectProjectsCompaniesForManageCompanies?companyId=" + companyId + "&projectId=" + projectId).success(function (data) {
            projectCompanies(data);
        });
    };
    //#endregion

    //#region Project_Organization_Chart

    var getProjectOrganizationChart = function (projectId, projectOrganizationChart) {
        $.getJSON(config.remoteServerName + "/GetProjectOrganizationChart", { projectId: projectId })
           .success(function (data) {
               projectOrganizationChart(data);
           });
    };

    var addProjectOrganizationChart = function (projectOrganizationChart) {
        return $.post(config.remoteServerName + "/AddProjectOrganizationChart", projectOrganizationChart);
    };

    var editProjectOrganizationChart = function (projectOrganizationChart) {
        return $.post(config.remoteServerName + "/EditProjectOrganizationChart", projectOrganizationChart);
    };

    var projectOrganizationChartDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ProjectOrganizationChartDelete", { id: id })
            .done(function (data) {
            });
    };

    var getProjectOrganizationChartForEdit = function (projectOrganizationChart, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectOrganizationChartForEdit", { id: id })
                   .success(function (data) {
                       projectOrganizationChart(ko.mapping.fromJS(data));
                   });
    };

    //#endregion

    //#region Communication_Transmittal

    //var getCommunicationTransmittal = function (projectId, transimttal) {
    //    $.getJSON(config.remoteServerName + "/GetCommunicationTransmittal", { projectId: projectId })
    //       .success(function (data) {
    //           transimttal.data(data);
    //       });
    //};

    var getCommunicationTransmittal = function (communicationInternalMemoObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationTransmittal?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationInternalMemoObservable) {
                $("#transmittalGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(communicationInternalMemoObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationInternalMemoObservable.data(tempArray);
                $('#transmittalGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };




    var addCommunicationTransmittal = function (transimttal) {
        return $.post(config.remoteServerName + "/AddCommunicationTransmittal", transimttal);
    };

    var editCommunicationTransmittal = function (transimttal) {
        return $.post(config.remoteServerName + "/EditCommunicationTransmittal", transimttal);
    };

    var communicationTransmittalDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationTransmittalDelete?id=" + id);
    };

    var getCommunicationTransmittalForEdit = function (transimttal, id) {

        return $.getJSON(config.remoteServerName + "/GetCommunicationTransmittalForEdit", { id: id }).success(function (data) {
            transimttal(ko.mapping.fromJS(data));
        });
    };

    //#endregion

    //#region accounts_doc_types
    var getAccountsDocTypesAsTree = function (docTypes) {

        $.getJSON(config.remoteServerName + "/GetAccountsDocTypesAsTree").success(function (data) {
            docTypes(data);
        });
    };

    var getAccountsDocTypesVisisbleAsTree = function (docTypes) {

        $.getJSON(config.remoteServerName + "/GetAccountsDocTypesVisisbleAsTree").success(function (data) {
            docTypes(data);
        });
    };

    //#endregion

    //#region Time_Sheet


    var getTimeSheetByRange = function (expenses, lettersObservable) {
        return $.post(config.remoteServerName + "/GetTimeSheetByRange", expenses).done(function (data) {
            if (lettersObservable) {
                $("#myTimeShhet").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#myTimeShhet').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var getTimeSheetByRangePending = function (timeSheetObservableObj, timeSheetObservable) {
        return $.post(config.remoteServerName + "/GetTimeSheetByRangePending", timeSheetObservableObj).success(function (data) {
            timeSheetObservable.data(data);
        });
    };

    var getExpensesByDates = function (getTimeSheetByRangeObservable, timeSheetObservable) {

        return $.post(config.remoteServerName + "/GetExpensesByDates", getTimeSheetByRangeObservable).done(function (data) {
            if (timeSheetObservable) {

                timeSheetObservable.data(data);
            }
        });
    };

    var sendRequestsExpensesByDates = function (timeSheetObservableObj, timeSheetObservable) {
        return $.post(config.remoteServerName + "/SendRequestsExpensesByDates", timeSheetObservableObj).success(function (data) {
            if (timeSheetObservable) {
                timeSheetObservable.data(data);
            }
        });
    };
    //#endregion

    //#region Primavera_Schedule

    var getPrimaveraSchedule = function (lettersObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetPrimaveraSchedule?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#primaveraScheduleGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#primaveraScheduleGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var addPrimaveraSchedule = function (primaveraSchedule) {
        return $.post(config.remoteServerName + "/AddPrimaveraSchedule", primaveraSchedule);
    };

    var editPrimaveraSchedule = function (primaveraSchedule) {
        return $.post(config.remoteServerName + "/EditPrimaveraSchedule", primaveraSchedule);
    };

    var primaveraScheduleDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/PrimaveraScheduleDelete", { id: id })
            .done(function (data) {
            });
    };

    var getPrimaveraScheduleForEdit = function (id) {
        return $.getJSON(config.remoteServerName + "/GetPrimaveraScheduleForEdit?id=" + id);
    };
    //#endregion

    //#region Primavera_Schedule_Items

    var getPrimaveraScheduleItems = function (scheduleId, primaveraItemsObservable) {
        return $.getJSON(config.remoteServerName + "/GetPrimaveraScheduleItems?scheduleId=" + scheduleId);
    };

    var addPrimaveraScheduleItems = function (primaveraItemsObservable, fileName, scheduleId, projectId, isEdit) {
        return $.getJSON(config.remoteServerName + "/ReadPrimaveraScheduleItems", { fileName: fileName, scheduleId: scheduleId, projectId: projectId, isEdit: isEdit });
    };

    var primaveraScheduleItemsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/PrimaveraScheduleItemsDelete", { id: id })
            .done(function (data) {
            });
    };

    var sendTaskGroup = function (taskGroupObservable) {
        return $.post(config.remoteServerName + "/SendTaskGroup", taskGroupObservable);
    };
    var sendTask = function (taskGroupObservable) {
        return $.post(config.remoteServerName + "/SendTask", taskGroupObservable);
    };
    //#region task_group_panel

    var getProjectTaskGroupsList = function (projectTaskGroupsObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetProjectTaskGroupsList", { projectId: projectId }).done(function (data) {
            projectTaskGroupsObservable(data);
        });
    };


    //#endregion

    //#region contracts_Boq

    var getContractsBoq = function (boq, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoq?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (boq) {
                $("#boqGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(boq.data);
                ko.utils.arrayPushAll(tempArray, data);
                boq.data(tempArray);
                $('#boqGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var getContractsBoqList = function (projectId, boq) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoq?projectId=" + projectId + "&pageNumber=" + 0 + "&pageSize=" + 1000000000)
       .success(function (data) {
           boq(data);
       });
    };

    var addContractsBoq = function (boq) {
        return $.post(config.remoteServerName + "/AddContractsBoq", boq);
    };

    var addContractsPurchaseOrdersForBoq = function (boq) {
        return $.post(config.remoteServerName + "/AddContractsPurchaseOrdersForBoq", boq);
    };

    var addContractsForBoq = function (boq) {
        return $.post(config.remoteServerName + "/AddContractsForBoq", boq);
    };

    var editContractsBoq = function (boq) {
        return $.post(config.remoteServerName + "/EditContractsBoq", boq);
    };

    var contractsBoqDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsBoqDelete?id=" + id);
    };

    var getContractsBoqForEdit = function (boq, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqForEdit", { id: id }).done(function (data) {
            if (boq) {
                boq(data);
            }
        });
    };

    //#endregion

    //#region contracts_Boq_Group

    var getContractsBoqGroup = function (boqId, boqGroup) {
        $.getJSON(config.remoteServerName + "/GetContractsBoqGroup", { boqId: boqId })
           .success(function (data) {
               boqGroup(data);
           });
    };

    var addContractsBoqGroup = function (boqGroup) {
        return $.post(config.remoteServerName + "/AddContractsBoqGroup", boqGroup);
    };

    var editContractsBoqGroup = function (boqGroup) {
        return $.post(config.remoteServerName + "/EditContractsBoqGroup", boqGroup);
    };

    var contractsBoqGroupDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsBoqGroupDelete", { id: id })
            .done(function (data) {
            });
    };

    var getContractsBoqGroupForEdit = function (boqGroup, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqGroupForEdit", { id: id }).done(function (data) {
            boqGroup(data[0]);
        });
    };

    //#endregion

    //#region contracts_Boq_Items

    var getContractsBoqItems = function (boqId, boqItems) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqItems", { boqId: boqId }).success(function (data) {
            if (boqItems) {
                $("#boqItems").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(boqItems.data);
                ko.utils.arrayPushAll(tempArray, data);
                boqItems.data(tempArray);
                $('#boqItems').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getContractsBoqItemsByParentId = function (boqItems, parentId) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqItemsByParentId", { parentId: parentId }).success(function (data) {
            if (boqItems) {
                $("#boqItems").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(boqItems.data);
                ko.utils.arrayPushAll(tempArray, data);
                boqItems.data(tempArray);
                $('#boqItems').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }

        });
    };

    //var getContractsBoqItemsReport = function (boqId, boqItems) {
    //    return $.getJSON(config.remoteServerName + "/GetContractsBoqItemsReport", { boqId: boqId })
    //        .success(function (data) {
    //            boqItems.data(data);
    //        });
    //};


    var getContractsBoqItemsReport = function (boqId, changeOrdeObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqItemsReport?boqId=" + boqId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (changeOrdeObservable) {
                $("#gridBoqQuantities").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(changeOrdeObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                changeOrdeObservable.data(tempArray);
                $('#gridBoqQuantities').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getContractsBoqItemsList = function (boqId, boqItems) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqItems?boqId=" + boqId)
            .success(function (data) {
                boqItems(data);
            });
    };

    var getContractsBoqItemsListGrid = function (boqId, boqItems) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqItems?boqId=" + boqId)
            .success(function (data) {
                boqItems.data(data);
            });
    };

    var getContractsBoqItemsBySpecsId = function (boqId, specsId, boqItems) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqItemsBySpecsId", { boqId: boqId, specsId: specsId }).success(function (data) {
            boqItems(data);
        });
    };

    var addContractsBoqItems = function (boqObservable, boqItems) {
        return $.post(config.remoteServerName + "/AddContractsBoqItems", boqItems).success(function (data) {
            if (boqObservable) {
                boqObservable.data(data);
            }
        });
    };

    var addContractsBoqItemsItmized = function (boqObservable, boqItems) {
        return $.post(config.remoteServerName + "/AddContractsBoqItemsItmized", boqItems).success(function (data) {
            if (boqObservable) {
                boqObservable.data(data);
            }
        });
    };

    var editContractsBoqItems = function (boqItems) {
        return $.post(config.remoteServerName + "/EditContractsBoqItems", boqItems);
    };

    var contractsBoqItemsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsBoqItemsDelete", { id: id })
            .done(function (data) {
            });
    };

    var getContractsBoqItemsForEdit = function (boqItems, id, isEstimationAddEdit) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqItemsForEdit", { id: id }).done(function (data) {
            if (isEstimationAddEdit) {
                //Do Nothing
            } else {
                boqItems(data);
            }
        });
    };

    var getContractsBoqItemsTotal = function (boqItems, boqId) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqItemsTotal", { boqId: boqId }).done(function (data) {
            if (boqItems) {
                boqItems(data);
            }
        });
    };

    //#endregion

    //#region contracts_request_payments

    var getContractsRequestPayments = function (paymentsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsRequestPayments", { projectId: projectId, pageNumber: pageNumber, pageSize: pageSize });
    };


    var getContractsRequestPaymentsReport = function (obj, changeOrdeObservable) {
        return $.post(config.remoteServerName + "/GetContractsRequestPaymentsReport", obj).done(function (data) {
            if (changeOrdeObservable) {
                $("#gridBoqQuantities").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(changeOrdeObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                changeOrdeObservable.data(tempArray);
                $('#gridBoqQuantities').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var addContractsRequestPayments = function (paymentsObservable) {
        return $.post(config.remoteServerName + "/AddContractsRequestPayments", paymentsObservable);
    };


    var editContractsRequestPayments = function (paymentsObservable) {
        return $.post(config.remoteServerName + "/EditContractsRequestPayments", paymentsObservable);
    };

    var editContractsRequestPaymentsUpdateTotalExcuted = function (paymentsObservable) {
        return $.post(config.remoteServerName + "/EditContractsRequestPaymentsUpdateTotalExcuted", paymentsObservable);
    };

    var contractsRequestPaymentsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsRequestPaymentsDelete?id=" + id)
            .done(function (data) {
            });
    };

    var getContractsRequestPaymentsForEdit = function (paymentsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsRequestPaymentsForEdit", { id: id })
                   .done(function (data) {
                       paymentsObservable(ko.mapping.fromJS(data));
                   });
    };

    //#endregion

    //#region contracts_request_payments_deductions

    var getContractsRequestPaymentsDeductions = function (requestId, paymentsObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsRequestPaymentsDeductions", { requestId: requestId })
           .success(function (data) {
               paymentsObservable.data(data);
           });
    };

    var getContractsRequestPaymentsDeductionsList = function (requestId, paymentsObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsRequestPaymentsDeductions", { requestId: requestId })
           .success(function (data) {
               paymentsObservable(data);
           });
    };

    var addContractsRequestPaymentsDeductions = function (paymentsObservable) {
        return $.post(config.remoteServerName + "/AddContractsRequestPaymentsDeductions", paymentsObservable);
    };

    var editContractsRequestPaymentsDeductions = function (paymentsObservable) {
        return $.post(config.remoteServerName + "/EditContractsRequestPaymentsDeductions", paymentsObservable);
    };

    var contractsRequestPaymentsDeductionsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsRequestPaymentsDeductionsDelete", { id: id })
            .done(function (data) {
            });
    };

    var getContractsRequestPaymentsDeductionsForEdit = function (paymentsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsRequestPaymentsDeductionsForEdit", { id: id })
                   .done(function (data) {
                       paymentsObservable(data);
                   });
    };

    //#endregion

    //#region contracts_request_payments_items

    var getContractsRequestPaymentsItems = function (requestId, paymentsObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsRequestPaymentsItems", { requestId: requestId })
           .success(function (data) {
               paymentsObservable.data(data);
           });
    };

    var addContractsRequestPaymentsItems = function (paymentsObservable) {
        return $.post(config.remoteServerName + "/AddContractsRequestPaymentsItems", paymentsObservable);
    };

    var editContractsRequestPaymentsItems = function (paymentsObservable) {
        return $.post(config.remoteServerName + "/EditContractsRequestPaymentsItems", paymentsObservable);
    };

    var contractsRequestPaymentsItemsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsRequestPaymentsItemsDelete", { id: id })
            .done(function (data) {
            });
    };

    var getContractsRequestPaymentsItemsForEdit = function (paymentsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsRequestPaymentsItemsForEdit", { id: id })
                   .done(function (data) {
                       paymentsObservable(data);
                   });
    };

    //#endregion 

    //#region contract_cost_coding_tree

    var getContractCostCoodingTreeAsTree = function (boqId, paymentsObservable) {
        $.getJSON(config.remoteServerName + "/GetContractCostCoodingTreeAsTree", { boqId: boqId })
           .done(function (data) {
               paymentsObservable(data);
           });
    };



    //#endregion

    //#region contract_cost_coding_tree

    var getContractsOrdersItemsExcution = function (contractId, paymentsObservable) {
        return $.getJSON(config.remoteServerName + "/GetContractsOrdersItemsExcution", { contractId: contractId })
            .success(function (data) {
                paymentsObservable.data(data);
            });
    };
    var getContractsOrdersItemById = function (paymentsObservable, contractId) {
        return $.getJSON(config.remoteServerName + "/GetContractsOrdersItemById", { contractId: contractId })
            .success(function (data) {
                paymentsObservable(data);
            });
    };
    var getContractsOrdersItemsExcutionList = function (contractId, paymentsObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsOrdersItemsExcution", { contractId: contractId })
           .success(function (data) {
               paymentsObservable(data);
           });
    };

    //#endregion

    //#region contracts_change_order

    //var getContractsChangeOrder = function (projectId, changeOrdeObservable) {
    //    $.getJSON(config.remoteServerName + "/GetContractsChangeOrder", { projectId: projectId })
    //       .success(function (data) {
    //           changeOrdeObservable.data(data);
    //       });
    //};

    var getContractsChangeOrder = function (changeOrdeObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsChangeOrder?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (changeOrdeObservable) {
                $("#changeOrederGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(changeOrdeObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                changeOrdeObservable.data(tempArray);
                $('#changeOrederGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };





    var addContractsChangeOrder = function (changeOrdeObservable) {
        return $.post(config.remoteServerName + "/AddContractsChangeOrder", changeOrdeObservable);
    };

    var editContractsChangeOrder = function (changeOrdeObservable) {
        return $.post(config.remoteServerName + "/EditContractsChangeOrder", changeOrdeObservable);
    };

    var contractsChangeOrderDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsChangeOrderDelete?id=" + id);
    };

    var getContractsChangeOrderForEdit = function (changeOrdeObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsChangeOrderForEdit", { id: id })
                   .done(function (data) {
                       changeOrdeObservable(data);
                   });
    };

    var getContractsChangeOrderSumTotal = function (changeOrdeObservable, contractId) {
        return $.getJSON(config.remoteServerName + "/GetContractsChangeOrderSumTotal", { contractId: contractId })
                   .done(function (data) {
                       changeOrdeObservable(data);
                   });
    };

    //#endregion 

    //#region Project_Issues

    var getContractsProjectIssues = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsProjectIssues?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {

                if (contractsObservable) {
                    $("#projectIssuesGrid").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(contractsObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    contractsObservable.data(tempArray);
                    $('#projectIssuesGrid').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };


    var addContractsProjectIssues = function (projectIssuesObservable) {
        return $.post(config.remoteServerName + "/AddContractsProjectIssues", projectIssuesObservable);
    };

    var editContractsProjectIssues = function (projectIssuesObservable) {
        return $.post(config.remoteServerName + "/EditContractsProjectIssues", projectIssuesObservable);
    };

    var contractsProjectIssuesDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsProjectIssuesDelete?id=" + id)
            .done(function (data) {
            });
    };

    var getContractsProjectIssuesForEdit = function (projectIssuesObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsProjectIssuesForEdit", { id: id })
                   .done(function (data) {
                       projectIssuesObservable(data);
                   });
    };

    var getDocData = function (id, projectId, projectIssuesObservable) {
        return $.getJSON(config.remoteServerName + "/GetDocData", { id: id, projectId: projectId })
                   .done(function (data) {
                       if (projectIssuesObservable) {
                           projectIssuesObservable(data);
                       }
                   });
    };

    //region Purchase_Order

    var getContractsPurchaseOrders = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrders?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {

                if (contractsObservable) {
                    $("#purchaseOrderGrid").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(contractsObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    contractsObservable.data(tempArray);
                    $('#purchaseOrderGrid').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };





    var getContractsPurchaseOrdersDb = function (projectIssuesObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrders?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
             .success(function (data) {
                 projectIssuesObservable(data);
             });
    };

    var addContractsPurchaseOrders = function (projectIssuesObservable) {
        return $.post(config.remoteServerName + "/AddContractsPurchaseOrders", projectIssuesObservable);
    };

    var editContractsPurchaseOrders = function (changeOrdeObservable) {
        return $.post(config.remoteServerName + "/EditContractsPurchaseOrders", changeOrdeObservable);
    };

    var contractsPurchaseOrderDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsPurchaseOrderDelete?id=" + id)
            .done(function (data) {
            });
    };

    var getContractsPurchaseOrdersForEdit = function (changeOrdeObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrdersForEdit", { id: id })
            .done(function (data) {
                changeOrdeObservable(ko.mapping.fromJS(data));
            });
    };

    //endrgion

    //region Purchase_Order_Groups

    var getContractsPurchaseGroups = function (projectId, projectIssuesObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsPurchaseGroups", { projectId: projectId })
           .success(function (data) {
               projectIssuesObservable(data);
           });
    };

    var addContractsPurchaseGroups = function (projectIssuesObservable) {
        return $.post(config.remoteServerName + "/AddContractsPurchaseGroups", projectIssuesObservable);
    };

    var editContractsPurchaseGroups = function (changeOrdeObservable) {
        return $.post(config.remoteServerName + "/EditContractsPurchaseGroups", changeOrdeObservable);
    };

    var contractsPurchaseGroupDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsPurchaseGroupDelete", { id: id })
            .done(function (data) {
            });
    };

    var getContractsPurchaseGroupsForEdit = function (changeOrdeObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsPurchaseGroupsForEdit", { id: id })
                   .done(function (data) {
                       changeOrdeObservable(data);
                   });
    };

    //endrgion

    //#region

    var getContractsOrdersItemsExcutionPosByPurchaseId = function (purchaseId, projectIssuesObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsOrdersItemsExcutionPosByPurchaseId", { purchaseId: purchaseId })
           .success(function (data) {
               projectIssuesObservable(data);
           });
    };

    var addContractsOrdersItemsExcutionPos = function (projectIssuesObservable) {
        return $.post(config.remoteServerName + "/AddContractsOrdersItemsExcutionPos", projectIssuesObservable);
    };

    var editContractsOrdersItemsExcutionPos = function (changeOrdeObservable) {
        return $.post(config.remoteServerName + "/EditContractsOrdersItemsExcutionPos", changeOrdeObservable);
    };

    var contractsOrdersItemsExcutionPoDelete = function (id, orderType, poObservable) {
        return $.getJSON(config.remoteServerName + "/ContractsOrdersItemsExcutionPoDelete", { id: id, orderType: orderType })
            .done(function (data) {
                poObservable(data);
            });
    };

    var getContractsOrdersItemsExcutionPosForEdit = function (changeOrdeObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsOrdersItemsExcutionPosForEdit", { id: id })
                   .done(function (data) {
                       changeOrdeObservable(data);
                   });
    };

    var addContractsOrderForPo = function (contractOrder, contractOrderObservable) {
        return $.post(config.remoteServerName + "/AddContractsOrderForPo", contractOrder).done(function (data) {
            contractOrderObservable(data);

        });
    };

    //#endregion

    //#region contracts_Purshase_terms

    var getContractsPurchaseOrderTermssByProjectId = function (projectId, boqGroup) {
        $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrderTermssByProjectId", { projectId: projectId })
           .success(function (data) {
               boqGroup(data);
           });
    };

    var addContractsPurchaseOrderTerms = function (boqGroup, purshaseOrder) {
        return $.post(config.remoteServerName + "/AddContractsPurchaseOrderTerms", boqGroup)
                   .success(function (data) {
                       purshaseOrder(data);
                   });;
    };

    var editContractsPurchaseOrderTermss = function (boqGroup) {
        return $.post(config.remoteServerName + "/EditContractsPurchaseOrderTermss", boqGroup);
    };

    var deleteContractsPurchaseOrderTermsById = function (id, termsObservable) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsPurchaseOrderTermsById", { id: id })
            .done(function (data) {
                termsObservable(data);
            });
    };

    var getContractsPurchaseOrderTermssById = function (boqGroup, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrderTermssById", { id: id })
                   .done(function (data) {
                       boqGroup(data);
                   });
    };

    //#endregion

    //#region accounts_Purshase_terms

    var getAccountsPurchaseOrderTerms = function (boqGroup, pageNumber, pageSize) {
        $.getJSON(config.remoteServerName + "/GetAccountsPurchaseOrderTerms?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
           .success(function (data) {
               boqGroup(data);
           });
    };

    var getAccountsPurchaseOrderTermsLog = function (boqGroup, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAccountsPurchaseOrderTerms?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (boqGroup) {
                $("#termsLogs").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(boqGroup.data);
                ko.utils.arrayPushAll(tempArray, data);
                boqGroup.data(tempArray);
                $('#termsLogs').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var addAccountsPurchaseOrderTerms = function (boqGroup) {
        return $.post(config.remoteServerName + "/AddAccountsPurchaseOrderTerms", boqGroup);
    };

    var editAccountsPurchaseOrderTerms = function (boqGroup) {
        return $.post(config.remoteServerName + "/EditAccountsPurchaseOrderTerms", boqGroup);
    };

    var accountsPurchaseOrderTermDelete = function (id) {
        return $.post(config.remoteServerName + "/AccountsPurchaseOrderTermDelete?id=" + id);
    };
    var getAccountsPurchaseOrderTermsForEdit = function (boqGroup, id) {
        return $.getJSON(config.remoteServerName + "/GetAccountsPurchaseOrderTermsForEdit", { id: id })
                   .done(function (data) {
                       boqGroup(data);
                   });
    };

    //#endregion

    //#region accounts_Purshase_schedule

    var getContractsPurchaseOrderScheduleItemssByPurchaseId = function (projectId, boqGroup) {
        $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrderScheduleItemssByPurchaseId", { projectId: projectId })
           .success(function (data) {
               boqGroup(data);
           });
    };

    var addContractsPurchaseOrderScheduleItemss = function (boqGroup, purchaseOrderScheduleItemss) {
        return $.post(config.remoteServerName + "/AddContractsPurchaseOrderScheduleItemss", boqGroup)
                   .success(function (data) {
                       purchaseOrderScheduleItemss(data);
                   });
    };

    var editAccountsPurchaseOrderTerms = function (boqGroup) {
        return $.post(config.remoteServerName + "/EditAccountsPurchaseOrderTerms", boqGroup);
    };

    var deleteContractsPurchaseOrderScheduleItemsById = function (id, termsObservable) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsPurchaseOrderScheduleItemsById", { id: id })
            .done(function (data) {
                termsObservable(data);
            });
    };

    var getContractsPurchaseOrderScheduleItemssById = function (boqGroup, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrderScheduleItemssById", { id: id })
                   .done(function (data) {
                       boqGroup(data);
                   });
    };

    //#endregion

    //#region accounts_Purshase_insurance

    var getContractsPurchaseOrderInsurancesByProjectId = function (projectId, boqGroup) {
        $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrderInsurancesByProjectId", { projectId: projectId })
           .success(function (data) {
               boqGroup(data);
           });
    };

    var addContractsPurchaseOrderInsurances = function (boqGroup, purchaseOrderScheduleItemss) {
        return $.post(config.remoteServerName + "/AddContractsPurchaseOrderInsurances", boqGroup)
                   .success(function (data) {
                       purchaseOrderScheduleItemss(data);
                   });
    };

    var editAccountsPurchaseOrderTerms = function (boqGroup) {
        return $.post(config.remoteServerName + "/EditAccountsPurchaseOrderTerms", boqGroup);
    };

    var deleteContractsPurchaseOrderInsuranceById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsPurchaseOrderInsuranceById", { id: id });
    };

    var getContractsPurchaseOrderInsurancesById = function (boqGroup, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrderInsurancesById", { id: id })
                   .done(function (data) {
                       boqGroup(data);
                   });
    };

    //#endregion

    //#region purchase_Pos

    var getContractsPurchaseOrderSubPos = function (projectId, parentType, boqGroup) {
        $.getJSON(config.remoteServerName + "/GetContractsPurchaseOrderSubPos", { projectId: projectId, parentType: parentType })
           .success(function (data) {
               boqGroup(data);
           });
    };

    //#endregion

    //#region logs_site

    //var getLogsSiteInstructions = function (documnetObservable, projectId) {
    //    $.getJSON(config.remoteServerName + "/GetLogsSiteInstructions", { projectId: projectId }).done(function (data) {
    //        documnetObservable.data(data);
    //    });
    //};

    var getLogsSiteInstructions = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsSiteInstructions?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#siteInstructionsGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#siteInstructionsGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var getLogsSiteInstructionsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsSiteInstructionsForEdit", { id: id }).done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };
    var editLogsSiteInstructions = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsSiteInstructions", documnetObservable);
    };
    var addLogsSiteInstructions = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsSiteInstructions", documnetObservable);
    };
    var logsSiteInstructionsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsSiteInstructionsDelete?id=" + id);
    };

    //#endregion

    //#region DrawingPhases

    var getDesignDrawingPhases = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingPhases?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#drawingPhaseGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#drawingPhaseGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getDesignDrawingPhasesForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingPhasesForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editDesignDrawingPhases = function (documnetObservable, phsaeObservable) {
        return $.post(config.remoteServerName + "/EditDesignDrawingPhases", documnetObservable).done(function (data) {
            phsaeObservable(data);
        });
    };
    var addDesignDrawingPhases = function (documnetObservable, phsaeObservable) {
        return $.post(config.remoteServerName + "/AddDesignDrawingPhases", documnetObservable).done(function (data) {
            phsaeObservable(data);
        });
    };
    var designDrawingPhasesDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/DesignDrawingPhasesDelete?id=" + id);
    };



    //#endregion

    //#region design_drawing_pahse_items

    var getDesignDrawingPhasesItemsAndTransfer = function (documnetObservable, drawingPhasesId, disciplineId) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingPhasesItemsAndTransfer", { drawingPhasesId: drawingPhasesId, disciplineId: disciplineId }).done(function (data) {
            if (documnetObservable) {

                documnetObservable.data(data);
            }
        });
    };

    var getDesignDrawingPhasesItemsByDisciplineId = function (documnetObservable, drawingPhasesId, disciplineId) {
        $.getJSON(config.remoteServerName + "/GetDesignDrawingPhasesItemsByDisciplineId", { drawingPhasesId: drawingPhasesId, disciplineId: disciplineId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getDesignDrawingPhasesItems = function (drawingPhasesId) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingPhasesItems", { drawingPhasesId: drawingPhasesId });
    };

    //#endregion

    //#region inventory


    var getLogsMaterialInventorysByProjectId = function (communicationInternalMemoObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialInventorysByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationInternalMemoObservable) {
                $("#materialInventoryGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationInternalMemoObservable.data(tempArray);
                $('#materialInventoryGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var getLogsMaterialInventoryAll = function (documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialInventoryAll?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#materialInventoryLogs").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#materialInventoryLogs').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getLogsMaterialInventoriesForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialInventoriesForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var logsMaterialInventoryDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsMaterialInventoryDelete", { id: id });
    };
    var addLogsMaterialInventories = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsMaterialInventories", documnetObservable);
    };

    var editLogsMaterialInventoryApproveal = function (materialId, quantity, quantityLbl, action) {
        return $.post(config.remoteServerName + "/EditLogsMaterialInventoryApproveal?materialId=" + materialId() + "&quantity=" + quantity() + "&quantityLbl=" + quantityLbl() + "&action=" + action());
    };

    var editLogsMaterialInventories = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsMaterialInventories", documnetObservable);
    };


    var getLogsMaterialInventoryHistories = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetLogsMaterialInventoryHistories").done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsMaterialInventoryHistoriesForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialInventoryHistoriesForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsMaterialInventoryHistories = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsMaterialInventoryHistories", documnetObservable);
    };
    var addLogsMaterialInventoryHistories = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsMaterialInventoryHistories", documnetObservable);
    };
    var logsMaterialInventoryHistoryDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsMaterialInventoryHistoryDelete", { id: id });
    };

    //#endregion

    //#region estimation_base

    var getEstimationBase = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetEstimationBase?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#baseGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#baseGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getEstimationBaseList = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetEstimationBase", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getEstimationBaseForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetEstimationBaseForEdit", { id: id }).success(function (data) {
            documnetObservable(data);
        });
    };
    var editEstimationBase = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditEstimationBase", documnetObservable);
    };
    var addEstimationBase = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddEstimationBase", documnetObservable);
    };
    var estimationBaseDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/EstimationBaseDelete?id=" + id);
    };


    //#endregion

    //#region client_modification

    var getContractsClientModifications = function (communicationInternalMemoObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsClientModifications?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationInternalMemoObservable) {
                $("#clientModificationGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(communicationInternalMemoObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationInternalMemoObservable.data(tempArray);
                $('#clientModificationGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };




    var getContractsClientModificationsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsClientModificationsForEdit", { id: id }).done(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };
    var editContractsClientModifications = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditContractsClientModifications", documnetObservable);
    };
    var addContractsClientModifications = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddContractsClientModifications", documnetObservable);
    };
    var contractsClientModificationDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsClientModificationDelete", { id: id });
    };


    //#endregion

    //#region weekly_report

    var getLogsWeeklyReports = function (lettersObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReports?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#weeklyReportGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#weeklyReportGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getLogsWeeklyReportsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsForEdit", { id: id }).done(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };
    var editLogsWeeklyReports = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReports", documnetObservable());
    };
    var addLogsWeeklyReports = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReports", documnetObservable);
    };
    var logsWeeklyReportsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsDelete?id=" + id);
    };


    //#endregion

    //#region logs_weekly_reports_technical_office

    var getLogsWeeklyReportsTechnicalOffices = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsTechnicalOffices", { projectId: projectId }).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getLogsWeeklyReportsTechnicalOfficesForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsTechnicalOfficesForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsWeeklyReportsTechnicalOffices = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReportsTechnicalOffices", documnetObservable());
    };
    var addLogsWeeklyReportsTechnicalOffices = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReportsTechnicalOffices", documnetObservable);
    };
    var logsWeeklyReportsTechnicalOfficeDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsTechnicalOfficeDelete", { id: id });
    };


    //#endregion

    //#region logs_weekly_reports_constraints

    var getLogsWeeklyReportsConstraints = function (documnetObservable, parentId) {
        $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsConstraints", { parentId: parentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsWeeklyReportsConstraintsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsConstraintsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsWeeklyReportsConstraints = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReportsConstraints", documnetObservable());
    };
    var addLogsWeeklyReportsConstraints = function (documnetObservable, constraintsObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReportsConstraints", documnetObservable).done(function (data) {
            constraintsObservable(data);
        });
    };
    var logsWeeklyReportsConstraintsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsConstraintsDelete", { id: id });
    };


    //#endregion

    //#region logs_weekly_reports_delivery

    var getLogsWeeklyReportsDeliverys = function (documnetObservable, parentId) {
        $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsDeliverys", { parentId: parentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsWeeklyReportsDeliverysForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsDeliverysForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsWeeklyReportsDeliverys = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReportsDeliverys", documnetObservable);
    };
    var addLogsWeeklyReportsDeliverys = function (documnetObservable, constraintsObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReportsDeliverys", documnetObservable).done(function (data) {
            constraintsObservable(data);
        });
    };
    var logsWeeklyReportsDeliveryDelete = function (id, documnetObservable) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsDeliveryDelete", { id: id });
    };


    //#endregion


    //#region logs_weekly_reports_needs

    var getLogsWeeklyReportsNeeds = function (documnetObservable, parentId) {
        $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsNeeds", { parentId: parentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsWeeklyReportsNeedsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsNeedsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsWeeklyReportsDeliverys = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReportsDeliverys", documnetObservable());
    };
    var addLogsWeeklyReportsNeeds = function (documnetObservable, constraintsObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReportsNeeds", documnetObservable).done(function (data) {
            constraintsObservable(data);
        });
    };
    var logsWeeklyReportsNeedsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsNeedsDelete", { id: id });
    };


    //#endregion

    //#region logs_weekly_reports_work

    var getLogsWeeklyReportsWork = function (documnetObservable, parentId) {
        $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsWork", { parentId: parentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsWeeklyReportsWorkForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsWorkForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsWeeklyReportsDeliverys = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReportsDeliverys", documnetObservable());
    };
    var addLogsWeeklyReportsWorks = function (documnetObservable, constraintsObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReportsWorks", documnetObservable).done(function (data) {
            constraintsObservable(data);
        });
    };
    var logsWeeklyReportsWorkDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsWorkDelete", { id: id });
    };


    //#endregion

    //#region logs_weekly_reports_next_week

    var getLogsWeeklyReportsNextWeek = function (documnetObservable, parentId) {
        $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsNextWeek", { parentId: parentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsWeeklyReportsNextWeekForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsNextWeekForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsWeeklyReportsDeliverys = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReportsDeliverys", documnetObservable());
    };
    var addLogsWeeklyReportsNextWeeks = function (documnetObservable, constraintsObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReportsNextWeeks", documnetObservable).done(function (data) {
            constraintsObservable(data);
        });
    };
    var logsWeeklyReportsNextWeekDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsNextWeekDelete", { id: id });
    };


    //#endregion

    //#region logs_weekly_reports_coordination

    var getLogsWeeklyReportsCoordination = function (documnetObservable, parentId) {
        $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsCoordination", { parentId: parentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsWeeklyReportsCoordinationForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsCoordinationForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editLogsWeeklyReportsCoordination = function (documnetObservable, observable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReportsCoordination", documnetObservable[0]).done(function (data) {
            observable(data);
        });
    };
    var addLogsWeeklyReportsCoordination = function (documnetObservable, constraintsObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReportsCoordination", documnetObservable).done(function (data) {
            constraintsObservable(data);
        });
    };
    var logsWeeklyReportsCoordinationDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsCoordinationDelete", { id: id });
    };


    //#endregion

    //#region logs_weekly_reports_meetings

    var getLogsWeeklyReportsMeetings = function (documnetObservable, parentId) {
        $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsMeetings", { parentId: parentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsWeeklyReportsMeetingsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsMeetingsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsWeeklyReportsDeliverys = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReportsDeliverys", documnetObservable());
    };
    var addLogsWeeklyReportsMeetings = function (documnetObservable, constraintsObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReportsMeetings", documnetObservable).done(function (data) {
            constraintsObservable(data);
        });
    };
    var logsWeeklyReportsMeetingsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsMeetingsDelete", { id: id });
    };


    //#endregion


    //#region logs_weekly_reports_modifications

    var getLogsWeeklyReportsModifications = function (documnetObservable, parentId) {
        $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsModifications", { parentId: parentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsWeeklyReportsModificationsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsWeeklyReportsModificationsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsWeeklyReportsDeliverys = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsWeeklyReportsDeliverys", documnetObservable());
    };
    var addLogsWeeklyReportsModifications = function (documnetObservable, constraintsObservable) {
        return $.post(config.remoteServerName + "/AddLogsWeeklyReportsModifications", documnetObservable).done(function (data) {
            constraintsObservable(data);
        });
    };
    var logsWeeklyReportsModificationsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/LogsWeeklyReportsModificationsDelete", { id: id });
    };


    //#endregion

    //#region reports_InvoicesForPoPurchaseOrder

    var getDocTypeByProjectIdOpened = function (listType, ivoicesUserObservable, pageNumber) {
        return $.getJSON(config.remoteServerName + "/SelectDocTypeByProjectIdOpened", { listType: listType, pageNumber: pageNumber });
    };

    var getDocTypeByProjectIdClosed = function (listType, ivoicesUserObservable, pageNumber) {
        return $.getJSON(config.remoteServerName + "/SelectDocTypeByProjectIdClosed", { listType: listType, pageNumber: pageNumber });
    };

    var getBoqQuantityRequestedAlertDetails = function (alertType, quantityRequestObservable, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetBoqQuantityRequestedAlertDetails", { alertType: alertType, pageNumber: pageNumber })
                   .done(function (data) {
                       if (quantityRequestObservable) {

                           $("#dataTableQntyAlerting").jqxGrid('beginupdate', true);
                           var tempArray = ko.toJS(quantityRequestObservable.data);
                           ko.utils.arrayPushAll(tempArray, data);
                           quantityRequestObservable.data(tempArray);
                           $('#dataTableQntyAlerting').jqxGrid('endupdate');
                           $(".loading-data").addClass("hidden");
                       }
                   });
    };



    var getDocApprovalDetailsDistributionList = function (listType, ivoicesUserObservable) {
        return $.getJSON(config.remoteServerName + "/GetDocApprovalDetailsDistributionList?listType=" + listType).done(function (data) {
            if (ivoicesUserObservable) {

                ivoicesUserObservable.data(data);
            }
        });
    };


    var getInvoicesUserByRange = function (alertType, ivoicesUserObservable) {
        return $.getJSON(config.remoteServerName + "/GetInvoicesUserByRange", { alertType: alertType })
                    .done(function (data) {
                        if (ivoicesUserObservable) {
                            $("#dataTable").jqxGrid('beginupdate', true);
                            var tempArray = ko.toJS(ivoicesUserObservable.data);
                            ko.utils.arrayPushAll(tempArray, data);
                            ivoicesUserObservable.data(tempArray);
                            $('#dataTable').jqxGrid('endupdate');
                            $(".loading-data").addClass("hidden");
                        }
                    });
    };


    var getNotCodedExpensesSummaryDetail = function (alertType, ivoicesUserObservable) {
        return $.getJSON(config.remoteServerName + "/GetNotCodedExpensesSummaryDetail", { alertType: alertType }).done(function (data) {
            if (ivoicesUserObservable) {
                $("#dataTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(ivoicesUserObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                ivoicesUserObservable.data(tempArray);
                $('#dataTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }

        });
    };


    var getPaymentUserByRange = function (alertType, paymentUserObservable) {
        return $.getJSON(config.remoteServerName + "/GetPaymentUserByRange", { alertType: alertType }).done(function (data) {
            if (paymentUserObservable) {
                $("#dataTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(paymentUserObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                paymentUserObservable.data(tempArray);
                $('#dataTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }

        });
    };



    var getContractsInvoicesForPoPurchaseOrderIdDistinct = function (documnetObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetContractsInvoicesForPoPurchaseOrderIdDistinct", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };


    var getContractsInvoicesForPoItemsByPurchaseOrderId = function (purchaseOrderId, lettersObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsInvoicesForPoItemsByPurchaseOrderId?purchaseOrderId=" + purchaseOrderId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#grid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#grid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    //#endregion

    //#region reports_InvoicesForPoPurchaseOrder

    var getProjectWorkFlowDistinct = function (documnetObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetProjectWorkFlowDistinct", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getAccountsDocAssessmentByWorkFlowId = function (documnetObservable, workFlowId) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDocAssessmentByWorkFlowId", { workFlowId: workFlowId }).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getAccountsDocAssessmentCicleByWorkFlowId = function (documnetObservable, workFlowId, docId, docTypeId) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDocAssessmentCicleByWorkFlowId", { workFlowId: workFlowId, docId: docId, docTypeId: docTypeId }).done(function (data) {
            documnetObservable(data);
        });
    };

    //#endregion

    //#region report_center_projectBalanceReport


    var getProjectsWithNegativeAndPositiveBalanceReport = function (statusBalance, documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetProjectsWithNegativeAndPositiveBalanceReport?statusBalance=" + statusBalance + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#grid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#grid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };
    //#endregion

    //#region Supervisors_with_unapproved_time_sheets


    var getSupervisorsWithUnapprovedTimeSheets = function (documnetObservable, startDate, finishDate, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetSupervisorsWithUnapprovedTimeSheets?startDate=" + startDate + "&finishDate=" + finishDate + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#supervisorGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#supervisorGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var getSupervisorsWithUnapprovedTimeSheetsBySupervisorId = function (documnetObservable, supervisorId, startDate) {
        return $.getJSON(config.remoteServerName + "/GetSupervisorsWithUnapprovedTimeSheetsBySupervisorId", { supervisorId: supervisorId, startDate: startDate }).done(function (data) {
            documnetObservable(data);
        });
    };

    //#endregion

    //#region NCR


    var getCommunicationNCR = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationNCR?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#emailGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#emailGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var getCommunicationNCRsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationNCRsForEdit", { id: id }).success(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };
    var editCommunicationNCRs = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationNCRs", documnetObservable);
    };
    var addCommunicationNCRs = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationNCRs", documnetObservable);
    };
    var communicationNCRDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationNCRDelete?id=" + id);
    };

    //#endregion

    //#region 

    var getCommunicationRequestForInspections = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetCommunicationRequestForInspections", { projectId: projectId }).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getCommunicationRequestForInspectionsList = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/getCommunicationRequestForInspections", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };



    //#endregion

    //#region purchaseOrderReport

    var getPurchaseOrderReport = function (documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetPurchaseOrderReport?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#purchaseOrderGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#purchaseOrderGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getPurchaseOrderReportByProjectIdAndDate = function (documnetObservable, poObj) {
        return $.post(config.remoteServerName + "/GetPurchaseOrderReportByProjectIdAndDate", poObj).done(function (data) {
            if (documnetObservable) {
                $("#purchaseOrderGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#purchaseOrderGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    //#endregion


    //#region purchaseOrderReport


    var getProjectTypesTimeSheet = function (obj, documnetObservable) {
        return $.post(config.remoteServerName + "/GetProjectTypesTimeSheet", obj).done(function (data) {
            if (documnetObservable) {
                $("#projectTypes").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#projectTypes').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    //#endregion

    //#region TaskWorkLoad

    var getTaskWorkLoadReportWithoutCompany = function (documnetObservable, workObj) {
        return $.post(config.remoteServerName + "/GetTaskWorkLoadReportWithoutCompany", ko.toJS(workObj)).done(function (data) {
            if (documnetObservable) {
                $("#taskWorkGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#taskWorkGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }

        });
    };


    var getTaskWorkLoadReportWithCompany = function (documnetObservable, workObj) {
        return $.post(config.remoteServerName + "/GetTaskWorkLoadReportWithCompany", ko.toJS(workObj)).done(function (data) {
            if (documnetObservable) {
                $("#taskWorkGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#taskWorkGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };
    //#endregion

    //#endregion 

    //#region chat

    var getAccountsOnline = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountsOnline").done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var getMessages = function (msgObservable, toAccountId) {
        return $.getJSON(config.remoteServerName + "/GetMessages?toAccountId=" + toAccountId).success(function (data) {
            if (msgObservable) {
                msgObservable(data);
            }
        });
    };

    var addMessages = function (chatDto, chatObs) {
        return $.post(config.remoteServerName + "/AddMessages", chatDto).success(function (data) {
            chatObs(data);

        });
    };
    //#endregion

    //#region AddContractsBoqItemsFromFile

    var addContractsBoqItemsFromFile = function (documnetObservable, boqId) {
        return $.getJSON(config.remoteServerName + "/AddContractsBoqItemsFromFile", { boqId: boqId }).done(function (data) {
            documnetObservable.data(data);
        });
    };

    //#endregion

    //#region lateTimeSheet

    var getProjectLateTimeSheet = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetProjectLateTimeSheet").done(function (data) {
            documnetObservable.data(data);
        });
    };

    var addProjectTimeSheetApproval = function (documnetObservable, contactId) {
        return $.post(config.remoteServerName + "/AddProjectTimeSheetApproval?docDate=" + docDate, { contactId: contactId }).done(function (data) {
            documnetObservable.data(data);
        });
    };

    //#endregion


    //#region lateTimeSheet

    var getAccountsDocAlertDocs = function (documnetObservable, projectId, docType) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDocAlertDocs", { projectId: projectId, docType: docType }).done(function (data) {
            if (documnetObservable) {
                documnetObservable.data(data);
            }
        });
    };

    var getAccountsDocAlertDocsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDocAlertDocsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    //#endregion

    //#region CommunicationDocsAttachDoc

    var getCommunicationDocsAttachDoc = function (documnetObservable, projectId, docTypeId, docId) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationDocsAttachDoc", { projectId: projectId, docTypeId: docTypeId, docId: docId }).done(function (data) {
            if (documnetObservable) {
                documnetObservable.data(data);
            }
        });
    };

    var getCommunicationDocsAttachDocById = function (documnetObservable, id) {
        $.getJSON(config.remoteServerName + "/GetCommunicationDocsAttachDocById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var addCommunicationDocsAttachDoc = function (documnet) {
        return $.post(config.remoteServerName + "/AddCommunicationDocsAttachDoc", documnet);
    };

    var communicationDocsAttachDocDelete = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/CommunicationDocsAttachDocDelete", { id: id });
    };

    //#endregion

    //#region emailAlert

    var getAccountsEmailAlert = function (docObservable) {
        $.getJSON(config.remoteServerName + "/GetAccountsEmailAlert")
           .success(function (data) {
               docObservable(data);
           });
    };

    var addAccountsEmailAlert = function (docTypeId, emailAlert) {
        return $.post(config.remoteServerName + "/AddAccountsEmailAlert?docTypeId=" + docTypeId).success(function (data) {
            if (emailAlert) {
                emailAlert(data);
            }
        });
    };

    var accountsEmailAlertDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/AccountsEmailAlertDelete", { id: id })
            .done(function (data) {
            });
    };

    //#endregion

    //#region lateTimeSheet

    var getAccountsDocAlertDocs = function (documnetObservable, projectId, docType) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDocAlertDocs", { projectId: projectId, docType: docType }).done(function (data) {
            if (documnetObservable) {
                documnetObservable.data(data);
            }
        });
    };

    var getAccountsDocAlertDocsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetAccountsDocAlertDocsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    //#endregion

    //#endregion Rami Nasr - Senior Developer



    //#region Abd El-Samad - Junior Developer


    var accountsPermissionsGroupsGet = function (accountsPermissionsGroupsObservable) {
        $.getJSON(config.remoteServerName + "/AccountsPermissionsGroupsGet").done(function (data) {
            accountsPermissionsGroupsObservable.data(data);
        });
    };

    var getPermissionsGroupsGrid = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetPermissionsGroupsGrid?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var accountsPermissionsGroupsDelete = function (id) {
        return $.post(config.remoteServerName + "/AccountsPermissionsGroupsDelete", { id: id });
    };

    var accountsPermissionsGroupsGetById = function (accountsPermissionsGroupsObservable, id) {
        $.getJSON(config.remoteServerName + "/AccountsPermissionsGroupsGetById", { id: id }).done(function (data) {
            accountsPermissionsGroupsObservable(data[0]);
        });
    };

    var accountsPermissionsGroupsEdit = function (permissionGroup) {
        return $.post(config.remoteServerName + "/AccountsPermissionsGroupsEdit", permissionGroup);
    };

    var accountsPermissionsGroupsAdd = function (permissionGroup) {
        return $.post(config.remoteServerName + "/AccountsPermissionsGroupsAdd", permissionGroup);
    };

    var accountsGroupGetByGroupId = function (groupId, accountsGroupdObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/AccountsGroupGetByGroupId?groupId=" + groupId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (accountsGroupdObservable) {
                $("#accountsGroupGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(accountsGroupdObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                accountsGroupdObservable.data(tempArray);
                $('#accountsGroupGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var accountsGroupDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteAccountsGroup?id=" + id).done(function (data) {
        });
    };

    var projectProjectsSelectByEps = function (projectProjectsSelectByEpsObservable, epsId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/ProjectProjectsSelectByEps?epsId=" + epsId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (projectProjectsSelectByEpsObservable) {
                $("#projectsGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(projectProjectsSelectByEpsObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                projectProjectsSelectByEpsObservable.data(tempArray);
                $('#projectsGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var projectProjectsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ProjectProjectsDelete", { id: id }).done(function (data) {
        });
    };

    var projectProjectsSelectAll = function (projectProjectsSelectAllObservable) {
        return $.getJSON(config.remoteServerName + "/ProjectProjectsGetAll").success(function (data) {
            projectProjectsSelectAllObservable(data);
        });
    };


    var projectProjectsGetAllExceptprojectId = function (projectProjectsSelectAllObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/ProjectProjectsGetAllExceptprojectId?projectId=" + projectId).success(function (data) {
            projectProjectsSelectAllObservable(data);
        });
    };


    var projectProjectsAdd = function (project) {
        return $.post(config.remoteServerName + "/ProjectProjectsAdd", project);
    };

    var projectProjectsEdit = function (project) {
        return $.post(config.remoteServerName + "/ProjectProjectsEdit", project);
    };

    var communicationProposalSelectAllByProjectId = function (communicationProposalSelectAllByProjectIdObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/CommunicationProposalSelectAllByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationProposalSelectAllByProjectIdObservable) {
                $("#communicationProposalGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(communicationProposalSelectAllByProjectIdObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationProposalSelectAllByProjectIdObservable.data(tempArray);
                $('#communicationProposalGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var getCommunicationProposalForEdit = function (communicationProposalObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationProposalForEdit", { id: id })
                     .success(function (data) {
                         communicationProposalObservable(ko.mapping.fromJS(data));
                     });
    };

    var addCommunicationProposal = function (communicationProposalObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationProposal", communicationProposalObservable);
    };

    var editCommunicationProposal = function (communicationProposalObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationProposal", communicationProposalObservable);
    };

    var deleteCommunicationProposal = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteCommunicationProposal?id=" + id);
    };

    var communicationReportsSelectAllByProjectId = function (communicationReportsSelectAllByProjectIdObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/CommunicationReportsSelectAllByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationReportsSelectAllByProjectIdObservable) {
                $("#communicationProposalGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(communicationReportsSelectAllByProjectIdObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationReportsSelectAllByProjectIdObservable.data(tempArray);
                $('#communicationProposalGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var getCommunicationReportForEdit = function (communicationReportObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationReportForEdit", { id: id })
                    .success(function (data) {
                        communicationReportObservable(ko.mapping.fromJS(data));
                    });
    };

    var deleteCommunicationReports = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteCommunicationReports?id=" + id);
    };

    var projectCheckListGet = function (projectCheckListObservable) {
        $.getJSON(config.remoteServerName + "/ProjectCheckListGet").done(function (data) {
            projectCheckListObservable.data(data);
        });
    };

    var getProjectCheckListForEdit = function (projectCheckListObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectCheckListForEdit", { id: id }).success(function (data) {
            projectCheckListObservable(data);
        });
    };

    var addProjectCheckList = function (checkListObservable, dataRows) {
        return $.post(config.remoteServerName + "/AddProjectCheckList", checkListObservable).success(function (result) {
            dataRows(result);
        });
    };

    var editProjectCheckList = function (checkListObservable) {
        return $.post(config.remoteServerName + "/EditProjectCheckList", checkListObservable);
    };

    var deleteProjectCheckList = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectCheckList?id=" + id);
    };

    var getProjectCheckListItemsByCheckListId = function (checkListItemsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectCheckListItemsByCheckListId", { checkListId: id }).success(function (data) {
            checkListItemsObservable.data(data);
        });
    };

    var addProjectCheckListItem = function (projectDistributionListItemObservable, dataRowItemObservable) {
        return $.post(config.remoteServerName + "/AddProjectCheckListItem", projectDistributionListItemObservable).success(function (result) {
            dataRowItemObservable(result);
        });
    };

    var deleteProjectCheckListItem = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectCheckListItem", { id: id }).done(function (data) {
        });
    };


    var projectPicturesGet = function (projectId, lettersObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/ProjectPicturesGet?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#dataRowGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#dataRowGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var addProjectPicture = function (projectPicture, pictureObs) {
        return $.post(config.remoteServerName + "/AddProjectPicture", projectPicture).success(function (data) {
            pictureObs(data);
        });
    };

    var getProjectPictureForEdit = function (projectPictureObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectPictureForEdit", { id: id }).success(function (data) {
            projectPictureObservable(ko.mapping.fromJS(data));
        });
    };

    var editProjectPicture = function (projectPicture) {
        return $.post(config.remoteServerName + "/EditProjectPicture", projectPicture);
    };

    var deleteProjectPicture = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectPicture?id=" + id);
    };

    var projectDistributionListGet = function (projectId, lettersObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/ProjectDistributionListGet?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#dataRowGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#dataRowGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var getProjectDistributionListForEdit = function (projectDistributionListObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectDistributionListForEdit?id=" + id).success(function (data) {
            if (projectDistributionListObservable) {
                projectDistributionListObservable(ko.mapping.fromJS(data));
            }

        });
    };

    var getProjectDistributionListItemsByDistributionId = function (distributionListItemsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectDistributionListItemsByDistributionId?distributionId=" + id).success(function (data) {
            distributionListItemsObservable.data(data);
        });
    };

    var getProjectDistributionListItems = function (distributionListItemsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectDistributionListItemsByDistributionId", { distributionId: id }).success(function (data) {
            distributionListItemsObservable(data);
        });
    };

    var addProjectDistributionList = function (distributionListObservable, dataRows) {
        return $.post(config.remoteServerName + "/AddProjectDistributionList", distributionListObservable).success(function (result) {
            dataRows(result);
        });
    };

    var editProjectDistributionList = function (projectDistributionListObservable) {
        var ob = ko.toJS(projectDistributionListObservable);
        return $.post(config.remoteServerName + "/EditProjectDistributionList", projectDistributionListObservable);
    };

    var deleteProjectDistributionList = function (id) {
        return $.post(config.remoteServerName + "/DeleteProjectDistributionList?id=" + id);
    };

    var addProjectDistributionListItem = function (distributionListItems, dataRowItemObservable) {
        return $.post(config.remoteServerName + "/AddProjectDistributionListItem", distributionListItems).success(function (result) {
            dataRowItemObservable(result);
        });
    };

    var deleteProjectDistributionListItem = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectDistributionListItem", { id: id }).done(function (data) {
        });
    };

    var getProjectHeaderFooterForEdit = function (headerFooterObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectHeaderFooterForEdit", { id: id }).success(function (data) {
            headerFooterObservable(data);
        });
    };

    var projectHeaderFooterGet = function (projectId, lettersObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/ProjectHeaderFooterGet?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#dataRowGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#dataRowGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getHeaderFooterByType = function (projectId, lettersObservable, type) {
        return $.getJSON(config.remoteServerName + "/GetHeaderFooterByType?projectId=" + projectId + "&type=" + type).done(function (data) {
            if (lettersObservable) {
                lettersObservable(data);
            }
        });
    };

    var addProjectHeaderFooter = function (headerFooter) {
        return $.post(config.remoteServerName + "/AddProjectHeaderFooter", headerFooter);
    };

    var editProjectHeaderFooter = function (headerFooter) {
        return $.post(config.remoteServerName + "/EditProjectHeaderFooter", headerFooter);
    };

    var deleteProjectHeaderFooter = function (id) {
        return $.post(config.remoteServerName + "/DeleteProjectHeaderFooter?id=" + id);
    };

    var projectScheduleGet = function (lettersObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/ProjectScheduleGet?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {

            }
        });
    };



    var getProjectScheduleForEdit = function (scheduleObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectScheduleForEdit", { id: id }).success(function (data) {
            scheduleObservable(data);
        });
    };

    var addProjectSchedule = function (scheduleObservable) {
        return $.post(config.remoteServerName + "/AddProjectSchedule", scheduleObservable);

    };

    var editProjectSchedule = function (scheduleObservable) {
        return $.post(config.remoteServerName + "/EditProjectSchedule", scheduleObservable);
    };

    var deleteProjectSchedule = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectSchedule?id=" + id).done(function (data) {
        });
    };

    var getProjectScheduleItemsById = function (id, scheduleItemsObservable) {
        return $.getJSON(config.remoteServerName + "/GetProjectScheduleItemsById", { id: id }).success(function (data) {
            scheduleItemsObservable(data);
        });
    };

    var getProjectScheduleItemsByScheduleId = function (scheduleItemsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectScheduleItemsByScheduleId", { scheduleId: id }).success(function (data) {
            scheduleItemsObservable.data(data);
        });
    };
    var addProjectScheduleItem = function (scheduleItemsObservable, dataRowItemObservable) {
        return $.post(config.remoteServerName + "/AddProjectScheduleItem", scheduleItemsObservable).success(function (result) {
            dataRowItemObservable(result);
        });
    };

    var addProjectScheduleItemFromFile = function (scheduleItemsObservable, requestId) {
        return $.post(config.remoteServerName + "/AddProjectScheduleItemFromFile", { requestId: requestId }).success(function (result) {
            dataRowItemObservable.data(result);
        });
    };

    var deleteProjectScheduleItem = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectScheduleItem", { id: id }).done(function (data) {
        });
    };

    var copyDocument = function (objObservable) {
        return $.post(config.remoteServerName + "/CopyDocument", objObservable);
    };

    var snedToWorkFlow = function (dataSet) {
        return $.post(config.remoteServerName + "/SnedToWorkFlow", dataSet);
    };

    var snedToDistributionList = function (dataSet) {
        return $.post(config.remoteServerName + "/SnedToDistributionList", dataSet);
    };

    var sendByInbox = function (dataSet) {
        return $.post(config.remoteServerName + "/SendByInbox", dataSet);
    };

    var sendByEmail = function (dataSet) {
        return $.post(config.remoteServerName + "/SendByEmail", dataSet);
    };


    //Start Region ContractsPCO

    var getContractsPco = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsPcoByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (contractsObservable) {
                $("#pcoGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(contractsObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                contractsObservable.data(tempArray);
                $('#pcoGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getContractsCvrForEditByPcoId = function (contractsPcoObservable, pcoId) {
        return $.getJSON(config.remoteServerName + "/GetContractsCvrForEditByPcoId", { pcoId: pcoId }).success(function (data) {
            contractsPcoObservable(ko.mapping.fromJS(data));
        });
    };


    var getContractsPcoList = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsPcoByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            contractsObservable(data);
        });
    };

    var getContractsPcoForEdit = function (contractsPcoObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsPcoForEdit", { id: id }).success(function (data) {
            contractsPcoObservable(ko.mapping.fromJS(data));
        });
    };

    var addContractsPco = function (dataRowDto, contractsPcoObservable) {
        return $.post(config.remoteServerName + "/AddContractsPco", dataRowDto).success(function (data) {
            contractsPcoObservable(data);
        });
    };

    var editContractsPco = function (contractsPcoObservable) {
        return $.post(config.remoteServerName + "/EditContractsPco", contractsPcoObservable);
    };

    var deleteContractsPco = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsPco", { id: id }).done(function (data) {
        });
    };

    var getContractsPcoItemsByProposalIdType = function (contractsItemsObservable, id, type) {
        $.getJSON(config.remoteServerName + "/GetContractsPcoItemsByProposalIdType", { proposalId: id, itemType: type }).done(function (data) {
            contractsItemsObservable(data);
        });
    };

    var addContractsPcoItems = function (pcoItems, contractsPcoItemsObservable) {
        return $.post(config.remoteServerName + "/AddContractsPcoItems", pcoItems).success(function (data) {
            contractsPcoItemsObservable(data);
        });
    };

    var deleteContractsPcoItems = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsPcoItems?id=" + id);
    };

    //end Region ContractsPCO

    //Start Region Contracts Site Request

    var deleteContractsSiteRequest = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsSiteRequest?id=" + id);
    };

    var getContractsSiteRequest = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsSiteRequestByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {
                if (contractsObservable) {
                    $("#siteRequestPayment").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(contractsObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    contractsObservable.data(tempArray);
                    $('#siteRequestPayment').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };




    var getContractsSiteRequestForEdit = function (contractsSiteRequestObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsSiteRequestForEdit", { id: id }).success(function (data) {
            contractsSiteRequestObservable(ko.mapping.fromJS(data));
        });
    };

    var addContractsSiteRequest = function (dataRowDto, contractsSiteRequestObservable) {
        return $.post(config.remoteServerName + "/AddContractsSiteRequest", dataRowDto).success(function (data) {
            contractsSiteRequestObservable(data);
        });
    };

    var editContractsSiteRequest = function (dataRowDto, siteRequest) {
        return $.post(config.remoteServerName + "/EditContractsSiteRequest", dataRowDto).success(function (data) {
            siteRequest(data);
        });
    };

    var getContractsSiteRequestItemsByRequestId = function (contractsItemsObservable, id) {
        $.getJSON(config.remoteServerName + "/GetContractsSiteRequestItemsByRequestId", { requestId: id }).done(function (data) {
            contractsItemsObservable.data(data);
        });
    };

    var addContractsSiteRequestItems = function (siteRequestItems, dataRowItemsObservable) {
        return $.post(config.remoteServerName + "/AddContractsSiteRequestItems", siteRequestItems).success(function (data) {
            dataRowItemsObservable(data);
        });
    };

    var addContractsSiteRequestItemsFromFile = function (dataRowItemsObservable, siteRequestId) {
        return $.post(config.remoteServerName + "/AddContractsSiteRequestItemsFromFile", { siteRequestId: siteRequestId }).success(function (data) {
            dataRowItemsObservable.data(data);
        });
    };

    var deleteContractsSiteRequestItems = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsSiteRequestItems?id=" + id);
    };

    var getContractsSiteRequestItemsForEdit = function (contractsSiteRequestObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsSiteRequestItemsForEdit", { id: id }).success(function (data) {
            contractsSiteRequestObservable(data);
        });
    };

    var editContractsSiteRequestItems = function (siteRequestItem, dataRowItemDtoEditObservable) {
        return $.post(config.remoteServerName + "/EditContractsSiteRequestItems", siteRequestItem).success(function (data) {
            dataRowItemDtoEditObservable(data);
        });
    };

    var addNewBoq = function (id) {
        return $.post(config.remoteServerName + "/AddNewBoq?id=" + id);
    };

    var addNewContract = function (contract) {
        return $.post(config.remoteServerName + "/AddNewContract", contract);
    };

    var addNewPurchaseOrder = function (purchaseOrder) {
        return $.post(config.remoteServerName + "/AddNewPurchaseOrder", purchaseOrder);
    };

    var getContractsBoqShowInSiteRequest = function (boq, projectId) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqShowInSiteRequest", { projectId: projectId }).success(function (data) {
            boq(data);
        });
    };

    var getContractsBoqItemsOnlyParent = function (boqId, boqItems) {
        $.getJSON(config.remoteServerName + "/GetContractsBoqItemsOnlyParent", { boqId: boqId })
           .success(function (data) {
               boqItems.data(data);
           });
    };

    var getContractsBoqItemsOnlyParentGrid = function (boqId, boqItems) {
        $.getJSON(config.remoteServerName + "/GetContractsBoqItemsOnlyParent?boqId=" + boqId)
           .success(function (data) {
               boqItems.data(data);
           });
    };
    //End Region Contracts Site Request


    //Start Region Contracts Variation Request

    var getContractsVariationRequest = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsVariationRequestByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {
                if (contractsObservable) {
                    $("#variationRequest").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(contractsObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    contractsObservable.data(tempArray);
                    $('#variationRequest').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };



    var getContractsVariationRequestList = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsVariationRequestByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            contractsObservable(data);
        });
    };

    var getContractsVariationRequestForEdit = function (contractsVariationRequestObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsVariationRequestForEdit", { id: id }).done(function (data) {
            contractsVariationRequestObservable(ko.mapping.fromJS(data));
        });
    };

    var addContractsVariationRequest = function (dataRowDto) {
        return $.post(config.remoteServerName + "/AddContractsVariationRequest", dataRowDto);
    };

    var editContractsVariationRequest = function (dataRowDto) {
        return $.post(config.remoteServerName + "/EditContractsVariationRequest", dataRowDto).success(function (data) {

        });
    };


    var deleteContractsVariationRequest = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsVariationRequest?id=" + id);
    };
    //End Region Contracts Variation Request


    //Start Region Contracts Invoices For PO

    var getContractsInvoicesForPo = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsInvoicesForPoByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (contractsObservable) {

                $("#invoicesForPo").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(contractsObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                contractsObservable.data(tempArray);
                $('#invoicesForPo').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getContractsInvoices = function (contractsObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsInvoicesForPo?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (contractsObservable) {
                $("#gridLogInvoice").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(contractsObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                contractsObservable.data(tempArray);
                $('#gridLogInvoice').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getContractsInvoicesForPoItemsByInvoiceId = function (contractsObservable, invoiceId) {
        $.getJSON(config.remoteServerName + "/GetContractsInvoicesForPoItemsByInvoiceId", { invoiceId: invoiceId }).done(function (data) {
            contractsObservable.data(data);
        });
    };

    var deleteContractsInvoicesForPo = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsInvoicesForPo?id=" + id);
    };

    var getContractsOrdersItemsExcutionPo = function (purchaseId, contractsObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsOrdersItemsExcutionPoByPurchaseId?purchaseId=" + purchaseId).done(function (data) {
            contractsObservable(data);
        });
    };
    var getInvoiceItemsOrderPo = function (purchaseId, contractsObservable) {
        $.getJSON(config.remoteServerName + "/GetInvoiceItemsOrderPo?purchaseId=" + purchaseId).done(function (data) {
            contractsObservable.data(data);
        });
    };

    var getContractsInvoicesForPoForEdit = function (contractsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsInvoicesForPoForEdit", { id: id }).success(function (data) {
            contractsObservable(ko.mapping.fromJS(data));
        });
    };

    var editContractsInvoicesForPo = function (dataRowDto) {
        return $.post(config.remoteServerName + "/EditContractsInvoicesForPo", dataRowDto);
    };

    var addContractsInvoicesForPo = function (dtoDocument, contractsObservable) {
        return $.post(config.remoteServerName + "/AddContractsInvoicesForPo", dtoDocument).success(function (data) {
            contractsObservable(data);
        });
    };

    var addContractsInvoicesForPoItems = function (dataRowItemDto, contractsItemsObservable) {
        return $.post(config.remoteServerName + "/AddContractsInvoicesForPoItems", dataRowItemDto).success(function (data) {
            contractsItemsObservable(data);
        });
    };

    var deleteContractsInvoicesForPoItems = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsInvoicesForPoItems?id=" + id);
    };

    var getContractsInvoicesForPoItemsForEdit = function (contractsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsInvoicesForPoItemssById", { id: id }).success(function (data) {
            contractsObservable(data);
        });
    };

    var editContractsInvoicesForPoItems = function (invoiceItem, dataRowItemDtoEditObservable) {
        return $.post(config.remoteServerName + "/EditContractsInvoicesForPoItems", invoiceItem).success(function (data) {
            dataRowItemDtoEditObservable(data);
        });
    };

    var addContractsInvoicesForPoDeductions = function (dataDeductionsDto, dataDeductionsObservable) {
        return $.post(config.remoteServerName + "/AddContractsInvoicesForPoDeductions", dataDeductionsDto).success(function (data) {
            dataDeductionsObservable(data);
        });
    };

    var getContractsInvoicesForPoDeductionsByInvoiceIdFactor = function (contractsObservable, invoiceId, factor) {
        return $.getJSON(config.remoteServerName + "/GetContractsInvoicesForPoDeductionsByInvoiceIdFactor", { invoiceId: invoiceId, factor: factor }).success(function (data) {
            contractsObservable(data);
        });
    };

    var deleteContractsInvoicesForPoDeductions = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsInvoicesForPoDeductions?id=" + id);
    };

    //End Region Contracts Invoices For PO   

    //Start Region Logs Daily Reports

    var getLogsDailyReports = function (logsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsDailyReportsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (logsObservable) {
                $("#dailyReportGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(logsObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                logsObservable.data(tempArray);
                $('#dailyReportGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var deleteLogsDailyReports = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDailyReports?id=" + id);
    };

    var getLogsDailyReportsForEdit = function (logsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsDailyReportsForEdit", { id: id }).success(function (data) {
            logsObservable(data);
        });
    };

    var addLogsDailyReports = function (dtoDocument, logsObservable) {
        return $.post(config.remoteServerName + "/AddLogsDailyReports", dtoDocument).success(function (data) {
            logsObservable(data);
        });
    };

    var editLogsDailyReports = function (dataRowDto) {
        return $.post(config.remoteServerName + "/EditLogsDailyReports", dataRowDto);
    };

    var getLogsDailyReportsWorkActivity = function (logsObservable, reportId) {
        $.getJSON(config.remoteServerName + "/GetLogsDailyReportsWorkActivity", { reportId: reportId }).done(function (data) {
            logsObservable(data);
        });
    };

    var getLogsDailyReportsFieldForce = function (logsObservable, reportId) {
        $.getJSON(config.remoteServerName + "/GetLogsDailyReportsFieldForce", { reportId: reportId }).done(function (data) {
            logsObservable(data);
        });
    };

    var getLogsDailyReportsMaterial = function (logsObservable, reportId) {
        $.getJSON(config.remoteServerName + "/GetLogsDailyReportsMaterial", { reportId: reportId }).done(function (data) {
            logsObservable(data);
        });
    };

    var getLogsDailyReportsEquipment = function (logsObservable, reportId) {
        $.getJSON(config.remoteServerName + "/GetLogsDailyReportsEquipment", { reportId: reportId }).done(function (data) {
            logsObservable(data);
        });
    };

    var getLogsDailyReportsVisitors = function (logsObservable, reportId) {
        $.getJSON(config.remoteServerName + "/GetLogsDailyReportsVisitors", { reportId: reportId }).done(function (data) {
            logsObservable(data);
        });
    };

    var getLogsDailyReportsWeather = function (logsObservable, reportId) {
        $.getJSON(config.remoteServerName + "/GetLogsDailyReportsWeather", { reportId: reportId }).done(function (data) {
            logsObservable(data);
        });
    };

    var addLogsDailyWorkActivity = function (dtoDocument, logsObservable) {
        return $.post(config.remoteServerName + "/AddLogsDailyReportsWorkActivity", dtoDocument).success(function (data) {
            logsObservable(data);
        });
    };

    var addLogsDailyReportsFieldForce = function (dtoDocument, logsObservable) {
        return $.post(config.remoteServerName + "/AddLogsDailyReportsFieldForce", dtoDocument).success(function (data) {
            logsObservable(data);
        });
    };

    var addLogsDailyReportsMaterial = function (dtoDocument, logsObservable) {
        return $.post(config.remoteServerName + "/AddLogsDailyReportsMaterial", dtoDocument).success(function (data) {
            logsObservable(data);
        });
    };

    var addLogsDailyReportsEquipment = function (dtoDocument, logsObservable) {
        return $.post(config.remoteServerName + "/AddLogsDailyReportsEquipment", dtoDocument).success(function (data) {
            logsObservable(data);
        });
    };

    var addLogsDailyReportsVisitors = function (dtoDocument, logsObservable) {
        return $.post(config.remoteServerName + "/AddLogsDailyReportsVisitors", dtoDocument).success(function (data) {
            logsObservable(data);
        });
    };

    var addLogsDailyReportsWeather = function (dtoDocument, logsObservable) {
        return $.post(config.remoteServerName + "/AddLogsDailyReportsWeather", dtoDocument).success(function (data) {
            logsObservable(data);
        });
    };

    var deleteLogsDailyReportsWorkActivity = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDailyReportsWorkActivity?id=" + id);
    };

    var deleteLogsDailyReportsFieldForce = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDailyReportsFieldForce?id=" + id);
    };

    var deleteLogsDailyReportsMaterial = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDailyReportsMaterial?id=" + id);
    };

    var deleteLogsDailyReportsEquipment = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDailyReportsEquipment?id=" + id);
    };

    var deleteLogsDailyReportsVisitors = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDailyReportsVisitors?id=" + id);
    };

    var deleteLogsDailyReportsWeather = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDailyReportsWeather?id=" + id);
    };

    //End Region Logs Daily Reports

    //start Region Logs Drawings Sets

    var getLogsDrawingsSets = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsDrawingsSetssByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#drawingSetsGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#drawingSetsGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getLogsDrawingsSetsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsDrawingsSetsForEdit", { id: id }).done(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };

    var editLogsDrawingsSets = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsDrawingsSets", documnetObservable);
    };

    var addLogsDrawingsSets = function (documnetObservable, drawingObservable) {
        return $.post(config.remoteServerName + "/AddLogsDrawingsSets", documnetObservable).success(function (data) {
            drawingObservable(data);
        });
    };

    var deleteLogsDrawingsSets = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDrawingsSetsById", { id: id });
    };

    var getLogsDrawingsSetsDoc = function (documnetObservable, drawingSetId) {
        $.getJSON(config.remoteServerName + "/GetLogsDrawingsSetsDocsByProjectId", { drawingSetId: drawingSetId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsDrawingsSetsDocForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsDrawingsSetsDocForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editLogsDrawingsSetsDoc = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsDrawingsSetsDoc", documnetObservable);
    };

    var addLogsDrawingsSetsDoc = function (dtoDocument, drawingObservable) {
        return $.post(config.remoteServerName + "/AddLogsDrawingsSetsDoc", dtoDocument).success(function (data) {
            drawingObservable(data);
        });
    };

    var deleteLogsDrawingsSetsDoc = function (id, drawingSetId, drawingObservable) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDrawingsSetsDocById", { id: id, drawingSetId: drawingSetId }).success(function (data) {
            drawingObservable(data);
        });
    };

    //End Region Logs Drawings Sets

    //start Region Logs Submittal Sets

    //var getLogsSubmittalSets = function (documnetObservable, projectId) {
    //    $.getJSON(config.remoteServerName + "/GetLogsSubmittalSetsByProjectId", { projectId: projectId }).done(function (data) {
    //        documnetObservable.data(data);
    //    });
    //};

    var getLogsSubmittalSets = function (lettersObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsSubmittalSetsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (lettersObservable) {
                $("#submittalSetGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                lettersObservable.data(tempArray);
                $('#submittalSetGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var getLogsSubmittalSetsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsSubmittalSetsForEdit", { id: id }).success(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };

    var editLogsSubmittalSets = function (dtoDocument) {
        return $.post(config.remoteServerName + "/EditLogsSubmittalSets", dtoDocument);
    };

    var addLogsSubmittalSets = function (dtoDocument, submittalObservable) {

        return $.post(config.remoteServerName + "/AddLogsSubmittalSets", dtoDocument).success(function (data) {
            submittalObservable(data);
        });
    };

    var deleteLogsSubmittalSets = function (id) {
        return $.getJSON(config.remoteServerName + "/deleteLogsSubmittalSets", { id: id });
    };

    var getLogsSubmittalSetsDoc = function (documnetObservable, submittalSetId) {
        $.getJSON(config.remoteServerName + "/GetLogsSubmittalSetsDocsByDrawingSetId", { submittalSetId: submittalSetId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsSubmittalSetsDocForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsSubmittalSetsDocForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editLogsSubmittalSetsDoc = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsSubmittalSetsDoc", documnetObservable);
    };

    var addLogsSubmittalSetsDoc = function (dtoDocument, submittalObservable) {
        return $.post(config.remoteServerName + "/AddLogsSubmittalSetsDoc", dtoDocument).success(function (data) {
            submittalObservable(data);
        });
    };

    var deleteLogsSubmittalSetsDoc = function (id, submittalSetId, submittalObservable) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsSubmittalSetsDocById", { id: id, submittalSetId: submittalSetId }).success(function (data) {
            submittalObservable(data);
        });
    };

    //end Region Logs Submittal Sets

    //Start Region Logs Material Delivery

    var getMaterialDelivery = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetMaterialDeliveryByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#materialDeliveryGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#materialDeliveryGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getMaterialDeliveryForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetMaterialDeliveryForEdit", { id: id }).done(function (data) {
            if (documnetObservable) {

                documnetObservable(data);
            }
        });
    };

    var editMaterialDelivery = function (dtoDocument) {
        return $.post(config.remoteServerName + "/EditMaterialDelivery", dtoDocument);
    };

    var addMaterialDelivery = function (dtoDocument, deliveryObservable) {
        return $.post(config.remoteServerName + "/AddMaterialDelivery", dtoDocument).success(function (data) {
            deliveryObservable(data);
        });
    };

    var deleteMaterialDelivery = function (id) {
        return $.getJSON(config.remoteServerName + "/deleteMaterialDelivery", { id: id });
    };

    var getLogsMaterialDeliveryCosts = function (documnetObservable, deliveryId) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialDeliveryCosts", { deliveryId: deliveryId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsMaterialDeliveryTickets = function (documnetObservable, deliveryId) {
        $.getJSON(config.remoteServerName + "/GetLogsMaterialDeliveryTickets", { deliveryId: deliveryId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsMaterialDeliveryCostsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialDeliveryCostsForEdit", { id: id }).success(function (data) {
            documnetObservable(data);
        });
    };

    //var getPoContract = function (documnetObservable, projectId) {
    //    $.getJSON(config.remoteServerName + "/GetPoContract", { projectId: projectId }).done(function (data) {
    //        documnetObservable(data);
    //    });
    //};

    var getPoContract = function (projectId, documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetPoContract?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#gridLog").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#gridLog').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var getPoContractItemForEquipment = function (documnetObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetPoContractItemForEquipment", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };


    var getPoContractItemGrid = function (documnetObservable, id) {
        $.getJSON(config.remoteServerName + "/GetPoContractItem", { id: id }).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getPoContractItem = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetPoContractItem", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var addLogsMaterialDeliveryTickets = function (dtoDocument, deliveryObservable) {
        return $.post(config.remoteServerName + "/AddLogsMaterialDeliveryTickets", dtoDocument).success(function (data) {
            deliveryObservable(data);
        });
    };

    var addLogsMaterialDeliveryTicketsFromFile = function (requestId, deliveryObservable) {
        return $.post(config.remoteServerName + "/AddLogsMaterialDeliveryTicketsFromFile", { requestId: requestId }).success(function (data) {
            deliveryObservable(data);
        });
    };

    var deleteLogsMaterialDeliveryTickets = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsMaterialDeliveryTickets", { id: id });
    };

    //end Region Logs Material Delivery

    //start Region Tender Analysis 

    var getTenderAnalysis = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetTenderAnalysisByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#tenderAnalysisGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#tenderAnalysisGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getTenderAnalysisForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetTenderAnalysisForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editTenderAnalysis = function (dtoDocument) {
        return $.post(config.remoteServerName + "/EditTenderAnalysis", dtoDocument);
    };

    var addTenderAnalysis = function (dtoDocument, deliveryObservable) {
        return $.post(config.remoteServerName + "/AddTenderAnalysis", dtoDocument).success(function (data) {
            deliveryObservable(data);
        });
    };

    var deleteTenderAnalysis = function (id) {
        return $.getJSON(config.remoteServerName + "/deleteTenderAnalysis", { id: id });
    };


    //end Region Tender Analysis

    //start Region resources tree

    var getResourcesTree = function (drawinglistId, resourceTreeObservable) {
        $.getJSON(config.remoteServerName + "/GetResourcesTree", { drawinglistId: drawinglistId })
           .success(function (data) {
               resourceTreeObservable(data);
           });
    };

    var addResourcesTree = function (dtoDocument) {
        return $.post(config.remoteServerName + "/AddResourcesTree", dtoDocument);
    };

    var editResourcesTree = function (dtoDocument) {
        return $.post(config.remoteServerName + "/EditResourcesTree", dtoDocument);
    };

    var deleteResourcesTree = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteResourcesTree", { id: id })
            .done(function (data) {
            });
    };

    var getResourcesTreeForEdit = function (resourceTreeObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetResourcesTreeForEdit", { id: id })
                   .done(function (data) {
                       resourceTreeObservable(data);
                   });
    };

    //end Region resources tree 

    //start Region project estimate

    var getProjectEstimate = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetProjectEstimateByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#projectEstimateGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#projectEstimateGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getProjectEstimateForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectEstimateForEdit", { id: id }).done(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };

    var editProjectEstimate = function (dtoDocument) {
        return $.post(config.remoteServerName + "/EditProjectEstimate", dtoDocument);
    };

    var addProjectEstimate = function (dtoDocument, deliveryObservable) {
        return $.post(config.remoteServerName + "/AddProjectEstimate", dtoDocument).success(function (data) {
            deliveryObservable(data);
        });
    };

    var deleteProjectEstimate = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectEstimate", { id: id });
    };

    var getProjectEstimateItems = function (documnetObservable, projectEstimateId) {
        $.getJSON(config.remoteServerName + "/GetProjectEstimateItemsByProjectEstimateId", { projectEstimateId: projectEstimateId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getProjectEstimateItemsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectEstimateItemsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editProjectEstimateItems = function (dtoDocument) {
        return $.post(config.remoteServerName + "/EditProjectEstimateItems", dtoDocument);
    };

    var addProjectEstimateItems = function (dtoDocument, type, deliveryObservable) {
        if (type) {
            return $.post(config.remoteServerName + "/AddProjectEstimateItems", dtoDocument()).success(function (data) {
                deliveryObservable(data);
            });
        } else {
            return $.post(config.remoteServerName + "/AddProjectEstimateItems", dtoDocument).success(function (data) {
                deliveryObservable(data);
            });
        }

    };

    var deleteProjectEstimateItems = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectEstimateItems", { id: id });
    };

    //end Region project estimate

    //start Region request for inspection

    var getInspectionRequest = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetInspectionRequestByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#inspectionRequestGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#inspectionRequestGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getInspectionRequestList = function (documnetObservable, projectId, pageNumber, pageSize) {
        $.getJSON(config.remoteServerName + "/GetInspectionRequestByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            documnetObservable(data);
        });
    };

    var getInspectionRequestForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetInspectionRequestForEdit", { id: id }).success(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };

    var editInspectionRequest = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditInspectionRequest", documnetObservable);
    };

    var addInspectionRequest = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddInspectionRequest", documnetObservable);
    };

    var deleteInspectionRequest = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteInspectionRequest", { id: id });
    };



    //End Region request for inspection

    //start Region Material request for inspection

    var getMaterialInspectionRequest = function (communicationInternalMemoObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetMaterialInspectionRequest?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationInternalMemoObservable) {
                $("#materialInspectionGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationInternalMemoObservable.data(tempArray);
                $('#materialInspectionGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var getMaterialInspectionRequestForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetMaterialInspectionRequestForEdit", { id: id }).success(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };

    var editMaterialInspectionRequest = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditMaterialInspectionRequest", documnetObservable);
    };

    var addMaterialInspectionRequest = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddMaterialInspectionRequest", documnetObservable);
    };

    var deleteMaterialInspectionRequest = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteMaterialInspectionRequest", { id: id });
    };

    //End Region Material request for inspection
    //Region summary

    var getApprovalRequestsDocApprove = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetApprovalRequestsDocApprove").success(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var getApprovalRequestsGroupByUserId = function (documnetObservable, inboxType) {
        return $.getJSON(config.remoteServerName + "/GetApprovalRequestsGroupByUserId?requestType=" + inboxType).success(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var getDocApprovalDetailsInbox = function (documnetObservable, requestType) {
        return $.getJSON(config.remoteServerName + "/GetDocApprovalDetailsInbox?requestType=" + requestType).done(function (data) {
            if (documnetObservable) {
                $("#gvDistributionInbox").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#gvDistributionInbox').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");

            }
        });
    };

    var getActionsBySummaryDetails = function (documnetObservable, requestType) {
        return $.getJSON(config.remoteServerName + "/GetActionsBySummaryDetails?requestType=" + requestType).done(function (data) {
            if (documnetObservable) {
                $("#dataTable").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#dataTable').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");

            }
        });
    };

    var getActionsByScheduleSummaryDetails = function (documnetObservable, requestType) {
        $.getJSON(config.remoteServerName + "/GetActionsByScheduleSummaryDetails?requestType=" + requestType).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getAlertSummaryDetails = function (documnetObservable, requestType) {
        return $.getJSON(config.remoteServerName + "/GetAlertSummaryDetails?requestType=" + requestType).done(function (data) {
            if (documnetObservable) {
                $("#gvAlert").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#gvAlert').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");

            }
        });
    };

    //endregion summmary

    //#endregion Abd El-Samad - Junior Developer

    //#region Hassan - Junior Developer

    //#region Internal Memo

    //var getCommunicationInternalMemo = function (projectId, communicationInternalMemoObservable) {
    //    $.getJSON(config.remoteServerName + "/GetCommunicationInternalMemo", { projectId: projectId }).success(function (data) {
    //        communicationInternalMemoObservable.data(data);
    //    });
    //};

    var getCommunicationInternalMemo = function (communicationInternalMemoObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationInternalMemo?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationInternalMemoObservable) {
                $("#correspondenceSentGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(lettersObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationInternalMemoObservable.data(tempArray);
                $('#correspondenceSentGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    var addCommunicationInternalMemo = function (communicationInternalMemoObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationInternalMemo", communicationInternalMemoObservable);
    };

    var editCommunicationInternalMemo = function (communicationInternalMemoObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationInternalMemo", communicationInternalMemoObservable);
    };

    var communicationInternalMemoDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationInternalMemoDelete?id=" + id);
    };

    var getCommunicationInternalMemoForEdit = function (communicationInternalMemoObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationInternalMemoForEdit", { id: id }).success(function (data) {
            communicationInternalMemoObservable(ko.mapping.fromJS(data));
        });
    };

    var addCommunicationReport = function (communicationReportObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationReport", communicationReportObservable);
    };

    var editCommunicationReport = function (communicationReportObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationReport", communicationReportObservable);
    };

    //#endregion Internal Memo

    //Start Region CommunicationCorrespondenceReceived
    var getCommunicationCorrespondenceReceivedRpt = function (communicationCorrespondenceReceivedObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationCorrespondenceReceivedRpt?pageNumber=" + pageNumber + "&pageSize=" + pageSize).success(function (data) {
            if (communicationCorrespondenceReceivedObservable) {
                $("#correspondenceGridLogs").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(communicationCorrespondenceReceivedObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationCorrespondenceReceivedObservable.data(tempArray);
                $('#correspondenceGridLogs').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var getCommunicationCorrespondenceReceived = function (communicationCorrespondenceReceivedObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationCorrespondenceReceived?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (communicationCorrespondenceReceivedObservable) {
                $("#correspondenceRecievedGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(communicationCorrespondenceReceivedObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                communicationCorrespondenceReceivedObservable.data(tempArray);
                $('#correspondenceRecievedGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    //var getCommunicationCorrespondenceReceived = function (projectId, communicationCorrespondenceReceivedObservable) {
    //    return $.getJSON(config.remoteServerName + "/GetCommunicationCorrespondenceReceived", { projectId: projectId }).success(function (data) {
    //        communicationCorrespondenceReceivedObservable.data(data);
    //    });
    //};

    var addCommunicationCorrespondenceReceived = function (communicationCorrespondenceReceivedObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationCorrespondenceReceived", communicationCorrespondenceReceivedObservable);
    };

    var editCommunicationCorrespondenceReceived = function (communicationCorrespondenceReceivedObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationCorrespondenceReceived", communicationCorrespondenceReceivedObservable);
    };

    var communicationCorrespondenceReceivedDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/CommunicationCorrespondenceReceivedDelete?id=" + id);
    };

    var getCommunicationCorrespondenceReceivedForEdit = function (communicationCorrespondenceReceivedObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationCorrespondenceReceivedForEdit", { id: id }).success(function (data) {
            communicationCorrespondenceReceivedObservable(ko.mapping.fromJS(data));
        });
    };
    //end Region CommunicationCorrespondenceReceived

    //Start Region ContractsQs

    var getContractsQs = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/getContractsQs?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (contractsObservable) {
                $("#qsGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(contractsObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                contractsObservable.data(tempArray);
                $('#qsGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };




    var addContractsQs = function (contractsQsObservable, contractQsObservable) {
        return $.post(config.remoteServerName + "/AddContractsQs ", contractsQsObservable).success(function (data) {
            contractQsObservable(data);
        });;
    };

    var editContractsQs = function (contractsQsObservable, contractQsObservable) {
        return $.post(config.remoteServerName + "/EditContractsQs", contractsQsObservable).success(function (data) {
            contractQsObservable(data);
        });;
    };

    var contractsQsDelete = function (id) {
        return $.getJSON(config.remoteServerName + "/ContractsQsDelete", { id: id })
            .done(function (data) {
            });
    };

    var getContractsQsForEdit = function (contractsQsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsQsForEdit", { id: id }).success(function (data) {
            contractsQsObservable(ko.mapping.fromJS(data));
        });
    };

    //end Region ContractsQs

    //start Region ContractsQsItems
    var getContractsQsItemsByqsId = function (id, contractsQsItemsObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsQsItems", { qsId: id }).success(function (data) {
            contractsQsItemsObservable.data(data);
        });
    };

    var getContractsQsItemsForExcel = function (qsId, contractsQsItemsObservable) {
        $.getJSON(config.remoteServerName + "/GetContractsQsItemsForExcel", { qsId: qsId }).success(function (data) {
            contractsQsItemsObservable.data(data);
        });
    };

    var addContractQsItem = function (contractsQsObservable) {
        return $.post(config.remoteServerName + "/AddContractsQsItems ", ko.toJS(contractsQsObservable));
    };

    var addContractsQsItemsFromFile = function (contractsQsObservable, requestId) {
        return $.post(config.remoteServerName + "/AddContractsQsItemsFromFile", { requestId: requestId }).done(function (data) {
            contractsQsObservable.data(data);
        });
    };

    var getContractQsItemsForEdit = function (id) {
        return $.getJSON(config.remoteServerName + "/GetContractsQsItemsForEdit?id=" + id);
    };

    var editContractsQsItems = function (ContractsQItems) {
        return $.post(config.remoteServerName + "/EditContractsQsItems", ContractsQItems);
    };

    var deleteContractQsItems = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsQsItems", { id: id }).done(function (data) {
        });
    };

    var getContractQsItemsEquipmentTypes = function (accountsDefaultListObservable, listType) {
        $.getJSON(config.remoteServerName + "/GetAccountsDefaultList", { listType: listType }).done(function (data) {
            accountsDefaultListObservable(data);
        });
    };

    //End Region
    //start region cost coding tree

    var getCostCodeTreeForReport = function (costCodeTreeObservable, costCodingTreeId) {
        return $.getJSON(config.remoteServerName + "/GetCostCodeTreeForReport", { costCodingTreeId: costCodingTreeId }).done(function (data) {
            costCodeTreeObservable.data(data);
        });
    };


    var getContractsBoqShowInCostCodingTree = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqShowInCostCodingTree?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {
                if (contractsObservable) {
                    $("#costCodingTreeGrid").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(contractsObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    contractsObservable.data(tempArray);
                    $('#costCodingTreeGrid').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };



    var getContractsBoqShowInCostCodingTreeDp = function (projectId, boq, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsBoqShowInCostCodingTree?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).success(function (data) {
            boq(data);
        });
    };

    var getAllCodeFristTreeByBoqId = function (poqId, costCodeTreeObservable) {
        return $.getJSON(config.remoteServerName + "/GetAllCodeFristTreeByBoqId", { poqId: poqId }).success(function (data) {
            costCodeTreeObservable(data);
        });
    };

    var getCostCodeTreeForEdit = function (costCodeTreeObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCostCodeTreeForEdit", { id: id }).done(function (data) {
            costCodeTreeObservable(data);
        });
    };

    var addCostCodeTree = function (costCodeTreeObservable, costCodeTreeObservable2) {
        return $.post(config.remoteServerName + "/AddcostCodeTree", costCodeTreeObservable).success(function (result) {
            costCodeTreeObservable2(result);
        });
    };

    var editCostCodeTree = function (costCodeTreeObservable, costCodeTrees) {
        return $.post(config.remoteServerName + "/EditCostCodeTree", costCodeTreeObservable).done(function (result) {
            costCodeTrees(result);
        });
    };

    var deleteCostCodeTree = function (costCodeTreeObservable, id) {
        return $.getJSON(config.remoteServerName + "/DeleteCostCodeTree?id=" + id).done(function (data) {
            costCodeTreeObservable(data);
        });
    };

    var getAllCodeFristTreeByBoqIdNotById = function (id, poqId, costCodeTreeObservable) {
        $.getJSON(config.remoteServerName + "/GetAllCodeFristTreeByBoqIdNotById", { id: id, poqId: poqId }).success(function (data) {
            costCodeTreeObservable(data);
        });
    };
    var moveUpCostCodeTree = function (costCodeTreeArray, id) {
        return $.getJSON(config.remoteServerName + "/MoveUpCostCodeTree", { id: id }).done(function (data) {
            costCodeTreeArray(data);
        });
    };
    var moveDownCostCodeTree = function (costCodeTreeArray, id) {
        return $.getJSON(config.remoteServerName + "/MoveDownCostCodeTree", { id: id }).done(function (data) {
            costCodeTreeArray(data);
        });
    };
    //end region

    //#start region Drawing
    var getLogsDrawingsByProjectId = function (drawingObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsDrawingsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .success(function (data) {

                if (drawingObservable) {
                    $("#drawingGrid").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(drawingObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    drawingObservable.data(tempArray);
                    $('#drawingGrid').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };

    var getLogsDrawingsCyclesByDrawingId = function (drawingId, drawingCyclesObservable) {
        return $.getJSON(config.remoteServerName + "/GetLogsDrawingsCyclesByDrawingId", { drawingId: drawingId }).success(function (data) {
            if (drawingCyclesObservable) {

                drawingCyclesObservable.data(data);
            }
        });
    };

    var getLogsDrawingsByProjectIdList = function (projectId, drawingObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsDrawingsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).success(function (data) {
            drawingObservable(data);
        });
    };

    var getLogsDrawingsForEdit = function (logsDrawingObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsDrawingsForEdit", { id: id }).success(function (data) {
            logsDrawingObservable(ko.mapping.fromJS(data));
        });
    };

    var addLogsDrawings = function (logsDrawingObservable, logsDrawingObservable2) {
        return $.post(config.remoteServerName + "/AddLogsDrawings", logsDrawingObservable).success(function (result) {
            logsDrawingObservable2(result);
        });
    };
    var addLogsDrawingsCycles = function (logsDrawingCycleObservable, logsDrawingCycleObservable2) {
        return $.post(config.remoteServerName + "/AddLogsDrawingsCycles", logsDrawingCycleObservable).success(function (result) {
            logsDrawingCycleObservable2.data(result);
        });
    };

    var getLogsDrawingsCyclesForEdit = function (logsDrawingCyclesObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsDrawingsCyclesForEdit", { id: id }).done(function (data) {
            if (logsDrawingCyclesObservable) {
                logsDrawingCyclesObservable(data);
            }
        });
    };

    var editLogDrawing = function (logDrawingeObservable, logDrawinge) {
        return $.post(config.remoteServerName + "/EditLogDrawing ", logDrawingeObservable).done(function (result) {
            logDrawinge(result);
        });
    };

    var editLogDrawingCycle = function (logDrawingeCycleObservable, logDrawingeCycle) {
        return $.post(config.remoteServerName + "/EditLogDrawingCycle", logDrawingeCycleObservable).done(function (result) {
            logDrawingeCycle.data(result);
        });
    };

    var deleteLogDrawing = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsDrawingsById?id=" + id);
    };
    //endRegion drawing
    //start Region Submittal
    var getLogsSubmittalProjectId = function (submittalObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsSubmittalsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).success(function (data) {

            if (submittalObservable) {
                $("#submittalGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(submittalObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                submittalObservable.data(tempArray);
                $('#submittalGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }

        });
    };

    var getLogsSubmittalProjectIdList = function (projectId, submittalObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsSubmittalsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).success(function (data) {
            submittalObservable(data);
        });
    };

    var getLogsSubmittalForEdit = function (submittalObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsSubmittalForEdit", { id: id }).done(function (data) {
            if (submittalObservable) {

                submittalObservable(ko.mapping.fromJS(data));
            }
        });
    };

    var addLogsSubmittal = function (logsSubmittalObservable) {
        return $.post(config.remoteServerName + "/AddLogsSubmittal", logsSubmittalObservable);
    };
    var addLogSubmittalCycles = function (logSubmittalCycleObservable, logSubmittslCycleObservable2) {
        return $.post(config.remoteServerName + "/AddLogSubmittalCycles", logSubmittalCycleObservable).success(function (result) {
            logSubmittslCycleObservable2(result);
        });
    };
    var getlogsSubmittalsCyclesForEdit = function (LogSubmittalCyclesObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogSubmittalCyclesForEdit", { id: id }).done(function (data) {
            LogSubmittalCyclesObservable(data);
        });
    };

    var editLogSubmittal = function (logSubmittalObservable) {
        return $.post(config.remoteServerName + "/EditLogSubmittal", logSubmittalObservable);
    };

    var editLogSubmittalCycle = function (logsSubmittalCycleObservable, logsSubmittalCycle) {
        return $.post(config.remoteServerName + "/EditLogSubmittalCycle", logsSubmittalCycleObservable).done(function (result) {
            logsSubmittalCycle(result);
        });
    };

    var addLogSubmittalItems = function (logSubmittalItemsObservable, logSubmittslItemsObservable2) {
        return $.post(config.remoteServerName + "/AddLogSubmittalItems", logSubmittalItemsObservable).success(function (result) {
            logSubmittslItemsObservable2.data(result);
        });
    };
    var editLogSubmittalItems = function (logsSubmittalItemsObservable, logsSubmittalItems) {
        return $.post(config.remoteServerName + "/EditLogSubmittalItems", logsSubmittalItems).done(function (result) {
            logsSubmittalItemsObservable.data(result);
        });
    };

    var getlogsSubmittalsItemsForEdit = function (LogSubmittalItemsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogSubmittalItemsForEdit", { id: id }).done(function (data) {
            LogSubmittalItemsObservable(data);
        });
    };


    var getLogsSubmittalItemsBySubmittalId = function (submittalId, submittalObservable) {
        return $.getJSON(config.remoteServerName + "/GetLogsSubmittalItemsBySubmittalId", { submittalId: submittalId }).success(function (data) {
            //submittalObservable.data(data);
            if (submittalObservable) {
                $("#submittalItemsGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                submittalObservable.data(tempArray);
                $('#submittalItemsGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    //endRegion
    //#endregion Hassan - Junior Developer


    //#region generator By Mohamed Elsokary 79



    var getAccountsQualityControl = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetAccountsQualityControlsByParentId").done(function (data) {
            documnetObservable(data);
        });
    };

    var getAccountsQualityControlForEdit = function (id, documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountsQualityControlForEdit", { id: id }).done(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };

    var editAccountsQualityControl = function (qualityControlDto, documnetObservables) {
        return $.post(config.remoteServerName + "/EditAccountsQualityControl", qualityControlDto).done(function (data) {
            documnetObservables(data);
        });
    };

    var addAccountsQualityControl = function (qualityControlDto, documnetObservables) {
        return $.post(config.remoteServerName + "/AddAccountsQualityControl", qualityControlDto).done(function (data) {
            documnetObservables(data);
        });
    };

    var deleteAccountsQualityControl = function (id, documnetObservables) {
        return $.getJSON(config.remoteServerName + "/DeleteAccountsQualityControlById", { id: id }).done(function (data) {
            documnetObservables(data);
        });;
    };

    var getAccountsQualityControlItems = function (parentId, documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountsQualityControlItemsByParentId", { parentId: parentId }).done(function (data) {
            if (documnetObservable) {
                $("#dataRowItemsGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#dataRowItemsGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getAccountsQualityControlItemsLists = function (parentId, documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetAccountsQualityControlItemsByParentId", { parentId: parentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getAccountsQualityControlItemsForEdit = function (id, documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetAccountsQualityControlItemsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editAccountsQualityControlItems = function (dtoDocument, documnetObservables) {
        return $.post(config.remoteServerName + "/EditAccountsQualityControlItems", dtoDocument).done(function (data) {
            documnetObservables.data(data);
        });
    };

    var addAccountsQualityControlItems = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/AddAccountsQualityControlItems", documnetObservable).done(function (data) {
            documnetObservables.data(data);
        });;
    };

    var deleteAccountsQualityControlItems = function (id, documnetObservable) {
        return $.getJSON(config.remoteServerName + "/DeleteAccountsQualityControlItemsById", { id: id }).done(function (data) {
            documnetObservable.data(data);
        });;
    };
    //region punch List

    var getLogsPunchListDetailsByPunchListId = function (documnetObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetLogsPunchListDetailsByPunchListId", { projectId: projectId }).done(function (data) {
            if (documnetObservable) {
                $("#dataRowItemsGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#dataRowItemsGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getLogsPunchListDetailsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsPunchListDetailsForEdit", { id: id }).success(function (data) {
            if (documnetObservable) {
                documnetObservable(ko.mapping.fromJS(data));
            }
        });
    };

    var editLogsPunchListDetails = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/EditLogsPunchListDetails", documnetObservable).done(function (data) {
            if (documnetObservables) {
                documnetObservables.data(data);
            }
        });
    };

    var addLogsPunchListDetails = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/AddLogsPunchListDetails", documnetObservable).done(function (data) {
            if (documnetObservables) {
                documnetObservables.data(data);
            }
        });
    };

    var deleteLogsPunchListDetails = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsPunchListDetailsById", { id: id });
    };

    //var getLogsPunchListsByProjectId = function (documnetObservable, projectId) {
    //    $.getJSON(config.remoteServerName + "/GetLogsPunchListsByProjectId", { projectId: projectId }).done(function (data) {
    //        documnetObservable.data(data);
    //    });
    //};

    var getLogsPunchListsByProjectId = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsPunchListsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#punchListGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#punchListGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getLogsPunchListsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsPunchListsForEdit", { id: id }).success(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };

    var editLogsPunchLists = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsPunchLists", documnetObservable);
    };


    var addLogsPunchLists = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsPunchLists", documnetObservable);
    };

    var deleteLogsPunchLists = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsPunchListsById", { id: id });
    };

    //end region 
    //var getLogsQualityControl = function (documnetObservable, projectId) {
    //    $.getJSON(config.remoteServerName + "/getLogsQualityControl", { projectId: projectId }).done(function (data) {
    //        documnetObservable.data(data);
    //    });
    //};

    var getLogsQualityControl = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/getLogsQualityControl?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {
                if (contractsObservable) {
                    $("#qualityControlGrid").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(contractsObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    contractsObservable.data(tempArray);
                    $('#qualityControlGrid').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };



    var getLogsQualityControlForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsQualityControlForEdit", { id: id }).success(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };
    var editLogsQualityControl = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsQualityControl", documnetObservable);
    };
    var addLogsQualityControl = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsQualityControl", documnetObservable);
    };
    var deleteLogsQualityControl = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsQualityControlById?id=" + id);
    };

    var getLogsQualityControlItems = function (documnetObservable, qualityControlId) {
        $.getJSON(config.remoteServerName + "/GetLogsQualityControlItemsByQualityControlId", { qualityControlId: qualityControlId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsQualityControlItemsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsQualityControlItemsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editLogsQualityControlItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsQualityControlItems", documnetObservable);
    };

    var addLogsQualityControlItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsQualityControlItems", documnetObservable);
    };

    var deleteLogsQualityControlItems = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsQualityControlItemsById", { id: id });
    };

    //#endregion


    //#region generator By Mohamed Elsokary 71 Day


    var getContractsProcurement = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsProcurementsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {

                if (contractsObservable) {
                    $("#procurement").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(contractsObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    contractsObservable.data(tempArray);
                    $('#procurement').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };



    var getContractsProcurementForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsProcurementForEdit", { id: id }).success(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };

    var editContractsProcurement = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditContractsProcurement", documnetObservable);
    };

    var addContractsProcurement = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddContractsProcurement", documnetObservable);
    };

    var deleteContractsProcurement = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsProcurementById", { id: id });
    };

    var getContractsProcurementContractors = function (documnetObservable, procurmentId) {
        $.getJSON(config.remoteServerName + "/GetContractsProcurementContractors", { procurmentId: procurmentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getContractsProcurementContractorsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsProcurementContractorsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editContractsProcurementContractors = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditContractsProcurementContractors", documnetObservable);
    };

    var addContractsProcurementContractors = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddContractsProcurementContractors", documnetObservable);
    };

    var deleteContractsProcurementContractors = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsProcurementContractorsById", { id: id });
    };

    var getContractsProcurementContractorsItems = function (documnetObservable, procurmentId) {
        $.getJSON(config.remoteServerName + "/GetContractsProcurementContractorsItems", { procurmentId: procurmentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getContractsProcurementContractorsItemsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsProcurementContractorsItemsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editContractsProcurementContractorsItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditContractsProcurementContractorsItems", documnetObservable);
    };

    var addContractsProcurementContractorsItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddContractsProcurementContractorsItems", documnetObservable);
    };

    var deleteContractsProcurementContractorsItems = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteContractsProcurementContractorsItemsById", { id: id });
    };

    var getContractsProcurementItems = function (documnetObservable, procurmentId) {
        $.getJSON(config.remoteServerName + "/GetContractsProcurementItems", { procurmentId: procurmentId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getContractsProcurementItemsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetContractsProcurementItemsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editContractsProcurementItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditContractsProcurementItems", documnetObservable);
    };

    var addContractsProcurementItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddContractsProcurementItems", documnetObservable);
    };

    var addContractsProcurementItemsFromFile = function (documnetObservable, requestId) {
        return $.post(config.remoteServerName + "/AddContractsProcurementItemsFromFile", { requestId: requestId }).done(function (data) {
            documnetObservable.data(data);
        });;
    };

    var deleteLogsSubmittalsItemsById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsSubmittalsItemsById", { id: id });
    };

    var deleteLogsSubmittalsCyclesById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsSubmittalsCyclesById", { id: id });
    };



    var deleteLogsSubmittalsById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsSubmittalsById", { id: id });
    };

    //#endregion
    //start drawing List
    var getDesignDrawingList = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingListsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).success(function (data) {
            if (documnetObservable) {
                $("#drawingListGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#drawingListGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    //var getDesignDrawingListRpt = function (documnetObservable, projectId) {
    //    $.getJSON(config.remoteServerName + "/GetDesignDrawingListsByProjectIdForRpt", { projectId: projectId }).done(function (data) {
    //        documnetObservable.data(data);
    //    });
    //};

    var getDesignDrawingListRpt = function (projectId, documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingListsByProjectIdForRpt?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).success(function (data) {
            if (documnetObservable) {
                $("#designStatusGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#designStatusGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getDesignDrawingLists = function (documnetObservable, projectId, pageNumber, pageSize) {
        $.getJSON(config.remoteServerName + "/GetDesignDrawingListsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            documnetObservable(data);
        });
    };


    var getDesignDrawingListForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingListForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editDesignDrawingList = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditDesignDrawingList", documnetObservable)

    };
    var addDesignDrawingList = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddDesignDrawingList", documnetObservable);
    };

    var deleteDesignDrawingList = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteDesignDrawingList", { id: id });
    };

    var getDesignDrawingListItemsByDrawingListId = function (drawingListId, disciplineId, drawingListItems) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingListItemsByDrawingListId?drawingId=" + drawingListId + "&disciplineId=" + disciplineId).done(function (data) {
            if (drawingListItems) {
                drawingListItems.data(data);
            }
        });
    };

    var getDesignDrawingListItemsByDrawingListIdForGrid = function (documnetObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingListItemsByDrawingListId", { projectId: projectId }).done(function (data) {
            if (documnetObservable) {

                documnetObservable.data(data);
            }
        });
    };

    var getDesignDrawingListItemsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetDesignDrawingListItemsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editDesignDrawingListItems = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/EditDesignDrawingListItems", documnetObservable).done(function (result) {
            if (documnetObservables) {

                documnetObservables.data(result);
            }
        });

    };
    var addDesignDrawingListItems = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/AddDesignDrawingListItems", documnetObservable).done(function (result) {
            if (documnetObservables) {

                documnetObservables.data(result);
            }
        });
    };

    var deleteDesignDrawingListItems = function (id, documnetObservables) {
        return $.getJSON(config.remoteServerName + "/DeleteDesignDrawingListItemsById", { id: id }).done(function (result) {
            if (documnetObservables) {

                documnetObservables.data(result);
            }
        });
    };
    //endregion

    //Material Release

    //var getLogsMaterialReleasesByProjectId = function (documnetObservable, projectId) {
    //    $.getJSON(config.remoteServerName + "/GetLogsMaterialReleasesByProjectId", { projectId: projectId }).done(function (data) {
    //        documnetObservable.data(data);
    //    });
    //};

    var getLogsMaterialReleasesByProjectId = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialReleasesByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#materialReleaseGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#materialReleaseGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getLogsMaterialReleasesForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialReleasesForEdit", { id: id }).success(function (data) {
            if (documnetObservable) {
                documnetObservable(ko.mapping.fromJS(data));
            }
        });
    };
    var editLogsMaterialRelease = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsMaterialRelease", documnetObservable);
    };
    var addLogsMaterialRelease = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsMaterialRelease", documnetObservable);
    };
    var deleteLogsMaterialRelease = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsMaterialRelease", { id: id });
    };


    var getLogsMaterialReleaseCosts = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetLogsMaterialReleaseCostssByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsMaterialReleaseCostsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialReleaseCostsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsMaterialReleaseCosts = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsMaterialReleaseCosts", documnetObservable);
    };
    var addLogsMaterialReleaseCosts = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsMaterialReleaseCosts", documnetObservable);
    };
    var deleteLogsMaterialReleaseCosts = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsMaterialReleaseCostsById", { id: id });
    };

    var getLogsMaterialReleaseTickets = function (documnetObservable, releaseId) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialReleaseTickets", { releaseId: releaseId }).done(function (data) {
            if (documnetObservable) {
                $("#dataRowItemsGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#dataRowItemsGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }

        });
    };

    var getLogsMaterialReleaseTicketsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialReleaseTicketsForEdit", { id: id }).done(function (data) {

            documnetObservable(data);
        });
    };
    var editLogsMaterialReleaseTickets = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/EditLogsMaterialReleaseTickets", documnetObservable).done(function (data) {
            documnetObservables.data(data);
        });
    };
    var addLogsMaterialReleaseTickets = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/AddLogsMaterialReleaseTickets", documnetObservable).done(function (data) {
            if (documnetObservables) {
                documnetObservables.data(data);
            }
        });
    };
    var deleteLogsMaterialReleaseTickets = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsMaterialReleaseTicketsById", { id: id });
    };

    var getContractsSiteRequestList = function (contractsObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsSiteRequestByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            contractsObservable(data);
        });
    };

    var getContractsBoqShowInCostCodingTreeList = function (projectId, boq) {
        $.getJSON(config.remoteServerName + "/GetContractsBoqShowInCostCodingTree", { projectId: projectId })
           .success(function (data) {
               boq.data(data);
           });
    };

    var getContractsProcurementList = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetContractsProcurementsByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsMaterialInventorysByProjectIdList = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialInventorysByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsMaterialInventoryForList = function (documnetObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetLogsMaterialInventoryForList?projectId=" + projectId).done(function (data) {
            documnetObservable(data);
        });
    };

    var editLogsMaterialInventoriesForRelease = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsMaterialInventoriesForRelease", documnetObservable);
    };

    //end Region

    //region Budget File

    var getEstimationBudgetfilesByProjectId = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetEstimationBudgetfilesByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#budgetFileGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#budgetFileGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getEstimationBudgetfileForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetEstimationBudgetfileForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editEstimationBudgetfile = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditEstimationBudgetfile", documnetObservable);
    };
    var addEstimationBudgetfile = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddEstimationBudgetfile", documnetObservable);
    };
    var deleteEstimationBudgetfileById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteEstimationBudgetfileById?id=" + id);
    };

    //end region
    //start Region Client Selection


    var getLogsClientSelectionsByProjectId = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsClientSelectionsByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
            .done(function (data) {
                if (documnetObservable) {
                    $("#clientSelectionGrid").jqxGrid('beginupdate', true);
                    var tempArray = ko.toJS(documnetObservable.data);
                    ko.utils.arrayPushAll(tempArray, data);
                    documnetObservable.data(tempArray);
                    $('#clientSelectionGrid').jqxGrid('endupdate');
                    $(".loading-data").addClass("hidden");
                }
            });
    };

    var getLogsClientSelectionForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsClientSelectionForEdit", { id: id }).done(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };
    var editLogsClientSelections = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsClientSelections", documnetObservable);
    };
    var addLogsClientSelections = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsClientSelections", documnetObservable);
    };
    var deleteLogsClientSelectionById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsClientSelectionById", { id: id });
    };

    //end Region


    //#region

    var getProjectProjectsExpensesApprovalRequest = function (documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetProjectProjectsExpensesApprovalRequest?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#gridLog").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#gridLog').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getProjectProjectsExpensessByProjectId = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetProjectProjectsExpensessByProjectId?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#projectExpenses").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#projectExpenses').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getProjectProjectsExpensesForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetProjectProjectsExpensesForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editProjectProjectsExpenses = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditProjectProjectsExpenses", documnetObservable);
    };
    var addProjectProjectsExpenses = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddProjectProjectsExpenses", documnetObservable);
    };
    var deleteProjectProjectsExpenses = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteProjectProjectsExpensesById?id=" + id);
    };


    //#endregion
    //var getBudgetVarianceByProject = function (documnetObservable, projectId) {
    //    $.getJSON(config.remoteServerName + "/GetBudgetVarianceByProject", { projectId: projectId }).done(function (data) {
    //        documnetObservable.data(data);
    //    });
    //};


    var getBudgetVarianceByProject = function (projectId, documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetBudgetVarianceByProject?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#projectExpenses").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#projectExpenses').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };


    var getOppenedDocuments = function (documnetObservable, alertType) {
        $.getJSON(config.remoteServerName + "/GetOppenedDocuments", { alertType: alertType }).done(function (data) {
            documnetObservable(data);
        });
    };


    //#region summary By Moahmed Elsokary
    var getOppenedDocumentsSummaryCount = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetOppenedDocumentsSummaryCount").done(function (data) {
            documnetObservable(data);
        });
    };

    var getProjectsStatusSummaryCount = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetProjectsStatusSummaryCount").done(function (data) {
            documnetObservable(data);
        });
    };

    var getBoqQuantityRequestedAlert = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetBoqQuantityRequestedAlert").done(function (data) {
            documnetObservable(data);
        });
    };
    var getAlertsCount = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetAlertsCount").done(function (data) {
            documnetObservable(data);
        });
    };

    var getClosedDocumentsSummaryCount = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetClosedDocumentsSummaryCount").done(function (data) {
            documnetObservable(data);
        });
    };

    var getAssessmentSummary = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetAssessmentSummary").done(function (data) {
            documnetObservable(data);
        });
    };





    var getInboxSummary = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetInboxSummary").done(function (data) {
            documnetObservable(data);
        });
    };
    var getDistributionInboxSummary = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetDistributionInboxSummary").done(function (data) {
            documnetObservable(data);
        });
    };
    var getNotCodedExpensesSummary = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetNotCodedExpensesSummary").done(function (data) {
            documnetObservable(data);
        });
    };
    var getNotCodedInvoicesSummary = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetNotCodedInvoicesSummary").done(function (data) {
            documnetObservable(data);
        });
    };

    var getNotCodedPaymentsSummary = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetNotCodedPaymentsSummary").done(function (data) {
            documnetObservable(data);
        });
    };
    var getActionByCount = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetActionByCount").done(function (data) {
            documnetObservable(data);
        });
    };

    var getActionByScheduleCount = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetActionByScheduleCount").done(function (data) {
            documnetObservable(data);
        });
    };
    //#endregion

    var getprojectProjectsList = function (projectListObj, projectListObservable) {
        return $.post(config.remoteServerName + "/GetprojectProjectsList", projectListObj).success(function (result) {
            if (projectListObservable) {

                projectListObservable.data(result);
            }
        });
    };

    var getprojectProjects = function (projectListObj, projectListObservable) {
        return $.post(config.remoteServerName + "/GetprojectProjectsList", projectListObj).success(function (result) {
            projectListObservable(result);
        });
    };

    var getCashFlow = function (projectId, cashFlowObservable) {
        return $.getJSON(config.remoteServerName + "/GetCashFlow", { projectId: projectId }).done(function (data) {
            cashFlowObservable(data);
        });
    };

    //#region  NCR

    var getCommunicationMaterialRequestForInspection = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetCommunicationMaterialRequestForInspectionsByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getCommunicationMaterialRequestForInspectionForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMaterialRequestForInspectionForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editCommunicationMaterialRequestForInspection = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationMaterialRequestForInspection", documnetObservable);
    };
    var addCommunicationMaterialRequestForInspection = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationMaterialRequestForInspection", documnetObservable);
    };
    var deleteCommunicationMaterialRequestForInspection = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteCommunicationMaterialRequestForInspectionById", { id: id });
    };

    var getCommunicationMaterialRequestForInspectionAttachFiles = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetCommunicationMaterialRequestForInspectionAttachFilessByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };


    var getCommunicationMaterialRequestForInspectionCycles = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetCommunicationMaterialRequestForInspectionCyclessByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getCommunicationMaterialRequestForInspectionCyclesForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationMaterialRequestForInspectionCyclesForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editCommunicationMaterialRequestForInspectionCycles = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationMaterialRequestForInspectionCycles", documnetObservable);
    };
    var addCommunicationMaterialRequestForInspectionCycles = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationMaterialRequestForInspectionCycles", documnetObservable);
    };
    var deleteCommunicationMaterialRequestForInspectionCycles = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteCommunicationMaterialRequestForInspectionCyclesById", { id: id });
    };


    var getCommunicationNcrCycleItems = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetCommunicationNcrCycleItemssByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getCommunicationNcrCycleItemsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationNcrCycleItemsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editCommunicationNcrCycleItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationNcrCycleItems", documnetObservable);
    };
    var addCommunicationNcrCycleItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationNcrCycleItems", documnetObservable);
    };
    var deleteCommunicationNcrCycleItems = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteCommunicationNcrCycleItemsById", { id: id });
    };

    var getCommunicationNCRCycles = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetCommunicationNCRCyclessByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getCommunicationNCRCyclesForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationNCRCyclesForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editCommunicationNCRCycles = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationNCRCycles", documnetObservable);
    };
    var addCommunicationNCRCycles = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationNCRCycless", documnetObservable);
    };
    var deleteCommunicationNCRCycles = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteCommunicationNCRCyclesById", { id: id });
    };

    var getCommunicationRequestForInspection = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetCommunicationRequestForInspectionsByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getCommunicationRequestForInspectionForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationRequestForInspectionForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editCommunicationRequestForInspection = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationRequestForInspection", documnetObservable);
    };
    var addCommunicationRequestForInspection = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationRequestForInspection", documnetObservable);
    };
    var deleteCommunicationRequestForInspection = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteCommunicationRequestForInspectionById", { id: id });
    };



    var getCommunicationRequestForInspectionCycles = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetCommunicationRequestForInspectionCyclessByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getCommunicationRequestForInspectionCyclesForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCommunicationRequestForInspectionCyclesForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editCommunicationRequestForInspectionCycles = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditCommunicationRequestForInspectionCycles", documnetObservable);
    };
    var addCommunicationRequestForInspectionCycles = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCommunicationRequestForInspectionCycles", documnetObservable);
    };
    var deleteCommunicationRequestForInspectionCycles = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteCommunicationRequestForInspectionCyclesById", { id: id });
    };

    var getMyActivities = function () {
        return $.getJSON(config.remoteServerName + "/GetMyActivities");
    };

    var getProjectsWorkingHours = function (projectWorkingObj, projectWorkingObservable) {
        return $.post(config.remoteServerName + "/GetProjectsWorkingHours", projectWorkingObj).success(function (result) {
            projectWorkingObservable(result);
        });
    };
    //#endregion
    var transferTask = function (taskToTransfer) {
        return $.post(config.remoteServerName + "/TransferTask", taskToTransfer);
    };

    //Region Spec Section 

    var getAccountsSpecsSectionChildssBySpecSectionId = function (documnetObservable, specSectionId) {
        return $.getJSON(config.remoteServerName + "/GetAccountsSpecsSectionChildssBySpecSectionId", { specSectionId: specSectionId }).done(function (data) {
            if (documnetObservable) {
                $("#specSection").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#specSection').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getAccountsSpecsSectionChilds = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetAccountsSpecsSectionChildssByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getAccountsSpecsSectionChildsForEdit = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetAccountsSpecsSectionChildsForEdit", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editAccountsSpecsSectionChilds = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/EditAccountsSpecsSectionChilds", documnetObservable).done(function (data) {
            documnetObservables.data(data);
        });
    };
    var addAccountsSpecsSectionChilds = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/AddAccountsSpecsSectionChilds", documnetObservable).done(function (data) {
            documnetObservables.data(data);
        });
    };
    var deleteAccountsSpecsSectionChilds = function (id) {
        return $.post(config.remoteServerName + "/DeleteAccountsSpecsSectionChildsById", { id: id });
    };

    var getCycleWorkflowByDocIdDocType = function (docId, docType) {
        return $.getJSON(config.remoteServerName + "/GetCycleWorkflowByDocIdDocType?docId=" + docId + "&docType=" + docType);
    };

    //End Region

    //contracts Delivery Alerts
    var getContractsDeliveryAlerts = function (documnetObservable, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetContractsDeliveryAlerts?pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#poContractConfigGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#poContractConfigGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };



    //end region


    //internal messages
    var getInternalMessageByAccountId = function (documnetObservables) {
        return $.getJSON(config.remoteServerName + "/GetInternalMessageByAccountId").done(function (data) {
            documnetObservables.data(data);
        });
    };
    var getDistrbutionInboxMessageByAccountId = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetDistrbutionInboxMessageByAccountId").done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getInternalMessageById = function (contractsObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetInternalMessageById", { id: id }).success(function (data) {
            contractsObservable(ko.mapping.fromJS(data));
        });
    };

    var editInternalMessage = function (dataRowDto) {
        return $.post(config.remoteServerName + "/EditInternalMessage", dataRowDto);
    };

    var editInboxDistrbutionMessage = function (dataRowDto) {
        return $.post(config.remoteServerName + "/EditInboxDistrbutionMessage", dataRowDto);
    };

    var deleteInboxDistrbutionMessage = function (id) {
        return $.post(config.remoteServerName + "/DeleteInboxDistrbutionMessage", { id: id });
    };

    var getScheduleAlertSummaryCount = function (documnetObservable) {
        $.getJSON(config.remoteServerName + "/GetScheduleAlertSummaryCount").done(function (data) {
            documnetObservable(data);
        });
    };

    //end


    //account settings

    var editAccountUserPassword = function (password, newPassword) {
        return $.post(config.remoteServerName + "/EditAccountUserPassword?password=" + password).success(function (data) {
            newPassword(data);
        });
    };

    //end account settings

    var addContractsDeliveryAlerts = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddContractsDeliveryAlerts", documnetObservable);
    };

    var sendWorkFlowApproval = function (documnetObservable) {
        var obj = ko.toJS(documnetObservable);
        return $.post(config.remoteServerName + "/SendWorkFlowApproval", obj);
    };

    var getScheduleAlertSummary = function (alertType, ivoicesUserObservable) {
        return $.getJSON(config.remoteServerName + "/GetScheduleAlertSummary", { alertType: alertType })
                   .done(function (data) {
                       if (ivoicesUserObservable) {

                           ivoicesUserObservable.data(data);
                       }
                   });
    };
    var projectProjectsById = function (id, projectObservable) {
        return $.getJSON(config.remoteServerName + "/ProjectProjectsById?id=" + id)
                   .success(function (data) {
                       projectObservable(data);
                   });
    };

    //====equipment delivery



    var getLogsEquipmentsDelivery = function (documnetObservable, projectId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetLogsEquipmentsDelivery?projectId=" + projectId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize).done(function (data) {
            if (documnetObservable) {
                $("#equipmentDeliveryGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#equipmentDeliveryGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getLogsEquipmentsDeliveryById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsEquipmentsDeliverysById", { id: id }).done(function (data) {
            documnetObservable(ko.mapping.fromJS(data));
        });
    };
    var editLogsEquipmentsDelivery = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsEquipmentsDelivery", documnetObservable);
    };
    var addLogsEquipmentsDelivery = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsEquipmentsDelivery", documnetObservable);
    };
    var deleteLogsEquipmentsDelivery = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsEquipmentsDeliveryById", { id: id });
    };

    var getLogsEquipmentsDeliveryCosts = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetLogsEquipmentsDeliveryCosts", { projectId: projectId }).done(function (data) {
            documnetObservable(data);
        });
    };

    var getLogsEquipmentsDeliveryCostsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsEquipmentsDeliveryCostsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsEquipmentsDeliveryCosts = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsEquipmentsDeliveryCosts", documnetObservable);
    };
    var addLogsEquipmentsDeliveryCosts = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsEquipmentsDeliveryCosts", documnetObservable);
    };
    var deleteLogsEquipmentsDeliveryCosts = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsEquipmentsDeliveryCostsById", { id: id });
    };

    var getLogsEquipmentsDeliveryProjects = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetLogsEquipmentsDeliveryProjects ", { projectId: projectId }).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getLogsEquipmentsDeliveryProjectsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsEquipmentsDeliveryProjectsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsEquipmentsDeliveryProjects = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsEquipmentsDeliveryProjects", documnetObservable);
    };
    var addLogsEquipmentsDeliveryProjects = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLogsEquipmentsDeliveryProjects", documnetObservable);
    };
    var deleteLogsEquipmentsDeliveryProjects = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsEquipmentsDeliveryProjectsById", { id: id });
    };

    var getLogsEquipmentsDeliveryTickets = function (documnetObservable, projectId) {
        return $.getJSON(config.remoteServerName + "/GetLogsEquipmentsDeliveryTickets ", { projectId: projectId }).done(function (data) {
            if (documnetObservable) {
                $("#materialInspectionGrid").jqxGrid('beginupdate', true);
                var tempArray = ko.toJS(documnetObservable.data);
                ko.utils.arrayPushAll(tempArray, data);
                documnetObservable.data(tempArray);
                $('#materialInspectionGrid').jqxGrid('endupdate');
                $(".loading-data").addClass("hidden");
            }
        });
    };

    var getLogsEquipmentsDeliveryTicketsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLogsEquipmentsDeliveryTicketsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };
    var editLogsEquipmentsDeliveryTickets = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLogsEquipmentsDeliveryTickets", documnetObservable);
    };
    var addLogsEquipmentsDeliveryTickets = function (documnetObservable, documnetObservables) {
        return $.post(config.remoteServerName + "/AddLogsEquipmentsDeliveryTickets", documnetObservable).done(function (data) {
            documnetObservables.data(data);
        });
    };
    var deleteLogsEquipmentsDeliveryTickets = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLogsEquipmentsDeliveryTicketsById", { id: id });
    };

    //hr 
    var getTransactionLoansByCount = function (documnetObservable) {
        $.getJSON(config.ipAddress + config.remoteHRAPI + "/GetTransactionLoansByCount").done(function (data) {
            documnetObservable(data);
        });
    };
    var getDocApprovalDetailsInboxInHr = function (documnetObservable, requestType) {
        $.getJSON(config.ipAddress + config.remoteHRAPI + "/GetDocApprovalDetailsInbox?requestType=" + requestType).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getExcusesSummaryDetails = function (documnetObservable, item) {
        $.getJSON(config.ipAddress + config.remoteHRAPI + "/GetExcusesSummaryDetails?item=" + item).done(function (data) {
            documnetObservable.data(data);
        });
    };
    var getCompareAccount = function (documnetObservable, passWord) {
        return $getJSON(config.ipAddress + config.remoteHRAPI + "/CompareAccountPassword", { passWord: passWord }).done(function (data) {
            documnetObservable(data);
        });

    };

    var getTransactionVacationByCount = function (documnetObservable) {
        $.getJSON(config.ipAddress + config.remoteHRAPI + "/GetTransactionVacationByCount").done(function (data) {
            documnetObservable(data);
        });
    };

    var getVacationSummaryDetails = function (documnetObservable, item) {
        $.getJSON(config.ipAddress + config.remoteHRAPI + "/GetVacationSummaryDetails?item=" + item).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getExcusesSummarySupervisorDetails = function (documnetObservable, item) {
        $.getJSON(config.ipAddress + config.remoteHRAPI + "/GetExcusesSummarySupervisorDetails?item=" + item).done(function (data) {
            documnetObservable.data(data);
        });
    };

    var getTransactionVacationSupervisorByCount = function (documnetObservable) {
        $.getJSON(config.ipAddress + config.remoteHRAPI + "/GetTransactionVacationSupervisorByCount").done(function (data) {
            documnetObservable(data);
        });
    };
    var getVacationSummarySupervisorDetails = function (documnetObservable, item) {
        $.getJSON(config.ipAddress + config.remoteHRAPI + "/GetVacationSummarySupervisorDetails?item=" + item).done(function (data) {
            documnetObservable.data(data);
        });
    };

    //end


    var getAccountsDiscussionsByProjectId = function (documnetObservable, projectId) {
        $.getJSON(config.remoteServerName + "/GetAllDiscussionsByProjectId", { projectId: projectId }).done(function (data) {
            documnetObservable.data(data);
        });
    };


    var getAccountsDiscussionCommentsByDiscussId = function (documnetObservable, discussId) {
        $.getJSON(config.remoteServerName + "/GetAccountsDiscussionCommentsByDisscussId", { discussId: discussId }).done(function (data) {
            documnetObservable.data(data);
        });
    };


    var addAccountsDiscussionComments = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddAccountsDiscussionComments", documnetObservable);
    };


    var addAccountsDiscussion = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddAccountsDiscussion", documnetObservable);
    };

    var dataservice = {
        checkRefCodeEmployee: checkRefCodeEmployee,
        checkUserNameAccount: checkUserNameAccount,
        checkRefCodeEmployeeEdit: checkRefCodeEmployeeEdit,
        checkUserNameAccountEdit: checkUserNameAccountEdit,
        projectProjectsGetAllExceptprojectId: projectProjectsGetAllExceptprojectId,
        changeProjectEpsParent: changeProjectEpsParent,
        checkReferanceCode: checkReferanceCode,
        getStoreSummaryInAccount: getStoreSummaryInAccount,
        storeSummaryInAccount: storeSummaryInAccount,
        getProjectScheduleItemsById: getProjectScheduleItemsById,
        getDefaultListForList: getDefaultListForList,
        deleteTodayExpensesUser: deleteTodayExpensesUser,
        updateStatus: updateStatus,
        updateSuspended: updateSuspended,
        getTasksAsignUsersByAccountId: getTasksAsignUsersByAccountId,
        getHeaderFooterByType: getHeaderFooterByType,
        getTaskDetail: getTaskDetail,
        checkUserEmail: checkUserEmail,
        updateStatusInbox: updateStatusInbox,
        getAccountsProjectsByIdForList: getAccountsProjectsByIdForList,
        addProjectProjectsCompaniesList: addProjectProjectsCompaniesList,

        updateStatusPostit: updateStatusPostit,
        getPassWordEncrypt: getPassWordEncrypt,
        getAccountsDiscussionsByProjectId: getAccountsDiscussionsByProjectId,
        getAccountsDiscussionCommentsByDiscussId: getAccountsDiscussionCommentsByDiscussId,
        addAccountsDiscussionComments: addAccountsDiscussionComments,
        addAccountsDiscussion: addAccountsDiscussion,
        getAccountsChunk: getAccountsChunk,
        getVacationSummarySupervisorDetails: getVacationSummarySupervisorDetails,
        getTransactionVacationSupervisorByCount: getTransactionVacationSupervisorByCount,
        getExcusesSummarySupervisorDetails: getExcusesSummarySupervisorDetails,
        getVacationSummaryDetails: getVacationSummaryDetails,
        getTransactionVacationByCount: getTransactionVacationByCount,
        getCompareAccount: getCompareAccount,
        getExcusesSummaryDetails: getExcusesSummaryDetails,
        getTransactionLoansByCount: getTransactionLoansByCount,
        getDocApprovalDetailsInboxInHr: getDocApprovalDetailsInboxInHr,
        getCompaniesForAccounts: getCompaniesForAccounts,
        getListTypesOnly: getListTypesOnly,
        getExpensesByDates: getExpensesByDates,
        sendRequestsExpensesByDates: sendRequestsExpensesByDates,
        getContactsHasAccountsByCompanyId: getContactsHasAccountsByCompanyId,
        getAccountsProjectsById: getAccountsProjectsById,
        getMyNotifcations: getMyNotifcations,
        projectProjectsById: projectProjectsById,
        projectProjectsEdit: projectProjectsEdit,
        getContractsOrdersItemById: getContractsOrdersItemById,
        getTasksAsignUsers: getTasksAsignUsers,
        updateChangePassword: updateChangePassword,
        updateVacations: updateVacations,
        getProjectsNotAccountsProjects: getProjectsNotAccountsProjects,
        updateMultiApproval: updateMultiApproval,
        sendWorkFlowApproval: sendWorkFlowApproval,
        getCycleWorkflowByDocIdDocType: getCycleWorkflowByDocIdDocType,
        transferTask: transferTask,
        getCommunicationMaterialRequestForInspection: getCommunicationMaterialRequestForInspection,
        getCommunicationMaterialRequestForInspectionForEdit: getCommunicationMaterialRequestForInspectionForEdit,
        editCommunicationMaterialRequestForInspection: editCommunicationMaterialRequestForInspection,
        addCommunicationMaterialRequestForInspection: addCommunicationMaterialRequestForInspection,
        deleteCommunicationMaterialRequestForInspection: deleteCommunicationMaterialRequestForInspection,
        getCommunicationMaterialRequestForInspectionCycles: getCommunicationMaterialRequestForInspectionCycles,
        getCommunicationMaterialRequestForInspectionCyclesForEdit: getCommunicationMaterialRequestForInspectionCyclesForEdit,
        editCommunicationMaterialRequestForInspectionCycles: editCommunicationMaterialRequestForInspectionCycles,
        addCommunicationMaterialRequestForInspectionCycles: addCommunicationMaterialRequestForInspectionCycles,
        deleteCommunicationMaterialRequestForInspectionCycles: deleteCommunicationMaterialRequestForInspectionCycles,
        getCommunicationNcrCycleItems: getCommunicationNcrCycleItems,
        getCommunicationNcrCycleItemsForEdit: getCommunicationNcrCycleItemsForEdit,
        editCommunicationNcrCycleItems: editCommunicationNcrCycleItems,
        addCommunicationNcrCycleItems: addCommunicationNcrCycleItems,
        deleteCommunicationNcrCycleItems: deleteCommunicationNcrCycleItems,
        getCommunicationNCRCycles: getCommunicationNCRCycles,
        getCommunicationNCRCyclesForEdit: getCommunicationNCRCyclesForEdit,
        editCommunicationNCRCycles: editCommunicationNCRCycles,
        addCommunicationNCRCycles: addCommunicationNCRCycles,
        deleteCommunicationNCRCycles: deleteCommunicationNCRCycles,
        getCommunicationRequestForInspection: getCommunicationRequestForInspection,
        getCommunicationRequestForInspectionForEdit: getCommunicationRequestForInspectionForEdit,
        editCommunicationRequestForInspection: editCommunicationRequestForInspection,
        addCommunicationRequestForInspection: addCommunicationRequestForInspection,
        deleteCommunicationRequestForInspection: deleteCommunicationRequestForInspection,
        getCommunicationRequestForInspectionCycles: getCommunicationRequestForInspectionCycles,
        getCommunicationRequestForInspectionCyclesForEdit: getCommunicationRequestForInspectionCyclesForEdit,
        editCommunicationRequestForInspectionCycles: editCommunicationRequestForInspectionCycles,
        addCommunicationRequestForInspectionCycles: addCommunicationRequestForInspectionCycles,
        deleteCommunicationRequestForInspectionCycles: deleteCommunicationRequestForInspectionCycles,
        getActionByCount: getActionByCount,
        getBoqQuantityRequestedAlert: getBoqQuantityRequestedAlert,
        getAlertsCount: getAlertsCount,
        getNotCodedInvoicesSummary: getNotCodedInvoicesSummary,
        getNotCodedPaymentsSummary: getNotCodedPaymentsSummary,
        getInboxSummary: getInboxSummary,
        getDistributionInboxSummary: getDistributionInboxSummary,
        getNotCodedExpensesSummary: getNotCodedExpensesSummary,
        getAssessmentSummary: getAssessmentSummary,
        getClosedDocumentsSummaryCount: getClosedDocumentsSummaryCount,
        getOppenedDocumentsSummaryCount: getOppenedDocumentsSummaryCount,
        getOppenedDocuments: getOppenedDocuments,
        getBudgetVarianceByProject: getBudgetVarianceByProject,
        getProjectProjectsExpensessByProjectId: getProjectProjectsExpensessByProjectId,
        getProjectProjectsExpensesForEdit: getProjectProjectsExpensesForEdit,
        editProjectProjectsExpenses: editProjectProjectsExpenses,
        addProjectProjectsExpenses: addProjectProjectsExpenses,
        deleteProjectProjectsExpenses: deleteProjectProjectsExpenses,
        getContractsProcurement: getContractsProcurement,
        getContractsProcurementForEdit: getContractsProcurementForEdit,
        editContractsProcurement: editContractsProcurement,
        addContractsProcurement: addContractsProcurement,
        deleteContractsProcurement: deleteContractsProcurement,
        getContractsProcurementContractors: getContractsProcurementContractors,
        getContractsProcurementContractorsForEdit: getContractsProcurementContractorsForEdit,
        editContractsProcurementContractors: editContractsProcurementContractors,
        addContractsProcurementContractors: addContractsProcurementContractors,
        deleteContractsProcurementContractors: deleteContractsProcurementContractors,
        getContractsProcurementContractorsItems: getContractsProcurementContractorsItems,
        getContractsProcurementContractorsItemsForEdit: getContractsProcurementContractorsItemsForEdit,
        editContractsProcurementContractorsItems: editContractsProcurementContractorsItems,
        addContractsProcurementContractorsItems: addContractsProcurementContractorsItems,
        deleteContractsProcurementContractorsItems: deleteContractsProcurementContractorsItems,
        getContractsProcurementItems: getContractsProcurementItems,
        getContractsProcurementItemsForEdit: getContractsProcurementItemsForEdit,
        editContractsProcurementItems: editContractsProcurementItems,
        addContractsProcurementItems: addContractsProcurementItems,
        getSalaryCategories: getSalaryCategories,
        getAccounts: getAccounts,
        getAccountsDefaultListTypes: getAccountsDefaultListTypes,
        accountsPermissionsGroupsGet: accountsPermissionsGroupsGet,
        getPermissionsGroupsGrid: getPermissionsGroupsGrid,
        accountsPermissionsGroupsDelete: accountsPermissionsGroupsDelete,
        accountsPermissionsGroupsGetById: accountsPermissionsGroupsGetById,
        accountsPermissionsGroupsEdit: accountsPermissionsGroupsEdit,
        accountsPermissionsGroupsAdd: accountsPermissionsGroupsAdd,
        accountsGroupGetByGroupId: accountsGroupGetByGroupId,
        projectProjectsSelectByEps: projectProjectsSelectByEps,
        addProjectHeaderFooter: addProjectHeaderFooter,
        editProjectHeaderFooter: editProjectHeaderFooter,
        projectProjectsDelete: projectProjectsDelete,
        getProjectsEpsByAccountId: getProjectsEpsByAccountId,
        projectProjectsSelectAll: projectProjectsSelectAll,
        addProjectDistributionList: addProjectDistributionList,
        deleteProjectCheckListItem: deleteProjectCheckListItem,
        projectHeaderFooterGet: projectHeaderFooterGet,
        editProjectCheckList: editProjectCheckList,
        projectWorkFlowGetForDp: projectWorkFlowGetForDp,
        getProjectHeaderFooterForEdit: getProjectHeaderFooterForEdit,
        addProjectCheckListItem: addProjectCheckListItem,
        addProjectCheckList: addProjectCheckList,
        getProjectCheckListItemsByCheckListId: getProjectCheckListItemsByCheckListId,
        deleteProjectDistributionListItem: deleteProjectDistributionListItem,
        editProjectDistributionList: editProjectDistributionList,
        addProjectDistributionListItem: addProjectDistributionListItem,
        getProjectDistributionListItemsByDistributionId: getProjectDistributionListItemsByDistributionId,
        projectProjectsAdd: projectProjectsAdd,
        communicationProposalSelectAllByProjectId: communicationProposalSelectAllByProjectId,
        getCommunicationProposalForEdit: getCommunicationProposalForEdit,
        addCommunicationProposal: addCommunicationProposal,
        editCommunicationProposal: editCommunicationProposal,
        communicationReportsSelectAllByProjectId: communicationReportsSelectAllByProjectId,
        addCommunicationReport: addCommunicationReport,
        getProjectPictureForEdit: getProjectPictureForEdit,
        editProjectPicture: editProjectPicture,
        editCommunicationReport: editCommunicationReport,
        getCommunicationReportForEdit: getCommunicationReportForEdit,
        getProjectDistributionListForEdit: getProjectDistributionListForEdit,
        getProjectCheckListForEdit: getProjectCheckListForEdit,
        getContactsByCompanyId: getContactsByCompanyId,
        projectWorkFlowGet: projectWorkFlowGet,
        projectPicturesGet: projectPicturesGet,
        addProjectPicture: addProjectPicture,
        projectCheckListGet: projectCheckListGet,
        projectDistributionListGet: projectDistributionListGet,
        getAccountsById: getAccountsById,
        getCompanies: getCompanies,
        getGroup: getGroup,
        getAccountsDefaultList: getAccountsDefaultList,
        editSalaryCategory: editSalaryCategory,
        addSalaryCategory: addSalaryCategory,
        getSalaryCategoryForEdit: getSalaryCategoryForEdit,
        deleteSalaryCategory: deleteSalaryCategory,
        accountsDefaultListDelete: accountsDefaultListDelete,
        editAccountsDefaultList: editAccountsDefaultList,
        addAccount: addAccount,
        editAccount: editAccount,
        getAccountsDefaultListForEdit: getAccountsDefaultListForEdit,
        accountDeleteById: accountDeleteById,
        addAccountsDefaultList: addAccountsDefaultList,
        getEpsById: getEpsById,
        deletEpsById: deletEpsById,
        editEpsById: editEpsById,
        addEps: addEps,
        ChangeEpsParent: changeEpsParent,
        moveUpEps: moveUpEps,
        MoveDownEps: moveDownEps,
        getProjectCompanies: getProjectCompanies,
        getProjectCompaniesGrid: getProjectCompaniesGrid,
        getPostitSent: getPostitSent,
        getPostitSentById: getPostitSentById,
        deletePostit: deletePostit,
        EditPostit: editPostit,
        getPostitRecieved: getPostitRecieved,
        AddPostit: addPostit,
        projectCompaniesDelete: projectCompaniesDelete,
        addProjectCompanies: addProjectCompanies,
        addCompanyContact: addCompanyContact,
        addCompanyContactOnly: addCompanyContactOnly,
        getConfigurations: getConfigurations,
        getConfiguration: getConfiguration,
        editConfigurationById: editConfigurationById,
        getAccountsDefaultListLists: getAccountsDefaultListLists,
        getSupplierAnalysisSections: getSupplierAnalysisSections,
        addSupplierAnalysisSections: addSupplierAnalysisSections,
        editSupplierAnalysisSections: editSupplierAnalysisSections,
        supplierAnalysisSectionsDelete: supplierAnalysisSectionsDelete,
        getSupplierAnalysisSectionsForEdit: getSupplierAnalysisSectionsForEdit,
        getEps: getEps,
        getSupplierAnalysisSectionsItems: getSupplierAnalysisSectionsItems,
        addSupplierAnalysisSectionsItems: addSupplierAnalysisSectionsItems,
        editSupplierAnalysisSectionsItems: editSupplierAnalysisSectionsItems,
        supplierAnalysisSectionsItemsDelete: supplierAnalysisSectionsItemsDelete,
        getSupplierAnalysisSectionsItemsForEdit: getSupplierAnalysisSectionsItemsForEdit,
        getSupplierAnalysisSectionsList: getSupplierAnalysisSectionsList,
        getActiveProjects: getActiveProjects,
        getAccountsProjects: getAccountsProjects,
        addAccountsProjects: addAccountsProjects,
        AccountsProjectsDelete: accountsProjectsDelete,
        getSheetsByContactandType: getSheetsByContactandType,
        deleteSheet: deleteSheet,
        addSheet: addSheet,
        getProjectCompaniesForEdit: getProjectCompaniesForEdit,
        editProjectCompanies: editProjectCompanies,
        getAccountsContractsConditionsCategories: getAccountsContractsConditionsCategories,
        addAccountsContractsConditionsCategories: addAccountsContractsConditionsCategories,
        editAccountsContractsConditionsCategories: editAccountsContractsConditionsCategories,
        accountsContractsConditionsCategoriesDelete: accountsContractsConditionsCategoriesDelete,
        getAccountsContractsConditionsCategoriesForEdit: getAccountsContractsConditionsCategoriesForEdit,
        designDisciplineSectionsForEdit: designDisciplineSectionsForEdit,
        getDesignDiscipline: getDesignDiscipline,
        getDesignDisciplineList: getDesignDisciplineList,
        addDesignDiscipline: addDesignDiscipline,
        editDesignDiscipline: editDesignDiscipline,
        designDisciplineDelete: designDisciplineDelete,
        getDesignDisciplineForEdit: getDesignDisciplineForEdit,
        getDesignDisciplineSections: getDesignDisciplineSections,
        addDesignDisciplineSections: addDesignDisciplineSections,
        editDesignDisciplineSections: editDesignDisciplineSections,
        designDisciplineSectionsDelete: designDisciplineSectionsDelete,
        getAccountsContractsParticularConditions: getAccountsContractsParticularConditions,
        addAccountsContractsParticularConditions: addAccountsContractsParticularConditions,
        accountsContractsParticularConditionsDelete: accountsContractsParticularConditionsDelete,
        getAccountsContractsParticularConditionsForEdit: getAccountsContractsParticularConditionsForEdit,
        editAccountsContractsParticularConditions: editAccountsContractsParticularConditions,
        getAccountsContractsGeneralConditions: getAccountsContractsGeneralConditions,
        addAccountsContractsGeneralConditions: addAccountsContractsGeneralConditions,
        editAccountsContractsGeneralConditions: editAccountsContractsGeneralConditions,
        accountsContractsGeneralConditionsDelete: accountsContractsGeneralConditionsDelete,
        getAccountsContractsGeneralConditionsForEdit: getAccountsContractsGeneralConditionsForEdit,
        getAccountsContractsGeneralConditionsArrange: getAccountsContractsGeneralConditionsArrange,
        getAccountsContractsConditionsCategoriesList: getAccountsContractsConditionsCategoriesList,
        getAccountsContractsParticularConditionsArrange: getAccountsContractsParticularConditionsArrange,
        getAccountsTenderAnalysisSections: getAccountsTenderAnalysisSections,
        addAccountsTenderAnalysisSections: addAccountsTenderAnalysisSections,
        editAccountsTenderAnalysisSections: editAccountsTenderAnalysisSections,
        accountsTenderAnalysisSectionsDelete: accountsTenderAnalysisSectionsDelete,
        getAccountsTenderAnalysisSectionsForEdit: getAccountsTenderAnalysisSectionsForEdit,
        getAccountsTenderAnalysisSectionsItems: getAccountsTenderAnalysisSectionsItems,
        addAccountsTenderAnalysisSectionsItems: addAccountsTenderAnalysisSectionsItems,
        editAccountsTenderAnalysisSectionsItems: editAccountsTenderAnalysisSectionsItems,
        accountsTenderAnalysisSectionsItemsDelete: accountsTenderAnalysisSectionsItemsDelete,
        getAccountsTenderAnalysisSectionsItemsForEdit: getAccountsTenderAnalysisSectionsItemsForEdit,
        getAccountsEpsByAccountId: getAccountsEpsByAccountId,
        login: login,
        getAccountsTenderAnalysisSectionsList: getAccountsTenderAnalysisSectionsList,
        UserCompanyDelete: userCompanyDelete,
        addUserCompanies: addUserCompanies,
        getUserCompanies: getUserCompanies,
        checkTokenValidity: checkTokenValidity,
        transferCompanyContact: transferCompanyContact,
        getCompanyContactForEdit: getCompanyContactForEdit,
        companyContactDelete: companyContactDelete,
        editCompanyContact: editCompanyContact,
        getCompanyContact: getCompanyContact,
        getGroupsPermissions: getGroupsPermissions,
        getProjectCompaniesList: getProjectCompaniesList,
        addGroupsPermissions: addGroupsPermissions,
        editGroupsPermissions: editGroupsPermissions,
        getExpensesUser: getExpensesUser,
        addExpensesUser: addExpensesUser,
        editExpensesUser: editExpensesUser,
        expensesUserDelete: expensesUserDelete,
        getExpensesUserForEdit: getExpensesUserForEdit,
        getTodayExpensesUser: getTodayExpensesUser,
        getAccountsDefaultListListsNotAction: getAccountsDefaultListListsNotAction,
        getCommunicationRfi: getCommunicationRfi,
        getCommunicationRfiByParentId: getCommunicationRfiByParentId,
        addCommunicationRfi: addCommunicationRfi,
        editCommunicationRfi: editCommunicationRfi,
        communicationRfiDelete: communicationRfiDelete,
        getCommunicationRfiForEdit: getCommunicationRfiForEdit,
        deleteLetters: deleteLetters,
        addLetters: addLetters,
        getLetters: getLetters,
        getLettersAttaches: getLettersAttaches,
        getLettersForEdit: getLettersForEdit,
        editLetters: editLetters,
        getProjectsForMenue: getProjectsForMenue,
        getProjectProjectsCompanies: getProjectProjectsCompanies,
        getLettersReplay: getLettersReplay,
        deletePhones: deletePhones,
        addPhones: addPhones,
        getPhones: getPhones,
        getPhonesAttaches: getPhonesAttaches,
        getPhonesForEdit: getPhonesForEdit,
        editPhones: editPhones,
        getVacationByAccountId: getVacationByAccountId,
        getCommunicationEmails: getCommunicationEmails,
        addCommunicationEmails: addCommunicationEmails,
        editCommunicationEmails: editCommunicationEmails,
        communicationEmailsDelete: communicationEmailsDelete,
        getCommunicationEmailsForEdit: getCommunicationEmailsForEdit,
        getContactsNotUsersByCompanyId: getContactsNotUsersByCompanyId,
        deleteRequestProposal: deleteRequestProposal,
        addRequestProposal: addRequestProposal,
        editRequestProposal: editRequestProposal,
        getRequestProposalForEdit: getRequestProposalForEdit,
        getRequestProposalAttaches: getRequestProposalAttaches,
        getRequestProposal: getRequestProposal,
        getCommunicationInternalMemo: getCommunicationInternalMemo,
        addCommunicationInternalMemo: addCommunicationInternalMemo,
        editCommunicationInternalMemo: editCommunicationInternalMemo,
        communicationInternalMemoDelete: communicationInternalMemoDelete,
        getCommunicationInternalMemoForEdit: getCommunicationInternalMemoForEdit,
        getFormTemplates: getFormTemplates,
        saveFormTemplate: saveFormTemplate,
        addAccountsEps: addAccountsEps,
        getCommunicationCorrespondenceSent: getCommunicationCorrespondenceSent,
        addCommunicationCorrespondenceSent: addCommunicationCorrespondenceSent,
        editCommunicationCorrespondenceSent: editCommunicationCorrespondenceSent,
        communicationCorrespondenceSentDelete: communicationCorrespondenceSentDelete,
        getCommunicationCorrespondenceSentForEdit: getCommunicationCorrespondenceSentForEdit,
        getAccountsDocType: getAccountsDocType,
        getCommunicationCorrespondenceReceived: getCommunicationCorrespondenceReceived,
        addCommunicationCorrespondenceReceived: addCommunicationCorrespondenceReceived,
        editCommunicationCorrespondenceReceived: editCommunicationCorrespondenceReceived,
        communicationCorrespondenceReceivedDelete: communicationCorrespondenceReceivedDelete,
        getCommunicationCorrespondenceReceivedForEdit: getCommunicationCorrespondenceReceivedForEdit,
        getFilesByDocTypeAndDocId: getFilesByDocTypeAndDocId,
        addTaskGroup: addTaskGroup,
        addTaskGroupItem: addTaskGroupItem,
        getAccountsAlerts: getAccountsAlerts,
        addAccountsAlerts: addAccountsAlerts,
        editAccountsAlerts: editAccountsAlerts,
        accountsAlertsDelete: accountsAlertsDelete,
        getAccountsAlertsForEdit: getAccountsAlertsForEdit,
        getAccountsBic: getAccountsBic,
        accountsEpsDelete: accountsEpsDelete,
        addAccountsBic: addAccountsBic,
        editAccountsBic: editAccountsBic,
        accountsBicDelete: accountsBicDelete,
        getAccountsBicForEdit: getAccountsBicForEdit,
        getAccountsDocTypeWithModules: getAccountsDocTypeWithModules,
        getProjectTaskGroups: getProjectTaskGroups,
        editProjectTaskGroups: editProjectTaskGroups,
        projectTaskGroupsObservableDelete: projectTaskGroupsObservableDelete,
        getProjectTaskGroupsForEdit: getProjectTaskGroupsForEdit,
        getProjectTaskGroupItemsByTaskId: getProjectTaskGroupItemsByTaskId,
        projectTaskGroupsItemObservableDelete: projectTaskGroupsItemObservableDelete,
        getProjectsForms: getProjectsForms,
        addProjectsForms: addProjectsForms,
        editProjectsForms: editProjectsForms,
        projectsFormsDelete: projectsFormsDelete,
        getProjectsFormsForEdit: getProjectsFormsForEdit,
        getCommunicationMeetingAgenda: getCommunicationMeetingAgenda,
        addCommunicationMeetingAgenda: addCommunicationMeetingAgenda,
        editCommunicationMeetingAgenda: editCommunicationMeetingAgenda,
        communicationMeetingAgendaDelete: communicationMeetingAgendaDelete,
        getCommunicationMeetingAgendaForEdit: getCommunicationMeetingAgendaForEdit,
        getProjectProjectsCompaniesLog: getProjectProjectsCompaniesLog,
        projectProjectsCompaniesDelete: projectProjectsCompaniesDelete,
        addProjectProjectsCompanies: addProjectProjectsCompanies,
        getCommunicationMeetingAgendaTopics: getCommunicationMeetingAgendaTopics,
        addCommunicationMeetingAgendaTopics: addCommunicationMeetingAgendaTopics,
        editCommunicationMeetingAgendaTopics: editCommunicationMeetingAgendaTopics,
        communicationMeetingAgendaTopicsDelete: communicationMeetingAgendaTopicsDelete,
        getCommunicationMeetingAgendaTopicsForEdit: getCommunicationMeetingAgendaTopicsForEdit,
        addWorkFlow: addWorkFlow,
        addWorkFlowItem: addWorkFlowItem,
        addWorkFlowDocument: addWorkFlowDocument,
        editWorkFlow: editWorkFlow,
        getWorkFlowForEdit: getWorkFlowForEdit,
        getWorkFlowItemsByWorkFlowId: getWorkFlowItemsByWorkFlowId,
        getWorkFlowDocumentsByWorkFlowId: getWorkFlowDocumentsByWorkFlowId,
        workFlowDocumentsByWorkFlowIdObservableDelete: workFlowDocumentsByWorkFlowIdObservableDelete,
        workFlowItemsByWorkFlowIdObservableDelete: workFlowItemsByWorkFlowIdObservableDelete,
        getProjectOrganizationChart: getProjectOrganizationChart,
        addProjectOrganizationChart: addProjectOrganizationChart,
        editProjectOrganizationChart: editProjectOrganizationChart,
        projectOrganizationChartDelete: projectOrganizationChartDelete,
        getProjectOrganizationChartForEdit: getProjectOrganizationChartForEdit,
        getCommunicationMeetingAgendaAttendees: getCommunicationMeetingAgendaAttendees,
        addCommunicationMeetingAgendaAttendees: addCommunicationMeetingAgendaAttendees,
        editCommunicationMeetingAgendaAttendees: editCommunicationMeetingAgendaAttendees,
        communicationMeetingAgendaAttendeesDelete: communicationMeetingAgendaAttendeesDelete,
        getCommunicationMeetingAgendaAttendeesForEdit: getCommunicationMeetingAgendaAttendeesForEdit,
        getCommunicationMeetingMinutesInternal: getCommunicationMeetingMinutesInternal,
        getCommunicationMeetingMinutesExternal: getCommunicationMeetingMinutesExternal,
        addCommunicationMeetingMinutes: addCommunicationMeetingMinutes,
        editCommunicationMeetingMinutes: editCommunicationMeetingMinutes,
        communicationMeetingMinutesDelete: communicationMeetingMinutesDelete,
        getCommunicationMeetingMinutesForEdit: getCommunicationMeetingMinutesForEdit,
        getCommunicationMeetingMinutesTopics: getCommunicationMeetingMinutesTopics,
        addCommunicationMeetingMinutesTopics: addCommunicationMeetingMinutesTopics,
        editCommunicationMeetingMinutesTopics: editCommunicationMeetingMinutesTopics,
        communicationMeetingMinutesTopicsDelete: communicationMeetingMinutesTopicsDelete,
        getCommunicationMeetingMinutesTopicsForEdit: getCommunicationMeetingMinutesTopicsForEdit,
        getCommunicationMeetingMinutesAttendees: getCommunicationMeetingMinutesAttendees,
        addCommunicationMeetingMinutesAttendees: addCommunicationMeetingMinutesAttendees,
        editCommunicationMeetingMinutesAttendees: editCommunicationMeetingMinutesAttendees,
        communicationMeetingMinutesAttendeesDelete: communicationMeetingMinutesAttendeesDelete,
        getCommunicationMeetingMinutesAttendeesForEdit: getCommunicationMeetingMinutesAttendeesForEdit,
        getCommunicationTransmittal: getCommunicationTransmittal,
        addCommunicationTransmittal: addCommunicationTransmittal,
        editCommunicationTransmittal: editCommunicationTransmittal,
        communicationTransmittalDelete: communicationTransmittalDelete,
        getCommunicationTransmittalForEdit: getCommunicationTransmittalForEdit,
        getExpensesUserByRange: getExpensesUserByRange,
        getAccountsDocTypesAsTree: getAccountsDocTypesAsTree,
        getTimeSheetByRange: getTimeSheetByRange,
        projectScheduleGet: projectScheduleGet,
        addProjectScheduleItem: addProjectScheduleItem,
        deleteProjectScheduleItem: deleteProjectScheduleItem,
        getProjectScheduleForEdit: getProjectScheduleForEdit,
        getProjectScheduleItemsByScheduleId: getProjectScheduleItemsByScheduleId,
        addProjectSchedule: addProjectSchedule,
        editProjectSchedule: editProjectSchedule,
        getPrimaveraSchedule: getPrimaveraSchedule,
        addPrimaveraSchedule: addPrimaveraSchedule,
        editPrimaveraSchedule: editPrimaveraSchedule,
        primaveraScheduleDelete: primaveraScheduleDelete,
        getPrimaveraScheduleForEdit: getPrimaveraScheduleForEdit, getTasks: getTasks,
        getTasksAttaches: getTasksAttaches,
        getTaskForEdit: getTaskForEdit,
        editTask: editTask,
        addTask: addTask,
        deleteTask: deleteTask,
        getPrimaveraScheduleItems: getPrimaveraScheduleItems,
        addPrimaveraScheduleItems: addPrimaveraScheduleItems,
        getTasksByContactId: getTasksByContactId,
        copyDocument: copyDocument,
        geProjectWorkFlowContactsFirstLevel: geProjectWorkFlowContactsFirstLevel,
        primaveraScheduleItemsDelete: primaveraScheduleItemsDelete,
        getProjectTaskGroupsList: getProjectTaskGroupsList,
        snedToWorkFlow: snedToWorkFlow,
        sendTaskGroup: sendTaskGroup,
        sendTask: sendTask,
        addToEmailRecord: addToEmailRecord,
        getProjectDistributionListItems: getProjectDistributionListItems,
        snedToDistributionList: snedToDistributionList,
        getTasksByProjectIdList: getTasksByProjectIdList,
        getWorkFlowItemsByWorkFlowIdLevel: getWorkFlowItemsByWorkFlowIdLevel,
        getWorkFlowItemsByWorkFlowIdLevelList: getWorkFlowItemsByWorkFlowIdLevelList,
        sendByInbox: sendByInbox,
        sendByEmail: sendByEmail,
        getContractsQs: getContractsQs,
        addContractsQs: addContractsQs,
        editContractsQs: editContractsQs,
        contractsQsDelete: contractsQsDelete,
        getContractsQsForEdit: getContractsQsForEdit,
        getContracts: getContracts,
        getContractsForDp: getContractsForDp,
        getContractsAttaches: getContractsAttaches,
        getContractsForEdit: getContractsForEdit,
        editContracts: editContracts,
        addContracts: addContracts,
        deleteContracts: deleteContracts,
        getContractsBoq: getContractsBoq,
        addContractsBoq: addContractsBoq,
        editContractsBoq: editContractsBoq,
        contractsBoqDelete: contractsBoqDelete,
        getContractsBoqForEdit: getContractsBoqForEdit,
        getContractsBoqGroup: getContractsBoqGroup,
        addContractsBoqGroup: addContractsBoqGroup,
        editContractsBoqGroup: editContractsBoqGroup,
        contractsBoqGroupDelete: contractsBoqGroupDelete,
        getContractsBoqGroupForEdit: getContractsBoqGroupForEdit,
        getContractsBoqItems: getContractsBoqItems,
        addContractsBoqItems: addContractsBoqItems,
        editContractsBoqItems: editContractsBoqItems,
        contractsBoqItemsDelete: contractsBoqItemsDelete,
        getContractsBoqItemsForEdit: getContractsBoqItemsForEdit,
        getContractsPco: getContractsPco,
        accountsPermissionsGroupsGetList: accountsPermissionsGroupsGetList,
        useBoqPermissions: useBoqPermissions,
        getContractsPcoForEdit: getContractsPcoForEdit,
        addContractsPco: addContractsPco,
        editContractsPco: editContractsPco,
        getAccountsPermissionsGroups: getAccountsPermissionsGroups,
        getAccountGroupId: getAccountGroupId,
        addContractGroup: addContractGroup,
        getGroupsOutContract: getGroupsOutContract,
        getContractGroupsByContractId: getContractGroupsByContractId,
        getContractOrdersByContractId: getContractOrdersByContractId,
        getContractsOrderForEdit: getContractsOrderForEdit,
        editContracOrdertById: editContracOrdertById,
        addContractsOrder: addContractsOrder,
        deletContractOrderById: deletContractOrderById,
        getContractsPcoItemsByProposalIdType: getContractsPcoItemsByProposalIdType,
        getContractsQsItemsByqsId: getContractsQsItemsByqsId,
        addContractQsItem: addContractQsItem,
        addContractsPcoItems: addContractsPcoItems,
        getContractGeneralConditions: getContractGeneralConditions,
        getContractParticularConditions: getContractParticularConditions,
        addContractCondition: addContractCondition,
        getContractQsItemsForEdit: getContractQsItemsForEdit,
        deleteContractsPcoItems: deleteContractsPcoItems,
        deleteContractsPco: deleteContractsPco,
        getContractsRequestPayments: getContractsRequestPayments,
        addContractsRequestPayments: addContractsRequestPayments,
        editContractsRequestPayments: editContractsRequestPayments,
        contractsRequestPaymentsDelete: contractsRequestPaymentsDelete,
        getContractsRequestPaymentsForEdit: getContractsRequestPaymentsForEdit,
        getContractsRequestPaymentsDeductions: getContractsRequestPaymentsDeductions,
        addContractsRequestPaymentsDeductions: addContractsRequestPaymentsDeductions,
        editContractsRequestPaymentsDeductions: editContractsRequestPaymentsDeductions,
        contractsRequestPaymentsDeductionsDelete: contractsRequestPaymentsDeductionsDelete,
        getContractsRequestPaymentsDeductionsForEdit: getContractsRequestPaymentsDeductionsForEdit,
        getContractsRequestPaymentsItems: getContractsRequestPaymentsItems,
        addContractsRequestPaymentsItems: addContractsRequestPaymentsItems,
        editContractsRequestPaymentsItems: editContractsRequestPaymentsItems,
        contractsRequestPaymentsItemsDelete: contractsRequestPaymentsItemsDelete,
        getContractsRequestPaymentsItemsForEdit: getContractsRequestPaymentsItemsForEdit,
        editContractsQsItems: editContractsQsItems,
        deleteContractQsItems: deleteContractQsItems,
        getAccountsDefaultListListsWithAction: getAccountsDefaultListListsWithAction,
        deleteContractsSiteRequest: deleteContractsSiteRequest,
        getContractsSiteRequest: getContractsSiteRequest,
        getContractsSiteRequestForEdit: getContractsSiteRequestForEdit,
        addContractsSiteRequest: addContractsSiteRequest,
        editContractsSiteRequest: editContractsSiteRequest,
        getContractsSiteRequestItemsByRequestId: getContractsSiteRequestItemsByRequestId,
        addContractsSiteRequestItems: addContractsSiteRequestItems,
        deleteContractsSiteRequestItems: deleteContractsSiteRequestItems,
        getContractQsItemsEquipmentTypes: getContractQsItemsEquipmentTypes,
        getContractsBoqList: getContractsBoqList,
        getContractCostCoodingTreeAsTree: getContractCostCoodingTreeAsTree,
        getContractsOrdersItemsExcution: getContractsOrdersItemsExcution,
        getContractsList: getContractsList,
        getContractsSiteRequestItemsForEdit: getContractsSiteRequestItemsForEdit,
        editContractsSiteRequestItems: editContractsSiteRequestItems,
        getContractsChangeOrder: getContractsChangeOrder,
        addContractsChangeOrder: addContractsChangeOrder,
        editContractsChangeOrder: editContractsChangeOrder,
        contractsChangeOrderDelete: contractsChangeOrderDelete,
        getContractsChangeOrderForEdit: getContractsChangeOrderForEdit,
        getContractsBoqShowInCostCodingTree: getContractsBoqShowInCostCodingTree,
        getAllCodeFristTreeByBoqId: getAllCodeFristTreeByBoqId,
        getRequestPaymentsByContractId: getRequestPaymentsByContractId,
        addNewBoq: addNewBoq,
        addNewContract: addNewContract,
        getCostCodeTreeForEdit: getCostCodeTreeForEdit,
        addCostCodeTree: addCostCodeTree,
        getContractsPcoList: getContractsPcoList,
        getContractsBoqShowInSiteRequest: getContractsBoqShowInSiteRequest,
        editCostCodeTree: editCostCodeTree,
        deleteCostCodeTree: deleteCostCodeTree,
        getContractsBoqItemsOnlyParent: getContractsBoqItemsOnlyParent,
        moveUpCostCodeTree: moveUpCostCodeTree,
        moveDownCostCodeTree: moveDownCostCodeTree,
        getContractsBoqItemsTotal: getContractsBoqItemsTotal,
        getContractsProjectIssues: getContractsProjectIssues,
        addContractsProjectIssues: addContractsProjectIssues,
        editContractsProjectIssues: editContractsProjectIssues,
        contractsProjectIssuesDelete: contractsProjectIssuesDelete,
        getContractsProjectIssuesForEdit: getContractsProjectIssuesForEdit,
        getAccountsDocTypesVisisbleAsTree: getAccountsDocTypesVisisbleAsTree,
        getDocData: getDocData,
        addNewPurchaseOrder: addNewPurchaseOrder,
        getContractsInvoicesForPo: getContractsInvoicesForPo,
        deleteContractsInvoicesForPo: deleteContractsInvoicesForPo,
        getContractsPurchaseOrders: getContractsPurchaseOrders,
        getContractsPurchaseOrdersForEdit: getContractsPurchaseOrdersForEdit,
        contractsPurchaseOrderDelete: contractsPurchaseOrderDelete,
        addContractsPurchaseOrders: addContractsPurchaseOrders,
        editContractsPurchaseOrders: editContractsPurchaseOrders,
        getLogsDrawingsByProjectId: getLogsDrawingsByProjectId,
        getScheduleItemsByContractId: getScheduleItemsByContractId,
        getInsuranceItemsByContractId: getInsuranceItemsByContractId,
        projectScheduleGetByProjectId: projectScheduleGetByProjectId,
        getContractsPurchaseGroups: getContractsPurchaseGroups,
        getContractsPurchaseGroupsForEdit: getContractsPurchaseGroupsForEdit,
        contractsPurchaseGroupDelete: contractsPurchaseGroupDelete,
        addContractsPurchaseGroups: addContractsPurchaseGroups,
        editContractsPurchaseGroups: editContractsPurchaseGroups,
        getLogsDrawingsForEdit: getLogsDrawingsForEdit,
        addLogsDrawings: addLogsDrawings,
        addLogsDrawingsCycles: addLogsDrawingsCycles,
        getContractsPurchaseOrdersDb: getContractsPurchaseOrdersDb,
        getLogsDrawingsCyclesForEdit: getLogsDrawingsCyclesForEdit,
        editLogDrawing: editLogDrawing,
        editLogDrawingCycle: editLogDrawingCycle,
        getContractsOrdersItemsExcutionPo: getContractsOrdersItemsExcutionPo,
        getContractsInvoicesForPoForEdit: getContractsInvoicesForPoForEdit,
        editContractsInvoicesForPo: editContractsInvoicesForPo,
        addContractsInvoicesForPo: addContractsInvoicesForPo,
        addContractsInvoicesForPoItems: addContractsInvoicesForPoItems,
        getContractsBoqShowInCostCodingTreeDp: getContractsBoqShowInCostCodingTreeDp,
        getLogsSubmittalProjectId: getLogsSubmittalProjectId,
        getContractsInvoicesForPoItemsByInvoiceId: getContractsInvoicesForPoItemsByInvoiceId,
        getContractsBoqItemsBySpecsId: getContractsBoqItemsBySpecsId,
        getContractsOrdersItemsExcutionPosByPurchaseId: getContractsOrdersItemsExcutionPosByPurchaseId,
        getContractsOrdersItemsExcutionPosForEdit: getContractsOrdersItemsExcutionPosForEdit,
        contractsOrdersItemsExcutionPoDelete: contractsOrdersItemsExcutionPoDelete,
        addContractsOrdersItemsExcutionPos: addContractsOrdersItemsExcutionPos,
        editContractsOrdersItemsExcutionPos: editContractsOrdersItemsExcutionPos,
        deleteContractsInvoicesForPoItems: deleteContractsInvoicesForPoItems,
        getContractsInvoicesForPoItemsForEdit: getContractsInvoicesForPoItemsForEdit,
        editContractsInvoicesForPoItems: editContractsInvoicesForPoItems,
        addContractsInvoicesForPoDeductions: addContractsInvoicesForPoDeductions,
        getLogsSubmittalForEdit: getLogsSubmittalForEdit,
        addLogsSubmittal: addLogsSubmittal,
        addLogSubmittalCycles: addLogSubmittalCycles,
        getlogsSubmittalsCyclesForEdit: getlogsSubmittalsCyclesForEdit,
        editLogSubmittal: editLogSubmittal,
        editLogSubmittalCycle: editLogSubmittalCycle,
        getContractsInvoicesForPoDeductionsByInvoiceIdFactor: getContractsInvoicesForPoDeductionsByInvoiceIdFactor,
        getContractsChangeOrderForDrop: getContractsChangeOrderForDrop,
        addContractsChangeOrderByContractId: addContractsChangeOrderByContractId,
        deleteContractsInvoicesForPoDeductions: deleteContractsInvoicesForPoDeductions,
        addContractsOrderForPo: addContractsOrderForPo,
        addLogSubmittalItems: addLogSubmittalItems,
        editLogSubmittalItems: editLogSubmittalItems,
        getlogsSubmittalsItemsForEdit: getlogsSubmittalsItemsForEdit,
        getContractsChangeOrderByContractId: getContractsChangeOrderByContractId,
        getLogsDailyReports: getLogsDailyReports,
        deleteLogsDailyReports: deleteLogsDailyReports,
        getLogsDailyReportsForEdit: getLogsDailyReportsForEdit,
        editLogsDailyReports: editLogsDailyReports,
        addLogsDailyReports: addLogsDailyReports,
        getLogsSubmittalItemsBySubmittalId: getLogsSubmittalItemsBySubmittalId,
        addContractsPurchaseOrderTerms: addContractsPurchaseOrderTerms,
        getContractsPurchaseOrderTermssByProjectId: getContractsPurchaseOrderTermssByProjectId,
        getContractsPurchaseOrderTermssById: getContractsPurchaseOrderTermssById,
        deleteContractsPurchaseOrderTermsById: deleteContractsPurchaseOrderTermsById,
        editContractsPurchaseOrderTermss: editContractsPurchaseOrderTermss,
        getAccountsPurchaseOrderTerms: getAccountsPurchaseOrderTerms,
        addAccountsPurchaseOrderTerms: addAccountsPurchaseOrderTerms,
        getAccountsPurchaseOrderTermsForEdit: getAccountsPurchaseOrderTermsForEdit,
        accountsPurchaseOrderTermDelete: accountsPurchaseOrderTermDelete,
        editAccountsPurchaseOrderTerms: editAccountsPurchaseOrderTerms,
        getCollectedInvoicesIntervalRep: getCollectedInvoicesIntervalRep,
        getContractsPurchaseOrderScheduleItemssByPurchaseId: getContractsPurchaseOrderScheduleItemssByPurchaseId,
        getContractsPurchaseOrderScheduleItemssById: getContractsPurchaseOrderScheduleItemssById,
        deleteContractsPurchaseOrderScheduleItemsById: deleteContractsPurchaseOrderScheduleItemsById,
        addContractsPurchaseOrderScheduleItemss: addContractsPurchaseOrderScheduleItemss,
        deleteLogsSubmittalsCyclesById: deleteLogsSubmittalsCyclesById,
        deleteLogsSubmittalsById: deleteLogsSubmittalsById,
        getLogsDailyReportsWorkActivity: getLogsDailyReportsWorkActivity,
        getLogsDailyReportsFieldForce: getLogsDailyReportsFieldForce,
        getLogsDailyReportsMaterial: getLogsDailyReportsMaterial,
        getLogsDailyReportsEquipment: getLogsDailyReportsEquipment,
        getLogsDailyReportsVisitors: getLogsDailyReportsVisitors,
        getLogsDailyReportsWeather: getLogsDailyReportsWeather,
        addLogsDailyWorkActivity: addLogsDailyWorkActivity,
        addLogsDailyReportsFieldForce: addLogsDailyReportsFieldForce,
        addLogsDailyReportsMaterial: addLogsDailyReportsMaterial,
        addLogsDailyReportsEquipment: addLogsDailyReportsEquipment,
        addLogsDailyReportsVisitors: addLogsDailyReportsVisitors,
        addLogsDailyReportsWeather: addLogsDailyReportsWeather,
        deleteLogsDailyReportsWorkActivity: deleteLogsDailyReportsWorkActivity,
        deleteLogsDailyReportsFieldForce: deleteLogsDailyReportsFieldForce,
        deleteLogsDailyReportsMaterial: deleteLogsDailyReportsMaterial,
        deleteLogsDailyReportsEquipment: deleteLogsDailyReportsEquipment,
        deleteLogsDailyReportsVisitors: deleteLogsDailyReportsVisitors,
        deleteLogsDailyReportsWeather: deleteLogsDailyReportsWeather,
        deleteLogsSubmittalsItemsById: deleteLogsSubmittalsItemsById,
        getContractsPurchaseOrderInsurancesByProjectId: getContractsPurchaseOrderInsurancesByProjectId,
        getContractsPurchaseOrderInsurancesById: getContractsPurchaseOrderInsurancesById,
        deleteContractsPurchaseOrderInsuranceById: deleteContractsPurchaseOrderInsuranceById,
        addContractsPurchaseOrderInsurances: addContractsPurchaseOrderInsurances,
        getContractsPurchaseOrderSubPos: getContractsPurchaseOrderSubPos,
        getDesignDrawingList: getDesignDrawingList,
        getDesignDrawingListForEdit: getDesignDrawingListForEdit,
        editDesignDrawingList: editDesignDrawingList,
        addDesignDrawingList: addDesignDrawingList,
        deleteDesignDrawingList: deleteDesignDrawingList,
        getDesignDrawingListItemsByDrawingListId: getDesignDrawingListItemsByDrawingListId,
        getDesignDrawingListItemsForEdit: getDesignDrawingListItemsForEdit,
        editDesignDrawingListItems: editDesignDrawingListItems,
        addDesignDrawingListItems: addDesignDrawingListItems,
        deleteDesignDrawingListItems: deleteDesignDrawingListItems,
        getLogsSiteInstructions: getLogsSiteInstructions,
        getLogsSiteInstructionsForEdit: getLogsSiteInstructionsForEdit,
        editLogsSiteInstructions: editLogsSiteInstructions,
        addLogsSiteInstructions: addLogsSiteInstructions,
        logsSiteInstructionsDelete: logsSiteInstructionsDelete,
        addLogsDrawingsSets: addLogsDrawingsSets,
        deleteLogsDrawingsSets: deleteLogsDrawingsSets,
        getLogsDrawingsSetsDoc: getLogsDrawingsSetsDoc,
        getLogsDrawingsSetsDocForEdit: getLogsDrawingsSetsDocForEdit,
        editLogsDrawingsSetsDoc: editLogsDrawingsSetsDoc,
        addLogsDrawingsSetsDoc: addLogsDrawingsSetsDoc,
        deleteLogsDrawingsSetsDoc: deleteLogsDrawingsSetsDoc,
        getLogsDrawingsSets: getLogsDrawingsSets,
        getLogsDrawingsSetsForEdit: getLogsDrawingsSetsForEdit,
        editLogsDrawingsSets: editLogsDrawingsSets,
        getLogsDrawingsByProjectIdList: getLogsDrawingsByProjectIdList,
        getDesignDrawingPhases: getDesignDrawingPhases,
        getDesignDrawingPhasesForEdit: getDesignDrawingPhasesForEdit,
        designDrawingPhasesDelete: designDrawingPhasesDelete,
        editDesignDrawingPhases: editDesignDrawingPhases,
        getDesignDrawingLists: getDesignDrawingLists,
        addDesignDrawingPhases: addDesignDrawingPhases,
        getDesignDrawingListItemsByDrawingListIdForGrid: getDesignDrawingListItemsByDrawingListIdForGrid,
        getLogsSubmittalSets: getLogsSubmittalSets,
        getLogsSubmittalSetsForEdit: getLogsSubmittalSetsForEdit,
        editLogsSubmittalSets: editLogsSubmittalSets,
        addLogsSubmittalSets: addLogsSubmittalSets,
        deleteLogsSubmittalSets: deleteLogsSubmittalSets,
        getLogsSubmittalSetsDoc: getLogsSubmittalSetsDoc,
        getLogsSubmittalSetsDocForEdit: getLogsSubmittalSetsDocForEdit,
        editLogsSubmittalSetsDoc: editLogsSubmittalSetsDoc,
        addLogsSubmittalSetsDoc: addLogsSubmittalSetsDoc,
        deleteLogsSubmittalSetsDoc: deleteLogsSubmittalSetsDoc,
        getLogsSubmittalProjectIdList: getLogsSubmittalProjectIdList,
        getDesignDrawingPhasesItemsAndTransfer: getDesignDrawingPhasesItemsAndTransfer,
        getLogsMaterialReleasesByProjectId: getLogsMaterialReleasesByProjectId,
        getLogsMaterialReleasesForEdit: getLogsMaterialReleasesForEdit,
        editLogsMaterialRelease: editLogsMaterialRelease,
        addLogsMaterialRelease: addLogsMaterialRelease,
        deleteLogsMaterialRelease: deleteLogsMaterialRelease,
        getLogsMaterialReleaseCosts: getLogsMaterialReleaseCosts,
        getLogsMaterialReleaseCostsForEdit: getLogsMaterialReleaseCostsForEdit,
        editLogsMaterialReleaseCosts: editLogsMaterialReleaseCosts,
        addLogsMaterialReleaseCosts: addLogsMaterialReleaseCosts,
        deleteLogsMaterialReleaseCosts: deleteLogsMaterialReleaseCosts,
        getLogsMaterialReleaseTickets: getLogsMaterialReleaseTickets,
        getLogsMaterialReleaseTicketsForEdit: getLogsMaterialReleaseTicketsForEdit,
        editLogsMaterialReleaseTickets: editLogsMaterialReleaseTickets,
        addLogsMaterialReleaseTickets: addLogsMaterialReleaseTickets,
        deleteLogsMaterialReleaseTickets: deleteLogsMaterialReleaseTickets,
        getContractsSiteRequestList: getContractsSiteRequestList,
        getContractsBoqShowInCostCodingTreeList: getContractsBoqShowInCostCodingTreeList,
        getLogsMaterialInventorysByProjectId: getLogsMaterialInventorysByProjectId,
        getLogsMaterialInventoriesForEdit: getLogsMaterialInventoriesForEdit,
        logsMaterialInventoryDelete: logsMaterialInventoryDelete,
        addLogsMaterialInventories: addLogsMaterialInventories,
        editLogsMaterialInventories: editLogsMaterialInventories,
        getLogsMaterialInventoryHistories: getLogsMaterialInventoryHistories,
        getLogsMaterialInventoryHistoriesForEdit: getLogsMaterialInventoryHistoriesForEdit,
        logsMaterialInventoryHistoryDelete: logsMaterialInventoryHistoryDelete,
        addLogsMaterialInventoryHistories: addLogsMaterialInventoryHistories,
        editLogsMaterialInventoryHistories: editLogsMaterialInventoryHistories,
        addInurance: addInurance,
        addScheduleItem: addScheduleItem,
        getContractsProcurementList: getContractsProcurementList,
        getMaterialDelivery: getMaterialDelivery,
        getMaterialDeliveryForEdit: getMaterialDeliveryForEdit,
        editMaterialDelivery: editMaterialDelivery,
        addMaterialDelivery: addMaterialDelivery,
        deleteMaterialDelivery: deleteMaterialDelivery,
        deleteLogsMaterialDeliveryTickets: deleteLogsMaterialDeliveryTickets,
        addLogsMaterialDeliveryTickets: addLogsMaterialDeliveryTickets,
        getLogsMaterialDeliveryCosts: getLogsMaterialDeliveryCosts,
        getPoContract: getPoContract,
        getPoContractItem: getPoContractItem,
        getContractsOrdersItemsExcutionList: getContractsOrdersItemsExcutionList,
        getContractsChangeOrderSumTotal: getContractsChangeOrderSumTotal,
        getContractsOrderTotal: getContractsOrderTotal,
        getContractsOrderTotalExecuted: getContractsOrderTotalExecuted,
        getRequestPaymentsTopContractId: getRequestPaymentsTopContractId,
        getLogsMaterialDeliveryCostsForEdit: getLogsMaterialDeliveryCostsForEdit,
        editContractsRequestPaymentsUpdateTotalExcuted: editContractsRequestPaymentsUpdateTotalExcuted,
        getLogsMaterialDeliveryTickets: getLogsMaterialDeliveryTickets,
        getLogsMaterialInventorysByProjectIdList: getLogsMaterialInventorysByProjectIdList,
        getTenderAnalysis: getTenderAnalysis,
        getTenderAnalysisForEdit: getTenderAnalysisForEdit,
        editTenderAnalysis: editTenderAnalysis,
        addTenderAnalysis: addTenderAnalysis,
        deleteTenderAnalysis: deleteTenderAnalysis,
        getAccountsQualityControl: getAccountsQualityControl,
        getAccountsQualityControlForEdit: getAccountsQualityControlForEdit,
        editAccountsQualityControl: editAccountsQualityControl,
        addAccountsQualityControl: addAccountsQualityControl,
        deleteAccountsQualityControl: deleteAccountsQualityControl,
        getAccountsQualityControlItems: getAccountsQualityControlItems,
        getAccountsQualityControlItemsForEdit: getAccountsQualityControlItemsForEdit,
        editAccountsQualityControlItems: editAccountsQualityControlItems,
        addAccountsQualityControlItems: addAccountsQualityControlItems,
        deleteAccountsQualityControlItems: deleteAccountsQualityControlItems,
        getLogsPunchListDetailsByPunchListId: getLogsPunchListDetailsByPunchListId,
        getLogsPunchListDetailsForEdit: getLogsPunchListDetailsForEdit,
        editLogsPunchListDetails: editLogsPunchListDetails,
        addLogsPunchListDetails: addLogsPunchListDetails,
        deleteLogsPunchListDetails: deleteLogsPunchListDetails,
        getLogsPunchListsByProjectId: getLogsPunchListsByProjectId,
        getLogsPunchListsForEdit: getLogsPunchListsForEdit,
        editLogsPunchLists: editLogsPunchLists,
        addLogsPunchLists: addLogsPunchLists,
        deleteLogsPunchLists: deleteLogsPunchLists,
        getLogsQualityControl: getLogsQualityControl,
        getLogsQualityControlForEdit: getLogsQualityControlForEdit,
        editLogsQualityControl: editLogsQualityControl,
        addLogsQualityControl: addLogsQualityControl,
        deleteLogsQualityControl: deleteLogsQualityControl,
        getLogsQualityControlItems: getLogsQualityControlItems,
        getLogsQualityControlItemsForEdit: getLogsQualityControlItemsForEdit,
        editLogsQualityControlItems: editLogsQualityControlItems,
        addLogsQualityControlItems: addLogsQualityControlItems,
        deleteLogsQualityControlItems: deleteLogsQualityControlItems,
        editLogsMaterialInventoriesForRelease: editLogsMaterialInventoriesForRelease,
        getEstimationBudgetfilesByProjectId: getEstimationBudgetfilesByProjectId,
        getEstimationBudgetfileForEdit: getEstimationBudgetfileForEdit,
        deleteEstimationBudgetfileById: deleteEstimationBudgetfileById,
        addEstimationBudgetfile: addEstimationBudgetfile,
        editEstimationBudgetfile: editEstimationBudgetfile,
        addContractsPurchaseOrdersForBoq: addContractsPurchaseOrdersForBoq,
        addContractsForBoq: addContractsForBoq,
        getResourcesTree: getResourcesTree,
        addResourcesTree: addResourcesTree,
        editResourcesTree: editResourcesTree,
        deleteResourcesTree: deleteResourcesTree,
        getResourcesTreeForEdit: getResourcesTreeForEdit,
        getEstimationBase: getEstimationBase,
        getEstimationBaseForEdit: getEstimationBaseForEdit,
        estimationBaseDelete: estimationBaseDelete,
        addEstimationBase: addEstimationBase,
        editEstimationBase: editEstimationBase,
        getProjectEstimate: getProjectEstimate,
        getProjectEstimateForEdit: getProjectEstimateForEdit,
        editProjectEstimate: editProjectEstimate,
        addProjectEstimate: addProjectEstimate,
        deleteProjectEstimate: deleteProjectEstimate,
        getProjectEstimateItems: getProjectEstimateItems,
        getProjectEstimateItemsForEdit: getProjectEstimateItemsForEdit,
        editProjectEstimateItems: editProjectEstimateItems,
        addProjectEstimateItems: addProjectEstimateItems,
        deleteProjectEstimateItems: deleteProjectEstimateItems,
        getContractsClientModifications: getContractsClientModifications,
        getContractsClientModificationsForEdit: getContractsClientModificationsForEdit,
        addContractsClientModifications: addContractsClientModifications,
        editContractsClientModifications: editContractsClientModifications,
        contractsClientModificationDelete: contractsClientModificationDelete,
        getLogsWeeklyReports: getLogsWeeklyReports,
        getLogsWeeklyReportsForEdit: getLogsWeeklyReportsForEdit,
        logsWeeklyReportsDelete: logsWeeklyReportsDelete,
        addLogsWeeklyReports: addLogsWeeklyReports,
        editLogsWeeklyReports: editLogsWeeklyReports,
        getContractsBoqItemsList: getContractsBoqItemsList,
        getLogsWeeklyReportsTechnicalOffices: getLogsWeeklyReportsTechnicalOffices,
        getLogsWeeklyReportsTechnicalOfficesForEdit: getLogsWeeklyReportsTechnicalOfficesForEdit,
        logsWeeklyReportsTechnicalOfficeDelete: logsWeeklyReportsTechnicalOfficeDelete,
        addLogsWeeklyReportsTechnicalOffices: addLogsWeeklyReportsTechnicalOffices,
        editLogsWeeklyReportsTechnicalOffices: editLogsWeeklyReportsTechnicalOffices,
        getLogsWeeklyReportsConstraints: getLogsWeeklyReportsConstraints,
        getLogsWeeklyReportsConstraintsForEdit: getLogsWeeklyReportsConstraintsForEdit,
        logsWeeklyReportsConstraintsDelete: logsWeeklyReportsConstraintsDelete,
        addLogsWeeklyReportsConstraints: addLogsWeeklyReportsConstraints,
        editLogsWeeklyReportsConstraints: editLogsWeeklyReportsConstraints,
        getEstimationBaseList: getEstimationBaseList,
        getLogsClientSelectionsByProjectId: getLogsClientSelectionsByProjectId,
        deleteLogsClientSelectionById: deleteLogsClientSelectionById,
        addLogsClientSelections: addLogsClientSelections,
        editLogsClientSelections: editLogsClientSelections,
        getLogsClientSelectionForEdit: getLogsClientSelectionForEdit,
        getLogsWeeklyReportsDeliverys: getLogsWeeklyReportsDeliverys,
        getLogsWeeklyReportsDeliverysForEdit: getLogsWeeklyReportsDeliverysForEdit,
        logsWeeklyReportsDeliveryDelete: logsWeeklyReportsDeliveryDelete,
        addLogsWeeklyReportsDeliverys: addLogsWeeklyReportsDeliverys,
        editLogsWeeklyReportsDeliverys: editLogsWeeklyReportsDeliverys,
        getLogsWeeklyReportsNeeds: getLogsWeeklyReportsNeeds,
        getLogsWeeklyReportsNeedsForEdit: getLogsWeeklyReportsNeedsForEdit,
        logsWeeklyReportsNeedsDelete: logsWeeklyReportsNeedsDelete,
        addLogsWeeklyReportsNeeds: addLogsWeeklyReportsNeeds,
        getLogsWeeklyReportsWork: getLogsWeeklyReportsWork,
        getLogsWeeklyReportsWorkForEdit: getLogsWeeklyReportsWorkForEdit,
        logsWeeklyReportsWorkDelete: logsWeeklyReportsWorkDelete,
        addLogsWeeklyReportsWorks: addLogsWeeklyReportsWorks,
        getLogsWeeklyReportsNextWeek: getLogsWeeklyReportsNextWeek,
        getLogsWeeklyReportsNextWeekForEdit: getLogsWeeklyReportsNextWeekForEdit,
        logsWeeklyReportsNextWeekDelete: logsWeeklyReportsNextWeekDelete,
        addLogsWeeklyReportsNextWeeks: addLogsWeeklyReportsNextWeeks,
        getLogsWeeklyReportsCoordination: getLogsWeeklyReportsCoordination,
        getLogsWeeklyReportsCoordinationForEdit: getLogsWeeklyReportsCoordinationForEdit,
        logsWeeklyReportsCoordinationDelete: logsWeeklyReportsCoordinationDelete,
        addLogsWeeklyReportsCoordination: addLogsWeeklyReportsCoordination,
        getLogsWeeklyReportsMeetings: getLogsWeeklyReportsMeetings,
        getLogsWeeklyReportsMeetingsForEdit: getLogsWeeklyReportsMeetingsForEdit,
        logsWeeklyReportsMeetingsDelete: logsWeeklyReportsMeetingsDelete,
        addLogsWeeklyReportsMeetings: addLogsWeeklyReportsMeetings,
        getLogsWeeklyReportsModifications: getLogsWeeklyReportsModifications,
        getLogsWeeklyReportsModificationsForEdit: getLogsWeeklyReportsModificationsForEdit,
        logsWeeklyReportsModificationsDelete: logsWeeklyReportsModificationsDelete,
        addLogsWeeklyReportsModifications: addLogsWeeklyReportsModifications,
        editLogsWeeklyReportsCoordination: editLogsWeeklyReportsCoordination,
        getCostCodeTreeForReport: getCostCodeTreeForReport,
        getPaymentRequisitionQuantities: getPaymentRequisitionQuantities,
        getContractsBoqItemsReport: getContractsBoqItemsReport,
        getDesignDrawingListRpt: getDesignDrawingListRpt,
        getDesignDrawingPhasesItems: getDesignDrawingPhasesItems,
        getDesignDrawingPhasesItemsByDisciplineId: getDesignDrawingPhasesItemsByDisciplineId,
        getContractsInvoicesForPoPurchaseOrderIdDistinct: getContractsInvoicesForPoPurchaseOrderIdDistinct,
        getContractsInvoicesForPoItemsByPurchaseOrderId: getContractsInvoicesForPoItemsByPurchaseOrderId,
        getTimeSheetByRangeProjectId: getTimeSheetByRangeProjectId,
        getUsersWithOutTimeSheet: getUsersWithOutTimeSheet,
        getPoContractItemGrid: getPoContractItemGrid,
        getCompanyTimeSheet: getCompanyTimeSheet,
        getProjectWorkFlowDistinct: getProjectWorkFlowDistinct,
        getAccountsDocAssessmentByWorkFlowId: getAccountsDocAssessmentByWorkFlowId,
        getUsersTimeSheet: getUsersTimeSheet,
        getAccountsProjectsByProjectId: getAccountsProjectsByProjectId,
        getUsersTimeSheetSummary: getUsersTimeSheetSummary,
        getProjectsWithNegativeAndPositiveBalanceReport: getProjectsWithNegativeAndPositiveBalanceReport,
        getProjectProjectsCompaniesByCompanyId: getProjectProjectsCompaniesByCompanyId,
        getprojectProjectsList: getprojectProjectsList,
        getCashFlow: getCashFlow,
        getAccountsDocAssessmentCicleByWorkFlowId: getAccountsDocAssessmentCicleByWorkFlowId,
        getContractsRequestPaymentsReport: getContractsRequestPaymentsReport,
        getMyTasksTimeSheet: getMyTasksTimeSheet,
        getTasksByProjectIdReport: getTasksByProjectIdReport,
        getSupervisorsWithUnapprovedTimeSheets: getSupervisorsWithUnapprovedTimeSheets,
        getAccountsQualityControlItemsLists: getAccountsQualityControlItemsLists,
        getCommunicationNCR: getCommunicationNCR,
        getCommunicationNCRsForEdit: getCommunicationNCRsForEdit,
        communicationNCRDelete: communicationNCRDelete,
        addCommunicationNCRs: addCommunicationNCRs,
        editCommunicationNCRs: editCommunicationNCRs,
        getMyActivities: getMyActivities,
        getProjectProjectsExpensesApprovalRequest: getProjectProjectsExpensesApprovalRequest,
        getUsersOverTime: getUsersOverTime,
        getCommunicationRequestForInspections: getCommunicationRequestForInspections,
        getCommunicationRequestForInspectionsList: getCommunicationRequestForInspectionsList,
        getLogsMaterialInventoryAll: getLogsMaterialInventoryAll,
        editLogsMaterialInventoryApproveal: editLogsMaterialInventoryApproveal,
        getContractsInvoices: getContractsInvoices,
        getSupervisorsWithUnapprovedTimeSheetsBySupervisorId: getSupervisorsWithUnapprovedTimeSheetsBySupervisorId,
        getCommunicationCorrespondenceReceivedRpt: getCommunicationCorrespondenceReceivedRpt,
        getProjectsWorkingHours: getProjectsWorkingHours,
        getInspectionRequest: getInspectionRequest,
        getInspectionRequestForEdit: getInspectionRequestForEdit,
        editInspectionRequest: editInspectionRequest,
        addInspectionRequest: addInspectionRequest,
        deleteInspectionRequest: deleteInspectionRequest,
        getInvoicesUserByRange: getInvoicesUserByRange,
        getPaymentUserByRange: getPaymentUserByRange,
        getPurchaseOrderReport: getPurchaseOrderReport,
        getPurchaseOrderReportByProjectIdAndDate: getPurchaseOrderReportByProjectIdAndDate,
        getApprovalRequestsGroupByUserId: getApprovalRequestsGroupByUserId,
        getDocApprovalDetailsDistributionList: getDocApprovalDetailsDistributionList,
        getProjectTypesTimeSheet: getProjectTypesTimeSheet,
        getDocTypeByProjectIdOpened: getDocTypeByProjectIdOpened,
        getDocTypeByProjectIdClosed: getDocTypeByProjectIdClosed,
        getApprovalRequestsDocApprove: getApprovalRequestsDocApprove,
        getTaskWorkLoadReportWithoutCompany: getTaskWorkLoadReportWithoutCompany,
        getTaskWorkLoadReportWithCompany: getTaskWorkLoadReportWithCompany,
        getProjectsStatusSummaryCount: getProjectsStatusSummaryCount,
        getAccountsSpecsSectionChilds: getAccountsSpecsSectionChilds,
        getAccountsSpecsSectionChildsForEdit: getAccountsSpecsSectionChildsForEdit,
        editAccountsSpecsSectionChilds: editAccountsSpecsSectionChilds,
        addAccountsSpecsSectionChilds: addAccountsSpecsSectionChilds,
        deleteAccountsSpecsSectionChilds: deleteAccountsSpecsSectionChilds,
        getAccountsSpecsSectionChildssBySpecSectionId: getAccountsSpecsSectionChildssBySpecSectionId,
        getDocApprovalDetailsInbox: getDocApprovalDetailsInbox,
        getAccountsPurchaseOrderTermsLog: getAccountsPurchaseOrderTermsLog,
        getActionsBySummaryDetails: getActionsBySummaryDetails,
        getAlertSummaryDetails: getAlertSummaryDetails,
        getAccountsList: getAccountsList,
        getFileByFullPath: getFileByFullPath,
        getWorkFlowItemsByWorkFlowIdLevelType: getWorkFlowItemsByWorkFlowIdLevelType,
        getNotCodedExpensesSummaryDetail: getNotCodedExpensesSummaryDetail,
        getMaterialInspectionRequest: getMaterialInspectionRequest,
        getMaterialInspectionRequestForEdit: getMaterialInspectionRequestForEdit,
        editMaterialInspectionRequest: editMaterialInspectionRequest,
        addMaterialInspectionRequest: addMaterialInspectionRequest,
        deleteMaterialInspectionRequest: deleteMaterialInspectionRequest,
        addContractsBoqItemsFromFile: addContractsBoqItemsFromFile,
        getContractsDeliveryAlerts: getContractsDeliveryAlerts,
        addContractsDeliveryAlerts: addContractsDeliveryAlerts,
        addContractsSiteRequestItemsFromFile: addContractsSiteRequestItemsFromFile,
        editInternalMessage: editInternalMessage,
        getInternalMessageById: getInternalMessageById,
        getDistrbutionInboxMessageByAccountId: getDistrbutionInboxMessageByAccountId,
        getInternalMessageByAccountId: getInternalMessageByAccountId,
        editInboxDistrbutionMessage: editInboxDistrbutionMessage,
        addLogsMaterialDeliveryTicketsFromFile: addLogsMaterialDeliveryTicketsFromFile,
        addContractsProcurementItemsFromFile: addContractsProcurementItemsFromFile,
        deleteInboxDistrbutionMessage: deleteInboxDistrbutionMessage,
        addContractsQsItemsFromFile: addContractsQsItemsFromFile,
        addProjectScheduleItemFromFile: addProjectScheduleItemFromFile,
        getBoqQuantityRequestedAlertDetails: getBoqQuantityRequestedAlertDetails,
        getProjectLateTimeSheet: getProjectLateTimeSheet,
        getActionByScheduleCount: getActionByScheduleCount,
        getActionsByScheduleSummaryDetails: getActionsByScheduleSummaryDetails,
        getScheduleAlertSummaryCount: getScheduleAlertSummaryCount,
        getScheduleAlertSummary: getScheduleAlertSummary,
        editAccountSetting: editAccountSetting,
        getAccountSetting: getAccountSetting,
        getprojectProjects: getprojectProjects,
        getExpensesUserByContactIdType: getExpensesUserByContactIdType,
        addProjectTimeSheetApproval: addProjectTimeSheetApproval,
        addSheetBySupervisor: addSheetBySupervisor,
        getUnApprovedSheetsByContactAndDate: getUnApprovedSheetsByContactAndDate,
        editExpensesUserApprovalStatus: editExpensesUserApprovalStatus,
        addApprovedSheetBySupervisor: addApprovedSheetBySupervisor,
        getContractsBoqItemsByParentId: getContractsBoqItemsByParentId,
        getAccountsDocAlertDocs: getAccountsDocAlertDocs,
        getCommunicationDocsAttachDoc: getCommunicationDocsAttachDoc,
        addCommunicationDocsAttachDoc: addCommunicationDocsAttachDoc,
        communicationDocsAttachDocDelete: communicationDocsAttachDocDelete,
        getCommunicationDocsAttachDocById: getCommunicationDocsAttachDocById,
        getAccountsDocAlertDocsForEdit: getAccountsDocAlertDocsForEdit,
        addContractsBoqItemsItmized: addContractsBoqItemsItmized,
        getAccountsEmailAlert: getAccountsEmailAlert,
        addAccountsEmailAlert: addAccountsEmailAlert,
        accountsEmailAlertDelete: accountsEmailAlertDelete,
        getAccountsOnline: getAccountsOnline,
        getTimeSheetByDate: getTimeSheetByDate,
        getTimeSheetSettings: getTimeSheetSettings,
        getAccountInfo: getAccountInfo,
        getAccountsDefaultListTypesLog: getAccountsDefaultListTypesLog,
        deleteCommunicationProposal: deleteCommunicationProposal,
        deleteCommunicationReports: deleteCommunicationReports,
        deleteLogDrawing: deleteLogDrawing,
        deleteProjectCheckList: deleteProjectCheckList,
        deleteProjectDistributionList: deleteProjectDistributionList,
        deleteProjectPicture: deleteProjectPicture,
        deleteProjectHeaderFooter: deleteProjectHeaderFooter,
        deleteProjectSchedule: deleteProjectSchedule,
        deleteWorkFlow: deleteWorkFlow,
        getRequestItemsOrderByContractId: getRequestItemsOrderByContractId,
        getInspectionRequestList: getInspectionRequestList,
        getLogsDrawingsCyclesByDrawingId: getLogsDrawingsCyclesByDrawingId,
        getContractsRequestPaymentsDeductionsList: getContractsRequestPaymentsDeductionsList,
        uploadSingleFile: uploadSingleFile,
        getTimeSheetByDateByContactId: getTimeSheetByDateByContactId,
        getNotificationPostit: getNotificationPostit,
        getInvoiceItemsOrderPo: getInvoiceItemsOrderPo,
        editAccountUserPassword: editAccountUserPassword,
        getUnApprovedExpensesByContactAndDate: getUnApprovedExpensesByContactAndDate,
        getExpensesByDateByContactId: getExpensesByDateByContactId,
        synchronizeImapEmails: synchronizeImapEmails,
        getLogsEquipmentsDelivery: getLogsEquipmentsDelivery,
        getLogsEquipmentsDeliveryById: getLogsEquipmentsDeliveryById,
        editLogsEquipmentsDelivery: editLogsEquipmentsDelivery,
        addLogsEquipmentsDelivery: addLogsEquipmentsDelivery,
        deleteLogsEquipmentsDelivery: deleteLogsEquipmentsDelivery,
        getLogsEquipmentsDeliveryCosts: getLogsEquipmentsDeliveryCosts,
        getLogsEquipmentsDeliveryCostsById: getLogsEquipmentsDeliveryCostsById,
        editLogsEquipmentsDeliveryCosts: editLogsEquipmentsDeliveryCosts,
        addLogsEquipmentsDeliveryCosts: addLogsEquipmentsDeliveryCosts,
        deleteLogsEquipmentsDeliveryCosts: deleteLogsEquipmentsDeliveryCosts,
        getLogsEquipmentsDeliveryProjects: getLogsEquipmentsDeliveryProjects,
        getLogsEquipmentsDeliveryProjectsById: getLogsEquipmentsDeliveryProjectsById,
        editLogsEquipmentsDeliveryProjects: editLogsEquipmentsDeliveryProjects,
        addLogsEquipmentsDeliveryProjects: addLogsEquipmentsDeliveryProjects,
        deleteLogsEquipmentsDeliveryProjects: deleteLogsEquipmentsDeliveryProjects,
        getLogsEquipmentsDeliveryTickets: getLogsEquipmentsDeliveryTickets,
        getLogsEquipmentsDeliveryTicketsById: getLogsEquipmentsDeliveryTicketsById,
        editLogsEquipmentsDeliveryTickets: editLogsEquipmentsDeliveryTickets,
        addLogsEquipmentsDeliveryTickets: addLogsEquipmentsDeliveryTickets,
        deleteLogsEquipmentsDeliveryTickets: deleteLogsEquipmentsDeliveryTickets,
        getImapConfiguration: getImapConfiguration,
        setImapConfiguration: setImapConfiguration,
        getEmails: getEmails,
        getPoContractItemForEquipment: getPoContractItemForEquipment,
        getImapConfigurationForEdit: getImapConfigurationForEdit,
        getEmailHtmlContent: getEmailHtmlContent,
        deleteImapEmails: deleteImapEmails,
        getProjectsInvoicedCollectedAndInvoiced: getProjectsInvoicedCollectedAndInvoiced,
        projectBackLogRpt: projectBackLogRpt,
        editImapConfiguration: editImapConfiguration,
        projectsAchievementsRpt: projectsAchievementsRpt,
        getContractsBoqItemsOnlyParentGrid: getContractsBoqItemsOnlyParentGrid,
        getContractsBoqItemsListGrid: getContractsBoqItemsListGrid,
        getCommunicationMeetingMinutesForAgenda: getCommunicationMeetingMinutesForAgenda,
        addMeetingAgendaWithMeetingMinutes: addMeetingAgendaWithMeetingMinutes,
        // getAccountsProjectsForUserId: getAccountsProjectsForUserId
        updateProjectTaskAdminById: updateProjectTaskAdminById,
        getContactsByCompanyIdForOnlyUsers: getContactsByCompanyIdForOnlyUsers,
        mergeTwoProjects: mergeTwoProjects,
        getContractsQsItemsForExcel: getContractsQsItemsForExcel,
        getProjectCompanyNotProjectProjectCompany: getProjectCompanyNotProjectProjectCompany,
        getProjectProjectsCompaniesForManageCompanies: getProjectProjectsCompaniesForManageCompanies,
        deleteProjectProjectCompaniesForManageCompanies: deleteProjectProjectCompaniesForManageCompanies,
        addProjectProjectsCompaniesForManageCompanies: addProjectProjectsCompaniesForManageCompanies,
        accountsGroupDelete: accountsGroupDelete,
        sendTicket: sendTicket,
        getMessages: getMessages,
        addMessages: addMessages,
        getPostitRecievedById: getPostitRecievedById,
        getContractsVariationRequest: getContractsVariationRequest,
        deleteContractsVariationRequest: deleteContractsVariationRequest,
        getContractsVariationRequestForEdit: getContractsVariationRequestForEdit,
        addContractsVariationRequest: addContractsVariationRequest,
        editContractsVariationRequest: editContractsVariationRequest,
        getTasksByProjectId: getTasksByProjectId,
        getContractsVariationRequestList: getContractsVariationRequestList,
        getContractsCvrForEditByPcoId: getContractsCvrForEditByPcoId,
        getLogsMaterialInventoryForList: getLogsMaterialInventoryForList,
        setTaskActualProgress: setTaskActualProgress
    };


    return dataservice;

});