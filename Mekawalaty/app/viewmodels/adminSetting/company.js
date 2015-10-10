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
        self.address = ko.observable("");
        self.fax = ko.observable();
        self.email = ko.observable("");
        self.phone = ko.observable();
    };

    var projectCompany = ko.observable(new projectCompaniesContactsDto());

    function activate() {

        
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

        $('#projectCompanyForm').validate({
            // Rules for form validation
            rules: {
                companyName: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    digits: true
                }
            },

            // Messages for form validation
            messages: {
                companyName: {
                    required: config.language.ComapnyNameRequired[config.currentLanguage()]
                },
                email: {
                    required: config.language.emailRequired[config.currentLanguage()]
                },
                phone: {
                    required: config.language.telephoneRequired[config.currentLanguage()],
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

    function add() {
        changeStatus(false);
        if (config.isCompany() === false) {
            var isAllowed = config.userPermissions.indexOf(10);
            if (isAllowed != -1) {
                projectCompany(new projectCompaniesContactsDto());

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


    var vm = {
        gridOptions: gridOptions,
        title: "شاشة الشركات",
        activate: activate,
        canActivate: canActivate,
        projectCompany: projectCompany,
        attached: attached,
        editProjectCompanies: editProjectCompanies,
        changeStatus: changeStatus,
        addProjectCompanies: addProjectCompanies, 
        currentLanguage: config.currentLanguage,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        exportToPdf: exportToPdf,
        deleteCompany: deleteCompany,
        selectedRowId: selectedRowId,
        add: add
    };

    return vm;

});