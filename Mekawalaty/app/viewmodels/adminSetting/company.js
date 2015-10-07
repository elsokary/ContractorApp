define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {
    var knockoutGrid = {};

    var gridOptions = ko.observable();

    var selectedRowId = ko.observable();

    var changeStatus = ko.observable(false);  
     
    var exportColumns = [];

    var exportToExcel = function () {
        var exportData = ko.toJS(knockoutGrid.getFilteredData()());

        config.exportJson(ko.toJS(exportData), exportColumns, 'excel', 'Companies');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(knockoutGrid.getFilteredData()());

        config.exportJson(ko.toJS(exportData), exportColumns, 'word', 'Companies');
    };

    var exportToPdf = function () {
        var exportData = ko.toJS(knockoutGrid.getFilteredData()());

        config.exportJson(ko.toJS(exportData), exportColumns, 'pdf', 'Companies');
    };

    var deleteCompany = function () {
        $.SmartMessageBox({
            title: "Caution hazardous operation!",
            content: "Are you sure you want to delete this?",
            buttons: '[No][Yes]'
        }, function (buttonPressed) {
            if (buttonPressed === "Yes") {
                dataservice.deleteCompany(selectedRowId()).done(function () {

                    knockoutGrid.deleteRow(selectedRowId());

                    selectedRowId(undefined);

                    $.smallBox({
                        title: "Operation completed successfuly",
                        content: "<i class='fa fa-clock-o'></i> <i>Record deleted successfuly...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }).fail(function () {
                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>Canceled delete...</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                });
            }
            if (buttonPressed === "No") {
                $.smallBox({
                    title: "Operation was canceled",
                    content: "<i class='fa fa-clock-o'></i> <i>Canceled delete...</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
            }
        });
    };

    var projectCompaniesContactsDto = function () {
        var self = this;
 
        self.companyName = ko.observable("");
        self.contactNameAr = ko.observable("");
        self.positionEn = ko.observable("");
        self.positionAr = ko.observable("");
        self.addressEn = ko.observable("");
        self.addressAr = ko.observable("");
        self.telephone = ko.observable();
        self.mobile = ko.observable();
        self.email = ko.observable(""); 
        self.phone = ko.observable(); 
    };

    var projectCompany = ko.observable(new projectCompaniesContactsDto());

    function activate(id) {

        companyId(id);

        dataSource.datafields = [{
            name: 'id', type: 'int'
        }, {
            name: 'title', type: 'string'
        }, {
            name: 'contactName', type: 'string'
        }, {
            name: 'position', type: 'string'
        }, {
            name: 'mobile', type: 'string'
        }, {
            name: 'email', type: 'string'
        }, {
            name: 'enteredBy', type: 'string'
        }, {
            name: 'lastModified', type: 'string'
        }];

        columns.gridColumns([{
            text: "No.",
            datafield: 'RowNumber',
            cellsrenderer: function (row) {
                var id = $('#projectContactsTable').jqxGrid('getrowid', row);

                return '<div class="rowIndex smart-form">' +
                           '<span>' + row + '</span>' +
                           '<label class="radio grid-checkbox" style="display: none; margin-left: 28px !important; margin-top: 15px !important;">' +
                               '<input type="radio" name="deletegrid" id="' + id + '" />' +
                               '<i></i>&nbsp;' +
                           '</label>' +
                       '</div>';
            },
            filterable: false,
            width: '79px'
        }, {
            text: config.language.transfer[config.currentLanguage()],
            datafield: 'transfer',
            cellsrenderer: function (row) {
                var id = $('#projectContactsTable').jqxGrid('getrowid', row);
                return '<div class="btn-group" role="group" style="margin-top: 15px;"><button class="btn btn-xs btn-default transfer" data-id="' + id + '" data-toggle="modal" data-target="#projectCompanyModalTransfer"><i class="fa fa-retweet"></i></button>';
            },
            filterable: false,
            groupable: false,
            sortable: false,
            columnsreorder: false,
            width: '140px',
            resizable: false,
            draggable: false
        }, {
            text: config.language.title[config.currentLanguage()],
            datafield: 'title',
            columntype: 'textbox',
            filtertype: 'input',
            width: '230px'
        }, {
            text: config.language.ContactName[config.currentLanguage()],
            datafield: 'contactName',
            columntype: 'textbox',
            filtertype: 'input',
            width: '230px'
        }, {
            text: config.language.discipline[config.currentLanguage()],
            datafield: 'position',
            columntype: 'textbox',
            filtertype: 'input',
            width: '230px'
        }, {
            text: config.language.Mobile[config.currentLanguage()],
            datafield: 'mobile',
            columntype: 'textbox',
            filtertype: 'input',
            width: '140px'
        }, {
            text: config.language.email[config.currentLanguage()],
            datafield: 'email',
            columntype: 'textbox',
            filtertype: 'input',
            width: '200px'
        }, {
            text: config.language.enteredBy[config.currentLanguage()],
            datafield: 'enteredBy',
            lumntype: 'textbox',
            filtertype: 'input',
            width: '360px'
        }, {
            text: config.language.lastModified[config.currentLanguage()],
            datafield: 'lastModified',
            lumntype: 'textbox',
            filtertype: 'input',
            width: '360px'
        }]);

        dataservice.getCompanyContact(projectCompanies, id);
        dataservice.getProjectCompaniesList(companies, 2);
        dataservice.getAccountsDefaultListLists(projectContactTitle, "contacttitle");
    };

    function canActivate() {
        if (config.isCompany() === false) {
            var isAllowed = config.userPermissions.indexOf(14);
            if (isAllowed != -1) {
                return true;
            } else {
                $.smallBox({
                    title: "Operation was canceled",
                    content: config.language.missingPermissions[config.currentLanguage()],
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
                return false;
            }
        } else {
            return true;
        }
    };

    function attached() {
        jQuery.validator.addMethod("notEqual", function (value, element, param) {
            return this.optional(element) || value != param;
        }, "Please specify a different value");


        $('#projectCompanyFormTransfer').validate({
            // Rules for form validation
            rules: {
                companyId: {
                    required: true,
                    notEqual: '0'
                }
            },

            // Messages for form validation
            messages: {
                companyId: {
                    required: config.language.ComapnyNameRequired[config.currentLanguage()]
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });


        $('#projectCompanyForm').validate({
            // Rules for form validation
            rules: {
                companyId: {
                    required: true,
                    notEqual: '0'
                },
                titleId: {
                    required: true,
                    notEqual: '0'
                },
                contactNameEn: {
                    required: true
                },
                contactNameAr: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                Telephone: {
                    required: true,
                    digits: true
                },
                Mobile: {
                    required: true,
                    digits: true
                }
            },

            // Messages for form validation
            messages: {
                companyId: {
                    required: config.language.ComapnyNameRequired[config.currentLanguage()]
                },
                titleId: {
                    required: config.language.titleRequired[config.currentLanguage()]
                },
                contactNameEn: {
                    required: config.language.contactNameRequired[config.currentLanguage()]
                },
                contactNameAr: {
                    required: config.language.contactNameRequired[config.currentLanguage()]
                },
                email: {
                    required: config.language.emailRequired[config.currentLanguage()]
                },
                Telephone: {
                    required: config.language.telephoneRequired[config.currentLanguage()],
                    digits: config.language.onlyNumbers[config.currentLanguage()]
                },
                Mobile: {
                    required: config.language.mobileRequired[config.currentLanguage()],
                    digits: config.language.onlyNumbers[config.currentLanguage()]
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });

        $('#projectContactsTable').on('click', '.jqx-grid-content div div[role="row"]', function (e) {
            var element = $(e.target)[0];

            var isRadio = false;

            if (element.tagName === "I") {
                isRadio = true;
            } else if (element.tagName === "INPUT") {
                if (element.type === "radio") {
                    isRadio = true;
                }
            } else if (element.tagName === "A") {
                isRadio = true;
            } else if (element.tagName === "BUTTON") {
                isRadio = true;
            }

            var rowId = $(this).find('input[type="radio"]').attr("id");

            if (rowId !== undefined) {
                if (!isRadio) {
                    var data = $("#projectContactsTable").jqxGrid('getrowdatabyid', parseInt(rowId));

                    // dataservice.getCompanyContactForEdit(projectCompany, data["id"]);

                    changeStatus(true);

                    if (config.isCompany() === false) {
                        var isAllowed = config.userPermissions.indexOf(11);
                        if (isAllowed != -1) {
                            dataservice.getCompanyContactForEdit(projectCompany, data["id"]).done(function (result) {
                                $('#projectCompanyModal').modal('show');
                            });

                        } else {
                            $.smallBox({
                                title: "Operation was canceled",
                                content: config.language.missingPermissions[config.currentLanguage()],
                                color: "#C46A69",
                                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                                timeout: 2000
                            });
                        }
                    } else {
                        dataservice.getCompanyContactForEdit(projectCompany, data["id"]).done(function (result) {
                            $('#projectCompanyModal').modal('show');
                        });
                    }
                } else {
                    selectedRowId(rowId);
                }
            }
        });

        $('#projectContactsTable').on('mouseover', '.rowIndex', function (event) {
            $(this).children("span").css("display", "none");

            var style = $(this).children(".radio").attr("style");

            style = style.replace("display: none;", "");

            $(this).children(".radio").attr("style", style);
        });

        $('#projectContactsTable').on('mouseleave', '.rowIndex', function (event) {
            var deleteRadioElement = $(this).children(".radio").children("input");

            var isChecked = deleteRadioElement[0].checked;

            if (!isChecked) {
                $(this).children("span").removeAttr("style");
                $(this).children(".radio").css("display", "none");
            } else {
                $('#projectContactsTable').find(".radio").children("input:not(:checked)").parent().css("display", "none");
                $('#projectContactsTable').find(".radio").children("input:not(:checked)").parent().parent().children("span").removeAttr("style");
            }
        });

        $("#projectContactsTable").on('click', '.transfer', function (event) {

            var id = $(event.currentTarget).data("id");

            var data = $('#projectContactsTable').jqxGrid('getrowdatabyid', id);

            dataservice.getCompanyContactForEdit(projectCompany, data["id"]);
        });
    };

    function editProjectCompanies() {
        var isValid = $('#projectCompanyForm').valid();
        if (isValid) {
            dataservice.editCompanyContact(projectCompany())
                .done(function (result) {
                    $('#projectContactsTable').jqxGrid('updaterow', result["id"], result);
                    projectCompany(null);
                    $('#projectCompanyModal').modal('hide');

                    $.smallBox({
                        title: "Operation completed successfuly",
                        content: "<i class='fa fa-clock-o'></i> <i>Record deleted successfuly...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }).fail(function () {
                    $('#projectCompanyModal').modal('hide');
                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>Canceled delete...</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                });
        } else {
            $('#projectCompanyForm').validate();
        }
    };

    function addProjectCompanies() {
        var isValid = $('#projectCompanyForm').valid();
        if (isValid) {
            dataservice.addCompanyContactOnly(projectCompany()).done(function (data) {
                $('#projectContactsTable').jqxGrid('addrow', data["id"], data);
                projectCompany(null);
                $('#projectCompanyModal').modal('hide');
            });

        } else {
            $('#projectCompanyForm').validate();
        }
    };

    function transferProjectCompanyContact() {
        var isValid = $('#projectCompanyFormTransfer').valid();
        if (isValid) {
            dataservice.transferCompanyContact(projectCompany())
                .done(function (result) {
                    $('#projectContactsTable').jqxGrid('updaterow', result["id"], result);
                    projectCompany(null);
                    $('#projectCompanyModalTransfer').modal('hide');

                    $.smallBox({
                        title: "Operation completed successfuly",
                        content: "<i class='fa fa-clock-o'></i> <i>Record deleted successfuly...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }).fail(function () {
                    $('#projectCompanyModalTransfer').modal('hide');
                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>Canceled delete...</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                });
        } else {
            $('#projectCompanyFormTransfer').validate();
        }
    };

    function add() {
        changeStatus(false);
        if (config.isCompany() === false) {
            var isAllowed = config.userPermissions.indexOf(10);
            if (isAllowed != -1) {
                projectCompany(new projectCompaniesContactsDto());

                projectCompany().companyId(companyId());

                $('#projectCompanyModal').modal('show');

            } else {
                $.smallBox({
                    title: "Operation was canceled",
                    content: config.language.missingPermissions[config.currentLanguage()],
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
            }
        } else {
            projectCompany(new projectCompaniesContactsDto());
            $('#projectCompanyModal').modal('show');
        }

    };


    function canDeactivate() {
        config.currentModuleMenu(undefined);
        return true;
    };

    

    var vm = {
        title: config.language.ContactsLog[config.currentLanguage()],
        activate: activate,
        canActivate: canActivate,
        projectCompanies: projectCompanies,
        projectCompany: projectCompany,
        attached: attached,
        editProjectCompanies: editProjectCompanies,
        changeStatus: changeStatus,
        addProjectCompanies: addProjectCompanies,
        projectContactTitle: projectContactTitle,
        language: config.language,
        currentLanguage: config.currentLanguage,
        editable: editable,
        transferProjectCompanyContact: transferProjectCompanyContact,
        companies: companies,
        dataSource: dataSource,
        columns: columns,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        exportToPdf: exportToPdf,
        deleteContact: deleteContact,
        selectedRowId: selectedRowId,
        add: add,
        canDeactivate: canDeactivate
    };

    return vm;

});