define(['services/tokenstore', 'services/export'], function ( tokenStore, exportService) {
    var routes = [{
        route: '',
        moduleId: 'login',
        title: 'Login',
        nav: true,
        settings: { Login: true }
    }, {
        route: 'Dashboard',
        moduleId: 'dashboard',
        title: 'Dashboard',
        nav: true,
        settings: { Dashboard: true }
    }];

    var currentModuleMenu = ko.observable();

    var isPageSetup = ko.observable(false);

    var pageSize = ko.observable(200);

    function getAuthenticationHeader() {
        var token = tokenStore.getToken();

        return !!token ? token : "";
    }

    var currentProject = ko.observable();

    var profilePath = ko.observable("");

    var totalNotification = ko.observable(0);
 
    var lastSelectedProject = ko.observable();

    var fromWidgetProject = ko.observable();

    var isCompany = ko.observable(); 

    var projectsMenue = ko.observableArray([]); 

    var projectName = ko.observable("");  

    var selectedPanel = ko.observable(""); 

    var currentdocApprovalId = ko.observable();

    function postJson(url, data) {
        return new window.Promise(function (resolve, reject) {

            var req = new XMLHttpRequest();
            req.open('POST', url, true);

            req.setRequestHeader("Content-type", "application/json");

            var token = tokenStore.getToken();
            if (token)
                req.setRequestHeader("Authorization", token);

            req.onload = function () {
                if (req.status == 200) {
                    resolve(this);
                }
                else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = function () {
                reject(Error("Network Error"));
            };

            req.send(JSON.stringify(data));
        });
    };

    //Jquery Validation Custom Validators
    //(function ($) {
    //    //validates if value > 0
    //    $.validator.addMethod("greaterThanZero", function (value, element, param) {
    //        return this.optional(element) || parseFloat(value) > 0;
    //    }, "Please insert a value greater than Zero");

    //    $.validator.addMethod("dateFormat", function (value, element) {
    //        return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
    //    }, "Please enter a date in the format dd/mm/yyyy.");

    //    $.validator.addMethod('minOrEqual', function (value, el, param) {
    //        return parseFloat(value) >= param;
    //    }, "P");
    //})(jQuery);

    var currentLanguage = ko.observable('Ar');
 
    if (localStorage.getItem('language')) {
        currentLanguage(localStorage.getItem('language'));
    } else {
        currentLanguage('en');
    }

    var isAllow = function (code) {
        //if (currentProject() === undefined) {
        //    if (window.localStorage.getItem("lastSelectedProject") != null) {

        //        projectName(window.localStorage.getItem("lastSelectedprojectName"));
        //        currentProject(JSON.parse(window.localStorage.getItem("lastSelectedProject")));
        //    }
        //}
        //if (isCompany() === false) {
        //    var isAllowed = userPermissions.indexOf(code);
        //    if (isAllowed != -1) {
        //        return true;
        //    } else {
        //        return false;

        //    }
        //} else {
        //    return true;
        //}

        return true;
    };
 
    var contactName = ko.observable("");

    var exportColumn = function (friendlyName, fieldName, type) {
        var self = this;

        self.title = friendlyName;
        self.key = fieldName;
        self.type = type;
    };

    var exportJson = function (jsonData, exportColumns, fileType, fileName) {
        if (fileType === 'excel') {
            exportService.excelExportingService(jsonData, exportColumns, 'Procoor Exporting Service - ' + fileName);
        } else if (fileType === 'pdf') {
            exportService.pdfExportingService(jsonData, exportColumns, 'Procoor Exporting Service - ' + fileName);
        } else if (fileType === 'word') {
            exportService.wordExportingService(jsonData, exportColumns, 'Procoor Exporting Service - ' + fileName);
        }
    };

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().datepickerOptions || {};
            $(element).datepicker(options);

            ko.utils.registerEventHandler(element, "changeDate", function (event) {
                var value = valueAccessor();
                if (ko.isObservable(value)) {
                    value(!!event.target.value ? moment(event.date).format("DD/MM/YYYY") : '');
                }
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            var val = !!value ? moment(value, "DD/MM/YYYY").format("DD-MM-YYYY") : '';

            if (val) {
                $(element).datepicker('update', val);
            }
        }
    };

    ko.bindingHandlers.DatePickerRange = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var startDate = allBindingsAccessor().startDate || ko.observable();

            var endDate = allBindingsAccessor().endDate || ko.observable();

            var twoDatesChanged = ko.observable(false);

            var options = {
                date: new Date(),
                current: new Date(),
                calendars: 1,
                mode: 'range',
                starts: 1,
                onChange: function (formated, dates) {
                    var pickerOptions = $(this).data('datepickero');

                    if (formated.length > 0) {
                        if (twoDatesChanged()) {
                            twoDatesChanged(false);
                            if (formated[0] !== formated[1]) {
                                $(pickerOptions.el).val(formated[0] + ' | ' + formated[1]);
                                startDate(formated[0]);
                                endDate(formated[1]);
                            }
                        } else {
                            twoDatesChanged(true);
                        }
                    } else {
                        $(pickerOptions.el).val('');
                        startDate(undefined);
                        endDate(undefined);
                    }
                }
            };

            $(element).DatePicker(options);
        }
    };
     
    ko.bindingHandlers.select2 = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var obj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                lookupKey = allBindings.lookupKey;

            obj.matcher = function (term, text, opt) {
                if (opt.parent("optgroup").length > 0) {

                    return text.toUpperCase().indexOf(term.toUpperCase()) >= 0 || opt.parent("optgroup").attr("label").toUpperCase().indexOf(term.toUpperCase()) >= 0;
                }

                return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
            };

            $(element).select2(obj);

            if (lookupKey) {
                var value = ko.utils.unwrapObservable(allBindings.value);

                $(element).select2('data', ko.utils.arrayFirst(obj.data.results, function (item) {
                    return item[lookupKey] === value;
                }));
            }

            if (allBindings.options) {
                allBindings.options.subscribe(function (v) {
                    if (v.length > 0) {
                        $(element).trigger('change');
                    }
                });
            }


            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var allBindings = allBindingsAccessor(),
            value = ko.utils.unwrapObservable(allBindings.value || allBindings.selectedOptions);

            if (allBindings.options) {
                if (value) {
                    if (allBindings.options().length > 0) {
                        $(element).select2('val', value);
                    }
                }
            } else {
                $(element).trigger('change');
            }
        }
    };

    ko.bindingHandlers.iCalendar = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var obj = valueAccessor();

            if (obj().length > 0) {
                var iCalendar = $(element).calendar({
                    tmpl_path: "/app/views/templates/calendar/",
                    events_source: obj()
                });

                $('.btn-group button[data-calendar-nav]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.navigate($this.data('calendar-nav'));
                    });
                });

                $('.btn-group button[data-calendar-view]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.view($this.data('calendar-view'));
                    });
                });
            }
        },
        update: function (element, valueAccessor) {
            var obj = valueAccessor();

            if (obj().length > 0) {
                var iCalendar = $(element).calendar({
                    tmpl_path: "/app/views/templates/calendar/",
                    events_source: obj()
                });

                $('.btn-group button[data-calendar-nav]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.navigate($this.data('calendar-nav'));
                    });
                });

                $('.btn-group button[data-calendar-view]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.view($this.data('calendar-view'));
                    });
                });
            }
        }
    };

    ko.bindingHandlers.daterangepicker = {
        update: function (element, valueAccessor) {
            var value = valueAccessor();

            var valueUnwrapped = ko.unwrap(value);

            $(element).daterangepicker({
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment(),
                endDate: moment()
            }, function (start, end) {
                $(element).children("span").text(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            });

            $(element).on('apply.daterangepicker', function (ev, picker) {
                valueUnwrapped.startDate(picker.startDate);
                valueUnwrapped.endDate(picker.endDate);

                value.valueHasMutated();
            });
        }
    };

    ko.bindingHandlers.chart = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().chartOptions() || {};

            var value = valueAccessor();

            var valueUnwrapped = ko.unwrap(value);

            if (valueUnwrapped.length > 0) {
                if ($(element).data('highcharts-chart')) {
                    $(element).highcharts().destroy();
                }

                $(element).highcharts(options);
            }
        }
    };

    ko.bindingHandlers.setWidget = {
        init: function (element, valueAccessor) {
            var observable = valueAccessor();

            if (!observable()) {
                observable(true);
            }
        }
    };

    ko.bindingHandlers.unsetWidget = {
        init: function (element, valueAccessor) {
            var observable = valueAccessor();

            if (observable()) {
                observable(false);
            }
        }
    };

    ko.bindingHandlers.bootstrapSwitch = new function () {
        this.init = function (element, valueAccessor, allBindingsAccessor) {
            //initialize bootstrapSwitch
            $(element).bootstrapSwitch();

            // setting initial value
            $(element).bootstrapSwitch('state', valueAccessor()());

            //handle the field changing
            $(element).on('switchChange.bootstrapSwitch', function (event, state) {
                var observable = valueAccessor();

                observable(state);
            });

            // Adding component options
            var options = allBindingsAccessor().bootstrapSwitchOptions || {};

            for (var property in options) {
                if (options.hasOwnProperty(property)) {
                    $(element).bootstrapSwitch(property, ko.utils.unwrapObservable(options[property]));
                }
            }

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).bootstrapSwitch("destroy");
            });

        }
        //update the control when the view model changes
        this.update = function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            // Adding component options
            var options = allBindingsAccessor().bootstrapSwitchOptions || {};

            for (var property in options) {
                if (options.hasOwnProperty(property)) {
                    $(element).bootstrapSwitch(property, ko.utils.unwrapObservable(options[property]));
                }
            }

            $(element).bootstrapSwitch("state", value);
        }
    };

    var guid = (function (s4) {
        return function () {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
    })(function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    });

    ko.bindingHandlers.progress = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $element = $(element);

            var progressColor = allBindingsAccessor().progressColor || 'progress-info';

            var bar = $('<div/>', {
                'class': 'progress-bar'
            }).css("width", valueAccessor()() + '%');

            bar.tooltip({
                container: 'body',
                title: valueAccessor()() + '%'
            });

            $element.attr('id', guid())
                .addClass('progress ' + progressColor)
                .append(bar);

            ko.applyBindingsToDescendants(viewModel, $element[0]);
        }
    };

    ko.bindingHandlers.booleanValue = {
        init: function (element, valueAccessor) {
            var observable = valueAccessor(),
                interceptor = ko.computed({
                    read: function () {
                        if (observable()) {
                            return observable().toString();
                        } else {
                            return "";
                        }
                    },
                    write: function (newValue) {
                        if ((newValue === "true") || (newValue === "false")) {
                            observable(newValue === "true");
                        } else {
                            observable("");
                        }
                    }
                });

            ko.applyBindingsToNode(element, { value: interceptor });
        }
    };

    var grid = function () {
        var self = this;

        self.data = ko.observableArray();
        self.width = ko.observable(1);
        self.hierarchy = ko.observable();
    };

    var jqxGridDataSource = function () {
        var self = this;

        self.datatype = "observablearray";
        self.id = 'id';
    };

    var jqxGridColumns = function () {
        var self = this;

        self.gridColumns = ko.observableArray();
    };

    var jqxGridColumnGroups = function () {
        var self = this;

        self.gridColumnGroups = ko.observable();
    };

    var jqxGroups = function () {
        var self = this;

        self.groups = ko.observableArray();
    };
     
    var pageExport = ko.observable();

    var pageTemplate = ko.observable();

    var exportDocumentToPdf = function (pathFooter, pathHeader) {
        //#main 
        $("body").css("overflow", "visible");

        //$("#LettersDocument .export-remove").addClass("hidden");
        $(pageExport()).addClass("hidden");
        var content = $('.main-content-animation');

        content.removeClass('main-content-animation');

        snapShotDom($(pageTemplate()).get(0), function (canvas, currentHeight) {
            var imgData = canvas.toDataURL('image/jpeg');

            var doc = new jsPDF('p', 'pt', 'a4');

            var img = new Image();

            // img.src = pathHeader;
            if (pathHeader()) {

                img.src = pathHeader();
            } else {
                img.src = '../img/superbox/superbox-full-23.jpg';
            }
            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);


                var dataUrl = canvas.toDataURL("image/jpeg");

                var img2 = new Image();
                if (pathFooter()) {

                    img2.src = pathFooter();
                } else {
                    img2.src = '../img/superbox/superbox-full-15.jpg';
                }

                img2.onload = function () {
                    var canvas2 = document.createElement("canvas");
                    canvas2.width = this.width;
                    canvas2.height = this.height;

                    var ctx2 = canvas2.getContext("2d");
                    ctx2.drawImage(this, 0, 0);


                    var data2Url = canvas2.toDataURL("image/jpeg");

                    doc.addImage(dataUrl, 'JPEG', 15, 15, 565, 65);

                    doc.addImage(imgData, 'JPEG', 15, 80, 565, 680);

                    doc.addImage(data2Url, 'JPEG', 15, 760, 565, 65);

                    doc.save(pageTemplate());
                }
            }
        });

        $("body").css("overflow", "auto");
        $("body").css("overflow-x", "hidden");

        $(pageExport()).removeClass("hidden");

        $('.modal').modal('hide');

    };

    function snapShotDom(target, call) {
        var data = {};

        data.overflow = $(target).css('overflow');
        data.width = $(target).css('width');
        data.height = $(target).css('height');
        data.maxWidth = $(target).css('max-width');
        data.maxHeight = $(target).css('max-height');

        var attachmentsArea = $('#' + target.id + ' .col-md-1.col-xs-1.col-sm-1.col-lg-1.col');

        attachmentsArea.removeClass('col-md-1 col-xs-1 col-sm-1 col-lg-1 col');
        attachmentsArea.addClass('col-md-2 col-xs-2 col-sm-2 col-lg-2 col');

        var workflowArea = $('#' + target.id + ' .inbox-download-list .well-sm.well-flow');

        workflowArea.attr('style', 'width: 42px !important');
        workflowArea.find('.fa.fa-pencil-square-o').css('font-size', '25px');
        workflowArea.find('strong').css('font-size', '8px');

        $(target).css('overflow', 'visible');
        $(target).css('height', 'auto');
        $(target).css('width', '595.2756px');
        $(target).css('maxHeight', 'auto');

        html2canvas(target, {
            "onrendered": function (canvas) {
                var currentHeight = ($(target).height() * 72) / 96;

                $(target).css('overflow', data.overflow);
                $(target).css('width', data.width);
                $(target).css('height', data.height);
                $(target).css('maxWidth', data.maxWidth);
                $(target).css('maxHeight', data.maxHeight);

                attachmentsArea.removeClass('col-md-2 col-xs-2 col-sm-2 col-lg-2 col');
                attachmentsArea.addClass('col-md-1 col-xs-1 col-sm-1 col-lg-1 col');

                workflowArea.removeAttr('style');
                workflowArea.find('.fa.fa-pencil-square-o').removeAttr('style');
                workflowArea.find('strong').removeAttr('style');

                call(canvas, currentHeight);
            }
        });
    }

    var createShowHideFooterToolbar = function (myTable, columns) {
        var toolbarId = 'myToolbar';
        var settingsId = toolbarId + '_settings';
        var colsDef = myTable.jqxGrid('columns').records;
        var checkbox;

        // increase table pager height to make room for the toolbar
        myTable.jqxGrid('pagerheight', 38);

        // create HTML markup for the toolbar with a settings button and a table filtering input control
        var toolbarList = $('<ul />');
        var mToolbar = $('<div id="' + toolbarId + '" class="gridToolbar" />');
        mToolbar.append(toolbarList);

        // add settings menu to the toolbar
        toolbarList.append('<li id="' + settingsId + '" style="padding: 1px 4px;">' + 'Show/Hide Columns...' + '<ul style="width:440px">' + '<div class="gridSettingsHeader"><b>Show/Hide Columns</b></div>' + '</ul>' + '</li>');

        // Add one checkbox to settings menu for each column that can be shown/hidden
        var settings = mToolbar.find('#' + settingsId + ' ul');

        for (var idx = 0; idx < columns.length; idx++) {
            // create checkbox HTML markup
            checkbox = $('<div style="float:left;margin-left: 10px;text-overflow:ellipsis;overflow:hidden" df="' + columns[idx].datafield + '">' + columns[idx].text + '</div>');
            settings.append(checkbox);

            // convert it into jqx checkbox
            checkbox.jqxCheckBox({
                width: 130,
                height: 25,
                checked: (columns[idx].hidden !== true)
            });

            // register the on-change handler for toggling column visibility
            checkbox.on('change', function (event) {
                if (event.args.checked) {
                    myTable.jqxGrid('showcolumn', $(this).attr('df'));
                } else {
                    myTable.jqxGrid('hidecolumn', $(this).attr('df'));
                }
            });
        }

        // add the toolbar to the data table
        myTable.find('.jqx-grid-pager').append(mToolbar);

        if (myTable.find(".load-more").length === 0) {
            var toolbar = myTable.find('.jqx-grid-pager');
            var container = $("<div class='btn-group' role='group' style='margin-top: 5px; margin-left: 5px; position: absolute; top: 3px; left: 185px; width: 100px;'></div>");
            var loadMoreButton = $("<button type='button' class='btn btn-xs btn-default load-more'><i class='fa fa-download'></i></button>");
            var loadingData = $("<div class='hidden loading-data'></div>");
            var loadingSpan = $("<span style='margin-left: 5px;'>Loading</span>");
            var loadingIcon = $("<i style='margin-left: 8px; margin-top: 5px; color: darkcyan' class='fa fa-refresh fa-spin'></i>");
            toolbar.append(container);
            container.append(loadMoreButton);
            container.append(loadingData);
            loadingData.append(loadingSpan);
            loadingData.append(loadingIcon);
        }

        mToolbar.jqxMenu({
            width: (180),
            height: 25,
            autoOpen: false
        });

        mToolbar.jqxMenu('setItemOpenDirection', settingsId, 'right', 'up');
        mToolbar.jqxMenu('showTopLevelArrows', false);
    }

    ko.bindingHandlers.jqxGrid = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

            var dataSource = allBindings().jqxGridDataSource || {};

            var columns = allBindings().jqxGridColumns || {};

            var groups = allBindings().jqxGroups || {};

            var adapter = allBindings().adapter || ko.observable();

            var groupsExist = !!groups.groups;

            if (!groupsExist) {
                groups.groups = ko.observableArray([]);
            }

            var value = valueAccessor();

            var valueUnwraped = ko.unwrap(value);

            dataSource.localdata = valueUnwraped.data;

            var dataAdapter = new $.jqx.dataAdapter(dataSource);

            adapter(dataAdapter);

            var width = $(element).parent().width();

            $(element).jqxGrid({
                theme: "bootstrap",
                source: dataAdapter,
                altrows: true,
                sortable: true,
                pageable: true,
                showfilterrow: true,
                filterable: true,
                columnsresize: true,
                columnsreorder: true,
                selectionmode: 'none',
                showsortmenuitems: false,
                showfiltermenuitems: true,
                showgroupmenuitems: false,
                groupable: true,
                //localization: localization,
                autosavestate: true,
                width: '95.5%',
                autoheight: true,
                scrollmode: 'deferred',
                rowsheight: 45,
                pagerheight: 52,
                columnsheight: 37,
                pagermode: 'advanced',
                autoloadstate: true,
                rendered: function (event) {
                    $(element).jqxGrid('refreshfilterrow');
                },
                ready: function (event) {
                    $(element).jqxGrid({ width: '99.5%' });
                },
                columns: columns.gridColumns(),
                groups: groups.groups(),
                rtl: true
            });

            createShowHideFooterToolbar($(element), columns.gridColumns());
        }
    };

    ko.bindingHandlers.jqxGridTree = {
        init: function (element, valueAccessor, allBindings) {
            var dataSource = allBindings().jqxGridDataSource || {};

            var columns = allBindings().jqxGridColumns || {};

            var value = valueAccessor();

            var valueUnwraped = ko.unwrap(value);

            dataSource.hierarchy = valueUnwraped.hierarchy;

            dataSource.localdata = valueUnwraped.data;

            var cols = columns.gridColumns();

            var dataAdapter = new $.jqx.dataAdapter(dataSource);

            $(element).jqxTreeGrid({
                source: dataAdapter,
                pageable: true,
                columnsResize: true,
                sortable: true,
                filterable: true,
                filterMode: 'advanced',
                columns: cols,
                pagerHeight: 52,
                columnsHeight: 52,
                width: '100%',
                altRows: true,
                pagerMode: 'advanced',
                rtl: true
            });
        }
    };

    var koGridInstanceCreator = function () {
        var gridOptions = ko.observable({});

        var currentFilteredData = ko.observableArray([]);

        var appliedFilters = ko.observableArray([]);

        var filterString = function (value, field, filteredData) {
            filteredData(ko.utils.arrayFilter(filteredData(), function (item) {
                return item[field] && item[field].toString().toLowerCase().indexOf(value) !== -1;
            }));

            var pagedData = filteredData();

            if (filteredData() > 20) {
                pagedData = filteredData().slice(((1 + 1) - 1) * 20, (1 + 1) * 20);
            }

            currentFilteredData(pagedData);
        };

        var filterInteger = function (value, field, filteredData) {
            filteredData(ko.utils.arrayFilter(filteredData(), function (item) {
                var number = parseInt(value);

                if (!number) {
                    return true;
                }

                return item[field] && (item[field] === number);
            }));

            var pagedData = filteredData();

            if (filteredData() > 20) {
                pagedData = filteredData().slice(((1 + 1) - 1) * 20, (1 + 1) * 20);
            }

            currentFilteredData(pagedData);
        };

        var filterDate = function (value, field, filteredData) {
            if (value.endDate() && value.startDate()) {
                var startDate = moment(value.startDate(), "YYYY-MM-DD");
                var endDate = moment(value.endDate(), "YYYY-MM-DD");

                filteredData(ko.utils.arrayFilter(filteredData(), function (item) {
                    var date = moment(item[field]).format("DD/MM/YYYY");

                    return moment(date, "DD/MM/YYYY").isBetween(startDate, endDate) || (moment(date, "DD/MM/YYYY").diff(startDate, 'days') === 0) || (moment(date, "DD/MM/YYYY").diff(endDate, 'days') === 0);
                }));

                var pagedData = filteredData();

                if (filteredData() > 20) {
                    pagedData = filteredData().slice(((1 + 1) - 1) * 20, (1 + 1) * 20);
                }

                currentFilteredData(pagedData);
            } else if (!(value.endDate() && value.startDate())) {
                var filterExist = ko.utils.arrayFirst(appliedFilters(), function (item) {
                    return item.fieldValue === field;
                });

                appliedFilters.remove(filterExist);
            }
        };

        var filterBoolean = function (value, field, filteredData) {

            if (field === 'statusName') {
                if (value || (typeof value === 'boolean')) {
                    value = value ? 'opened' : 'closed';
                } else {
                    value = null;
                }
            }

            if (field === 'readUnread') {
                if (value || (typeof value === 'boolean')) {
                    value = value ? 'read' : 'unread';
                } else {
                    value = null;
                }
            }

            filteredData(ko.utils.arrayFilter(filteredData(), function (item) {
                return item[field] && (value === item[field]);
            }));

            var pagedData = filteredData();

            if (filteredData() > 20) {
                pagedData = filteredData().slice(((1 + 1) - 1) * 20, (1 + 1) * 20);
            }

            currentFilteredData(pagedData);
        };

        var originalData = ko.observableArray([]);

        var filteredData = ko.observableArray();

        var applyFilters = function () {
            currentFilteredData(originalData());

            filteredData(originalData());

            if (appliedFilters().length < 1) {
                gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);
                gridOptions().pagingOptions.currentPage(0);
                gridOptions().pagingOptions.currentPage(1);
            }

            var totalAppliedFilters = 0;

            ko.utils.arrayForEach(appliedFilters(), function (item, index) {
                if (item.value || (typeof item.value === 'boolean')) {
                    if (item.filterType === 'string') {
                        filterString(item.value.toLowerCase(), item.fieldValue, currentFilteredData);
                    } else if (item.filterType === 'int') {
                        filterInteger(item.value, item.fieldValue, currentFilteredData);
                    } else if (item.filterType === 'date') {
                        filterDate(item.value, item.fieldValue, currentFilteredData);
                    } else if (item.filterType === 'status') {
                        filterBoolean(item.value, item.fieldValue, currentFilteredData);
                    }

                    totalAppliedFilters++;
                } else {
                    if (index === (appliedFilters().length - 1)) {
                        if (totalAppliedFilters === 0) {
                            totalAppliedFilters = false;
                        }
                    }
                }
            });

            if (totalAppliedFilters) {
                gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);
                filteredData(currentFilteredData());
                gridOptions().pagingOptions.currentPage(0);
                gridOptions().pagingOptions.currentPage(1);
            }
        };

        appliedFilters.subscribe(function (value) {
            applyFilters();
        });

        var headerCellTemplate = function (filterType, fieldValue, filterValue) {
            filterValue.subscribe(function (value) {
                var filterObject = { filterType: filterType, value: value, fieldValue: fieldValue };

                var filterExist = ko.utils.arrayFirst(appliedFilters(), function (item) {
                    return item.fieldValue === fieldValue;
                });

                if (!filterExist) {
                    appliedFilters.push(filterObject);
                } else {
                    var filterObjectIndex = appliedFilters.indexOf(filterExist);

                    if (value || (typeof value === 'boolean')) {
                        appliedFilters()[filterObjectIndex].value = value;
                        appliedFilters.valueHasMutated();
                    } else {
                        appliedFilters.remove(filterExist);
                    }
                }
            });

            var filterTemplate = '';

            if (filterType === 'string') {
                filterTemplate = '<input class="form-control" data-filter="' + filterType + '" style="margin: 3px; width: 63%;" data-bind="attr: { \'placeholder\': displayName() + \'...\' }, textInput: filterValue" type="text" />';
            } else if (filterType === 'int') {
                filterTemplate = '<input class="form-control" data-filter="' + filterType + '" style="margin: 3px; width: 82%;" data-bind="attr: { \'placeholder\': displayName() + \'...\' }, textInput: filterValue" type="number" />';
            } else if (filterType === 'docNo') {
                filterTemplate = '<input class="form-control" data-filter="' + filterType + '" style="margin: 3px; width: 82%;" data-bind="attr: { \'placeholder\': displayName() + \'...\' }, textInput: filterValue" type="text" />';
            } else if (filterType === 'date') {
                filterValue().startDate.subscribe(function (value) {
                    filterValue.valueHasMutated();
                });

                filterValue().endDate.subscribe(function (value) {
                    filterValue.valueHasMutated();
                });
                filterTemplate = '<div style="margin: 3px"><input readonly style="cursor: pointer !important;" placeholder="Filter Here"  class="form-control" data-bind="DatePickerRange: true, startDate: filterValue().startDate, endDate: filterValue().endDate" type="text" /></div>';
            } else if (filterType === 'status') {
                filterTemplate = '<div style="margin: 3px; width: 57%;"><select class="form-control" data-bind="booleanValue: filterValue" required><option> ALL </option> <option value="true">Open</option><option value="false"> Close </option></select></div>';
            }

            return '<div><div style="border-bottom: 1px solid rgb(212,212,212);" data-bind="click: sort, css: {\'kgSorted\': !noSortVisible }, attr: {\'class\': \'kgHeaderSortColumn \' + headerClass()}" draggable="true"><div data-bind="attr: { \'class\': \'colt\' + $index() + \' kgHeaderText\' }, html: displayName"></div><div class="kgSortButtonDown" data-bind="visible: showSortButtonDown" style="display: none;"></div><div class="kgSortButtonUp" data-bind="visible: showSortButtonUp" style="display: none;"></div><div data-bind="visible: resizable, click: gripClick, mouseEvents: { mouseDown: gripOnMouseDown }" class="kgHeaderGrip"></div></div>' + filterTemplate + '</div>';
        };

        var gridCheckBoxes = ko.observableArray([]);

        var checkedRows = ko.observableArray([]);

        var createColumnDefinition = function (field, displayName, minWidth, width, filterType, cellFormat, cellTemplate, visible, headerCellTemp) {
            var columnDef = {
                field: field,
                displayName: displayName,
                minWidth: minWidth,
                width: width,
                filterValue: ko.observable(),
                filterType: filterType,
                headerCellTemplate: '',
                gridCheckBoxes: gridCheckBoxes,
                checkedRows: checkedRows
            };

            if (filterType === 'date') {
                columnDef.filterValue({
                    startDate: ko.observable(),
                    endDate: ko.observable()
                });
            }

            if (cellFormat) {
                columnDef.cellFormatter = cellFormat;
            }

            if (cellTemplate) {
                columnDef.cellTemplate = cellTemplate;
            }

            if (visible !== false) {
                columnDef.visible = true;
            } else {
                columnDef.visible = false;
            }

            if (filterType && !headerCellTemp) {
                var headerTemplate = headerCellTemplate(filterType, field, columnDef.filterValue);

                columnDef.headerCellTemplate = headerTemplate;
            } else {
                if (headerCellTemp) {
                    columnDef.headerCellTemplate = headerCellTemp;
                }
            }

            return columnDef;
        };

        var loadMoreData = ko.observable();

        loadMoreData.subscribe(function (value) {
            gridOptions().loadMoreData = value;
        });

        gridOptions({
            data: currentFilteredData,
            pagingOptions: {
                pageSizes: ko.observableArray([20, 100, 200]),
                pageSize: ko.observable(20),
                totalServerItems: ko.observable(0),
                currentPage: ko.observable(0)
            },
            enableColumnResize: true,
            enablePaging: true,
            enableRowReordering: true,
            enableSorting: true,
            showGroupPanel: true,
            multiSelect: false,
            showFilter: false,
            titleOfGroupingArea: 'Drag a column and drop it here to group by that column',
            currentLanguage: 'Ar',
            displaySelectionCheckbox: true,
            afterSelectionChange: function () { },
            headerRowHeight: 68,
            columnDefs: [],
            isLoadingData: ko.observable(true),
            groups: [],
            loadMoreData: function (obj, e) {

            },
            columnsChanged: function (obj) {

            }
        });

        var displaySelectionCheckbox = ko.observable();

        displaySelectionCheckbox.subscribe(function (value) {
            gridOptions().displaySelectionCheckbox = value;
        });

        var multiSelect = ko.observable();

        multiSelect.subscribe(function (value) {
            gridOptions().multiSelect = value;
        });

        var groups = ko.observableArray([]);

        groups.subscribe(function (value) {
            gridOptions().groups = value;
        });

        var selectWithCheckboxOnly = ko.observableArray([]);

        selectWithCheckboxOnly.subscribe(function (value) {
            gridOptions().selectWithCheckboxOnly = value;
        });

        var columnDefs = ko.observableArray([]);

        columnDefs.subscribe(function (value) {
            gridOptions().columnDefs = value;
        });

        var gridSelectionChange = ko.observable();

        gridSelectionChange.subscribe(function (value) {
            gridOptions().afterSelectionChange = value;
        });

        gridOptions().pagingOptions.currentPage.subscribe(function (value) {
            var pages = filteredData().length / gridOptions().pagingOptions.pageSize();
            var ceiledPages = Math.ceil(filteredData().length / gridOptions().pagingOptions.pageSize());
            var pageSize = gridOptions().pagingOptions.pageSize();
            var currentGridPage = value;

            var pagedData = [];

            if (ceiledPages === value) {
                if (pages < ceiledPages) {
                    pagedData = filteredData().slice((currentGridPage - 1) * ((pages % 1) * pageSize), currentGridPage * ((pages % 1) * pageSize));
                } else {
                    pagedData = filteredData().slice((currentGridPage - 1) * pageSize, currentGridPage * pageSize);
                }
            } else {
                pagedData = filteredData().slice((currentGridPage - 1) * pageSize, currentGridPage * pageSize);
            }

            currentFilteredData(pagedData);
        });

        gridOptions().pagingOptions.pageSize.subscribe(function (value) {
            if (gridOptions().pagingOptions.currentPage() === 1) {
                var pages = filteredData().length / value;
                var ceiledPages = Math.ceil(filteredData().length / value);
                var pageSize = value;
                var currentGridPage = gridOptions().pagingOptions.currentPage();

                var pagedData = [];

                if (ceiledPages === currentGridPage) {
                    if (pages < ceiledPages) {
                        pagedData = filteredData().slice((currentGridPage - 1) * ((pages % 1) * pageSize), currentGridPage * ((pages % 1) * pageSize));
                    } else {
                        pagedData = filteredData().slice((currentGridPage - 1) * pageSize, currentGridPage * pageSize);
                    }
                } else {
                    pagedData = filteredData().slice((currentGridPage - 1) * pageSize, currentGridPage * pageSize);
                }

                currentFilteredData(pagedData);
            } else {
                gridOptions().pagingOptions.currentPage(1);
            }
        });

        var setInitialData = function (data) {
            originalData(data);

            currentFilteredData(data);

            applyFilters();

            gridOptions().pagingOptions.totalServerItems(originalData().length);
            gridOptions().pagingOptions.currentPage(0);
            gridOptions().pagingOptions.currentPage(1);

            if (typeof data === "function") {
                if (data().length > 0) {
                    gridOptions().isLoadingData(null);
                } else {
                    gridOptions().isLoadingData(false);
                }
            } else {
                if (data.length > 0) {
                    gridOptions().isLoadingData(null);
                } else {
                    gridOptions().isLoadingData(false);
                }
            }
        };

        var loadMoreRecords = function (data) {
            var arr = originalData();

            ko.utils.arrayPushAll(arr, data);

            originalData(arr);

            currentFilteredData(arr);

            applyFilters();

            gridOptions().pagingOptions.totalServerItems(originalData().length);
            gridOptions().pagingOptions.currentPage(0);
            gridOptions().pagingOptions.currentPage(1);
        };

        var getOriginalData = function () {
            return originalData;
        }

        var getFilteredData = function () {
            return currentFilteredData;
        }

        var getGridOptions = function () {
            return gridOptions;
        };

        var addRow = function (item) {

            originalData.push(item);

            //currentFilteredData.push(item);

            gridOptions().data.push(item);

            gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);

        };

        var updateRow = function (itemUpdate) {
            var item = ko.utils.arrayFirst(originalData(), function (item) {
                return item.id === itemUpdate.id;
            });

            originalData.remove(item);
            currentFilteredData.remove(item);
            gridOptions().data.remove(item);


            originalData.push(itemUpdate);

            gridOptions().data.push(itemUpdate);

            gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);

        };

        var deleteRow = function (id) {
            var item = ko.utils.arrayFirst(originalData(), function (item) {
                return item.id === id;
            });

            originalData.remove(item);
            currentFilteredData.remove(item);
            gridOptions().data.remove(item);
            gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);
        };

        var columnsChanged = ko.observable();

        columnsChanged.subscribe(function (value) {
            gridOptions().columnsChanged = value;
        });

        var vm = {
            createColumnDefinition: createColumnDefinition,
            gridSelectionChange: gridSelectionChange,
            columnDefs: columnDefs,
            setInitialData: setInitialData,
            getOriginalData: getOriginalData,
            getFilteredData: getFilteredData,
            getGridOptions: getGridOptions,
            addRow: addRow,
            updateRow: updateRow,
            deleteRow: deleteRow,
            loadMoreData: loadMoreData,
            loadMoreRecords: loadMoreRecords,
            displaySelectionCheckbox: displaySelectionCheckbox,
            multiSelect: multiSelect,
            groups: groups,
            selectWithCheckboxOnly: selectWithCheckboxOnly,
            columnsChanged: columnsChanged,
            GridCheckBoxes: gridCheckBoxes,
            checkedRows: checkedRows
        };

        return vm;
    };

    var koGridLoadState = function (columnDefs, knockoutGrid) {
        ko.utils.arrayForEach(columnDefs(), function (item) {
            if (item.field === "✔") {
                return;
            }

            if (item.filterType !== 'date') {
                knockoutGrid.columnDefs.push(knockoutGrid.createColumnDefinition(item.field, item.displayName, item.minWidth, item.width, item.filterType, undefined, item.cellTemplate, item.visible));
            } else {
                knockoutGrid.columnDefs.push(knockoutGrid.createColumnDefinition(item.field, item.displayName, item.minWidth, item.width, item.filterType, function (data) { return data ? moment(data).format('DD/MM/YYYY') : 'None' }, item.cellTemplate, item.visible));
            }
        });
    };

    var koGridSaveState = function (localStorageStateName, currentState) {
        window.localStorage.setItem(localStorageStateName, JSON.stringify(ko.toJS(currentState)));
    };

    var koGridGetCurrentState = function (localStorageStateName) {
        return !!(window.localStorage.getItem(localStorageStateName)) ? ko.observableArray(JSON.parse(window.localStorage.getItem(localStorageStateName))) : undefined;
    }

    ko.bindingHandlers.summernote = new function () {
        var isblur = false;

        this.init = function (element, valueAccessor, allBindings) {
            var value = valueAccessor();
            var options = $.extend(value, {
                height: 300,
                toolbar: [
                    ["style", ["bold", "italic", "underline", "clear"]],
                    ["fontstyle", ["style"]],
                    ["color", ["color"]],
                    ["fontsize", ["fontsize"]],
                    ["lists", ["ul", "ol", "paragraph"]],
                    ["insert", ["link"]],
                    ["table", ["table"]],
                    ["misc", ["fullscreen", "codeview"]]
                ],
                onblur: function () {
                    isblur = true;
                    value($(element).code());
                    isblur = false;
                }
            });
            $.extend(options, allBindings.get("summerOptions"));
            return $(element).summernote(options);
        };
        this.update = function (element, valueAccessor) {
            if (!isblur) {
                var value = valueAccessor();
                $(element).code(value());
            }
        };
    };

    var remoteServerName = 'api/ContractorApp';
     
    var ipAddress = '';

    return {
        profilePath: profilePath,
        routes: routes,
        remoteServerName: remoteServerName, 
        JqxGridDataSource: jqxGridDataSource,
        JqxGridColumns: jqxGridColumns,
        GridModel: grid, 
        postJson: postJson,
        isPageSetup: isPageSetup,
        getAuthenticationHeader: getAuthenticationHeader, 
        currentProject: currentProject, 
        lastSelectedProject: lastSelectedProject, 
        currentLanguage: currentLanguage,
        isCompany: isCompany,
        isAllow: isAllow, 
        JqxGroups: jqxGroups,
        ExportColumn: exportColumn,
        exportJson: exportJson, 
        projectName: projectName,
        fromWidgetProject: fromWidgetProject,
        jqxGridColumnGroups: jqxGridColumnGroups,
        pageSize: pageSize,
        KoGridInstanceCreator: koGridInstanceCreator,  
        currentModuleMenu: currentModuleMenu,  
        projectsMenue: projectsMenue, 
        koGridLoadState: koGridLoadState,
        koGridSaveState: koGridSaveState,
        koGridGetCurrentState: koGridGetCurrentState,
        pageExport: pageExport,
        pageTemplate: pageTemplate,
        exportDocumentToPdf: exportDocumentToPdf, 
        contactName: contactName
    };
});